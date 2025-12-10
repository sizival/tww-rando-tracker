import PropTypes from 'prop-types';
import React from 'react';

import archipelagoClient, { ConnectionState } from '../services/archipelago-client';
import KeyDownWrapper from './key-down-wrapper';

class ArchipelagoConnectionWindow extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleServerChange = this.handleServerChange.bind(this);
    this.handleSlotChange = this.handleSlotChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleConnect = this.handleConnect.bind(this);
    this.handleDisconnect = this.handleDisconnect.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleServerChange(event) {
    const { onServerUrlChange } = this.props;
    onServerUrlChange(event.target.value);
  }

  handleSlotChange(event) {
    const { onSlotNameChange } = this.props;
    onSlotNameChange(event.target.value);
  }

  handlePasswordChange(event) {
    const { onPasswordChange } = this.props;
    onPasswordChange(event.target.value);
  }

  handleConnect() {
    const { serverUrl, slotName, password, onConnect } = this.props;

    if (!slotName.trim()) {
      return;
    }

    onConnect(serverUrl, slotName, password);
  }

  handleDisconnect() {
    const { onDisconnect } = this.props;
    onDisconnect();
  }

  handleKeyDown(event) {
    if (event.key === 'Enter') {
      this.handleConnect();
    }
  }

  renderConnectionStatus() {
    const { connectionState, connectionError } = this.props;

    let statusText;
    let statusClass;

    switch (connectionState) {
      case ConnectionState.DISCONNECTED:
        statusText = 'Disconnected';
        statusClass = 'status-disconnected';
        break;
      case ConnectionState.CONNECTING:
        statusText = 'Connecting...';
        statusClass = 'status-connecting';
        break;
      case ConnectionState.CONNECTED:
        statusText = 'Socket connected, authenticating...';
        statusClass = 'status-connecting';
        break;
      case ConnectionState.SLOT_CONNECTED:
        statusText = `Connected to slot ${archipelagoClient.slotName}`;
        statusClass = 'status-connected';
        break;
      case ConnectionState.ERROR:
        statusText = connectionError || 'Connection error';
        statusClass = 'status-error';
        break;
      default:
        statusText = 'Unknown';
        statusClass = 'status-disconnected';
    }

    return (
      <div className={`connection-status ${statusClass}`}>
        {statusText}
      </div>
    );
  }

  render() {
    const {
      connectionState,
      password,
      serverUrl,
      slotName,
      toggleArchipelagoConnection,
    } = this.props;

    const isConnected = connectionState === ConnectionState.SLOT_CONNECTED;
    const isConnecting = connectionState === ConnectionState.CONNECTING
      || connectionState === ConnectionState.CONNECTED;
    const canConnect = slotName.trim() && !isConnecting && !isConnected;

    return (
      <div className="archipelago-connection-window">
        <div className="archipelago-top-row">
          <div className="archipelago-title">Archipelago Connection</div>
          <div
            className="close-button"
            onClick={toggleArchipelagoConnection}
            onKeyDown={KeyDownWrapper.onSpaceKey(toggleArchipelagoConnection)}
            role="button"
            tabIndex="0"
          >
            X Close
          </div>
        </div>

        {this.renderConnectionStatus()}

        <div className="archipelago-form">
          <div className="archipelago-row">
            <label className="archipelago-label" htmlFor="server-input">
              Server:
            </label>
            <input
              id="server-input"
              className="archipelago-input"
              type="text"
              value={serverUrl}
              onChange={this.handleServerChange}
              onKeyDown={this.handleKeyDown}
              placeholder="multiworld.gg"
              disabled={isConnected || isConnecting}
            />
          </div>

          <div className="archipelago-row">
            <label className="archipelago-label" htmlFor="slot-input">
              Slot Name:
            </label>
            <input
              id="slot-input"
              className="archipelago-input"
              type="text"
              value={slotName}
              onChange={this.handleSlotChange}
              onKeyDown={this.handleKeyDown}
              placeholder="Your slot name"
              disabled={isConnected || isConnecting}
            />
          </div>

          <div className="archipelago-row">
            <label className="archipelago-label" htmlFor="password-input">
              Password:
            </label>
            <input
              id="password-input"
              className="archipelago-input"
              type="password"
              value={password}
              onChange={this.handlePasswordChange}
              onKeyDown={this.handleKeyDown}
              placeholder="(optional)"
              disabled={isConnected || isConnecting}
            />
          </div>

          <div className="archipelago-button-row">
            {!isConnected ? (
              <button
                type="button"
                className="archipelago-button"
                onClick={this.handleConnect}
                disabled={!canConnect}
              >
                {isConnecting ? 'Connecting...' : 'Connect'}
              </button>
            ) : (
              <button
                type="button"
                className="archipelago-button disconnect-button"
                onClick={this.handleDisconnect}
              >
                Disconnect
              </button>
            )}
          </div>
        </div>

        <div className="archipelago-info">
          <p>
            Connect to an Archipelago multiworld server to enable autotracking.
          </p>
          <p>
            Items and locations will be automatically updated as you play.
          </p>
        </div>
      </div>
    );
  }
}

ArchipelagoConnectionWindow.defaultProps = {
  connectionError: null,
};

ArchipelagoConnectionWindow.propTypes = {
  connectionError: PropTypes.string,
  connectionState: PropTypes.string.isRequired,
  onConnect: PropTypes.func.isRequired,
  onDisconnect: PropTypes.func.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
  onServerUrlChange: PropTypes.func.isRequired,
  onSlotNameChange: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  serverUrl: PropTypes.string.isRequired,
  slotName: PropTypes.string.isRequired,
  toggleArchipelagoConnection: PropTypes.func.isRequired,
};

export default ArchipelagoConnectionWindow;

