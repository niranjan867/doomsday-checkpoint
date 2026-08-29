import type { CheckpointEntity } from './types';

/**
 * Editorial, spoiler-safe curated replacements for titles whose raw guidance
 * mentions future casting, Doomsday recruitment, major ending twists, legacy stop points, or external step numbers.
 * When spoiler mode is OFF (default), these clean phrases are displayed.
 * When spoiler mode is ON, the raw text is revealed.
 */
const SAFE_WATCH_FOR_MAP: Record<string, string> = {
  'x-men':
    'Welcome to the beginning of the modern superhero era. Meet the defining versions of Professor Xavier and Magneto that established the franchise.',
  'x2-x-men-united':
    "The Nightcrawler opening is widely praised as one of the best in the genre. Pay attention to Nightcrawler's introduction and Jean's storyline.",
  'x-men-the-last-stand':
    'Kelsey Grammer debuts as Beast alongside the core mutant ensemble. Stay through the credits for a key post-credits scene.',
  'captain-america-the-winter-soldier':
    'The elevator sequence is legendary. Pay attention to the conspiracy unraveling within S.H.I.E.L.D. and the mid-credits scene.',
  'the-falcon-and-the-winter-soldier-season-1':
    'A series exploring legacy and what the shield represents. Follow Sam Wilson, Bucky Barnes, and John Walker as the dynamic shifts.',
  'thor-love-and-thunder':
    "Gorr the God Butcher challenges Thor, while Jane Foster's heroic journey comes full circle. Be sure to catch the mid-credits scene.",
  'the-marvels':
    'Carol Danvers, Monica Rambeau, and Kamala Khan team up across space. The mid-credits scene features significant multiversal implications.',
  'thunderbolts':
    'A team of antiheroes and former operatives assembled for covert operations. Follow the ensemble dynamics and stay through the credits.',
  'the-fantastic-four-first-steps':
    "Set in a vibrant retro-futurist 1960s world introducing Marvel's First Family as they confront cosmic forces.",
  'loki-season-1':
    "Learn the TVA's rules — they define the foundation of the Multiverse Saga. Everything about the final confrontation carries major multiversal weight.",
  'black-widow':
    'Natasha on the run in the gap between Civil War and Infinity War — this film fills that key backstory. Keep an eye out for the post-credits stinger.',
  'hawkeye-episodes-1-5':
    'Street-level holiday mystery in New York. Follow Clint Barton and Kate Bishop as familiar faces emerge.',
  'ant-man-and-the-wasp-quantumania':
    'Kang the Conqueror takes center stage in the Quantum Realm. Be sure to watch both post-credits scenes for major multiversal setup.',
  'daredevil-born-again-season-2':
    "New York under Kingpin's influence with returning allies and street-level heroes uniting across the city.",
};

const SAFE_INSTRUCTION_MAP: Record<string, string> = {
  'x2-x-men-united': "Pay attention to Nightcrawler's sequence and mutant dynamics.",
  'x-men-the-last-stand': 'Watch for the debut of Beast and the post-credits stinger.',
};

