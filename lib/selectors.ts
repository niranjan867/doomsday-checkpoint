import {
  canonicalRoad,
  allMasterEntities,
  articleOnlyEntities,
  canonicalStopPoints,
  sideQuestDefinitions,
  watchOrderMetadata,
  universeContinuity,
  postCreditMap,
  characterRelationships,
} from './data';
import type {
  CheckpointEntity,
  ProgressSummary,
  DoomsdayProgressSummary,
  UserCheckpointProgress,
  SideQuestDefinition,
  ResolvedPrerequisite,
  UniverseDefinition,
  PostCreditEntry,
  CharacterRelationship,
  WatchOrderMode,
} from './types';

/**
 * 1. Primary Canonical 72-Checkpoint Watch Order (1..72)
 */
export function getCanonicalWatchOrder(): CheckpointEntity[] {
  return canonicalRoad;
}

/**
 * 2. Doomsday Preparation Watch Order (49 Canonical Connected Checkpoints)
 * Derived directly from canonicalRoad where doomsday.has_connection is true.
 */
export function getDoomsdayPrepWatchOrder(): CheckpointEntity[] {
  return canonicalRoad.filter((item) => item.doomsday?.has_connection);
}

/**
 * 3. Movies-Only Watch Order (49 Canonical Movies)
 * Derived directly from canonicalRoad where type is 'Movie'.
 */
export function getMoviesOnlyWatchOrder(): CheckpointEntity[] {
  return canonicalRoad.filter((item) => item.type === 'Movie');
}

/**
 * Generic selector for watch order modes
 */
export function getCheckpointsByWatchOrderMode(mode: WatchOrderMode): CheckpointEntity[] {
  switch (mode) {
    case 'doomsday_prep':
      return getDoomsdayPrepWatchOrder();
    case 'movies_only':
      return getMoviesOnlyWatchOrder();
    case 'canonical':
    default:
      return getCanonicalWatchOrder();
  }
}

/**
 * Get all 86 unique master entities
 */
export function getMasterEntities(): CheckpointEntity[] {
  return allMasterEntities;
}

/**
 * Get the 14 article-only entities (not part of the 72 primary road)
 */
export function getArticleOnlyEntities(): CheckpointEntity[] {
  return articleOnlyEntities;
}

/**
 * Get all 7 structured stop points
 */
export function getStopPoints(): CheckpointEntity[] {
  return canonicalStopPoints;
}

/**
 * Get side quest definitions
 */
export function getSideQuests(): SideQuestDefinition[] {
  return sideQuestDefinitions;
}

/**
 * Get all 63 entities that have a confirmed/established/relevant Doomsday connection
 * (49 canonical checkpoints + 14 article-only entities)
 */
export function getDoomsdayConnections(): CheckpointEntity[] {
  return allMasterEntities.filter((item) => item.doomsday?.has_connection);
}

/**
 * Get the 49 canonical road checkpoints with Doomsday connections in exact 1..72 order
 */
export function getCanonicalDoomsdayCheckpoints(): CheckpointEntity[] {
  return canonicalRoad.filter((item) => item.doomsday?.has_connection);
}

/**
 * Get the 14 article-only entities with Doomsday connections
 */
export function getArticleOnlyDoomsdayEntities(): CheckpointEntity[] {
  return articleOnlyEntities.filter((item) => item.doomsday?.has_connection);
}

/**
 * Calculate dynamic progress statistics based on user progress map and canonical 72 road.
 */
export function calculateProgressStats(
  progressMap: Record<string, UserCheckpointProgress>
): ProgressSummary {
  const totalCanonical = canonicalRoad.length; // 72
  let watchedCount = 0;
  let inProgressCount = 0;

  for (const item of canonicalRoad) {
    const status = progressMap[item.id]?.status;
    if (status === 'watched') {
      watchedCount++;
    } else if (status === 'in_progress') {
      inProgressCount++;
    }
  }

  const unwatchedCount = totalCanonical - (watchedCount + inProgressCount);
  const percentComplete = totalCanonical > 0 ? Math.round((watchedCount / totalCanonical) * 100) : 0;
  const nextCheckpoint = getUpNextCheckpoint(progressMap);

  return {
    totalCanonical,
    watchedCount,
    inProgressCount,
    unwatchedCount,
    percentComplete,
    nextCheckpoint,
  };
}

/**
 * Calculate dynamic Doomsday-connected progress metrics (49 canonical connected checkpoints)
 */
export function calculateDoomsdayProgressStats(
  progressMap: Record<string, UserCheckpointProgress>
): DoomsdayProgressSummary {
  const canonicalConnected = getCanonicalDoomsdayCheckpoints();
  const totalConnected = canonicalConnected.length; // 49
  let watchedConnected = 0;
  let inProgressConnected = 0;

  for (const item of canonicalConnected) {
    const status = progressMap[item.id]?.status;
    if (status === 'watched') {
      watchedConnected++;
    } else if (status === 'in_progress') {
      inProgressConnected++;
    }
  }

  const unwatchedConnected = totalConnected - (watchedConnected + inProgressConnected);
  const percentConnected = totalConnected > 0 ? Math.round((watchedConnected / totalConnected) * 100) : 0;
  const nextDoomsdayCheckpoint = getNextDoomsdayCheckpoint(progressMap);

  return {
    totalConnected,
    watchedConnected,
    inProgressConnected,
    unwatchedConnected,
    percentConnected,
    nextDoomsdayCheckpoint,
  };
}

