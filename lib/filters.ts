import type {
  CheckpointEntity,
  EntityType,
  ClassificationImportance,
  UserCheckpointProgress,
} from './types';

export interface FilterOptions {
  type?: 'all' | EntityType;
  importance?: 'all' | ClassificationImportance;
  watchStatus?: 'all' | 'unwatched' | 'in_progress' | 'watched';
  hasDoomsdayConnection?: boolean;
  hasStopPoint?: boolean;
  searchQuery?: string;
}

/**
 * Filter items by type, importance, watch status, Doomsday tie-in, stop point, and title search.
 * Preserves the original authoritative canonical order.
 */
export function filterCheckpoints(
  items: CheckpointEntity[],
  filters: FilterOptions,
  progressMap: Record<string, UserCheckpointProgress> = {}
): CheckpointEntity[] {
  return items.filter((item) => {
    // Type filter (Movie, TV Show, Special)
    if (filters.type && filters.type !== 'all' && item.type !== filters.type) {
      return false;
    }

    // Importance filter (Essential, Recommended, Optional, Unconfirmed)
    if (
      filters.importance &&
      filters.importance !== 'all' &&
      item.classification?.importance !== filters.importance
    ) {
      return false;
    }

    // Watch status filter (unwatched, in_progress, watched)
    if (filters.watchStatus && filters.watchStatus !== 'all') {
      const currentStatus = progressMap[item.id]?.status || 'unwatched';
      if (currentStatus !== filters.watchStatus) {
        return false;
      }
    }

    // Doomsday connection filter
    if (filters.hasDoomsdayConnection && !item.doomsday?.has_connection) {
      return false;
    }

    // Stop point filter
    if (filters.hasStopPoint && !item.stop_point?.enabled) {
      return false;
    }

    // Search query: strictly matches title, subtitle, and section
    if (filters.searchQuery && filters.searchQuery.trim().length > 0) {
      const q = filters.searchQuery.toLowerCase().trim();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchSubtitle = item.subtitle ? item.subtitle.toLowerCase().includes(q) : false;
      const matchSection = item.section ? item.section.toLowerCase().includes(q) : false;
      if (!matchTitle && !matchSubtitle && !matchSection) {
        return false;
      }
    }

    return true;
  });
}
