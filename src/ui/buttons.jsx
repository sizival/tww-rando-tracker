import PropTypes from 'prop-types';
import React from 'react';

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
      chartListOpen,
      // isStartingItemMode, // Disabled: 'Edit Starting Items' button commented out below.
      onlyProgressLocations,
      randomSettingsWindowOpen,
      startingItemSelection,
      settingsWindowOpen,
      toggleChartList,
      toggleEntrances,
      toggleOnlyProgressLocations,
      toggleRandomSettingsWindow,
      toggleStartingItemSelection,
      toggleSettingsWindow,
      // toggleStartingItemMode, // Disabled: 'Edit Starting Items' button commented out below.
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

    const randomSettingsWindowText = randomSettingsWindowOpen
      ? 'Close Random Settings Window'
      : 'Open Random Settings Window';
    const startingItemSelectionText = startingItemSelection
      ? 'Disable Starting Item Selection'
      : 'Enable Starting Item Selection';
    return (
      <div className={`buttons ${startingItemSelection ? 'darken-background-z-index' : ''}`}>
        <button
          onClick={toggleOnlyProgressLocations}
          type="button"
        >
          <input
            type="checkbox"
            className="button-checkbox"
            checked={!onlyProgressLocations}
            readOnly
          />
          Show Non-Progress Locations
        </button>
        {isRandomEntrances && (
          <button
            onClick={toggleEntrances}
            type="button"
          >
            <input
              type="radio"
              className="button-radio"
              checked={viewingEntrances}
              readOnly
            />
            View Entrances
            <input
              type="radio"
              className="button-radio second-button-radio"
              checked={!viewingEntrances}
              readOnly
            />
            View Exits
          </button>
        )}
        {showChartsButton && (
          <button
            onClick={toggleChartList}
            type="button"
          >
            {chartListText}
          </button>
        )}
        {/* Disabled: 'Edit Starting Items' button. To re-enable, uncomment this
            block along with the isStartingItemMode/toggleStartingItemMode
            destructured props and propTypes, and the matching props passed to
            <Buttons /> in tracker.jsx.
        <button
          onClick={toggleStartingItemMode}
          type="button"
        >
          <input
            type="checkbox"
            className="button-checkbox"
            checked={isStartingItemMode}
            readOnly
          />
          Edit Starting Items
        </button>
        */}
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
        <button
          onClick={toggleRandomSettingsWindow}
          type="button"
        >
          {randomSettingsWindowText}
        </button>
        <button
          onClick={toggleStartingItemSelection}
          type="button"
        >
          <input type="checkbox" className="button-checkbox" checked={startingItemSelection} readOnly />
          {startingItemSelectionText}
        </button>
      </div>
    );
  }
}

Buttons.propTypes = {
  chartListOpen: PropTypes.bool.isRequired,
  // isStartingItemMode: PropTypes.bool.isRequired,
  onlyProgressLocations: PropTypes.bool.isRequired,
  saveData: PropTypes.string.isRequired,
  randomSettingsWindowOpen: PropTypes.bool.isRequired,
  startingItemSelection: PropTypes.bool.isRequired,
  settingsWindowOpen: PropTypes.bool.isRequired,
  toggleChartList: PropTypes.func.isRequired,
  toggleEntrances: PropTypes.func.isRequired,
  toggleOnlyProgressLocations: PropTypes.func.isRequired,
  toggleRandomSettingsWindow: PropTypes.func.isRequired,
  toggleStartingItemSelection: PropTypes.func.isRequired,
  toggleSettingsWindow: PropTypes.func.isRequired,
  // toggleStartingItemMode: PropTypes.func.isRequired,
  trackNonProgressCharts: PropTypes.bool.isRequired,
  viewingEntrances: PropTypes.bool.isRequired,
};

export default Buttons;
