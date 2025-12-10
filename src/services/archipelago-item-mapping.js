/**
 * Archipelago Item ID to Tracker Item Name Mapping
 *
 * Maps Archipelago item IDs (from the Wind Waker AP world) to the
 * item names used in the tww-rando-tracker.
 *
 * IDs sourced from the Wind Waker Archipelago world.
 */

// AP Item IDs for The Wind Waker
// Base ID for TWW items is 0x237000
const ITEM_MAPPING = {
  // Main items
  0x237000: 'Telescope',
  0x237002: 'Wind Waker',
  0x237003: 'Grappling Hook',
  0x237004: 'Spoils Bag',
  0x237005: 'Boomerang',
  0x237006: 'Deku Leaf',
  0x237007: 'Tingle Tuner',
  0x237008: 'Iron Boots',
  0x237009: 'Magic Armor',
  0x23700a: 'Bait Bag',
  0x23700b: 'Bombs',
  0x23700c: 'Delivery Bag',
  0x23700d: 'Hookshot',
  0x23700e: 'Skull Hammer',
  0x23700f: 'Power Bracelets',

  // Other items
  0x237010: "Hero's Charm",
  0x237011: 'Hurricane Spin',

  // Tingle Statues
  0x237012: 'Tingle Statue',
  0x237013: 'Tingle Statue',
  0x237014: 'Tingle Statue',
  0x237015: 'Tingle Statue',
  0x237016: 'Tingle Statue',

  // Songs
  0x237017: "Wind's Requiem",
  0x237018: 'Ballad of Gales',
  0x237019: 'Command Melody',
  0x23701a: "Earth God's Lyric",
  0x23701b: "Wind God's Aria",
  0x23701c: 'Song of Passing',

  // Triforce Shards
  0x23701d: 'Triforce Shard',
  0x23701e: 'Triforce Shard',
  0x23701f: 'Triforce Shard',
  0x237020: 'Triforce Shard',
  0x237021: 'Triforce Shard',
  0x237022: 'Triforce Shard',
  0x237023: 'Triforce Shard',
  0x237024: 'Triforce Shard',

  // Spoils (not tracked, but included for reference)
  // 0x237025: 'Golden Necklace',
  // 0x237026: 'Skull Necklace',
  // 0x237027: 'Golden Feather',

  // Trade items
  0x23702e: 'Note to Mom',
  0x23702f: "Maggie's Letter",
  0x237030: "Moblin's Letter",
  0x237031: 'Cabana Deed',
  // 0x237032: 'Fill-Up Coupon', // Not tracked

  // Pearls (correct IDs)
  0x237033: "Nayru's Pearl",
  0x237034: "Din's Pearl",
  0x237035: "Farore's Pearl",

  // Progressive items
  0x237036: 'Progressive Sword',
  0x237037: 'Progressive Shield',
  0x237038: 'Progressive Picto Box',
  0x237039: 'Progressive Bow',
  0x23703a: 'Progressive Magic Meter',
  0x23703b: 'Progressive Quiver',
  0x23703c: 'Progressive Bomb Bag',
  0x23703d: 'Progressive Wallet',
  0x23703e: 'Empty Bottle',

  // Individual Triforce Charts (for tracker mapping)
  0x23703f: 'Triforce Chart 1',
  0x237040: 'Triforce Chart 2',
  0x237041: 'Triforce Chart 3',
  0x237042: 'Triforce Chart 4',
  0x237043: 'Triforce Chart 5',
  0x237044: 'Triforce Chart 6',
  0x237045: 'Triforce Chart 7',
  0x237046: 'Triforce Chart 8',

  // Treasure Charts
  0x237047: 'Treasure Chart 1',
  0x237048: 'Treasure Chart 2',
  0x237049: 'Treasure Chart 3',
  0x23704a: 'Treasure Chart 4',
  0x23704b: 'Treasure Chart 5',
  0x23704c: 'Treasure Chart 6',
  0x23704d: 'Treasure Chart 7',
  0x23704e: 'Treasure Chart 8',
  0x23704f: 'Treasure Chart 9',
  0x237050: 'Treasure Chart 10',
  0x237051: 'Treasure Chart 11',
  0x237052: 'Treasure Chart 12',
  0x237053: 'Treasure Chart 13',
  0x237054: 'Treasure Chart 14',
  0x237055: 'Treasure Chart 15',
  0x237056: 'Treasure Chart 16',
  0x237057: 'Treasure Chart 17',
  0x237058: 'Treasure Chart 18',
  0x237059: 'Treasure Chart 19',
  0x23705a: 'Treasure Chart 20',
  0x23705b: 'Treasure Chart 21',
  0x23705c: 'Treasure Chart 22',
  0x23705d: 'Treasure Chart 23',
  0x23705e: 'Treasure Chart 24',
  0x23705f: 'Treasure Chart 25',
  0x237060: 'Treasure Chart 26',
  0x237061: 'Treasure Chart 27',
  0x237062: 'Treasure Chart 28',
  0x237063: 'Treasure Chart 29',
  0x237064: 'Treasure Chart 30',
  0x237065: 'Treasure Chart 31',
  0x237066: 'Treasure Chart 32',
  0x237067: 'Treasure Chart 33',
  0x237068: 'Treasure Chart 34',
  0x237069: 'Treasure Chart 35',
  0x23706a: 'Treasure Chart 36',
  0x23706b: 'Treasure Chart 37',
  0x23706c: 'Treasure Chart 38',
  0x23706d: 'Treasure Chart 39',
  0x23706e: 'Treasure Chart 40',
  0x23706f: 'Treasure Chart 41',

  // Special charts
  0x237070: "Tingle's Chart",
  0x237071: 'Ghost Ship Chart',
  0x237072: 'Octo Chart',
  0x237073: 'Great Fairy Chart',
  0x237074: 'Secret Cave Chart',
  0x237075: 'Light Ring Chart',
  0x237076: 'Platform Chart',
  0x237077: "Beedle's Chart",
  0x237078: 'Submarine Chart',

  // Dungeon items - Dragon Roost Cavern
  0x237083: 'DRC Big Key',
  0x237084: 'DRC Small Key',
  0x23708e: 'DRC Dungeon Map',
  0x23708f: 'DRC Compass',

  // Dungeon items - Forbidden Woods
  0x237085: 'FW Big Key',
  0x237086: 'FW Small Key',
  0x237090: 'FW Dungeon Map',
  0x237091: 'FW Compass',

  // Dungeon items - Tower of the Gods
  0x237087: 'TotG Big Key',
  0x237088: 'TotG Small Key',
  0x237092: 'TotG Dungeon Map',
  0x237093: 'TotG Compass',

  // Dungeon items - Forsaken Fortress
  0x237094: 'FF Dungeon Map',
  0x237095: 'FF Compass',

  // Dungeon items - Earth Temple
  0x23708a: 'ET Big Key',
  0x23708b: 'ET Small Key',
  0x237096: 'ET Dungeon Map',
  0x237097: 'ET Compass',

  // Dungeon items - Wind Temple
  0x23708c: 'WT Big Key',
  0x23708d: 'WT Small Key',
  0x237098: 'WT Dungeon Map',
  0x237099: 'WT Compass',

  // Sail
  0x23709a: "Boat's Sail",
  // Swift Sail (if separate)
  0x23709b: "Boat's Sail",
};

