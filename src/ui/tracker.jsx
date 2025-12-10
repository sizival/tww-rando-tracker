import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { Oval } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';

import archipelagoClient, { ConnectionState } from '../services/archipelago-client';
import { getTrackerItemName } from '../services/archipelago-item-mapping';
import { getTrackerLocation } from '../services/archipelago-location-mapping';
import LogicHelper from '../services/logic-helper';
import TrackerController from '../services/tracker-controller';

import ArchipelagoConnectionWindow from './archipelago-connection-window';
import Buttons from './buttons';
import Images from './images';
import ItemsTable from './items-table';
import LocationsTable from './locations-table';
import SettingsWindow from './settings-window';
import SphereTracking from './sphere-tracking';
import Statistics from './statistics';
import Storage from './storage';

import 'react-toastify/dist/ReactToastify.css';

class Tracker extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      archipelagoConnectionOpen: false,
      archipelagoConnectionState: ConnectionState.DISCONNECTED,
      archipelagoConnectionError: null,
      archipelagoServerUrl: 'multiworld.gg',
      archipelagoSlotName: '',
      archipelagoPassword: '',
      chartListOpen: false,
      clearAllIncludesMail: true,
      settingsWindowOpen: false,
      colors: {
        extraLocationsBackground: null,
        itemsTableBackground: null,
        sphereTrackingBackground: null,
        statisticsBackground: null,
      },
      disableLogic: false,
      isLoading: true,
      lastLocation: null,
      onlyProgressLocations: true,
      openedChartForIsland: null,
      openedEntrance: null,
      openedExit: null,
      openedLocation: null,
      openedLocationIsDungeon: null,
      rightClickToClearAll: true,
      trackNonProgressCharts: false,
      trackSpheres: false,
      viewingEntrances: false,
    };

    this.initialize();

    this.clearAllLocations = this.clearAllLocations.bind(this);
    this.clearOpenedMenus = this.clearOpenedMenus.bind(this);
    this.decrementItem = this.decrementItem.bind(this);
    this.incrementItem = this.incrementItem.bind(this);
    this.toggleChartList = this.toggleChartList.bind(this);
    this.toggleSettingsWindow = this.toggleSettingsWindow.bind(this);
    this.toggleEntrances = this.toggleEntrances.bind(this);
    this.toggleLocationChecked = this.toggleLocationChecked.bind(this);
    this.toggleOnlyProgressLocations = this.toggleOnlyProgressLocations.bind(this);
    this.toggleRequiredBoss = this.toggleRequiredBoss.bind(this);
    this.unsetChartMapping = this.unsetChartMapping.bind(this);
    this.unsetEntrance = this.unsetEntrance.bind(this);
    this.unsetExit = this.unsetExit.bind(this);
    this.unsetLastLocation = this.unsetLastLocation.bind(this);
    this.updateChartMapping = this.updateChartMapping.bind(this);
    this.updateExitForEntrance = this.updateExitForEntrance.bind(this);
    this.updateOpenedChartForIsland = this.updateOpenedChartForIsland.bind(this);
    this.updateOpenedEntrance = this.updateOpenedEntrance.bind(this);
    this.updateOpenedExit = this.updateOpenedExit.bind(this);
    this.updateOpenedLocation = this.updateOpenedLocation.bind(this);
    this.updatePreferences = this.updatePreferences.bind(this);

    // Bind Archipelago methods
    this.toggleArchipelagoConnection = this.toggleArchipelagoConnection.bind(this);
    this.connectToArchipelago = this.connectToArchipelago.bind(this);
    this.disconnectFromArchipelago = this.disconnectFromArchipelago.bind(this);
    this.handleArchipelagoStateChange = this.handleArchipelagoStateChange.bind(this);
    this.handleArchipelagoError = this.handleArchipelagoError.bind(this);
    this.handleArchipelagoClear = this.handleArchipelagoClear.bind(this);
    this.handleArchipelagoItem = this.handleArchipelagoItem.bind(this);
    this.handleArchipelagoLocation = this.handleArchipelagoLocation.bind(this);
    this.handleArchipelagoServerUrlChange = this.handleArchipelagoServerUrlChange.bind(this);
    this.handleArchipelagoSlotNameChange = this.handleArchipelagoSlotNameChange.bind(this);
    this.handleArchipelagoPasswordChange = this.handleArchipelagoPasswordChange.bind(this);

    // Set up Archipelago callbacks
    archipelagoClient.onStateChange = this.handleArchipelagoStateChange;
    archipelagoClient.onError = this.handleArchipelagoError;
    archipelagoClient.onClear = this.handleArchipelagoClear;
    archipelagoClient.onItem = this.handleArchipelagoItem;
    archipelagoClient.onLocation = this.handleArchipelagoLocation;

    // Track pending state for rapid-fire AP updates (React setState is async)
    this.pendingTrackerState = null;
    this.clearPendingStateTimeout = null;
  }

  // Schedule clearing the pending state after AP updates settle
  scheduleClearPendingState() {
    clearTimeout(this.clearPendingStateTimeout);
    this.clearPendingStateTimeout = setTimeout(() => {
      this.pendingTrackerState = null;
    }, 100);
  }

  async initialize() {
    await Images.importImages();

    const preferences = Storage.loadPreferences();
    if (!_.isNil(preferences)) {
      this.updatePreferences(preferences);
    }

    const { loadProgress, permalink } = this.props;

    let initialData;

    if (loadProgress) {
      const saveData = Storage.loadFromStorage();

      if (!_.isNil(saveData)) {
        try {
          initialData = TrackerController.initializeFromSaveData(saveData);

          toast.success('Progress loaded!');
        } catch (err) {
          TrackerController.reset();
        }
      }

      if (_.isNil(initialData)) {
        toast.error('Could not load progress from save data!');
      }
    }

    if (_.isNil(initialData)) {
      try {
        const decodedPermalink = decodeURIComponent(permalink);

        initialData = await TrackerController.initializeFromPermalink(decodedPermalink);
      } catch (err) {
        toast.error('Tracker could not be initialized!');

        throw err;
      }
    }

    const {
      logic,
      saveData,
      spheres,
      trackerState,
    } = initialData;

    this.setState({
      isLoading: false,
      logic,
      saveData,
      spheres,
      trackerState,
    });
  }

  incrementItem(itemName, trackItemLocation) {
    const {
      lastLocation,
      trackerState,
    } = this.state;

    let newTrackerState = trackerState.incrementItem(itemName);

    if (trackItemLocation && !_.isNil(lastLocation)) {
      const {
        generalLocation,
        detailedLocation,
      } = lastLocation;

      newTrackerState = newTrackerState.setItemForLocation(
        itemName,
        generalLocation,
        detailedLocation,
      );
    }

    this.updateTrackerState(newTrackerState);
  }

  decrementItem(itemName) {
    const { trackerState } = this.state;

    const newTrackerState = trackerState.decrementItem(itemName);

    this.updateTrackerState(newTrackerState);
  }

  toggleLocationChecked(generalLocation, detailedLocation) {
    const { trackerState } = this.state;

    let newTrackerState = trackerState.toggleLocationChecked(generalLocation, detailedLocation);

    if (newTrackerState.isLocationChecked(generalLocation, detailedLocation)) {
      this.setState({
        lastLocation: {
          generalLocation,
          detailedLocation,
        },
      });
    } else {
      this.setState({ lastLocation: null });

      newTrackerState = newTrackerState.unsetItemForLocation(generalLocation, detailedLocation);
    }

    this.updateTrackerState(newTrackerState);
  }

  clearAllLocations(zoneName) {
    const {
      clearAllIncludesMail,
      trackerState,
    } = this.state;

    const newTrackerState = trackerState.clearBannedLocations(
      zoneName,
      { includeAdditionalLocations: clearAllIncludesMail },
    );

    this.updateTrackerState(newTrackerState);
  }

  toggleRequiredBoss(dungeonName) {
    let { trackerState: newTrackerState } = this.state;

    if (LogicHelper.isBossRequired(dungeonName)) {
      newTrackerState = newTrackerState.clearBannedLocations(
        dungeonName,
        { includeAdditionalLocations: true },
      );
      LogicHelper.setBossNotRequired(dungeonName);
    } else {
      LogicHelper.setBossRequired(dungeonName);
    }

    this.updateTrackerState(newTrackerState);
  }

  updateTrackerState(newTrackerState) {
    const {
      logic,
      saveData,
      spheres,
      trackerState,
    } = TrackerController.refreshState(newTrackerState);

    Storage.saveToStorage(saveData);
    this.setState({
      logic,
      saveData,
      spheres,
      trackerState,
    });
  }

  clearOpenedMenus() {
    this.setState({
      chartListOpen: false,
      openedChartForIsland: null,
      openedEntrance: null,
      openedExit: null,
      openedLocation: null,
      openedLocationIsDungeon: null,
    });
  }

  updateOpenedEntrance(entranceName) {
    this.setState({
      chartListOpen: false,
      openedChartForIsland: null,
      openedEntrance: entranceName,
      openedExit: null,
      openedLocation: null,
      openedLocationIsDungeon: null,
    });
  }

  updateOpenedExit(exitName) {
    this.setState({
      chartListOpen: false,
      openedChartForIsland: null,
      openedEntrance: null,
      openedExit: exitName,
      openedLocation: null,
      openedLocationIsDungeon: null,
    });
  }

  unsetEntrance(entranceName) {
    const { trackerState } = this.state;

    const newTrackerState = trackerState.unsetEntrance(entranceName);

    this.updateTrackerState(newTrackerState);
  }

  unsetExit(exitName) {
    const { trackerState } = this.state;

    const newTrackerState = trackerState.unsetExit(exitName);

    this.updateTrackerState(newTrackerState);
  }

  updateExitForEntrance(entranceName, exitName) {
    const { trackerState } = this.state;

    const newTrackerState = trackerState.setExitForEntrance(entranceName, exitName);

    this.updateTrackerState(newTrackerState);
    this.clearOpenedMenus();
  }

  updateOpenedLocation({ locationName, isDungeon }) {
    this.setState({
      chartListOpen: false,
      openedChartForIsland: null,
      openedEntrance: null,
      openedExit: null,
      openedLocation: locationName,
      openedLocationIsDungeon: isDungeon,
    });
  }

  updateChartMapping(chart, chartForIsland) {
    const { lastLocation, trackerState } = this.state;

    let newTrackerState = trackerState
      .setChartMapping(chart, chartForIsland);

    if (newTrackerState.getItemValue(chart) === 0) {
      newTrackerState = newTrackerState.incrementItem(chart);

      if (!_.isNil(lastLocation)) {
        const {
          generalLocation,
          detailedLocation,
        } = lastLocation;

        newTrackerState = newTrackerState.setItemForLocation(
          chart,
          generalLocation,
          detailedLocation,
        );
      }
    }

    if (newTrackerState.getItemValue(chartForIsland) === 0) {
      newTrackerState = newTrackerState.incrementItem(chartForIsland);
    }

    this.updateTrackerState(newTrackerState);
    this.clearOpenedMenus();
  }

  // Unset via sector should only remove mapping.
  // Unset via chart-list should remove both mapping and decrement chart.
  unsetChartMapping(chartForIsland, decrementChart) {
    const { trackerState } = this.state;
    let newTrackerState = trackerState;

    if (decrementChart) {
      const island = LogicHelper.islandFromChartForIsland(chartForIsland);
      const chart = trackerState.getChartFromChartMapping(island);

      newTrackerState = newTrackerState
        .decrementItem(chart);
    }

    newTrackerState = newTrackerState
      .decrementItem(chartForIsland)
      .unsetChartMapping(chartForIsland);

    this.updateTrackerState(newTrackerState);
  }

  updateOpenedChartForIsland(openedChartForIsland) {
    this.setState({
      chartListOpen: false,
      openedChartForIsland,
      openedEntrance: null,
      openedExit: null,
      openedLocation: null,
      openedLocationIsDungeon: null,
    });
  }

  toggleChartList() {
    const { chartListOpen } = this.state;

    this.setState({
      chartListOpen: !chartListOpen,
      openedChartForIsland: null,
      openedEntrance: null,
      openedExit: null,
      openedLocation: null,
      openedLocationIsDungeon: null,
    });
  }

  toggleOnlyProgressLocations() {
    const { onlyProgressLocations } = this.state;

    this.updatePreferences({ onlyProgressLocations: !onlyProgressLocations });
  }

  toggleSettingsWindow() {
    const { settingsWindowOpen } = this.state;

    this.setState({
      settingsWindowOpen: !settingsWindowOpen,
    });
  }

  toggleEntrances() {
    const { viewingEntrances } = this.state;

    this.updatePreferences({ viewingEntrances: !viewingEntrances });
  }

  unsetLastLocation() {
    this.setState({ lastLocation: null });
  }

  updatePreferences(preferenceChanges) {
    const {
      clearAllIncludesMail,
      disableLogic,
      onlyProgressLocations,
      colors,
      rightClickToClearAll,
      trackNonProgressCharts,
      trackNonProgressBlueChuJelly,
      trackSpheres,
      viewingEntrances,
    } = this.state;

    const existingPreferences = {
      clearAllIncludesMail,
      colors,
      disableLogic,
      onlyProgressLocations,
      rightClickToClearAll,
      trackNonProgressCharts,
      trackNonProgressBlueChuJelly,
      trackSpheres,
      viewingEntrances,
    };

    const newPreferences = _.merge({}, existingPreferences, preferenceChanges);

    this.setState(newPreferences);
    Storage.savePreferences(newPreferences);
  }

  // Archipelago connection methods
  toggleArchipelagoConnection() {
    const { archipelagoConnectionOpen } = this.state;
    this.setState({ archipelagoConnectionOpen: !archipelagoConnectionOpen });
  }

  connectToArchipelago(serverUrl, slotName, password) {
    this.setState({
      archipelagoConnectionError: null,
    });
    archipelagoClient.connect(serverUrl, slotName, password);
  }

  disconnectFromArchipelago() {
    archipelagoClient.disconnect();
  }

  handleArchipelagoStateChange(newState) {
    this.setState({ archipelagoConnectionState: newState });

    if (newState === ConnectionState.SLOT_CONNECTED) {
      toast.success('Connected to Archipelago!');
    } else if (newState === ConnectionState.DISCONNECTED) {
      toast.info('Disconnected from Archipelago');
    }
  }

  handleArchipelagoError(errorMessage) {
    this.setState({ archipelagoConnectionError: errorMessage });
    toast.error(`Archipelago: ${errorMessage}`);
  }

  handleArchipelagoClear(slotData, checkedLocations, missingLocations) {
    // When connecting to AP:
    // 1. Reset items to zero (AP sends all items including starting items via ReceivedItems)
    // 2. Mark non-required bosses based on slot_data
    // 3. Sync checked locations from the server (preserving any user-marked locations)
    const trackerState = this.pendingTrackerState || this.state.trackerState;

    if (!trackerState) {
      return;
    }

    let newTrackerState = trackerState;

    // Reset all items to zero - AP will send the correct counts via ReceivedItems
    // This prevents double-counting starting items
    // Note: We use setItemValue(0) instead of decrementItem because decrementItem
    // wraps around to max when going below the starting value (designed for UI cycling)
    console.log('Archipelago: Resetting all items to zero...');
    let itemsReset = 0;
    LogicHelper.ALL_ITEMS.forEach((itemName) => {
      const currentCount = newTrackerState.getItemValue(itemName);
      if (currentCount > 0) {
        console.log(`Archipelago: Resetting ${itemName} from ${currentCount} to 0`);
        itemsReset += 1;
        newTrackerState = newTrackerState.setItemValue(itemName, 0);
      }
    });
    console.log(`Archipelago: Reset ${itemsReset} items to zero`);

    // Handle Required Bosses mode - mark non-required dungeons
    // When Required Bosses is enabled, non-required dungeons don't have their locations
    // in the multiworld, so we check if a marker location exists for each dungeon
    if (slotData.required_bosses === 1) {
      console.log('Archipelago: Required Bosses mode detected, checking which dungeons are required');

      // Marker locations for each dungeon (from ww-poptracker)
      // If a dungeon's marker location doesn't exist in checked or missing, it's not required
      const dungeonMarkerLocations = {
        'Dragon Roost Cavern': 0x238038, // First Room
        'Forbidden Woods': 0x23804e, // First Room
        'Tower of the Gods': 0x238061, // Chest Behind Bombable Walls
        'Forsaken Fortress': 0x238072, // Phantom Ganon
        'Earth Temple': 0x238082, // Transparent Chest In Warp Pot Room
        'Wind Temple': 0x238094, // Chest Between Two Dirt Patches
      };

      // Combine checked and missing locations to get all locations in the multiworld
      const allLocations = new Set([...checkedLocations, ...missingLocations]);

      Object.entries(dungeonMarkerLocations).forEach(([dungeonName, markerId]) => {
        const isDungeonRequired = allLocations.has(markerId);

        if (!isDungeonRequired) {
          // This dungeon is not required - mark boss as not required and clear its locations
          console.log(`Archipelago: ${dungeonName} is NOT required, marking off`);

          if (LogicHelper.isBossRequired(dungeonName)) {
            // Clear all locations in this dungeon
            newTrackerState = newTrackerState.clearBannedLocations(
              dungeonName,
              { includeAdditionalLocations: true },
            );
            // Mark the boss as not required
            LogicHelper.setBossNotRequired(dungeonName);
          }
        } else {
          console.log(`Archipelago: ${dungeonName} IS required`);
        }
      });
    }

    // Mark checked locations from the server
    // User-marked locations are preserved since we only mark if not already checked
    console.log('Archipelago: checkedLocations received in handler:', checkedLocations);
    console.log(`Archipelago: Syncing ${checkedLocations.size || 0} checked locations from server`);
    let locationsMarked = 0;
    checkedLocations.forEach((locationId) => {
      const location = getTrackerLocation(locationId);
      if (location) {
        const { generalLocation, detailedLocation } = location;
        if (!newTrackerState.isLocationChecked(generalLocation, detailedLocation)) {
          newTrackerState = newTrackerState.toggleLocationChecked(generalLocation, detailedLocation);
          locationsMarked += 1;
        }
      } else {
        console.log(`Archipelago: Unknown location ID ${locationId}`);
      }
    });
    console.log(`Archipelago: Marked ${locationsMarked} new locations as checked`);

    // Store pending state for rapid-fire updates (React setState is async)
    this.pendingTrackerState = newTrackerState;
    this.scheduleClearPendingState();
    this.updateTrackerState(newTrackerState);

    // Log slot data for debugging
    console.log('Archipelago slot_data:', slotData);
  }

  handleArchipelagoItem(index, itemId, itemName, playerNumber) {
    // Use pending state to handle rapid-fire updates (React setState is async)
    const usingPendingState = !!this.pendingTrackerState;
    const trackerState = this.pendingTrackerState || this.state.trackerState;

    if (!trackerState) {
      return;
    }

    // Debug: log which state we're using
    if (index === 0) {
      console.log(`Archipelago: Item handler using ${usingPendingState ? 'pendingTrackerState' : 'this.state.trackerState'}`);
      console.log(`Archipelago: Progressive Sword count at start of items: ${trackerState.getItemValue('Progressive Sword')}`);
    }

    // Get the tracker item name from the mapping
    const trackerItemName = getTrackerItemName(itemId);

    if (!trackerItemName) {
      console.log(`Unknown item ID: ${itemId} (${itemName})`);
      return;
    }

    // Check if this item exists in the tracker
    const currentCount = trackerState.getItemValue(trackerItemName);
    if (currentCount === undefined) {
      console.log(`Item not found in tracker: ${trackerItemName}`);
      return;
    }

    const maxCount = LogicHelper.maxItemCount(trackerItemName);

    // Only increment if we haven't reached the max
    if (currentCount < maxCount) {
      const newTrackerState = trackerState.incrementItem(trackerItemName);
      // Store pending state for rapid-fire updates (React setState is async)
      this.pendingTrackerState = newTrackerState;
      this.scheduleClearPendingState();
      this.updateTrackerState(newTrackerState);

      console.log(`Archipelago: Received ${trackerItemName} (${currentCount} -> ${currentCount + 1}/${maxCount}) from player ${playerNumber}`);
    } else {
      console.log(`Archipelago: Already at max for ${trackerItemName} (${currentCount}/${maxCount})`);
    }
  }

  handleArchipelagoLocation(locationId, locationName) {
    // Use pending state to handle rapid-fire updates (React setState is async)
    const trackerState = this.pendingTrackerState || this.state.trackerState;

    if (!trackerState) {
      return;
    }

    // Get the tracker location from the mapping
    const location = getTrackerLocation(locationId);

    if (!location) {
      console.log(`Unknown location ID: ${locationId} (${locationName})`);
      return;
    }

    const { generalLocation, detailedLocation } = location;

    // Check if this location is already checked
    if (!trackerState.isLocationChecked(generalLocation, detailedLocation)) {
      const newTrackerState = trackerState.toggleLocationChecked(generalLocation, detailedLocation);
      // Store pending state for rapid-fire updates (React setState is async)
      this.pendingTrackerState = newTrackerState;
      this.scheduleClearPendingState();
      this.updateTrackerState(newTrackerState);

      console.log(`Archipelago: Checked location ${generalLocation} - ${detailedLocation}`);
    }
  }

  handleArchipelagoServerUrlChange(serverUrl) {
    this.setState({ archipelagoServerUrl: serverUrl });
  }

  handleArchipelagoSlotNameChange(slotName) {
    this.setState({ archipelagoSlotName: slotName });
  }

  handleArchipelagoPasswordChange(password) {
    this.setState({ archipelagoPassword: password });
  }

  render() {
    const {
      archipelagoConnectionOpen,
      archipelagoConnectionState,
      archipelagoConnectionError,
      archipelagoServerUrl,
      archipelagoSlotName,
      archipelagoPassword,
      chartListOpen,
      clearAllIncludesMail,
      colors,
      disableLogic,
      isLoading,
      lastLocation,
      logic,
      onlyProgressLocations,
      openedChartForIsland,
      openedEntrance,
      openedExit,
      openedLocation,
      openedLocationIsDungeon,
      rightClickToClearAll,
      saveData,
      settingsWindowOpen,
      spheres,
      trackNonProgressCharts,
      trackNonProgressBlueChuJelly,
      trackSpheres,
      trackerState,
      viewingEntrances,
    } = this.state;

    const {
      extraLocationsBackground,
      itemsTableBackground,
      sphereTrackingBackground,
      statisticsBackground,
    } = colors;

    let content;

    if (isLoading) {
      content = (
        <div className="loading-spinner">
          <Oval color="white" secondaryColor="gray" />
        </div>
      );
    } else {
      content = (
        <div className="tracker-container">
          <div className="tracker">
            <ItemsTable
              backgroundColor={itemsTableBackground}
              decrementItem={this.decrementItem}
              incrementItem={this.incrementItem}
              spheres={spheres}
              trackerState={trackerState}
              trackSpheres={trackSpheres}
              trackNonProgressBlueChuJelly={trackNonProgressBlueChuJelly}
            />
            <LocationsTable
              backgroundColor={extraLocationsBackground}
              chartListOpen={chartListOpen}
              clearAllLocations={this.clearAllLocations}
              clearOpenedMenus={this.clearOpenedMenus}
              decrementItem={this.decrementItem}
              disableLogic={disableLogic}
              incrementItem={this.incrementItem}
              logic={logic}
              onlyProgressLocations={onlyProgressLocations}
              openedChartForIsland={openedChartForIsland}
              openedEntrance={openedEntrance}
              openedExit={openedExit}
              openedLocation={openedLocation}
              openedLocationIsDungeon={openedLocationIsDungeon}
              rightClickToClearAll={rightClickToClearAll}
              spheres={spheres}
              toggleLocationChecked={this.toggleLocationChecked}
              toggleRequiredBoss={this.toggleRequiredBoss}
              trackerState={trackerState}
              trackNonProgressCharts={trackNonProgressCharts}
              trackNonProgressBlueChuJelly={trackNonProgressBlueChuJelly}
              trackSpheres={trackSpheres}
              updateChartMapping={this.updateChartMapping}
              updateOpenedChartForIsland={this.updateOpenedChartForIsland}
              unsetChartMapping={this.unsetChartMapping}
              unsetEntrance={this.unsetEntrance}
              unsetExit={this.unsetExit}
              updateExitForEntrance={this.updateExitForEntrance}
              updateOpenedEntrance={this.updateOpenedEntrance}
              updateOpenedExit={this.updateOpenedExit}
              updateOpenedLocation={this.updateOpenedLocation}
              viewingEntrances={viewingEntrances}
            />
            <Statistics
              backgroundColor={statisticsBackground}
              disableLogic={disableLogic}
              logic={logic}
              onlyProgressLocations={onlyProgressLocations}
            />
          </div>
          {trackSpheres && (
            <SphereTracking
              backgroundColor={sphereTrackingBackground}
              lastLocation={lastLocation}
              trackerState={trackerState}
              unsetLastLocation={this.unsetLastLocation}
            />
          )}
          {settingsWindowOpen && (
            <SettingsWindow
              clearAllIncludesMail={clearAllIncludesMail}
              disableLogic={disableLogic}
              extraLocationsBackground={extraLocationsBackground}
              itemsTableBackground={itemsTableBackground}
              rightClickToClearAll={rightClickToClearAll}
              sphereTrackingBackground={sphereTrackingBackground}
              statisticsBackground={statisticsBackground}
              toggleSettingsWindow={this.toggleSettingsWindow}
              trackNonProgressCharts={trackNonProgressCharts}
              trackNonProgressBlueChuJelly={trackNonProgressBlueChuJelly}
              trackSpheres={trackSpheres}
              updatePreferences={this.updatePreferences}
            />
          )}
          <Buttons
            archipelagoConnectionOpen={archipelagoConnectionOpen}
            archipelagoConnectionState={archipelagoConnectionState}
            settingsWindowOpen={settingsWindowOpen}
            chartListOpen={chartListOpen}
            onlyProgressLocations={onlyProgressLocations}
            saveData={saveData}
            toggleArchipelagoConnection={this.toggleArchipelagoConnection}
            toggleChartList={this.toggleChartList}
            toggleSettingsWindow={this.toggleSettingsWindow}
            toggleEntrances={this.toggleEntrances}
            toggleOnlyProgressLocations={this.toggleOnlyProgressLocations}
            trackNonProgressCharts={trackNonProgressCharts}
            viewingEntrances={viewingEntrances}
          />
          {archipelagoConnectionOpen && (
            <ArchipelagoConnectionWindow
              connectionError={archipelagoConnectionError}
              connectionState={archipelagoConnectionState}
              onConnect={this.connectToArchipelago}
              onDisconnect={this.disconnectFromArchipelago}
              onPasswordChange={this.handleArchipelagoPasswordChange}
              onServerUrlChange={this.handleArchipelagoServerUrlChange}
              onSlotNameChange={this.handleArchipelagoSlotNameChange}
              password={archipelagoPassword}
              serverUrl={archipelagoServerUrl}
              slotName={archipelagoSlotName}
              toggleArchipelagoConnection={this.toggleArchipelagoConnection}
            />
          )}
        </div>
      );
    }

    return (
      <>
        {content}
        <ToastContainer />
      </>
    );
  }
}

Tracker.propTypes = {
  loadProgress: PropTypes.bool.isRequired,
  permalink: PropTypes.string.isRequired,
};

export default Tracker;
