import type { CheckpointEntity } from './types';
import { allMasterEntities } from './data';

export interface TimelinePlacement {
  id: string;
  timelineYear: string;
  era: string;
  timelineNote?: string;
  universe?: string;
}

export interface WatchGuideSection {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  entityIds: string[];
}

export interface TimelineEraSection {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  entityIds: string[];
}

/**
 * 5 Content Sections for VIEW 1 — RELEASE ORDER
 */
export const RELEASE_SECTIONS: WatchGuideSection[] = [
  {
    id: 'part-1',
    number: 'PART I',
    title: 'The Infinity Saga',
    subtitle: 'Movies only · 2008–2019',
    description:
      'The foundation of the Marvel Cinematic Universe. 24 films that establish the connected universe, its original heroes, the Infinity Stones, and the Avengers.',
    entityIds: [
      'iron-man',
      'the-incredible-hulk',
      'iron-man-2',
      'thor',
      'captain-america-the-first-avenger',
      'the-avengers',
      'iron-man-3',
      'thor-the-dark-world',
      'captain-america-the-winter-soldier',
      'guardians-of-the-galaxy',
      'guardians-of-the-galaxy-vol-2',
      'avengers-age-of-ultron',
      'ant-man',
      'captain-america-civil-war',
      'black-widow',
      'doctor-strange',
      'spider-man-homecoming',
      'thor-ragnarok',
      'black-panther',
      'avengers-infinity-war',
      'ant-man-and-the-wasp',
      'captain-marvel',
      'avengers-endgame',
      'spider-man-far-from-home',
    ],
  },
  {
    id: 'part-2',
    number: 'PART II',
    title: 'The Street-Level Track',
    subtitle: 'Required before Daredevil: Born Again · 2015–2019',
    description:
      'The Netflix era is fully canon. Daredevil: Born Again directly builds upon this history, and its second season crosses over into the theatrical world.',
    entityIds: [
      'daredevil-season-1',
      'jessica-jones-season-1',
      'daredevil-season-2',
      'the-punisher-season-1',
      'daredevil-season-3',
      'the-punisher-season-2',
    ],
  },
  {
    id: 'part-3',
    number: 'PART III',
    title: 'The Multiverse Saga',
    subtitle: 'Phases 4–5 movies and series · 2021–2024',
    description:
      'Where shows and movies interleave across expanding realities, multiversal incursions, and new alliances leading toward the next crossover.',
    entityIds: [
      'wandavision',
      'the-falcon-and-the-winter-soldier-season-1',
      'loki-season-1',
      'what-if-season-1',
      'shang-chi-and-the-legend-of-the-ten-rings',
      'eternals',
      'hawkeye-episodes-1-5',
      'spider-man-no-way-home',
      'hawkeye-episode-6-finale',
      'moon-knight',
      'doctor-strange-in-the-multiverse-of-madness',
      'ms-marvel',
      'thor-love-and-thunder',
      'she-hulk-attorney-at-law',
      'black-panther-wakanda-forever',
      'ant-man-and-the-wasp-quantumania',
      'loki-season-2',
      'guardians-of-the-galaxy-vol-3',
      'secret-invasion',
      'the-marvels',
      'echo',
    ],
  },
  {
    id: 'part-4',
    number: 'PART IV',
    title: 'The X-Men Homework',
    subtitle: 'Legacy Fox continuity load-bearing for Doomsday · 2000–2024',
    description:
      'The X-Men characters in Doomsday reprise their original roles from Fox’s groundbreaking franchise. Essential context for the convergence of universes.',
    entityIds: [
      'x-men',
      'x2-x-men-united',
      'x-men-the-last-stand',
      'x-men-first-class',
      'the-wolverine',
      'x-men-days-of-future-past',
      'x-men-apocalypse',
      'dark-phoenix',
      'deadpool',
      'logan',
      'deadpool-2',
      'deadpool-and-wolverine',
    ],
  },
  {
    id: 'part-5',
    number: 'PART V',
    title: 'The Final Run into Phase 6',
    subtitle: 'The direct runway into Avengers: Doomsday · 2024–2026',
    description:
      'The critical Phase 5 and Phase 6 chapter that unites street heroes, multiversal travellers, and Marvel’s First Family directly into Doomsday.',
    entityIds: [
      'agatha-all-along',
      'captain-america-brave-new-world',
      'daredevil-born-again-season-1',
      'thunderbolts',
      'ironheart',
      'the-fantastic-four-first-steps',
      'wonder-man',
      'daredevil-born-again-season-2',
      'the-punisher-one-last-kill',
      'spider-man-brand-new-day',
      'visionquest',
      'blade-movie',
      'avengers-doomsday',
      'avengers-secret-wars',
    ],
  },
];

