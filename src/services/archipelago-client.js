/**
 * Archipelago WebSocket Client for multiworld.gg
 *
 * Implements the Archipelago protocol for connecting to multiworld servers
 * and receiving item/location updates.
 *
 * Protocol documentation: https://github.com/ArchipelagoMW/Archipelago/blob/main/docs/network%20protocol.md
 */

import _ from 'lodash';

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

    // Callbacks
    this.onStateChange = null;
    this.onError = null;
    this.onClear = null;
    this.onItem = null;
    this.onLocation = null;
    this.onBounced = null;

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

    console.log('Archipelago: checkedLocations Set size:', this.checkedLocations.size);
    console.log('Archipelago: checkedLocations contents:', [...this.checkedLocations]);

    this._setState(ConnectionState.SLOT_CONNECTED);
    this.itemIndex = 0;

    // Emit clear event so tracker can reset and apply settings
    if (this.onClear) {
      this.onClear(this.slotData, this.checkedLocations, this.missingLocations);
    }
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
      const { player } = item;

      if (this.onItem) {
        this.onItem(itemIdx, itemId, itemName, player);
      }
    });
  }

  _handleRoomUpdate(message) {
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
    if (this.onBounced) {
      this.onBounced(message);
    }
  }

  _handleRetrieved(message) {
    // Handle data storage retrieval
    console.log('Archipelago: Retrieved', message);
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
}

// Export a singleton instance
const archipelagoClient = new ArchipelagoClient();
export default archipelagoClient;

