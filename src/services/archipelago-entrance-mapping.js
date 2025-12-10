/**
 * Archipelago Entrance Mapping for The Wind Waker
 *
 * Maps game stage names to exit/internal names used by tww-rando-tracker.
 * Also maps AP entrance names (entranceMacroName) to tracker entrance names (internalName).
 *
 * Based on ww-poptracker's archipelago.lua STAGE_NAME_TO_EXIT_NAME mapping.
 *
 * Stage names from: https://github.com/LagoLunatic/wwrando/blob/master/data/stage_names.txt
 */

// Maps game stage names to exit names (internalName in entrance JSON files)
// These are the stages that can be mapped to randomized exits
const STAGE_NAME_TO_EXIT_NAME = {
  // Dungeons (main areas)
  M_NewD2: 'Dragon Roost Cavern',
  kindan: 'Forbidden Woods',
  Siren: 'Tower of the Gods',
  M_Dai: 'Earth Temple',
  kaze: 'Wind Temple',

  // Miniboss arenas
  M_Dra09: 'Dragon Roost Cavern', // DRC Moblin miniboss - shares dungeon name
  kinMB: 'Forbidden Woods Miniboss Arena',
  SirenMB: 'Tower of the Gods Miniboss Arena',
  M_DaiMB: 'Earth Temple Miniboss Arena',
  kazeMB: 'Wind Temple Miniboss Arena',
  kenroom: 'Master Sword Chamber',

  // Boss arenas
  M_DragB: 'Gohma Boss Arena',
  kinBOSS: 'Kalle Demos Boss Arena',
  SirenB: 'Gohdan Boss Arena',
  M2tower: 'Helmaroc King Boss Arena',
  M_DaiB: 'Jalhalla Boss Arena',
  kazeB: 'Molgera Boss Arena',

  // Secret caves
  Cave09: 'Savage Labyrinth',
  Cave10: 'Savage Labyrinth',
  Cave11: 'Savage Labyrinth',
  TF_06: 'Dragon Roost Island Secret Cave',
  MiniKaz: 'Fire Mountain Secret Cave',
  MiniHyo: 'Ice Ring Isle Secret Cave',
  TF_04: 'Cabana Labyrinth',
  SubD42: 'Needle Rock Isle Secret Cave',
  SubD43: 'Angular Isles Secret Cave',
  SubD71: 'Boating Course Secret Cave',
  TF_01: 'Stone Watcher Island Secret Cave',
  TF_02: 'Overlook Island Secret Cave',
  TF_03: "Bird's Peak Rock Secret Cave",
  TyuTyu: 'Pawprint Isle Chuchu Cave',
  Cave07: 'Pawprint Isle Wizzrobe Cave',
  WarpD: 'Diamond Steppe Island Warp Maze Cave',
  Cave01: 'Bomb Island Secret Cave',
  Cave04: 'Rock Spire Isle Secret Cave',
  ITest63: 'Shark Island Secret Cave',
  Cave03: 'Cliff Plateau Isles Secret Cave',
  Cave05: 'Horseshoe Island Secret Cave',
  Cave02: 'Star Island Secret Cave',

  // Inner cave entrances
  ITest62: 'Ice Ring Isle Inner Cave',
  CliPlaH: 'Cliff Plateau Isles Inner Cave', // Dummy stage name sent by AP client

  // Fairy fountains
  Fairy01: 'Northern Fairy Fountain',
  Fairy02: 'Eastern Fairy Fountain',
  Fairy03: 'Western Fairy Fountain',
  Fairy04: 'Outset Fairy Fountain',
  Fairy05: 'Thorned Fairy Fountain',
  Fairy06: 'Southern Fairy Fountain',
};