/**
 * Era Sections for VIEW 2 — TIMELINE ORDER
 */
export const TIMELINE_ERAS: TimelineEraSection[] = [
  {
    id: 'era-1',
    title: 'Era I — The Past',
    subtitle: '1943–1995',
    description: 'The earliest historical roots of the Super Soldier program and cosmic encounters.',
    entityIds: ['captain-america-the-first-avenger', 'captain-marvel'],
  },
  {
    id: 'era-2',
    title: 'Era II — The Avengers Era',
    subtitle: '~2010–2018',
    description: 'The birth of Iron Man, the original Avengers assembly, and the journey toward Infinity War.',
    entityIds: [
      'iron-man',
      'iron-man-2',
      'the-incredible-hulk',
      'thor',
      'the-avengers',
      'iron-man-3',
      'thor-the-dark-world',
      'captain-america-the-winter-soldier',
      'guardians-of-the-galaxy',
      'guardians-of-the-galaxy-vol-2',
      'daredevil-season-1',
      'jessica-jones-season-1',
      'avengers-age-of-ultron',
      'ant-man',
      'daredevil-season-2',
      'captain-america-civil-war',
      'black-widow',
      'black-panther',
      'spider-man-homecoming',
      'doctor-strange',
      'thor-ragnarok',
      'the-punisher-season-1',
      'daredevil-season-3',
      'the-punisher-season-2',
      'ant-man-and-the-wasp',
      'avengers-infinity-war',
    ],
  },
  {
    id: 'era-3',
    title: 'Era III — The Blip & After',
    subtitle: '2018–2024',
    description: 'The five-year gap, the Time Heist, and the immediate multiversal fractures.',
    entityIds: [
      'avengers-endgame',
      'loki-season-1',
      'what-if-season-1',
      'wandavision',
      'the-falcon-and-the-winter-soldier-season-1',
      'visionquest',
    ],
  },
  {
    id: 'interlude-fox',
    title: 'Interlude — The Fox Saga',
    subtitle: 'Earth-10005 · 1962–2029',
    description:
      'A different Earth’s entire mutant history, docked where it collides with the Marvel Cinematic Universe.',
    entityIds: [
      'x-men',
      'x2-x-men-united',
      'x-men-the-last-stand',
      'x-men-first-class',
      'the-wolverine',
      'x-men-days-of-future-past',
      'x-men-apocalypse',
      'dark-phoenix',
      'deadpool',
      'deadpool-2',
      'logan',
    ],
  },
  {
    id: 'era-4',
    title: 'Era III (Continued) — Back on the Main Road',
    subtitle: '2024–2028',
    description: 'The expansion into the Multiverse, street-level convergence, and the arrival of Earth-828.',
    entityIds: [
      'deadpool-and-wolverine',
      'spider-man-far-from-home',
      'shang-chi-and-the-legend-of-the-ten-rings',
      'eternals',
      'spider-man-no-way-home',
      'hawkeye-episodes-1-5',
      'hawkeye-episode-6-finale',
      'moon-knight',
      'doctor-strange-in-the-multiverse-of-madness',
      'ms-marvel',
      'thor-love-and-thunder',
      'she-hulk-attorney-at-law',
      'black-panther-wakanda-forever',
      'ant-man-and-the-wasp-quantumania',
      'loki-season-2',
      'guardians-of-the-galaxy-vol-3',
      'secret-invasion',
      'the-marvels',
      'echo',
      'agatha-all-along',
      'captain-america-brave-new-world',
      'daredevil-born-again-season-1',
      'thunderbolts',
      'the-fantastic-four-first-steps',
      'ironheart',
      'wonder-man',
      'daredevil-born-again-season-2',
      'the-punisher-one-last-kill',
      'spider-man-brand-new-day',
      'blade-movie',
      'avengers-doomsday',
      'avengers-secret-wars',
    ],
  },
];