/**
 * Get the tracker item name for an Archipelago item ID
 * @param {number} itemId - The Archipelago item ID
 * @returns {string|null} The tracker item name, or null if not found
 */
export function getTrackerItemName(itemId) {
  return ITEM_MAPPING[itemId] || null;
}

/**
 * Check if an item ID is a progressive item
 * @param {number} itemId - The Archipelago item ID
 * @returns {boolean} True if the item is progressive
 */
export function isProgressiveItem(itemId) {
  const progressiveIds = [
    0x237036, // Progressive Sword
    0x237037, // Progressive Shield
    0x237038, // Progressive Picto Box
    0x237039, // Progressive Bow
    0x23703a, // Progressive Magic Meter
    0x23703b, // Progressive Quiver
    0x23703c, // Progressive Bomb Bag
    0x23703d, // Progressive Wallet
    0x23703e, // Empty Bottle
    0x23701d, 0x23701e, 0x23701f, 0x237020, // Triforce Shards
    0x237021, 0x237022, 0x237023, 0x237024,
    0x237012, 0x237013, 0x237014, 0x237015, 0x237016, // Tingle Statues
  ];
  return progressiveIds.includes(itemId);
}

/**
 * Get all mapped item IDs
 * @returns {number[]} Array of all mapped item IDs
 */
export function getAllItemIds() {
  return Object.keys(ITEM_MAPPING).map(Number);
}

export default ITEM_MAPPING;