/**
 * UP NEXT Logic:
 * Iterates through the canonical 72 checkpoints in exact order.
 * Returns the first checkpoint whose user progress is not 'watched'.
 */
export function getUpNextCheckpoint(
  progressMap: Record<string, UserCheckpointProgress>
): CheckpointEntity | null {
  for (const item of canonicalRoad) {
    const status = progressMap[item.id]?.status;
    if (status !== 'watched') {
      return item;
    }
  }
  return null;
}

/**
 * NEXT DOOMSDAY CHECKPOINT Logic:
 * Iterates through canonical road in exact 1..72 order.
 * Returns the first checkpoint with doomsday.has_connection === true and status !== 'watched'.
 */
export function getNextDoomsdayCheckpoint(
  progressMap: Record<string, UserCheckpointProgress>
): CheckpointEntity | null {
  const connected = getCanonicalDoomsdayCheckpoints();
  for (const item of connected) {
    const status = progressMap[item.id]?.status;
    if (status !== 'watched') {
      return item;
    }
  }
  return null;
}

/**
 * Post-Credits intelligence for a specific checkpoint
 */
export function getPostCreditInfo(entityId: string): PostCreditEntry | null {
  return postCreditMap.entries.find((e) => e.entity_id === entityId) || null;
}

/**
 * All post-credit mapped entries
 */
export function getAllPostCreditEntries(): PostCreditEntry[] {
  return postCreditMap.entries;
}

/**
 * Paired reveal note for Thunderbolts* <-> Fantastic Four
 */
export function getPairedRevealNote(): string {
  return postCreditMap.paired_reveal_note;
}

/**
 * Universe continuity list
 */
export function getUniverseContinuityList(): UniverseDefinition[] {
  return universeContinuity.universes;
}

/**
 * All research-supported characters
 */
export function getAllCharacterRelationships(): CharacterRelationship[] {
  return characterRelationships.characters;
}

/**
 * Get characters related to a specific entity ID
 */
export function getCharactersForEntity(entityId: string): CharacterRelationship[] {
  return characterRelationships.characters.filter(
    (c) => c.origin_entity_id === entityId || c.key_appearances.includes(entityId)
  );
}

/**
 * Get prerequisites for a given entity ID from metadata and entity fields
 */
export function getPrerequisitesForEntity(entityId: string): string[] {
  const metaPrereqs = watchOrderMetadata.prerequisites?.[entityId];
  if (Array.isArray(metaPrereqs) && metaPrereqs.length > 0) {
    return metaPrereqs;
  }
  const entity = allMasterEntities.find((e) => e.id === entityId);
  return entity?.prerequisites || [];
}

/**
 * Resolve prerequisite strings to known master entities when unambiguous mapping exists.
 */
export function getResolvedPrerequisites(entity: CheckpointEntity): ResolvedPrerequisite[] {
  const rawPrereqs = getPrerequisitesForEntity(entity.id);
  if (!rawPrereqs || rawPrereqs.length === 0) return [];

  return rawPrereqs.map((prereqText) => {
    const norm = prereqText.toLowerCase().trim();
    const match = allMasterEntities.find((i) => {
      if (i.title.toLowerCase().trim() === norm) return true;
      const variants = (i.source_metadata?.source_variants as string[] | undefined) || [];
      if (variants.some((v) => v.toLowerCase().trim() === norm)) return true;
      if (i.title.toLowerCase().replace(/\s*\([^)]*\)/g, '').trim() === norm) return true;
      if (i.id.replace(/-/g, ' ') === norm) return true;
      return false;
    });

    return {
      text: prereqText,
      resolvedId: match ? match.id : null,
      resolvedOrder: match?.order ?? null,
      resolvedTitle: match?.title ?? null,
    };
  });
}

/**
 * Get adjacent checkpoints in strict canonical order 1..72
 */
export function getAdjacentCanonicalCheckpoints(order: number | null): {
  prev: CheckpointEntity | null;
  next: CheckpointEntity | null;
} {
  if (typeof order !== 'number') return { prev: null, next: null };
  const prev = canonicalRoad.find((i) => i.order === order - 1) || null;
  const next = canonicalRoad.find((i) => i.order === order + 1) || null;
  return { prev, next };
}

/**
 * Get side quest definition related to a specific checkpoint
 */
export function getRelatedSideQuests(entity: CheckpointEntity): SideQuestDefinition[] {
  const related: SideQuestDefinition[] = [];

  // Match AoSHIELD
  if (
    entity.id === 'captain-america-the-winter-soldier' ||
    entity.id === 'thor-the-dark-world' ||
    entity.id === 'iron-man-3'
  ) {
    const sq = sideQuestDefinitions.find((s) => s.name.includes('S.H.I.E.L.D.'));
    if (sq) related.push(sq);
  }

  // Match Defenders
  if (
    entity.id.startsWith('daredevil') ||
    entity.id.startsWith('jessica-jones') ||
    entity.id.startsWith('the-punisher')
  ) {
    const sq = sideQuestDefinitions.find((s) => s.name.includes('Defenders'));
    if (sq) related.push(sq);
  }

  // Match Raimi/Webb Spider-Man
  if (entity.id === 'spider-man-no-way-home') {
    const sq = sideQuestDefinitions.find((s) => s.name.includes('Raimi'));
    if (sq) related.push(sq);
  }

  return related;
}

/**
 * Get items with documented source conflicts (e.g. Doomsday release date conflict)
 */
export function getSourceConflicts(): CheckpointEntity[] {
  return allMasterEntities.filter(
    (item) => item.source_conflicts && item.source_conflicts.length > 0
  );
}