/**
 * Timeline metadata map for each title
 */
export const TIMELINE_METADATA_MAP: Record<string, TimelinePlacement> = {
  'captain-america-the-first-avenger': {
    id: 'captain-america-the-first-avenger',
    timelineYear: '1943–1945',
    era: 'Era I',
    timelineNote: 'First chronologically; post-credits jumps forward to the 2011 era.',
  },
  'captain-marvel': {
    id: 'captain-marvel',
    timelineYear: '1995',
    era: 'Era I',
    timelineNote: 'Set in 1995; post-credits scene jumps 24 years to the Infinity War aftermath.',
  },
  'iron-man': {
    id: 'iron-man',
    timelineYear: '~2010',
    era: 'Era II',
    timelineNote: 'The modern dawn of superheroes.',
  },
  'iron-man-2': {
    id: 'iron-man-2',
    timelineYear: '~2011',
    era: 'Era II',
    timelineNote: "Set during 'Fury’s Big Week' concurrently with Thor and The Incredible Hulk.",
  },
  'the-incredible-hulk': {
    id: 'the-incredible-hulk',
    timelineYear: '~2011',
    era: 'Era II',
    timelineNote: 'Set the same week as Iron Man 2 and Thor.',
  },
  'thor': {
    id: 'thor',
    timelineYear: '~2011',
    era: 'Era II',
    timelineNote: 'Takes place over a few pivotal days in New Mexico.',
  },
  'the-avengers': {
    id: 'the-avengers',
    timelineYear: '2012',
    era: 'Era II',
    timelineNote: 'The Battle of New York changes the universe forever.',
  },
  'iron-man-3': {
    id: 'iron-man-3',
    timelineYear: '2012',
    era: 'Era II',
    timelineNote: 'Set in December 2012 following the trauma of New York.',
  },
  'thor-the-dark-world': {
    id: 'thor-the-dark-world',
    timelineYear: '2013',
    era: 'Era II',
    timelineNote: 'The Convergence of the Nine Realms reveals the Reality Stone.',
  },
  'captain-america-the-winter-soldier': {
    id: 'captain-america-the-winter-soldier',
    timelineYear: '2014',
    era: 'Era II',
    timelineNote: 'The fall of S.H.I.E.L.D. reshapes every operative in the world.',
  },
  'guardians-of-the-galaxy': {
    id: 'guardians-of-the-galaxy',
    timelineYear: '2014',
    era: 'Era II',
    timelineNote: 'Opens the cosmic side of the Marvel universe.',
  },
  'guardians-of-the-galaxy-vol-2': {
    id: 'guardians-of-the-galaxy-vol-2',
    timelineYear: '2014',
    era: 'Era II',
    timelineNote: 'Set just a few months after the first Guardians adventure.',
  },
  'daredevil-season-1': {
    id: 'daredevil-season-1',
    timelineYear: '~2015',
    era: 'Era II',
    timelineNote: 'Hell’s Kitchen rebuilding after the Battle of New York.',
  },
  'jessica-jones-season-1': {
    id: 'jessica-jones-season-1',
    timelineYear: '~2015',
    era: 'Era II',
    timelineNote: 'Street-level investigation in Manhattan.',
  },
  'avengers-age-of-ultron': {
    id: 'avengers-age-of-ultron',
    timelineYear: '2015',
    era: 'Era II',
    timelineNote: 'The Sokovia catastrophe and the creation of Vision.',
  },
  'ant-man': {
    id: 'ant-man',
    timelineYear: '2015',
    era: 'Era II',
    timelineNote: 'Introduces Pym Particles and the Quantum Realm.',
  },
  'daredevil-season-2': {
    id: 'daredevil-season-2',
    timelineYear: '~2016',
    era: 'Era II',
    timelineNote: 'Introduces the Punisher and Elektra.',
  },
  'captain-america-civil-war': {
    id: 'captain-america-civil-war',
    timelineYear: '2016',
    era: 'Era II',
    timelineNote: 'The Avengers fracture over the Sokovia Accords.',
  },
  'black-widow': {
    id: 'black-widow',
    timelineYear: '2016',
    era: 'Era II',
    timelineNote: 'Set immediately after Civil War; post-credits belongs in the Hawkeye era.',
  },
  'black-panther': {
    id: 'black-panther',
    timelineYear: '2016',
    era: 'Era II',
    timelineNote: 'Set a week after Civil War in Wakanda.',
  },
  'spider-man-homecoming': {
    id: 'spider-man-homecoming',
    timelineYear: '2016',
    era: 'Era II',
    timelineNote: 'Two months after Germany in Queens.',
  },
  'doctor-strange': {
    id: 'doctor-strange',
    timelineYear: '2016–2017',
    era: 'Era II',
    timelineNote: 'Spans several months of mystic training at Kamar-Taj.',
  },
  'thor-ragnarok': {
    id: 'thor-ragnarok',
    timelineYear: '2017',
    era: 'Era II',
    timelineNote: 'Mid-credits scene leads directly into the opening of Infinity War.',
  },
  'the-punisher-season-1': {
    id: 'the-punisher-season-1',
    timelineYear: '~2017',
    era: 'Era II',
    timelineNote: 'Frank Castle’s solo vigilante mission.',
  },
  'daredevil-season-3': {
    id: 'daredevil-season-3',
    timelineYear: '~2018',
    era: 'Era II',
    timelineNote: 'Matt Murdock’s rebirth and the ultimate showdown with Fisk.',
  },
  'the-punisher-season-2': {
    id: 'the-punisher-season-2',
    timelineYear: '~2018',
    era: 'Era II',
    timelineNote: 'Frank Castle on the road.',
  },
  'ant-man-and-the-wasp': {
    id: 'ant-man-and-the-wasp',
    timelineYear: '2018',
    era: 'Era II',
    timelineNote: 'Runs parallel to Infinity War; mid-credits coincides with the Snap.',
  },
  'avengers-infinity-war': {
    id: 'avengers-infinity-war',
    timelineYear: '2018',
    era: 'Era II',
    timelineNote: 'Thanos executes the Snap across the universe.',
  },
  'avengers-endgame': {
    id: 'avengers-endgame',
    timelineYear: '2018 → 2023',
    era: 'Era III',
    timelineNote: 'Opens in 2018; jumps five years to 2023 for the Time Heist.',
  },
  'loki-season-1': {
    id: 'loki-season-1',
    timelineYear: 'Outside Time',
    era: 'Era III',
    timelineNote: 'Branches directly off the 2012 time-heist at the TVA.',
  },
  'what-if-season-1': {
    id: 'what-if-season-1',
    timelineYear: 'Outside Time',
    era: 'Era III',
    timelineNote: 'Multiverse branching explorations.',
  },
  'wandavision': {
    id: 'wandavision',
    timelineYear: '2023',
    era: 'Era III',
    timelineNote: 'Set three weeks after the Blip reversal in Westview.',
  },
  'the-falcon-and-the-winter-soldier-season-1': {
    id: 'the-falcon-and-the-winter-soldier-season-1',
    timelineYear: '2023',
    era: 'Era III',
    timelineNote: 'Six months after Endgame.',
  },
  'visionquest': {
    id: 'visionquest',
    timelineYear: '~2024',
    era: 'Era III',
    timelineNote: 'Set roughly a year after WandaVision.',
  },
  'x-men': {
    id: 'x-men',
    timelineYear: 'Earth-10005 · 2000',
    era: 'Interlude',
    universe: 'Earth-10005',
  },
  'x2-x-men-united': {
    id: 'x2-x-men-united',
    timelineYear: 'Earth-10005 · 2003',
    era: 'Interlude',
    universe: 'Earth-10005',
  },
  'x-men-the-last-stand': {
    id: 'x-men-the-last-stand',
    timelineYear: 'Earth-10005 · 2006',
    era: 'Interlude',
    universe: 'Earth-10005',
  },
  'x-men-first-class': {
    id: 'x-men-first-class',
    timelineYear: 'Earth-10005 · 1962',
    era: 'Interlude',
    universe: 'Earth-10005',
  },
  'the-wolverine': {
    id: 'the-wolverine',
    timelineYear: 'Earth-10005 · 2013',
    era: 'Interlude',
    universe: 'Earth-10005',
  },
  'x-men-days-of-future-past': {
    id: 'x-men-days-of-future-past',
    timelineYear: 'Earth-10005 · 1973 / 2023',
    era: 'Interlude',
    universe: 'Earth-10005',
  },
  'x-men-apocalypse': {
    id: 'x-men-apocalypse',
    timelineYear: 'Earth-10005 · 1983',
    era: 'Interlude',
    universe: 'Earth-10005',
  },
  'dark-phoenix': {
    id: 'dark-phoenix',
    timelineYear: 'Earth-10005 · 1992',
    era: 'Interlude',
    universe: 'Earth-10005',
  },
  'deadpool': {
    id: 'deadpool',
    timelineYear: 'Earth-10005 · 2016',
    era: 'Interlude',
    universe: 'Earth-10005',
  },
  'deadpool-2': {
    id: 'deadpool-2',
    timelineYear: 'Earth-10005 · 2018',
    era: 'Interlude',
    universe: 'Earth-10005',
  },
  'logan': {
    id: 'logan',
    timelineYear: 'Earth-10005 · 2029',
    era: 'Interlude',
    universe: 'Earth-10005',
    timelineNote: 'The definitive future finale of the original Fox timeline.',
  },
  'deadpool-and-wolverine': {
    id: 'deadpool-and-wolverine',
    timelineYear: '2024',
    era: 'Era III (Continued)',
    timelineNote: 'Formally bridges Earth-10005 with the MCU timeline at the TVA.',
  },
  'spider-man-far-from-home': {
    id: 'spider-man-far-from-home',
    timelineYear: '2024',
    era: 'Era III (Continued)',
    timelineNote: 'Eight months after Endgame during the European summer trip.',
  },
  'shang-chi-and-the-legend-of-the-ten-rings': {
    id: 'shang-chi-and-the-legend-of-the-ten-rings',
    timelineYear: '2024',
    era: 'Era III (Continued)',
    timelineNote: 'Set during the Qingming Festival in spring 2024.',
  },
  'eternals': {
    id: 'eternals',
    timelineYear: '2024',
    era: 'Era III (Continued)',
    timelineNote: 'Set in autumn 2024 following the energy surge of the Blip reversal.',
  },
  'spider-man-no-way-home': {
    id: 'spider-man-no-way-home',
    timelineYear: '2024',
    era: 'Era III (Continued)',
    timelineNote: 'Follows directly from Far From Home through holiday 2024.',
  },
  'hawkeye-episodes-1-5': {
    id: 'hawkeye-episodes-1-5',
    timelineYear: 'Dec 2024',
    era: 'Era III (Continued)',
    timelineNote: 'Six days before Christmas 2024 in New York.',
  },
  'hawkeye-episode-6-finale': {
    id: 'hawkeye-episode-6-finale',
    timelineYear: 'Dec 2024',
    era: 'Era III (Continued)',
    timelineNote: 'Christmas Eve 2024.',
  },
  'moon-knight': {
    id: 'moon-knight',
    timelineYear: '~2025',
    era: 'Era III (Continued)',
    timelineNote: 'Early 2025 standalone adventure in London and Egypt.',
  },
  'doctor-strange-in-the-multiverse-of-madness': {
    id: 'doctor-strange-in-the-multiverse-of-madness',
    timelineYear: '2025',
    era: 'Era III (Continued)',
    timelineNote: 'Set several months after No Way Home in spring 2025.',
  },
  'ms-marvel': {
    id: 'ms-marvel',
    timelineYear: '2025',
    era: 'Era III (Continued)',
    timelineNote: 'Spring 2025 in Jersey City.',
  },
  'thor-love-and-thunder': {
    id: 'thor-love-and-thunder',
    timelineYear: '~2025',
    era: 'Era III (Continued)',
    timelineNote: 'Roughly 2025 after Thor’s journeys with the Guardians.',
  },
  'she-hulk-attorney-at-law': {
    id: 'she-hulk-attorney-at-law',
    timelineYear: '2025',
    era: 'Era III (Continued)',
    timelineNote: 'Spans several months of 2025 in Los Angeles.',
  },
  'black-panther-wakanda-forever': {
    id: 'black-panther-wakanda-forever',
    timelineYear: '2025',
    era: 'Era III (Continued)',
    timelineNote: 'Late 2025 confrontation between Wakanda and Talokan.',
  },
  'ant-man-and-the-wasp-quantumania': {
    id: 'ant-man-and-the-wasp-quantumania',
    timelineYear: '~2026',
    era: 'Era III (Continued)',
    timelineNote: 'Early 2026 adventure in the Quantum Realm.',
  },
  'loki-season-2': {
    id: 'loki-season-2',
    timelineYear: 'Outside Time',
    era: 'Era III (Continued)',
    timelineNote: 'Outside normal time; the final transformation of the multiverse tree.',
  },
  'guardians-of-the-galaxy-vol-3': {
    id: 'guardians-of-the-galaxy-vol-3',
    timelineYear: '2026',
    era: 'Era III (Continued)',
    timelineNote: 'Set in 2026 on Knowhere and Counter-Earth.',
  },
  'secret-invasion': {
    id: 'secret-invasion',
    timelineYear: '2026',
    era: 'Era III (Continued)',
    timelineNote: 'Late 2026 Skrull infiltration.',
  },
  'the-marvels': {
    id: 'the-marvels',
    timelineYear: '2026',
    era: 'Era III (Continued)',
    timelineNote: 'Directly follows Ms. Marvel and Secret Invasion.',
  },
  'echo': {
    id: 'echo',
    timelineYear: '2025–2026',
    era: 'Era III (Continued)',
    timelineNote: 'Five months after Hawkeye in Oklahoma.',
  },
  'agatha-all-along': {
    id: 'agatha-all-along',
    timelineYear: '~2026',
    era: 'Era III (Continued)',
    timelineNote: 'Three years after WandaVision on the Witches’ Road.',
  },
  'captain-america-brave-new-world': {
    id: 'captain-america-brave-new-world',
    timelineYear: '~2026',
    era: 'Era III (Continued)',
    timelineNote: 'Sam Wilson’s first major geopolitical crisis as Captain America.',
  },
  'daredevil-born-again-season-1': {
    id: 'daredevil-born-again-season-1',
    timelineYear: '~2026',
    era: 'Era III (Continued)',
    timelineNote: 'Mayor Fisk’s anti-vigilante regime in New York.',
  },
  'thunderbolts': {
    id: 'thunderbolts',
    timelineYear: '~2027',
    era: 'Era III (Continued)',
    timelineNote: 'Covert government strike team assembled.',
  },
  'the-fantastic-four-first-steps': {
    id: 'the-fantastic-four-first-steps',
    timelineYear: 'Earth-828 · 1960s',
    era: 'Era III (Continued)',
    universe: 'Earth-828',
    timelineNote: 'A distinct retro-futurist 1960s universe that converges with the MCU.',
  },
  'ironheart': {
    id: 'ironheart',
    timelineYear: '~2026',
    era: 'Era III (Continued)',
    timelineNote: 'Magic vs. technology in Chicago.',
  },
  'wonder-man': {
    id: 'wonder-man',
    timelineYear: '~2026',
    era: 'Era III (Continued)',
    timelineNote: 'Hollywood superhero comedy in Los Angeles.',
  },
  'daredevil-born-again-season-2': {
    id: 'daredevil-born-again-season-2',
    timelineYear: '~2027',
    era: 'Era III (Continued)',
    timelineNote: 'Sets up direct street-level crossover events.',
  },
  'the-punisher-one-last-kill': {
    id: 'the-punisher-one-last-kill',
    timelineYear: '~2027',
    era: 'Era III (Continued)',
    timelineNote: 'Frank Castle’s high-stakes special before Brand New Day.',
  },
  'spider-man-brand-new-day': {
    id: 'spider-man-brand-new-day',
    timelineYear: '~2028',
    era: 'Era III (Continued)',
    timelineNote: 'Peter Parker’s street-level chapter in theaters.',
  },
  'blade-movie': {
    id: 'blade-movie',
    timelineYear: 'TBD',
    era: 'Era III (Continued)',
    timelineNote: 'The supernatural corner of the MCU.',
  },
  'avengers-doomsday': {
    id: 'avengers-doomsday',
    timelineYear: 'Future',
    era: 'Era III (Continued)',
    timelineNote: 'The multiversal convergence against Doctor Doom.',
  },
  'avengers-secret-wars': {
    id: 'avengers-secret-wars',
    timelineYear: 'Future',
    era: 'Era III (Continued)',
    timelineNote: 'The ultimate climax of the Multiverse Saga.',
  },
};

