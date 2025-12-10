import PropTypes from 'prop-types';
import React from 'react';

import { ConnectionState } from '../services/archipelago-client';
import LogicHelper from '../services/logic-helper';

import Storage from './storage';

class Buttons extends React.PureComponent {
  constructor(props) {
    super(props);

    this.exportProgress = this.exportProgress.bind(this);
  }

  async exportProgress() {
    const { saveData } = this.props;

    await Storage.exportFile(saveData);
  }

  render() {
    const {
      archipelagoConnectionOpen,
      archipelagoConnectionState,
      chartListOpen,
      settingsWindowOpen,
      onlyProgressLocations,
      toggleArchipelagoConnection,
      toggleChartList,
      toggleSettingsWindow,
      toggleEntrances,
      toggleOnlyProgressLocations,
      trackNonProgressCharts,
      viewingEntrances,
    } = this.props;

    const settingsWindowText = settingsWindowOpen
      ? 'Close Settings'
      : 'Open Settings';
    const chartListText = chartListOpen
      ? 'Close Chart List'
      : 'View Charts';
    const isRandomEntrances = LogicHelper.isRandomEntrances();
    const showChartsButton = (
      trackNonProgressCharts
      || LogicHelper.anyProgressItemCharts()
    );

    // Determine Archipelago button text and state
    let archipelagoButtonText;
    let archipelagoConnected = false;
    if (archipelagoConnectionOpen) {
      archipelagoButtonText = 'Close AP Connection';
    } else if (archipelagoConnectionState === ConnectionState.SLOT_CONNECTED) {
      archipelagoButtonText = 'AP Connected ✓';
      archipelagoConnected = true;
    } else if (archipelagoConnectionState === ConnectionState.CONNECTING
      || archipelagoConnectionState === ConnectionState.CONNECTED) {
      archipelagoButtonText = 'AP Connecting...';
    } else {
      archipelagoButtonText = 'Connect to AP';
    }

    return (
      <div className="buttons">
        <button
          onClick={toggleArchipelagoConnection}
          type="button"
          className={archipelagoConnected ? 'archipelago-connected' : ''}
        >
          {archipelagoButtonText}
        </button>
        <button
          onClick={toggleOnlyProgressLocations}
          type="button"
        >
          <input type="checkbox" className="button-checkbox" checked={!onlyProgressLocations} readOnly />
          Show Non-Progress Locations
        </button>
        {isRandomEntrances && (
          <button
            onClick={toggleEntrances}
            type="button"
          >
            <input type="radio" className="button-radio" checked={viewingEntrances} readOnly />
            View Entrances
            <input type="radio" className="button-radio second-button-radio" checked={!viewingEntrances} readOnly />
            View Exits
          </button>
        )}
        {showChartsButton && (
          <button onClick={toggleChartList} type="button">
            {chartListText}
          </button>
        )}
        <br />
        <button
          onClick={this.exportProgress}
          type="button"
        >
          Export Progress
        </button>
        <button
          onClick={toggleSettingsWindow}
          type="button"
        >
          {settingsWindowText}
        </button>
      </div>
    );
  }
}

Buttons.propTypes = {
  archipelagoConnectionOpen: PropTypes.bool.isRequired,
  archipelagoConnectionState: PropTypes.string.isRequired,
  chartListOpen: PropTypes.bool.isRequired,
  onlyProgressLocations: PropTypes.bool.isRequired,
  saveData: PropTypes.string.isRequired,
  settingsWindowOpen: PropTypes.bool.isRequired,
  toggleArchipelagoConnection: PropTypes.func.isRequired,
  toggleChartList: PropTypes.func.isRequired,
  toggleEntrances: PropTypes.func.isRequired,
  toggleOnlyProgressLocations: PropTypes.func.isRequired,
  toggleSettingsWindow: PropTypes.func.isRequired,
  trackNonProgressCharts: PropTypes.bool.isRequired,
  viewingEntrances: PropTypes.bool.isRequired,
};

export default Buttons;
