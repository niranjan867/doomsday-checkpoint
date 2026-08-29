import masterDatasetRaw from '@/data/master_dataset.json';
import moviesDatasetRaw from '@/data/movies_dataset.json';
import tvShowsDatasetRaw from '@/data/tv_shows_dataset.json';
import specialsDatasetRaw from '@/data/specials_dataset.json';
import watchOrderMetadataRaw from '@/data/watch_order_metadata.json';
import doomsdayDataRaw from '@/data/doomsday_data.json';
import dataAuditRaw from '@/data/data_audit.json';

// Modular research datasets
import universeContinuityRaw from '@/data/universe_continuity.json';
import postCreditMapRaw from '@/data/post_credit_map.json';
import characterRelationshipsRaw from '@/data/character_relationships.json';
import sourceRegistryRaw from '@/data/source_registry.json';
import researchConflictsRaw from '@/data/research_conflicts.json';
import researchQualityReportRaw from '@/data/research_quality_report.json';

import type {
  MasterDataset,
  CheckpointEntity,
  WatchOrderMetadata,
  DataAudit,
  SideQuestDefinition,
  UniverseContinuityDataset,
  PostCreditDataset,
  CharacterRelationshipsDataset,
  SourceRegistryDataset,
} from './types';

/**
 * Authoritative Canonical Master Dataset
 */
export const masterDataset: MasterDataset = masterDatasetRaw as unknown as MasterDataset;

/**
 * Supporting datasets (derived / specialized views)
 */
export const moviesDataset = moviesDatasetRaw;
export const tvShowsDataset = tvShowsDatasetRaw;
export const specialsDataset = specialsDatasetRaw;
export const watchOrderMetadata = watchOrderMetadataRaw as unknown as WatchOrderMetadata;
export const doomsdayData = doomsdayDataRaw;
export const dataAudit: DataAudit = dataAuditRaw as unknown as DataAudit;

/**
 * Research Datasets
 */
export const universeContinuity: UniverseContinuityDataset = universeContinuityRaw as unknown as UniverseContinuityDataset;
export const postCreditMap: PostCreditDataset = postCreditMapRaw as unknown as PostCreditDataset;
export const characterRelationships: CharacterRelationshipsDataset = characterRelationshipsRaw as unknown as CharacterRelationshipsDataset;
export const sourceRegistry: SourceRegistryDataset = sourceRegistryRaw as unknown as SourceRegistryDataset;
export const researchConflicts = researchConflictsRaw;
export const researchQualityReport = researchQualityReportRaw;

/**
 * Canonical 72 Checkpoint Primary Road
 * Filtered by order != null, sorted ascending by order.
 */
export const canonicalRoad: CheckpointEntity[] = (
  masterDataset.master_watchlist || []
)
  .filter((item): item is CheckpointEntity & { order: number } => typeof item.order === 'number')
  .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

/**
 * Complete 86 Unique Master Entities
 */
export const allMasterEntities: CheckpointEntity[] = masterDataset.master_watchlist || [];

/**
 * 14 Article-only entities (order is null)
 */
export const articleOnlyEntities: CheckpointEntity[] = (
  masterDataset.master_watchlist || []
).filter((item) => item.order === null);

/**
 * Side Quest Definitions
 */
export const sideQuestDefinitions: SideQuestDefinition[] = masterDataset.side_quests || [];

/**
 * Stop Points from canonical data (7 items)
 */
export const canonicalStopPoints: CheckpointEntity[] = (
  masterDataset.master_watchlist || []
).filter((item) => item.stop_point?.enabled);
