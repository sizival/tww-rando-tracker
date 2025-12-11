/**
 * Archipelago WebSocket Client for multiworld.gg
 *
 * Implements the Archipelago protocol for connecting to multiworld servers
 * and receiving item/location updates.
 *
 * Protocol documentation: https://github.com/ArchipelagoMW/Archipelago/blob/main/docs/network%20protocol.md
 */

import _ from 'lodash';

import { getExitNameFromStageName, getTrackerEntranceName } from './archipelago-entrance-mapping';

// Connection states
export const ConnectionState = {
  DISCONNECTED: 'disconnected',
  CONNECTING: 'connecting',
  CONNECTED: 'connected', // Socket connected, waiting for slot connection
  SLOT_CONNECTED: 'slot_connected', // Fully connected and authenticated
  ERROR: 'error',
};

// Client status codes (for StatusUpdate)
export const ClientStatus = {
  UNKNOWN: 0,
  CONNECTED: 5,
  READY: 10,
  PLAYING: 20,
  GOAL: 30,
};

class ArchipelagoClient {
  constructor() {
    this.socket = null;
    this.state = ConnectionState.DISCONNECTED;
    this.serverUrl = '';
    this.slotName = '';
    this.password = '';
    this.game = 'The Wind Waker';

    // Connection info
    this.playerNumber = -1;
    this.teamNumber = -1;
    this.slotData = null;
    this.checkedLocations = new Set();
    this.missingLocations = new Set();

    // Data package info (item/location names)
    this.dataPackage = {};
    this.itemIdToName = {};
    this.locationIdToName = {};

    // Player info (slot -> { name, alias, game })
    this.players = {};

    // Entrance randomization data
    // Maps AP entrance names to exit names (original from slot_data)
    this.apEntranceMappings = {};
    // Maps tracker entrance names to exit names (converted from slot_data)
    this.entranceMappings = {};
    // Maps exit names to tracker entrance names (inverted from entranceMappings)
    this.exitToEntranceMappings = {};
    // Data storage key for visited stages
    this.visitedStagesKey = null;

    // Callbacks
    this.onStateChange = null;
    this.onError = null;
    this.onClear = null;
    this.onItem = null;
    this.onLocation = null;
    this.onBounced = null;
    this.onEntranceDiscovered = null; // Called when an entrance->exit mapping is discovered
    this.onVisitedStagesRetrieved = null; // Called when visited stages are retrieved from data storage

    // Item tracking
    this.itemIndex = 0;

    // UUID for reconnection handling
    this.uuid = this._generateUuid();
  }

  _generateUuid() {
    const chars = '0123456789abcdef';
    let uuid = '';
    for (let i = 0; i < 16; i += 1) {
      uuid += chars[Math.floor(Math.random() * chars.length)];
    }
    return uuid;
  }

  _setState(newState) {
    if (this.state !== newState) {
      this.state = newState;
      if (this.onStateChange) {
        this.onStateChange(newState);
      }
    }
  }

  _emitError(message) {
    console.error('Archipelago Error:', message);
    if (this.onError) {
      this.onError(message);
    }
  }

