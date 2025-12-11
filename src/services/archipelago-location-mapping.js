/**
 * Archipelago Location ID to Tracker Location Mapping
 *
 * Maps Archipelago location IDs (from the Wind Waker AP world) to the
 * location format used in the tww-rando-tracker (generalLocation, detailedLocation).
 *
 * IDs sourced from ww-poptracker location_mapping.lua
 * Names matched to tww-rando-tracker's test-item-locations.json
 */

// AP Location IDs for The Wind Waker
// Base ID for TWW locations is 0x238000
const LOCATION_MAPPING = {
  // Outset Island
  0x238000: { generalLocation: 'Outset Island', detailedLocation: "Underneath Link's House" },
  0x238001: { generalLocation: 'Outset Island', detailedLocation: "Mesa the Grasscutter's House" },
  0x238002: { generalLocation: 'Outset Island', detailedLocation: "Orca - Give 10 Knight's Crests" },
  0x238004: { generalLocation: 'Outset Island', detailedLocation: 'Great Fairy' },
  0x238005: { generalLocation: 'Outset Island', detailedLocation: "Jabun's Cave" },
  0x238006: { generalLocation: 'Outset Island', detailedLocation: 'Dig up Black Soil' },
  0x238007: { generalLocation: 'Outset Island', detailedLocation: 'Savage Labyrinth - Floor 30' },
  0x238008: { generalLocation: 'Outset Island', detailedLocation: 'Savage Labyrinth - Floor 50' },

  // Windfall Island
  0x238009: { generalLocation: 'Windfall Island', detailedLocation: 'Jail - Tingle - First Gift' },
  0x23800a: { generalLocation: 'Windfall Island', detailedLocation: 'Jail - Tingle - Second Gift' },
  0x23800b: { generalLocation: 'Windfall Island', detailedLocation: 'Jail - Maze Chest' },
  0x23800c: { generalLocation: 'Windfall Island', detailedLocation: 'Chu Jelly Juice Shop - Give 15 Green Chu Jelly' },
  0x23800d: { generalLocation: 'Windfall Island', detailedLocation: 'Chu Jelly Juice Shop - Give 15 Blue Chu Jelly' },
  0x23800e: { generalLocation: 'Windfall Island', detailedLocation: 'Ivan - Catch Killer Bees' },
  0x23800f: { generalLocation: 'Windfall Island', detailedLocation: 'Mrs. Marie - Catch Killer Bees' },
  0x238010: { generalLocation: 'Windfall Island', detailedLocation: 'Mrs. Marie - Give 1 Joy Pendant' },
  0x238011: { generalLocation: 'Windfall Island', detailedLocation: 'Mrs. Marie - Give 21 Joy Pendants' },
  0x238012: { generalLocation: 'Windfall Island', detailedLocation: 'Mrs. Marie - Give 40 Joy Pendants' },
  0x238013: { generalLocation: 'Windfall Island', detailedLocation: "Lenzo's House - Left Chest" },
  0x238014: { generalLocation: 'Windfall Island', detailedLocation: "Lenzo's House - Right Chest" },
  0x238015: { generalLocation: 'Windfall Island', detailedLocation: "Lenzo's House - Become Lenzo's Assistant" },
  0x238016: { generalLocation: 'Windfall Island', detailedLocation: "Lenzo's House - Bring Forest Firefly" },
  0x238017: { generalLocation: 'Windfall Island', detailedLocation: 'House of Wealth Chest' },
  0x238018: { generalLocation: 'Windfall Island', detailedLocation: "Maggie's Father - Give 20 Skull Necklaces" },
  0x238019: { generalLocation: 'Windfall Island', detailedLocation: 'Maggie - Free Item' },
  0x23801a: { generalLocation: 'Windfall Island', detailedLocation: 'Maggie - Delivery Reward' },
  0x23801b: { generalLocation: 'Windfall Island', detailedLocation: 'Cafe Bar - Postman' },
  0x23801c: { generalLocation: 'Windfall Island', detailedLocation: 'Kreeb - Light Up Lighthouse' },
  0x23801d: { generalLocation: 'Windfall Island', detailedLocation: 'Transparent Chest' },
  0x23801e: { generalLocation: 'Windfall Island', detailedLocation: 'Tott - Teach Rhythm' },
  0x23801f: { generalLocation: 'Windfall Island', detailedLocation: 'Pirate Ship' },
  0x238020: { generalLocation: 'Windfall Island', detailedLocation: '5 Rupee Auction' },
  0x238021: { generalLocation: 'Windfall Island', detailedLocation: '40 Rupee Auction' },
  0x238022: { generalLocation: 'Windfall Island', detailedLocation: '60 Rupee Auction' },
  0x238023: { generalLocation: 'Windfall Island', detailedLocation: '80 Rupee Auction' },
  0x238024: { generalLocation: 'Windfall Island', detailedLocation: "Zunari - Stock Exotic Flower in Zunari's Shop" },
  0x238025: { generalLocation: 'Windfall Island', detailedLocation: 'Sam - Decorate the Town' },
  0x23802a: { generalLocation: 'Windfall Island', detailedLocation: 'Mila - Follow the Thief' },
  0x23802b: { generalLocation: 'Windfall Island', detailedLocation: 'Battlesquid - First Prize' },
  0x23802c: { generalLocation: 'Windfall Island', detailedLocation: 'Battlesquid - Second Prize' },
  0x23802d: { generalLocation: 'Windfall Island', detailedLocation: 'Battlesquid - Under 20 Shots Prize' },
  0x23802e: { generalLocation: 'Windfall Island', detailedLocation: 'Pompie and Vera - Secret Meeting Photo' },
  0x23802f: { generalLocation: 'Windfall Island', detailedLocation: 'Kamo - Full Moon Photo' },
  0x238030: { generalLocation: 'Windfall Island', detailedLocation: 'Minenco - Miss Windfall Photo' },
  0x238031: { generalLocation: 'Windfall Island', detailedLocation: 'Linda and Anton' },

  // Dragon Roost Island
  0x238032: { generalLocation: 'Dragon Roost Island', detailedLocation: 'Wind Shrine' },
  0x238033: { generalLocation: 'Dragon Roost Island', detailedLocation: 'Rito Aerie - Give Hoskit 20 Golden Feathers' },
  0x238034: { generalLocation: 'Dragon Roost Island', detailedLocation: 'Chest on Top of Boulder' },
  0x238035: { generalLocation: 'Dragon Roost Island', detailedLocation: 'Fly Across Platforms Around Island' },
  0x238036: { generalLocation: 'Dragon Roost Island', detailedLocation: 'Rito Aerie - Mail Sorting' },
  0x238037: { generalLocation: 'Dragon Roost Island', detailedLocation: 'Secret Cave' },

  // Dragon Roost Cavern (Dungeon)
  0x238038: { generalLocation: 'Dragon Roost Cavern', detailedLocation: 'First Room' },
  0x238039: { generalLocation: 'Dragon Roost Cavern', detailedLocation: 'Alcove With Water Jugs' },
  0x23803a: { generalLocation: 'Dragon Roost Cavern', detailedLocation: 'Water Jug on Upper Shelf' },
  0x23803b: { generalLocation: 'Dragon Roost Cavern', detailedLocation: 'Boarded Up Chest' },
  0x23803c: { generalLocation: 'Dragon Roost Cavern', detailedLocation: 'Chest Across Lava Pit' },
  0x23803d: { generalLocation: 'Dragon Roost Cavern', detailedLocation: 'Rat Room' },
  0x23803e: { generalLocation: 'Dragon Roost Cavern', detailedLocation: 'Rat Room Boarded Up Chest' },
  0x23803f: { generalLocation: 'Dragon Roost Cavern', detailedLocation: "Bird's Nest" },
  0x238040: { generalLocation: 'Dragon Roost Cavern', detailedLocation: 'Dark Room' },
  0x238041: { generalLocation: 'Dragon Roost Cavern', detailedLocation: 'Tingle Chest in Hub Room' },
  0x238042: { generalLocation: 'Dragon Roost Cavern', detailedLocation: 'Pot on Upper Shelf in Pot Room' },
  0x238043: { generalLocation: 'Dragon Roost Cavern', detailedLocation: 'Pot Room Chest' },
  0x238044: { generalLocation: 'Dragon Roost Cavern', detailedLocation: 'Miniboss' },
  0x238045: { generalLocation: 'Dragon Roost Cavern', detailedLocation: 'Under Rope Bridge' },
  0x238046: { generalLocation: 'Dragon Roost Cavern', detailedLocation: 'Tingle Statue Chest' },
  0x238047: { generalLocation: 'Dragon Roost Cavern', detailedLocation: 'Big Key Chest' },
  0x238048: { generalLocation: 'Dragon Roost Cavern', detailedLocation: 'Boss Stairs Right Chest' },
  0x238049: { generalLocation: 'Dragon Roost Cavern', detailedLocation: 'Boss Stairs Left Chest' },
  0x23804a: { generalLocation: 'Dragon Roost Cavern', detailedLocation: 'Boss Stairs Right Pot' },
  0x23804b: { generalLocation: 'Dragon Roost Cavern', detailedLocation: 'Gohma Heart Container' },

  // Forest Haven
  0x23804c: { generalLocation: 'Forest Haven', detailedLocation: 'On Tree Branch' },
  0x23804d: { generalLocation: 'Forest Haven', detailedLocation: 'Small Island Chest' },

  // Forbidden Woods (Dungeon)
  0x23804e: { generalLocation: 'Forbidden Woods', detailedLocation: 'First Room' },
  0x23804f: { generalLocation: 'Forbidden Woods', detailedLocation: "Inside Hollow Tree's Mouth" },
  0x238050: { generalLocation: 'Forbidden Woods', detailedLocation: 'Climb to Top Using Boko Baba Bulbs' },
  0x238051: { generalLocation: 'Forbidden Woods', detailedLocation: 'Pot High Above Hollow Tree' },
  0x238052: { generalLocation: 'Forbidden Woods', detailedLocation: 'Hole in Tree' },
  0x238053: { generalLocation: 'Forbidden Woods', detailedLocation: 'Morth Pit' },
  0x238054: { generalLocation: 'Forbidden Woods', detailedLocation: 'Vine Maze Left Chest' },
  0x238055: { generalLocation: 'Forbidden Woods', detailedLocation: 'Vine Maze Right Chest' },
  0x238056: { generalLocation: 'Forbidden Woods', detailedLocation: 'Highest Pot in Vine Maze' },
  0x238057: { generalLocation: 'Forbidden Woods', detailedLocation: 'Tall Room Before Miniboss' },
  0x238058: { generalLocation: 'Forbidden Woods', detailedLocation: 'Mothula Miniboss Room' },
  0x238059: { generalLocation: 'Forbidden Woods', detailedLocation: 'Past Seeds Hanging by Vines' },
  0x23805a: { generalLocation: 'Forbidden Woods', detailedLocation: 'Chest Across Red Hanging Flower' },
  0x23805b: { generalLocation: 'Forbidden Woods', detailedLocation: 'Tingle Statue Chest' },
  0x23805c: { generalLocation: 'Forbidden Woods', detailedLocation: 'Chest in Locked Tree Trunk' },
  0x23805d: { generalLocation: 'Forbidden Woods', detailedLocation: 'Big Key Chest' },
  0x23805e: { generalLocation: 'Forbidden Woods', detailedLocation: 'Double Mothula Room' },
  0x23805f: { generalLocation: 'Forbidden Woods', detailedLocation: 'Kalle Demos Heart Container' },

  // Greatfish Isle
  0x238060: { generalLocation: 'Greatfish Isle', detailedLocation: 'Hidden Chest' },

  // Tower of the Gods (Dungeon)
  0x238061: { generalLocation: 'Tower of the Gods', detailedLocation: 'Chest Behind Bombable Walls' },
  0x238062: { generalLocation: 'Tower of the Gods', detailedLocation: 'Pot Behind Bombable Walls' },
  0x238063: { generalLocation: 'Tower of the Gods', detailedLocation: 'Hop Across Floating Boxes' },
  0x238064: { generalLocation: 'Tower of the Gods', detailedLocation: 'Light Two Torches' },
  0x238065: { generalLocation: 'Tower of the Gods', detailedLocation: 'Skulls Room Chest' },
  0x238066: { generalLocation: 'Tower of the Gods', detailedLocation: 'Shoot Eye Above Skulls Room Chest' },
  0x238067: { generalLocation: 'Tower of the Gods', detailedLocation: 'Tingle Statue Chest' },
  0x238068: { generalLocation: 'Tower of the Gods', detailedLocation: 'First Chest Guarded by Armos Knights' },
  0x238069: { generalLocation: 'Tower of the Gods', detailedLocation: 'Stone Tablet' },
  0x23806a: { generalLocation: 'Tower of the Gods', detailedLocation: 'Darknut Miniboss Room' },
  0x23806b: { generalLocation: 'Tower of the Gods', detailedLocation: 'Second Chest Guarded by Armos Knights' },
  0x23806c: { generalLocation: 'Tower of the Gods', detailedLocation: 'Floating Platforms Room' },
  0x23806d: { generalLocation: 'Tower of the Gods', detailedLocation: 'Top of Floating Platforms Room' },
  0x23806e: { generalLocation: 'Tower of the Gods', detailedLocation: 'Eastern Pot in Big Key Chest Room' },
  0x23806f: { generalLocation: 'Tower of the Gods', detailedLocation: 'Big Key Chest' },
  0x238070: { generalLocation: 'Tower of the Gods', detailedLocation: 'Gohdan Heart Container' },

  // Hyrule
  0x238071: { generalLocation: 'Hyrule', detailedLocation: 'Master Sword Chamber' },
  0x2380a4: { generalLocation: "Ganon's Tower", detailedLocation: 'Maze Chest' },

  // Mail
  0x2380a5: { generalLocation: 'Mailbox', detailedLocation: "Letter from Hoskit's Girlfriend" },
  0x2380a6: { generalLocation: 'Mailbox', detailedLocation: "Letter from Baito's Mother" },
  0x2380a7: { generalLocation: 'Mailbox', detailedLocation: 'Letter from Baito' },
  0x2380a8: { generalLocation: 'Mailbox', detailedLocation: "Letter from Komali's Father" },
  0x2380a9: { generalLocation: 'Mailbox', detailedLocation: "Letter Advertising Bombs in Beedle's Shop" },
  0x2380aa: { generalLocation: 'Mailbox', detailedLocation: 'Letter Advertising Rock Spire Shop Ship' },
  0x2380ad: { generalLocation: 'Mailbox', detailedLocation: 'Letter from Orca' },
  0x2380ae: { generalLocation: 'Mailbox', detailedLocation: 'Letter from Grandma' },
  0x2380af: { generalLocation: 'Mailbox', detailedLocation: 'Letter from Aryll' },
  0x2380b0: { generalLocation: 'Mailbox', detailedLocation: 'Letter from Tingle' },

  // Forsaken Fortress (Dungeon)
  0x238072: { generalLocation: 'Forsaken Fortress', detailedLocation: 'Phantom Ganon' },
  0x238073: { generalLocation: 'Forsaken Fortress', detailedLocation: 'Chest Outside Upper Jail Cell' },
  0x238074: { generalLocation: 'Forsaken Fortress', detailedLocation: 'Chest Inside Lower Jail Cell' },
  0x238075: { generalLocation: 'Forsaken Fortress', detailedLocation: 'Chest Guarded by Bokoblin' },
  0x238076: { generalLocation: 'Forsaken Fortress', detailedLocation: 'Chest on Bed' },
  0x238077: { generalLocation: 'Forsaken Fortress', detailedLocation: 'Helmaroc King Heart Container' },

  // Mother and Child Isles
  0x238078: { generalLocation: 'Mother and Child Isles', detailedLocation: 'Inside Mother Isle' },

  // Fire Mountain
  0x238079: { generalLocation: 'Fire Mountain', detailedLocation: 'Cave - Chest' },
  0x23807a: { generalLocation: 'Fire Mountain', detailedLocation: 'Lookout Platform Chest' },
  0x23807b: { generalLocation: 'Fire Mountain', detailedLocation: 'Lookout Platform - Destroy the Cannons' },
  0x23807c: { generalLocation: 'Fire Mountain', detailedLocation: 'Big Octo' },

  // Ice Ring Isle
  0x23807d: { generalLocation: 'Ice Ring Isle', detailedLocation: 'Frozen Chest' },
  0x23807e: { generalLocation: 'Ice Ring Isle', detailedLocation: 'Cave - Chest' },
  0x23807f: { generalLocation: 'Ice Ring Isle', detailedLocation: 'Inner Cave - Chest' },

  // Headstone Island
  0x238080: { generalLocation: 'Headstone Island', detailedLocation: 'Top of the Island' },
  0x238081: { generalLocation: 'Headstone Island', detailedLocation: 'Submarine' },

  // Earth Temple (Dungeon)
  0x238082: { generalLocation: 'Earth Temple', detailedLocation: 'Transparent Chest In Warp Pot Room' },
  0x238083: { generalLocation: 'Earth Temple', detailedLocation: 'Behind Curtain In Warp Pot Room' },
  0x238084: { generalLocation: 'Earth Temple', detailedLocation: 'Transparent Chest in First Crypt' },
  0x238085: { generalLocation: 'Earth Temple', detailedLocation: 'Chest Behind Destructible Walls' },
  0x238086: { generalLocation: 'Earth Temple', detailedLocation: 'Chest In Three Blocks Room' },
  0x238087: { generalLocation: 'Earth Temple', detailedLocation: 'Chest Behind Statues' },
  0x238088: { generalLocation: 'Earth Temple', detailedLocation: 'Casket in Second Crypt' },
  0x238089: { generalLocation: 'Earth Temple', detailedLocation: 'Stalfos Miniboss Room' },
  0x23808a: { generalLocation: 'Earth Temple', detailedLocation: 'Tingle Statue Chest' },
  0x23808b: { generalLocation: 'Earth Temple', detailedLocation: 'End of Foggy Room With Floormasters' },
  0x23808c: { generalLocation: 'Earth Temple', detailedLocation: 'Kill All Floormasters in Foggy Room' },
  0x23808d: { generalLocation: 'Earth Temple', detailedLocation: 'Behind Curtain Next to Hammer Button' },
  0x23808e: { generalLocation: 'Earth Temple', detailedLocation: 'Chest in Third Crypt' },
  0x23808f: { generalLocation: 'Earth Temple', detailedLocation: 'Many Mirrors Room Right Chest' },
  0x238090: { generalLocation: 'Earth Temple', detailedLocation: 'Many Mirrors Room Left Chest' },
  0x238091: { generalLocation: 'Earth Temple', detailedLocation: 'Stalfos Crypt Room' },
  0x238092: { generalLocation: 'Earth Temple', detailedLocation: 'Big Key Chest' },
  0x238093: { generalLocation: 'Earth Temple', detailedLocation: 'Jalhalla Heart Container' },

  // Wind Temple (Dungeon)
  0x238094: { generalLocation: 'Wind Temple', detailedLocation: 'Chest Between Two Dirt Patches' },
  0x238095: { generalLocation: 'Wind Temple', detailedLocation: 'Behind Stone Head in Hidden Upper Room' },
  0x238096: { generalLocation: 'Wind Temple', detailedLocation: 'Tingle Statue Chest' },
  0x238097: { generalLocation: 'Wind Temple', detailedLocation: 'Chest Behind Stone Head' },
  0x238098: { generalLocation: 'Wind Temple', detailedLocation: 'Chest in Left Alcove' },
  0x238099: { generalLocation: 'Wind Temple', detailedLocation: 'Big Key Chest' },
  0x23809a: { generalLocation: 'Wind Temple', detailedLocation: 'Chest In Many Cyclones Room' },
  0x23809b: { generalLocation: 'Wind Temple', detailedLocation: 'Behind Stone Head in Many Cyclones Room' },
  0x23809c: { generalLocation: 'Wind Temple', detailedLocation: 'Chest In Middle Of Hub Room' },
  0x23809d: { generalLocation: 'Wind Temple', detailedLocation: 'Spike Wall Room - First Chest' },
  0x23809e: { generalLocation: 'Wind Temple', detailedLocation: 'Spike Wall Room - Destroy All Cracked Floors' },
  0x23809f: { generalLocation: 'Wind Temple', detailedLocation: 'Wizzrobe Miniboss Room' },
  0x2380a0: { generalLocation: 'Wind Temple', detailedLocation: 'Chest at Top of Hub Room' },
  0x2380a1: { generalLocation: 'Wind Temple', detailedLocation: 'Chest Behind Seven Armos' },
  0x2380a2: { generalLocation: 'Wind Temple', detailedLocation: 'Kill All Enemies in Tall Basement Room' },
  0x2380a3: { generalLocation: 'Wind Temple', detailedLocation: 'Molgera Heart Container' },

  // Great Sea
  0x2380b1: { generalLocation: 'The Great Sea', detailedLocation: "Beedle's Shop Ship - 20 Rupee Item" },
  0x2380b2: { generalLocation: 'The Great Sea', detailedLocation: 'Salvage Corp Gift' },
  0x2380b3: { generalLocation: 'The Great Sea', detailedLocation: 'Cyclos' },
  0x2380b4: { generalLocation: 'The Great Sea', detailedLocation: 'Goron Trading Reward' },
  0x2380b5: { generalLocation: 'The Great Sea', detailedLocation: 'Withered Trees' },
  0x2380b6: { generalLocation: 'The Great Sea', detailedLocation: 'Ghost Ship' },

  // Private Oasis
  0x2380b7: { generalLocation: 'Private Oasis', detailedLocation: 'Chest at Top of Waterfall' },
  0x2380b8: { generalLocation: 'Private Oasis', detailedLocation: 'Cabana Labyrinth - Lower Floor Chest' },
  0x2380b9: { generalLocation: 'Private Oasis', detailedLocation: 'Cabana Labyrinth - Upper Floor Chest' },
  0x2380ba: { generalLocation: 'Private Oasis', detailedLocation: 'Big Octo' },

  // Spectacle Island
  0x2380bb: { generalLocation: 'Spectacle Island', detailedLocation: 'Barrel Shooting - First Prize' },
  0x2380bc: { generalLocation: 'Spectacle Island', detailedLocation: 'Barrel Shooting - Second Prize' },

  // Needle Rock Isle
  0x2380bd: { generalLocation: 'Needle Rock Isle', detailedLocation: 'Chest' },
  0x2380be: { generalLocation: 'Needle Rock Isle', detailedLocation: 'Cave' },
  0x2380bf: { generalLocation: 'Needle Rock Isle', detailedLocation: 'Golden Gunboat' },

  // Angular Isles
  0x2380c0: { generalLocation: 'Angular Isles', detailedLocation: 'Peak' },
  0x2380c1: { generalLocation: 'Angular Isles', detailedLocation: 'Cave' },

  // Boating Course
  0x2380c2: { generalLocation: 'Boating Course', detailedLocation: 'Raft' },
  0x2380c3: { generalLocation: 'Boating Course', detailedLocation: 'Cave' },

  // Stone Watcher Island
  0x2380c4: { generalLocation: 'Stone Watcher Island', detailedLocation: 'Cave' },
  0x2380c5: { generalLocation: 'Stone Watcher Island', detailedLocation: 'Lookout Platform Chest' },
  0x2380c6: { generalLocation: 'Stone Watcher Island', detailedLocation: 'Lookout Platform - Destroy the Cannons' },

  // Islet of Steel
  0x2380c7: { generalLocation: 'Islet of Steel', detailedLocation: 'Interior' },
  0x2380c8: { generalLocation: 'Islet of Steel', detailedLocation: 'Lookout Platform - Defeat the Enemies' },

  // Overlook Island
  0x2380c9: { generalLocation: 'Overlook Island', detailedLocation: 'Cave' },

  // Bird's Peak Rock
  0x2380ca: { generalLocation: "Bird's Peak Rock", detailedLocation: 'Cave' },

  // Pawprint Isle
  0x2380cb: { generalLocation: 'Pawprint Isle', detailedLocation: 'Chuchu Cave - Chest' },
  0x2380cc: { generalLocation: 'Pawprint Isle', detailedLocation: 'Chuchu Cave - Behind Left Boulder' },
  0x2380cd: { generalLocation: 'Pawprint Isle', detailedLocation: 'Chuchu Cave - Behind Right Boulder' },
  0x2380ce: { generalLocation: 'Pawprint Isle', detailedLocation: 'Chuchu Cave - Scale the Wall' },
  0x2380cf: { generalLocation: 'Pawprint Isle', detailedLocation: 'Wizzrobe Cave' },
  0x2380d0: { generalLocation: 'Pawprint Isle', detailedLocation: 'Lookout Platform - Defeat the Enemies' },

  // Thorned Fairy Island
  0x2380d1: { generalLocation: 'Thorned Fairy Island', detailedLocation: 'Great Fairy' },
  0x2380d2: { generalLocation: 'Thorned Fairy Island', detailedLocation: 'Northeastern Lookout Platform - Destroy the Cannons' },
  0x2380d3: { generalLocation: 'Thorned Fairy Island', detailedLocation: 'Southwestern Lookout Platform - Defeat the Enemies' },

  // Eastern Fairy Island
  0x2380d4: { generalLocation: 'Eastern Fairy Island', detailedLocation: 'Great Fairy' },
  0x2380d5: { generalLocation: 'Eastern Fairy Island', detailedLocation: 'Lookout Platform - Defeat the Cannons and Enemies' },

  // Western Fairy Island
  0x2380d6: { generalLocation: 'Western Fairy Island', detailedLocation: 'Great Fairy' },
  0x2380d7: { generalLocation: 'Western Fairy Island', detailedLocation: 'Lookout Platform' },

  // Southern Fairy Island
  0x2380d8: { generalLocation: 'Southern Fairy Island', detailedLocation: 'Great Fairy' },
  0x2380d9: { generalLocation: 'Southern Fairy Island', detailedLocation: 'Lookout Platform - Destroy the Northwest Cannons' },
  0x2380da: { generalLocation: 'Southern Fairy Island', detailedLocation: 'Lookout Platform - Destroy the Southeast Cannons' },

  // Northern Fairy Island
  0x2380db: { generalLocation: 'Northern Fairy Island', detailedLocation: 'Great Fairy' },
  0x2380dc: { generalLocation: 'Northern Fairy Island', detailedLocation: 'Submarine' },

  // Tingle Island
  0x2380dd: { generalLocation: 'Tingle Island', detailedLocation: 'Ankle - Reward for All Tingle Statues' },
  0x2380de: { generalLocation: 'Tingle Island', detailedLocation: 'Big Octo' },

  // Diamond Steppe Island
  0x2380df: { generalLocation: 'Diamond Steppe Island', detailedLocation: 'Warp Maze Cave - First Chest' },
  0x2380e0: { generalLocation: 'Diamond Steppe Island', detailedLocation: 'Warp Maze Cave - Second Chest' },
  0x2380e1: { generalLocation: 'Diamond Steppe Island', detailedLocation: 'Big Octo' },

  // Bomb Island
  0x2380e2: { generalLocation: 'Bomb Island', detailedLocation: 'Cave' },
  0x2380e3: { generalLocation: 'Bomb Island', detailedLocation: 'Lookout Platform - Defeat the Enemies' },
  0x2380e4: { generalLocation: 'Bomb Island', detailedLocation: 'Submarine' },

  // Rock Spire Isle
  0x2380e5: { generalLocation: 'Rock Spire Isle', detailedLocation: 'Cave' },
  0x2380e6: { generalLocation: 'Rock Spire Isle', detailedLocation: "Beedle's Special Shop Ship - 500 Rupee Item" },
  0x2380e7: { generalLocation: 'Rock Spire Isle', detailedLocation: "Beedle's Special Shop Ship - 950 Rupee Item" },
  0x2380e8: { generalLocation: 'Rock Spire Isle', detailedLocation: "Beedle's Special Shop Ship - 900 Rupee Item" },
  0x2380e9: { generalLocation: 'Rock Spire Isle', detailedLocation: 'Western Lookout Platform - Destroy the Cannons' },
  0x2380ea: { generalLocation: 'Rock Spire Isle', detailedLocation: 'Eastern Lookout Platform - Destroy the Cannons' },
  0x2380eb: { generalLocation: 'Rock Spire Isle', detailedLocation: 'Center Lookout Platform' },
  0x2380ec: { generalLocation: 'Rock Spire Isle', detailedLocation: 'Southeast Gunboat' },

  // Shark Island
  0x2380ed: { generalLocation: 'Shark Island', detailedLocation: 'Cave' },

  // Cliff Plateau Isles
  0x2380ee: { generalLocation: 'Cliff Plateau Isles', detailedLocation: 'Cave' },
  0x2380ef: { generalLocation: 'Cliff Plateau Isles', detailedLocation: 'Highest Isle' },
  0x2380f0: { generalLocation: 'Cliff Plateau Isles', detailedLocation: 'Lookout Platform' },

  // Crescent Moon Island
  0x2380f1: { generalLocation: 'Crescent Moon Island', detailedLocation: 'Chest' },
  0x2380f2: { generalLocation: 'Crescent Moon Island', detailedLocation: 'Submarine' },

  // Horseshoe Island
  0x2380f3: { generalLocation: 'Horseshoe Island', detailedLocation: 'Play Golf' },
  0x2380f4: { generalLocation: 'Horseshoe Island', detailedLocation: 'Cave' },
  0x2380f5: { generalLocation: 'Horseshoe Island', detailedLocation: 'Northwestern Lookout Platform' },
  0x2380f6: { generalLocation: 'Horseshoe Island', detailedLocation: 'Southeastern Lookout Platform' },

  // Flight Control Platform
  0x2380f7: { generalLocation: 'Flight Control Platform', detailedLocation: 'Bird-Man Contest - First Prize' },
  0x2380f8: { generalLocation: 'Flight Control Platform', detailedLocation: 'Submarine' },

  // Star Island
  0x2380f9: { generalLocation: 'Star Island', detailedLocation: 'Cave' },
  0x2380fa: { generalLocation: 'Star Island', detailedLocation: 'Lookout Platform' },

  // Star Belt Archipelago
  0x2380fb: { generalLocation: 'Star Belt Archipelago', detailedLocation: 'Lookout Platform' },

  // Five-Star Isles
  0x2380fc: { generalLocation: 'Five-Star Isles', detailedLocation: 'Lookout Platform - Destroy the Cannons' },
  0x2380fd: { generalLocation: 'Five-Star Isles', detailedLocation: 'Raft' },
  0x2380fe: { generalLocation: 'Five-Star Isles', detailedLocation: 'Submarine' },

  // Seven-Star Isles
  0x2380ff: { generalLocation: 'Seven-Star Isles', detailedLocation: 'Center Platform' },
  0x238100: { generalLocation: 'Seven-Star Isles', detailedLocation: 'Northern Platform' },
  0x238101: { generalLocation: 'Seven-Star Isles', detailedLocation: 'Southern Platform' },
  0x238102: { generalLocation: 'Seven-Star Isles', detailedLocation: 'Big Octo' },

  // Cyclops Reef
  0x238103: { generalLocation: 'Cyclops Reef', detailedLocation: 'Destroy the Cannons and Gunboats' },
  0x238104: { generalLocation: 'Cyclops Reef', detailedLocation: 'Lookout Platform - Defeat the Enemies' },

  // Two-Eye Reef
  0x238105: { generalLocation: 'Two-Eye Reef', detailedLocation: 'Destroy the Cannons and Gunboats' },
  0x238106: { generalLocation: 'Two-Eye Reef', detailedLocation: 'Lookout Platform' },
  0x238107: { generalLocation: 'Two-Eye Reef', detailedLocation: 'Big Octo Great Fairy' },

  // Three-Eye Reef
  0x238108: { generalLocation: 'Three-Eye Reef', detailedLocation: 'Destroy the Cannons and Gunboats' },

  // Four-Eye Reef
  0x238109: { generalLocation: 'Four-Eye Reef', detailedLocation: 'Destroy the Cannons and Gunboats' },

  // Five-Eye Reef
  0x23810a: { generalLocation: 'Five-Eye Reef', detailedLocation: 'Destroy the Cannons' },
  0x23810b: { generalLocation: 'Five-Eye Reef', detailedLocation: 'Lookout Platform' },

  // Six-Eye Reef
  0x23810c: { generalLocation: 'Six-Eye Reef', detailedLocation: 'Destroy the Cannons and Gunboats' },
  0x23810d: { generalLocation: 'Six-Eye Reef', detailedLocation: 'Lookout Platform - Destroy the Cannons' },
  0x23810e: { generalLocation: 'Six-Eye Reef', detailedLocation: 'Submarine' },

  // Sunken Treasure (Treasure Salvaging)
  0x23810f: { generalLocation: 'The Great Sea', detailedLocation: 'Forsaken Fortress Sector - Sunken Treasure' },
  0x238110: { generalLocation: 'The Great Sea', detailedLocation: 'Star Island - Sunken Treasure' },
  0x238111: { generalLocation: 'The Great Sea', detailedLocation: 'Northern Fairy Island - Sunken Treasure' },
  0x238113: { generalLocation: 'The Great Sea', detailedLocation: 'Crescent Moon Island - Sunken Treasure' },
  0x238115: { generalLocation: 'The Great Sea', detailedLocation: 'Overlook Island - Sunken Treasure' },
  0x238116: { generalLocation: 'The Great Sea', detailedLocation: 'Four-Eye Reef - Sunken Treasure' },
  0x238117: { generalLocation: 'The Great Sea', detailedLocation: 'Mother and Child Isles - Sunken Treasure' },
  0x238118: { generalLocation: 'The Great Sea', detailedLocation: 'Spectacle Island - Sunken Treasure' },
  0x238119: { generalLocation: 'The Great Sea', detailedLocation: 'Windfall Island - Sunken Treasure' },
  0x23811a: { generalLocation: 'The Great Sea', detailedLocation: 'Pawprint Isle - Sunken Treasure' },
  0x23811b: { generalLocation: 'The Great Sea', detailedLocation: 'Dragon Roost Island - Sunken Treasure' },
  0x23811c: { generalLocation: 'The Great Sea', detailedLocation: 'Flight Control Platform - Sunken Treasure' },
  0x23811d: { generalLocation: 'The Great Sea', detailedLocation: 'Western Fairy Island - Sunken Treasure' },
  0x23811e: { generalLocation: 'The Great Sea', detailedLocation: 'Rock Spire Isle - Sunken Treasure' },
  0x23811f: { generalLocation: 'The Great Sea', detailedLocation: 'Tingle Island - Sunken Treasure' },
  0x238120: { generalLocation: 'The Great Sea', detailedLocation: 'Northern Triangle Island - Sunken Treasure' },
  0x238121: { generalLocation: 'The Great Sea', detailedLocation: 'Eastern Fairy Island - Sunken Treasure' },
  0x238122: { generalLocation: 'The Great Sea', detailedLocation: 'Fire Mountain - Sunken Treasure' },
  0x238123: { generalLocation: 'The Great Sea', detailedLocation: 'Star Belt Archipelago - Sunken Treasure' },
  0x238124: { generalLocation: 'The Great Sea', detailedLocation: 'Three-Eye Reef - Sunken Treasure' },
  0x238126: { generalLocation: 'The Great Sea', detailedLocation: 'Cyclops Reef - Sunken Treasure' },
  0x238127: { generalLocation: 'The Great Sea', detailedLocation: 'Six-Eye Reef - Sunken Treasure' },
  0x238128: { generalLocation: 'The Great Sea', detailedLocation: 'Tower of the Gods Sector - Sunken Treasure' },
  0x238129: { generalLocation: 'The Great Sea', detailedLocation: 'Eastern Triangle Island - Sunken Treasure' },
  0x23812a: { generalLocation: 'The Great Sea', detailedLocation: 'Thorned Fairy Island - Sunken Treasure' },
  0x23812b: { generalLocation: 'The Great Sea', detailedLocation: 'Needle Rock Isle - Sunken Treasure' },
  0x23812c: { generalLocation: 'The Great Sea', detailedLocation: 'Islet of Steel - Sunken Treasure' },
  0x23812f: { generalLocation: 'The Great Sea', detailedLocation: 'Private Oasis - Sunken Treasure' },
  0x238130: { generalLocation: 'The Great Sea', detailedLocation: 'Bomb Island - Sunken Treasure' },
  0x238131: { generalLocation: 'The Great Sea', detailedLocation: "Bird's Peak Rock - Sunken Treasure" },
  0x238132: { generalLocation: 'The Great Sea', detailedLocation: 'Diamond Steppe Island - Sunken Treasure' },
  0x238133: { generalLocation: 'The Great Sea', detailedLocation: 'Five-Eye Reef - Sunken Treasure' },
  0x238134: { generalLocation: 'The Great Sea', detailedLocation: 'Shark Island - Sunken Treasure' },
  0x238135: { generalLocation: 'The Great Sea', detailedLocation: 'Southern Fairy Island - Sunken Treasure' },
  0x238136: { generalLocation: 'The Great Sea', detailedLocation: 'Ice Ring Isle - Sunken Treasure' },
  0x238137: { generalLocation: 'The Great Sea', detailedLocation: 'Forest Haven - Sunken Treasure' },
  0x238139: { generalLocation: 'The Great Sea', detailedLocation: 'Horseshoe Island - Sunken Treasure' },
  0x23813b: { generalLocation: 'The Great Sea', detailedLocation: 'Headstone Island - Sunken Treasure' },
  0x23813d: { generalLocation: 'The Great Sea', detailedLocation: 'Angular Isles - Sunken Treasure' },
  0x23813e: { generalLocation: 'The Great Sea', detailedLocation: 'Boating Course - Sunken Treasure' },
  0x23813f: { generalLocation: 'The Great Sea', detailedLocation: 'Five-Star Isles - Sunken Treasure' },

  // Triforce Salvaging
  0x238112: { generalLocation: 'The Great Sea', detailedLocation: 'Gale Isle - Sunken Triforce' },
  0x238114: { generalLocation: 'The Great Sea', detailedLocation: 'Seven-Star Isles - Sunken Triforce' },
  0x238125: { generalLocation: 'The Great Sea', detailedLocation: 'Greatfish Isle - Sunken Triforce' },
  0x23812d: { generalLocation: 'The Great Sea', detailedLocation: 'Stone Watcher Island - Sunken Triforce' },
  0x23812e: { generalLocation: 'The Great Sea', detailedLocation: 'Southern Triangle Island - Sunken Triforce' },
  0x238138: { generalLocation: 'The Great Sea', detailedLocation: 'Cliff Plateau Isles - Sunken Triforce' },
  0x23813a: { generalLocation: 'The Great Sea', detailedLocation: 'Outset Island - Sunken Triforce' },
  0x23813c: { generalLocation: 'The Great Sea', detailedLocation: 'Two-Eye Reef - Sunken Triforce' },
};

/**
 * Get the tracker location for an Archipelago location ID
 * @param {number} locationId - The Archipelago location ID
 * @returns {{generalLocation: string, detailedLocation: string}|null} The tracker location, or null if not found
 */
export function getTrackerLocation(locationId) {
  return LOCATION_MAPPING[locationId] || null;
}

/**
 * Get all mapped location IDs
 * @returns {number[]} Array of all mapped location IDs
 */
export function getAllLocationIds() {
  return Object.keys(LOCATION_MAPPING).map(Number);
}

export default LOCATION_MAPPING;
