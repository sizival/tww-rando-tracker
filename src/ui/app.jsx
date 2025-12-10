import PropTypes from 'prop-types';
import React from 'react';
import {
  HashRouter,
  Route,
  Routes,
  useParams,
  useSearchParams,
} from 'react-router-dom';

import Launcher from './launcher';
import Tracker from './tracker';

import '../css/main.scss';

function RenderTracker({ loadProgress }) {
  const { permalink } = useParams();
  const [searchParams] = useSearchParams();

  // Extract Archipelago auto-connect parameters from URL
  const apHost = searchParams.get('ap_host');
  const apPort = searchParams.get('ap_port');
  const apSlot = searchParams.get('ap_slot');

  // Build the full server URL if host and port are provided
  const apServerUrl = (apHost && apPort) ? `${apHost}:${apPort}` : null;

  return (
    <Tracker
      permalink={permalink}
      loadProgress={loadProgress}
      apAutoConnect={!!apServerUrl && !!apSlot}
      apServerUrl={apServerUrl}
      apSlotName={apSlot}
    />
  );
}

RenderTracker.propTypes = {
  loadProgress: PropTypes.bool.isRequired,
};

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route
          exact
          path="/"
          element={<Launcher />}
        />
        <Route
          exact
          path="/tracker/new/:permalink"
          element={<RenderTracker loadProgress={false} />}
        />
        <Route
          exact
          path="/tracker/load/:permalink"
          element={<RenderTracker loadProgress />}
        />
      </Routes>
    </HashRouter>
  );
}