/**
 * Flattened timeline sequence (ordered)
 */
export function getTimelineOrderedEntities(): CheckpointEntity[] {
  const entityMap = new Map<string, CheckpointEntity>();
  for (const entity of allMasterEntities) {
    entityMap.set(entity.id, entity);
  }

  const result: CheckpointEntity[] = [];
  for (const era of TIMELINE_ERAS) {
    for (const id of era.entityIds) {
      const found = entityMap.get(id);
      if (found && !result.some((r) => r.id === found.id)) {
        result.push(found);
      }
    }
  }

  // Include any remaining master entities at the end
  for (const entity of allMasterEntities) {
    if (!result.some((r) => r.id === entity.id)) {
      result.push(entity);
    }
  }

  return result;
}

/**
 * Release Order sequence (72 canonical checkpoints + article-only entities)
 */
export function getReleaseOrderedEntities(): CheckpointEntity[] {
  const entityMap = new Map<string, CheckpointEntity>();
  for (const entity of allMasterEntities) {
    entityMap.set(entity.id, entity);
  }

  const result: CheckpointEntity[] = [];
  for (const sec of RELEASE_SECTIONS) {
    for (const id of sec.entityIds) {
      const found = entityMap.get(id);
      if (found && !result.some((r) => r.id === found.id)) {
        result.push(found);
      }
    }
  }

  // Include any remaining entities
  for (const entity of allMasterEntities) {
    if (!result.some((r) => r.id === entity.id)) {
      result.push(entity);
    }
  }

  return result;
}