  connect(serverUrl, slotName, password = '') {
    if (this.socket) {
      this.disconnect();
    }

    this.serverUrl = serverUrl;
    this.slotName = slotName;
    this.password = password;

    // Normalize the server URL
    let wsUrl = serverUrl.trim();
    if (!wsUrl.startsWith('ws://') && !wsUrl.startsWith('wss://')) {
      // Default to wss for multiworld.gg, ws for localhost
      if (wsUrl.includes('localhost') || wsUrl.includes('127.0.0.1')) {
        wsUrl = `ws://${wsUrl}`;
      } else {
        wsUrl = `wss://${wsUrl}`;
      }
    }

    // Ensure there's a port if not specified
    if (!wsUrl.match(/:\d+/)) {
      // Default Archipelago port is 38281
      wsUrl = `${wsUrl}:38281`;
    }

    this._setState(ConnectionState.CONNECTING);

    try {
      this.socket = new WebSocket(wsUrl);

      this.socket.onopen = () => {
        console.log('Archipelago: Socket connected');
        this._setState(ConnectionState.CONNECTED);
      };

      this.socket.onmessage = (event) => {
        this._handleMessage(event.data);
      };

      this.socket.onerror = (error) => {
        console.error('Archipelago: Socket error', error);
        this._emitError('Connection error');
        this._setState(ConnectionState.ERROR);
      };

      this.socket.onclose = (event) => {
        console.log('Archipelago: Socket closed', event.code, event.reason);
        if (this.state !== ConnectionState.ERROR) {
          this._setState(ConnectionState.DISCONNECTED);
        }
        this.socket = null;
      };
    } catch (error) {
      this._emitError(`Failed to connect: ${error.message}`);
      this._setState(ConnectionState.ERROR);
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
    this._setState(ConnectionState.DISCONNECTED);
    this._resetState();
  }

  _resetState() {
    this.playerNumber = -1;
    this.teamNumber = -1;
    this.slotData = null;
    this.checkedLocations.clear();
    this.missingLocations.clear();
    this.itemIndex = 0;
    this.apEntranceMappings = {};
    this.entranceMappings = {};
    this.exitToEntranceMappings = {};
    this.visitedStagesKey = null;
  }

  _send(messages) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      const data = JSON.stringify(messages);
      console.log('Archipelago: Sending', data);
      this.socket.send(data);
    }
  }

  _handleMessage(data) {
    let messages;
    try {
      messages = JSON.parse(data);
    } catch (error) {
      console.error('Archipelago: Failed to parse message', error);
      return;
    }

    if (!Array.isArray(messages)) {
      messages = [messages];
    }

    messages.forEach((message) => {
      const { cmd } = message;
      console.log('Archipelago: Received', cmd, message);

      switch (cmd) {
        case 'RoomInfo':
          this._handleRoomInfo(message);
          break;
        case 'Connected':
          this._handleConnected(message);
          break;
        case 'ConnectionRefused':
          this._handleConnectionRefused(message);
          break;
        case 'ReceivedItems':
          this._handleReceivedItems(message);
          break;
        case 'RoomUpdate':
          this._handleRoomUpdate(message);
          break;
        case 'DataPackage':
          this._handleDataPackage(message);
          break;
        case 'Bounced':
          this._handleBounced(message);
          break;
        case 'Retrieved':
          this._handleRetrieved(message);
          break;
        case 'SetReply':
          this._handleSetReply(message);
          break;
        case 'PrintJSON':
          // Ignore chat messages
          break;
        default:
          console.log('Archipelago: Unknown command', cmd);
      }
    });
  }

  _handleRoomInfo(message) {
    // Request the data package for our game
    const games = message.games || [];
    if (!games.includes(this.game)) {
      console.log(`Archipelago: Game "${this.game}" not in room, requesting data package anyway`);
    }

    this._send([{
      cmd: 'GetDataPackage',
      games: [this.game],
    }]);
  }

  _handleDataPackage(message) {
    const { data } = message;
    if (data && data.games) {
      this.dataPackage = data.games[this.game] || {};

      // Build lookup maps
      if (this.dataPackage.item_name_to_id) {
        this.itemIdToName = _.invert(this.dataPackage.item_name_to_id);
      }
      if (this.dataPackage.location_name_to_id) {
        this.locationIdToName = _.invert(this.dataPackage.location_name_to_id);
      }
    }

    // Now connect to the slot
    this._connectSlot();
  }

  _connectSlot() {
    const connectMessage = {
      cmd: 'Connect',
      password: this.password,
      game: this.game,
      name: this.slotName,
      uuid: this.uuid,
      version: {
        major: 0,
        minor: 5,
        build: 1,
        class: 'Version',
      },
      items_handling: 0b111, // Receive all items
      tags: ['Tracker', 'NoText'],
      slot_data: true,
    };

    this._send([connectMessage]);
  }

  _handleConnected(message) {
    console.log('Archipelago: Slot connected!');
    console.log('Archipelago: Raw checked_locations from server:', message.checked_locations);

    this.playerNumber = message.slot;
    this.teamNumber = message.team;
    this.slotData = message.slot_data || {};
    this.checkedLocations = new Set(message.checked_locations || []);
    this.missingLocations = new Set(message.missing_locations || []);

    // Store player info for looking up names later
    this.players = {};
    if (message.players && Array.isArray(message.players)) {
      message.players.forEach((player) => {
        this.players[player.slot] = {
          name: player.name,
          alias: player.alias,
          game: player.game,
        };
      });
      console.log('Archipelago: Loaded player info for', Object.keys(this.players).length, 'players');
    }

    console.log('Archipelago: checkedLocations Set size:', this.checkedLocations.size);
    console.log('Archipelago: checkedLocations contents:', [...this.checkedLocations]);

    // Store entrance mappings from slot_data
    this._processEntranceMappings();

    this._setState(ConnectionState.SLOT_CONNECTED);
    this.itemIndex = 0;

    // Request visited stages from data storage
    this._requestVisitedStages();

    // Emit clear event so tracker can reset and apply settings
    if (this.onClear) {
      this.onClear(this.slotData, this.checkedLocations, this.missingLocations);
    }
  }

  _processEntranceMappings() {
    // slot_data.entrances contains { apEntranceName: exitName } mappings
    // where apEntranceName is like "Dungeon Entrance on Dragon Roost Island"
    // and exitName is the internal name like "Dragon Roost Cavern"
    const entrances = this.slotData.entrances || {};

    // Store original AP mappings
    this.apEntranceMappings = { ...entrances };

    // Convert to tracker format: { trackerEntranceName: exitName }
    this.entranceMappings = {};
    Object.entries(entrances).forEach(([apEntranceName, exitName]) => {
      const trackerEntranceName = getTrackerEntranceName(apEntranceName);
      if (trackerEntranceName) {
        this.entranceMappings[trackerEntranceName] = exitName;
      } else {
        console.log(`Archipelago: Unknown AP entrance name: "${apEntranceName}"`);
      }
    });

    // Create inverted mapping (exitName -> trackerEntranceName)
    this.exitToEntranceMappings = {};
    Object.entries(this.entranceMappings).forEach(([trackerEntranceName, exitName]) => {
      this.exitToEntranceMappings[exitName] = trackerEntranceName;
    });

    console.log('Archipelago: Loaded entrance mappings:', Object.keys(this.entranceMappings).length);
    if (Object.keys(this.entranceMappings).length > 0) {
      console.log('Archipelago: Entrance mappings sample:', Object.entries(this.entranceMappings).slice(0, 5));
    }
  }

  _requestVisitedStages() {
    // Data storage key format from ww-poptracker
    this.visitedStagesKey = `tww_visited_stages_${this.playerNumber}`;
    console.log('Archipelago: Requesting visited stages with key:', this.visitedStagesKey);

    this.get([this.visitedStagesKey]);
  }

  _handleConnectionRefused(message) {
    const errors = message.errors || [];
    let errorMessage = 'Connection refused';

    if (errors.includes('InvalidSlot')) {
      errorMessage = 'Invalid slot name';
    } else if (errors.includes('InvalidGame')) {
      errorMessage = 'Invalid game';
    } else if (errors.includes('IncompatibleVersion')) {
      errorMessage = 'Incompatible version';
    } else if (errors.includes('InvalidPassword')) {
      errorMessage = 'Invalid password';
    } else if (errors.includes('InvalidItemsHandling')) {
      errorMessage = 'Invalid items handling';
    } else if (errors.length > 0) {
      errorMessage = `Connection refused: ${errors.join(', ')}`;
    }

    this._emitError(errorMessage);
    this._setState(ConnectionState.ERROR);
    this.disconnect();
  }

  _handleReceivedItems(message) {
    const { items, index } = message;

    if (!items || !Array.isArray(items)) {
      return;
    }

    items.forEach((item, i) => {
      const itemIdx = index + i;
      if (itemIdx < this.itemIndex) {
        // Already processed this item
        return;
      }

      this.itemIndex = itemIdx + 1;

      const itemId = item.item;
      const itemName = this.itemIdToName[itemId] || `Unknown Item ${itemId}`;
      const { player, location } = item;

      // Get location name (location is from the finder's game, so we look up in their data)
      const locationName = this.locationIdToName[location] || `Unknown Location ${location}`;

      // Get finder's name
      const finderInfo = this.players[player];
      const finderName = finderInfo ? (finderInfo.alias || finderInfo.name) : `Player ${player}`;

      // Log the item receipt
      console.log(`Archipelago: Received "${itemName}" from "${locationName}" (found by ${finderName})`);

      if (this.onItem) {
        this.onItem(itemIdx, itemId, itemName, player);
      }
    });
  }

  _handleRoomUpdate(message) {
    // Update player info if provided (when players join/leave)
    if (message.players && Array.isArray(message.players)) {
      message.players.forEach((player) => {
        this.players[player.slot] = {
          name: player.name,
          alias: player.alias,
          game: player.game,
        };
      });
      console.log('Archipelago: Updated player info, now have', Object.keys(this.players).length, 'players');
    }

    // Update checked locations if provided
    if (message.checked_locations) {
      message.checked_locations.forEach((locId) => {
        if (!this.checkedLocations.has(locId)) {
          this.checkedLocations.add(locId);
          this.missingLocations.delete(locId);

          const locationName = this.locationIdToName[locId] || `Unknown Location ${locId}`;
          if (this.onLocation) {
            this.onLocation(locId, locationName);
          }
        }
      });
    }
  }

  _handleBounced(message) {
    // Check if this is a stage tracking message for our slot
    const { slots, data } = message;

    // Verify the message is for our slot
    if (slots && slots.length === 1 && slots[0] === this.playerNumber && data) {
      const stageName = data.tww_stage_name;
      if (stageName) {
        console.log('Archipelago: Received stage name via Bounced:', stageName);
        this._processStageVisit(stageName);
      }
    }

    if (this.onBounced) {
      this.onBounced(message);
    }
  }

  _processStageVisit(stageName) {
    // Look up the exit name from the stage name
    const exitName = getExitNameFromStageName(stageName);
    if (!exitName) {
      console.log('Archipelago: Unknown stage name:', stageName);
      return;
    }

    // Look up which entrance leads to this exit
    const entranceName = this.exitToEntranceMappings[exitName];
    if (!entranceName) {
      console.log(`Archipelago: No entrance mapping for exit "${exitName}" (stage: ${stageName})`);
      return;
    }

    console.log(`Archipelago: Entrance discovered - "${entranceName}" -> "${exitName}"`);

    // Emit entrance discovered event
    if (this.onEntranceDiscovered) {
      this.onEntranceDiscovered(entranceName, exitName);
    }
  }

  _handleRetrieved(message) {
    // Handle data storage retrieval
    console.log('Archipelago: Retrieved', message);

    const { keys } = message;
    if (!keys) return;

    // Check if this is the visited stages response
    if (this.visitedStagesKey && keys[this.visitedStagesKey] !== undefined) {
      const visitedStages = keys[this.visitedStagesKey];
      console.log('Archipelago: Received visited stages:', visitedStages);

      if (visitedStages && typeof visitedStages === 'object') {
        // visitedStages is a dictionary used as a set (keys are stage names, values are true)
        const stageNames = Object.keys(visitedStages);
        console.log('Archipelago: Processing', stageNames.length, 'previously visited stages');

        // Process each visited stage to assign entrances
        stageNames.forEach((stageName) => {
          this._processStageVisit(stageName);
        });

        // Also emit callback for any additional handling
        if (this.onVisitedStagesRetrieved) {
          this.onVisitedStagesRetrieved(stageNames);
        }
      }
    }
  }

  _handleSetReply(message) {
    // Handle data storage updates
    console.log('Archipelago: SetReply', message);
  }

  // Public methods for data storage
  get(keys) {
    this._send([{
      cmd: 'Get',
      keys,
    }]);
  }

  setNotify(keys) {
    this._send([{
      cmd: 'SetNotify',
      keys,
    }]);
  }

  // Sync to re-request items
  sync() {
    this._send([{
      cmd: 'Sync',
    }]);
  }

  // Get item name from ID
  getItemName(itemId) {
    return this.itemIdToName[itemId] || `Unknown Item ${itemId}`;
  }

  // Get location name from ID
  getLocationName(locationId) {
    return this.locationIdToName[locationId] || `Unknown Location ${locationId}`;
  }

  // Get exit name for an entrance (from slot_data mappings)
  getExitForEntrance(entranceName) {
    return this.entranceMappings[entranceName] || null;
  }

  // Get entrance name for an exit (from slot_data mappings)
  getEntranceForExit(exitName) {
    return this.exitToEntranceMappings[exitName] || null;
  }

  // Check if entrance randomization data is available
  hasEntranceMappings() {
    return Object.keys(this.entranceMappings).length > 0;
  }

  // Get all entrance mappings
  getAllEntranceMappings() {
    return { ...this.entranceMappings };
  }
}

// Export a singleton instance
const archipelagoClient = new ArchipelagoClient();
export default archipelagoClient;

