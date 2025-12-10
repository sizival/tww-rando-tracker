# TWW Randomizer Tracker

[![Build Status](https://github.com/wooferzfg/tww-rando-tracker/workflows/CI/badge.svg)](https://github.com/wooferzfg/tww-rando-tracker/actions)

This is a tracker for [The Wind Waker Randomizer](https://github.com/LagoLunatic/wwrando). It's available at [wooferzfg.me/tww-rando-tracker](https://www.wooferzfg.me/tww-rando-tracker/).

## Build Instructions

Building and running the tracker locally requires you to install [Node 20](https://nodejs.org/en/download/) and [Git](https://git-scm.com/downloads).

Clone the repository by running the following in a command prompt:
```bash
git clone https://github.com/wooferzfg/tww-rando-tracker.git
```

Navigate to the `tww-rando-tracker` folder and install dependencies:
```bash
cd tww-rando-tracker && npm install
```
You can then build and serve the tracker application:
```bash
npm start
```
After the server starts, you can go to [localhost:8080](http://localhost:8080/) to open the tracker.

## Documentation

Code documentation is available at [wooferzfg.me/tww-rando-tracker/docs](https://www.wooferzfg.me/tww-rando-tracker/docs).

## Archipelago Auto-Connect

You can create a URL that automatically connects the tracker to an Archipelago server by adding query parameters to the tracker URL.

**URL Format:**
```
/#/tracker/new/:permalink?ap_host=HOST&ap_port=PORT&ap_slot=SLOTNAME
```

**Parameters:**
| Parameter | Required | Description |
|-----------|----------|-------------|
| `ap_host` | Yes | The Archipelago server hostname (e.g., `multiworld.gg`) |
| `ap_port` | Yes | The server port number (e.g., `38281`) |
| `ap_slot` | Yes | Your slot/player name |

**Example:**
```
/#/tracker/new/eJwLtlAI...?ap_host=multiworld.gg&ap_port=38281&ap_slot=Player1
```

All three parameters are required for auto-connect to trigger. If any parameter is missing, the tracker will load normally without auto-connecting.