// Maps AP entrance names (entranceMacroName from slot_data.entrances)
// to tracker entrance names (internalName used by TrackerState)
// AP format: "Dungeon Entrance on Dragon Roost Island" -> tracker format: "Dragon Roost Cavern"
const AP_ENTRANCE_TO_TRACKER_ENTRANCE = {
  // Dungeon entrances
  'Dungeon Entrance on Dragon Roost Island': 'Dragon Roost Cavern',
  'Dungeon Entrance in Forest Haven Sector': 'Forbidden Woods',
  'Dungeon Entrance in Tower of the Gods Sector': 'Tower of the Gods',
  'Dungeon Entrance on Headstone Island': 'Earth Temple',
  'Dungeon Entrance on Gale Isle': 'Wind Temple',

  // Miniboss entrances
  'Miniboss Entrance in Forbidden Woods': 'Forbidden Woods Miniboss Arena',
  'Miniboss Entrance in Tower of the Gods': 'Tower of the Gods Miniboss Arena',
  'Miniboss Entrance in Earth Temple': 'Earth Temple Miniboss Arena',
  'Miniboss Entrance in Wind Temple': 'Wind Temple Miniboss Arena',
  'Miniboss Entrance in Hyrule Castle': 'Master Sword Chamber',

  // Boss entrances
  'Boss Entrance in Dragon Roost Cavern': 'Gohma Boss Arena',
  'Boss Entrance in Forbidden Woods': 'Kalle Demos Boss Arena',
  'Boss Entrance in Tower of the Gods': 'Gohdan Boss Arena',
  'Boss Entrance in Forsaken Fortress': 'Helmaroc King Boss Arena',
  'Boss Entrance in Earth Temple': 'Jalhalla Boss Arena',
  'Boss Entrance in Wind Temple': 'Molgera Boss Arena',

  // Secret cave entrances
  'Secret Cave Entrance on Outset Island': 'Savage Labyrinth',
  'Secret Cave Entrance on Dragon Roost Island': 'Dragon Roost Island Secret Cave',
  'Secret Cave Entrance on Fire Mountain': 'Fire Mountain Secret Cave',
  'Secret Cave Entrance on Ice Ring Isle': 'Ice Ring Isle Secret Cave',
  'Secret Cave Entrance on Private Oasis': 'Cabana Labyrinth',
  'Secret Cave Entrance on Needle Rock Isle': 'Needle Rock Isle Secret Cave',
  'Secret Cave Entrance on Angular Isles': 'Angular Isles Secret Cave',
  'Secret Cave Entrance on Boating Course': 'Boating Course Secret Cave',
  'Secret Cave Entrance on Stone Watcher Island': 'Stone Watcher Island Secret Cave',
  'Secret Cave Entrance on Overlook Island': 'Overlook Island Secret Cave',
  "Secret Cave Entrance on Bird's Peak Rock": "Bird's Peak Rock Secret Cave",
  'Secret Cave Entrance on Pawprint Isle': 'Pawprint Isle Chuchu Cave',
  'Secret Cave Entrance on Pawprint Isle Side Isle': 'Pawprint Isle Wizzrobe Cave',
  'Secret Cave Entrance on Diamond Steppe Island': 'Diamond Steppe Island Warp Maze Cave',
  'Secret Cave Entrance on Bomb Island': 'Bomb Island Secret Cave',
  'Secret Cave Entrance on Rock Spire Isle': 'Rock Spire Isle Secret Cave',
  'Secret Cave Entrance on Shark Island': 'Shark Island Secret Cave',
  'Secret Cave Entrance on Cliff Plateau Isles': 'Cliff Plateau Isles Secret Cave',
  'Secret Cave Entrance on Horseshoe Island': 'Horseshoe Island Secret Cave',
  'Secret Cave Entrance on Star Island': 'Star Island Secret Cave',

  // Inner cave entrances
  'Inner Entrance in Ice Ring Isle Secret Cave': 'Ice Ring Isle Inner Cave',
  'Inner Entrance in Cliff Plateau Isles Secret Cave': 'Cliff Plateau Isles Inner Cave',

  // Fairy fountain entrances
  'Fairy Fountain Entrance on Outset Island': 'Outset Fairy Fountain',
  'Fairy Fountain Entrance on Thorned Fairy Island': 'Thorned Fairy Fountain',
  'Fairy Fountain Entrance on Eastern Fairy Island': 'Eastern Fairy Fountain',
  'Fairy Fountain Entrance on Western Fairy Island': 'Western Fairy Fountain',
  'Fairy Fountain Entrance on Southern Fairy Island': 'Southern Fairy Fountain',
  'Fairy Fountain Entrance on Northern Fairy Island': 'Northern Fairy Fountain',
};

// Get exit name from stage name
export function getExitNameFromStageName(stageName) {
  return STAGE_NAME_TO_EXIT_NAME[stageName] || null;
}

// Check if a stage name is mapped
export function isKnownStageName(stageName) {
  return stageName in STAGE_NAME_TO_EXIT_NAME;
}

// Convert AP entrance name to tracker entrance name
export function getTrackerEntranceName(apEntranceName) {
  return AP_ENTRANCE_TO_TRACKER_ENTRANCE[apEntranceName] || null;
}

// Export the full mappings for reference
export { STAGE_NAME_TO_EXIT_NAME, AP_ENTRANCE_TO_TRACKER_ENTRANCE };

export default {
  getExitNameFromStageName,
  isKnownStageName,
  getTrackerEntranceName,
  STAGE_NAME_TO_EXIT_NAME,
  AP_ENTRANCE_TO_TRACKER_ENTRANCE,
};