const SAFE_WHY_IT_MATTERS_MAP: Record<string, string> = {
  'iron-man': 'Where the connected universe starts. Introduces Tony Stark and the Avengers Initiative.',
  'the-incredible-hulk': 'Key backstory for the Hulk, General Ross, and the Leader returning in later phases.',
  'iron-man-2': 'Introduces Natasha Romanoff (Black Widow) and expands Nick Fury’s initiative.',
  'thor': 'Introduces Thor, Loki, Asgard, and cosmic realms.',
  'captain-america-the-first-avenger': 'Introduces Steve Rogers, the Super Soldier program, Bucky Barnes, and the Tesseract.',
  'the-avengers': 'The historic first assembly of the Earth’s Mightiest Heroes.',
  'iron-man-3': 'Explores Tony Stark’s trauma following New York and his character evolution.',
  'thor-the-dark-world': 'Introduces the Reality Stone (Aether) and the Collector.',
  'captain-america-the-winter-soldier': 'Reshapes the geopolitical landscape of the entire Marvel universe.',
  'guardians-of-the-galaxy': 'Introduces the Guardians, Thanos’s daughters, and the Power Stone.',
  'guardians-of-the-galaxy-vol-2': 'Deepens the Guardians ensemble and emotional core.',
  'avengers-age-of-ultron': 'The creation of Vision, Wanda Maximoff, and key foundation for future story arcs.',
  'ant-man': 'Introduces Scott Lang, Hank Pym, and the Quantum Realm.',
  'captain-america-civil-war': 'Fractures the Avengers and introduces Black Panther and Spider-Man.',
  'black-widow': 'Fills the post-Civil War gap and introduces Yelena Belova and Red Guardian.',
  'doctor-strange': 'Introduces the mystic arts, Kamar-Taj, and the Time Stone.',
  'spider-man-homecoming': 'Peter Parker’s first solo high school journey in the MCU.',
  'thor-ragnarok': 'Reinvents Thor and leads directly into Infinity War.',
  'black-panther': 'Introduces Wakanda, Shuri, and essential cultural and technological pillars.',
  'avengers-infinity-war': 'The catastrophic arrival of Thanos and the Snap.',
  'ant-man-and-the-wasp': 'Explores the Quantum Realm with a mid-credits scene tied directly to Infinity War.',
  'captain-marvel': 'Introduces Carol Danvers, Nick Fury’s past, and the Tesseract’s 1990s history.',
  'avengers-endgame': 'The monumental conclusion of the Infinity Saga and the Time Heist.',
  'spider-man-far-from-home': 'Peter Parker faces the aftermath of Endgame and major identity revelations.',
  'daredevil-season-1': 'The foundation of street-level Hell’s Kitchen and Kingpin.',
  'jessica-jones-season-1': 'Vigilante detective investigation in Manhattan.',
  'daredevil-season-2': 'Introduces Frank Castle (The Punisher) and Elektra.',
  'the-punisher-season-1': 'Frank Castle’s solo vigilante mission.',
  'daredevil-season-3': 'The ultimate rivalry between Matt Murdock, Bullseye, and Wilson Fisk.',
  'the-punisher-season-2': 'Frank Castle’s second hard-hitting chapter.',
  'wandavision': 'Explores grief, the creation of the Scarlet Witch, and key setup for multiversal journeys.',
  'the-falcon-and-the-winter-soldier-season-1': 'Sam Wilson assumes the mantle of Captain America.',
  'loki-season-1': 'The foundational constitution of the Multiverse Saga and the TVA.',
  'what-if-season-1': 'Explores alternate realities and multiversal guardians.',
  'shang-chi-and-the-legend-of-the-ten-rings': 'Introduces Shang-Chi, Ta Lo, and the ancient Ten Rings.',
  'eternals': 'Introduces ancient cosmic beings and the Celestial embedded in Earth.',
  'hawkeye-episodes-1-5': 'Clint Barton mentors Kate Bishop in street-level holiday New York.',
  'spider-man-no-way-home': 'Brings multiversal Spider-Man legacies together in a historic crossover.',
  'hawkeye-episode-6-finale': 'The holiday climax in New York with returning street-level figures.',
  'moon-knight': 'Explores Egyptian myth, dual identities, and the avatar of Khonshu.',
  'doctor-strange-in-the-multiverse-of-madness': 'Explores alternate dimensions, incursions, and the Darkhold.',
  'ms-marvel': 'Introduces Kamala Khan, her family heritage, and setup for The Marvels.',
  'thor-love-and-thunder': 'Jane Foster becomes the Mighty Thor alongside Thor Odinson.',
  'she-hulk-attorney-at-law': 'Jennifer Walters balances superhuman law and Hulk abilities.',
  'black-panther-wakanda-forever': 'Introduces Namor, Talokan, and Wakanda’s new protector.',
  'ant-man-and-the-wasp-quantumania': 'Explores the depths of the Quantum Realm against a multiversal tyrant.',
  'loki-season-2': 'The definitive resolution of the TVA and the preservation of the timeline.',
  'guardians-of-the-galaxy-vol-3': 'The heartfelt final chapter for the original Guardians team.',
  'secret-invasion': 'Nick Fury confronts a covert shapeshifting threat on Earth.',
  'the-marvels': 'Cosmic team-up with significant multiversal implications.',
  'echo': 'Maya Lopez embraces her ancestral heritage and confronts Wilson Fisk.',
  'x-men': 'The dawn of the modern superhero era with Professor X and Magneto.',
  'x2-x-men-united': 'The mutant alliance defending Xavier’s school and mutants.',
  'x-men-the-last-stand': 'The mutant cure dilemma and the emergence of Beast.',
  'x-men-first-class': 'The 1962 origin of Xavier and Magneto’s friendship.',
  'the-wolverine': 'Logan’s standalone journey in Japan.',
  'x-men-days-of-future-past': 'Time-travel epic bridging past and future X-Men rosters.',
  'x-men-apocalypse': 'The ancient mutant threat in the 1980s.',
  'dark-phoenix': 'The 1990s cosmic power storyline.',
  'deadpool': 'The irreverent, fourth-wall-breaking mercenary origin.',
  'logan': 'The poignant, critically acclaimed final journey of Wolverine.',
  'deadpool-2': 'Wade Wilson forms X-Force and confronts time traveler Cable.',
  'deadpool-and-wolverine': 'Formally folds the Fox universe into the MCU multiverse at the TVA.',
  'agatha-all-along': 'Journey down the Witches’ Road uncovering mystic secrets.',
  'captain-america-brave-new-world': 'Sam Wilson rebuilds the Avengers amid global political upheaval.',
  'daredevil-born-again-season-1': 'Matt Murdock and Wilson Fisk navigate New York’s new political reality.',
  'thunderbolts': 'A covert strike force of antiheroes and former operatives.',
  'the-fantastic-four-first-steps': 'Marvel’s First Family introduced in a vibrant retro-futurist 1960s universe.',
  'ironheart': 'Riri Williams balances cutting-edge tech and mystic forces in Chicago.',
  'wonder-man': 'Simon Williams enters Hollywood’s superhero scene.',
  'daredevil-born-again-season-2': 'Direct street-level crossover events in New York.',
  'the-punisher-one-last-kill': 'Frank Castle’s high-stakes solo special.',
  'spider-man-brand-new-day': 'Peter Parker’s street-level theatrical chapter.',
  'visionquest': 'White Vision searches for identity and purpose following Westview.',
  'blade-movie': 'The supernatural vampire-hunter side of the Marvel universe.',
  'avengers-doomsday': 'The monumental multiversal confrontation against Doctor Doom.',
  'avengers-secret-wars': 'The ultimate multiversal climax of the Marvel Cinematic Universe.',
};

/**
 * Return spoiler-safe watch guidance for an entity.
 */
export function getSafeWatchFor(entity: CheckpointEntity, showSpoilers: boolean = false): string {
  if (showSpoilers) {
    return entity.guidance?.watch_for || '';
  }

  if (SAFE_WATCH_FOR_MAP[entity.id]) {
    return SAFE_WATCH_FOR_MAP[entity.id];
  }

  return entity.guidance?.watch_for || '';
}

/**
 * Return spoiler-safe watch instruction for an entity.
 */
export function getSafeWatchInstruction(entity: CheckpointEntity, showSpoilers: boolean = false): string | null {
  if (showSpoilers) {
    return entity.guidance?.watch_instruction || null;
  }

  if (SAFE_INSTRUCTION_MAP[entity.id]) {
    return SAFE_INSTRUCTION_MAP[entity.id];
  }

  return entity.guidance?.watch_instruction || null;
}

/**
 * Return concise, spoiler-safe 'Why It Matters' text for an entity.
 */
export function getSafeWhyItMatters(entity: CheckpointEntity, showSpoilers: boolean = false): string {
  if (showSpoilers && entity.doomsday?.connection) {
    return entity.doomsday.connection;
  }

  if (SAFE_WHY_IT_MATTERS_MAP[entity.id]) {
    return SAFE_WHY_IT_MATTERS_MAP[entity.id];
  }

  return entity.classification?.importance === 'Essential'
    ? 'Essential viewing for understanding key character arcs and world-building.'
    : 'Provides valuable context for expanding the broader universe.';
}
