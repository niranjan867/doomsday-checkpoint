/**
 * DOOMSDAY CHECKPOINT — Core Type Definitions
 * Strict TypeScript models reflecting authoritative datasets and research.
 */

export type EntityType = 'Movie' | 'TV Show' | 'Special';

export type ClassificationImportance = 'Essential' | 'Recommended' | 'Optional' | 'Unconfirmed';

export type ClassificationCategory = 'main' | 'side_quest' | 'special';

export type DoomsdayConfidence =
  | 'confirmed'
  | 'established'
  | 'relevant'
  | 'expected'
  | 'CONFIRMED'
  | 'ESTABLISHED'
  | 'REPORTED'
  | 'INFERRED'
  | 'SPECULATION'
  | 'UNKNOWN'
  | string;

export type ConfidenceTier =
  | 'CONFIRMED'
  | 'ESTABLISHED'
  | 'REPORTED'
  | 'INFERRED'
  | 'SPECULATION'
  | 'UNKNOWN';

export interface ReleaseInfo {
  year: number | null;
  date: string | null;
  period: string | null;
  status: string | null;
}

export interface WatchRangeObject {
  start_episode: number | null;
  end_episode: number | null;
}

export interface WatchInfo {
  duration: string | null;
  episodes: number | string | null;
  watch_range: string | WatchRangeObject | null;
}

export interface ClassificationInfo {
  importance: ClassificationImportance;
  required: boolean | null;
  category: ClassificationCategory;
}

export interface GuidanceInfo {
  watch_for: string | null;
  watch_instruction: string | null;
}

export interface StopPointInfo {
  enabled: boolean;
  instruction: string | null;
  next_item: string | null;
}

export interface SpoilerInfo {
  contains_spoiler: boolean;
  label: string | null;
  content: string | null;
}

export interface DoomsdayInfo {
  has_connection: boolean;
  connection: string | null;
  spoiler: SpoilerInfo | null;
  confidence?: DoomsdayConfidence | null;
  connection_type?: string[] | null;
  evidence_type?: ConfidenceTier | string | null;
  sources?: string[] | null;
}

export interface SourceConflict {
  field: string;
  values: string[];
  sources: string[];
}

export interface EntitySource {
  file: string;
  location: string;
  capture?: string;
  road_order?: number;
  source_kind?: string;
}

export interface SourceMetadata {
  publisher?: string | null;
  rating?: number | string | null;
  release_metadata_raw?: string | null;
  status_note?: string | null;
  source_variants?: string[];
  [key: string]: unknown;
}

export interface SourceOrders {
  road_to_doomsday?: number | null;
  [key: string]: number | null | undefined;
}

export interface CheckpointEntity {
  id: string;
  order: number | null; // 1..72 for primary canonical road; null for article-only
  title: string;
  subtitle: string | null;
  type: EntityType;
  release: ReleaseInfo;
  watch: WatchInfo;
  classification: ClassificationInfo;
  section: string | null;
  guidance: GuidanceInfo;
  stop_point: StopPointInfo;
  doomsday: DoomsdayInfo;
  prerequisites: string[];
  universe: string | null;
  source_conflicts: SourceConflict[];
  sources: EntitySource[];
  source_metadata: SourceMetadata;
  source_orders: SourceOrders;
  source_variants?: string[];
}

export interface SideQuestDefinition {
  name: string;
  category: string;
  watch_order: string;
  source: string;
  location: string;
}

export interface DataAuditConflict {
  id?: string;
  title?: string;
  field?: string;
  values?: string[];
  sources?: string[];
  status?: string;
  conflicts?: unknown[];
  [key: string]: unknown;
}

export interface DataAudit {
  source_files: number;
  main_watchlist_entries: number;
  road_to_doomsday_rows: number;
  exact_title_matches_merged: number;
  article_only_entries: number;
  master_unique_entities: number;
  movie_entries: number;
  tv_show_entries: number;
  special_entries: number;
  main_road_entries: number;
  side_quest_entries: number;
  essential: number;
  recommended: number;
  optional: number;
  unconfirmed: number;
  stop_points: number;
  doomsday_connections: number;
  spoiler_sections: number;
  prerequisite_relationships: number;
  duplicates_merged: number;
  conflicts_found: number;
  conflicts: DataAuditConflict[];
  missing_information?: Record<string, unknown> | string;
  variant_matches_merged?: number;
  total_title_matches_merged?: number;
}

export interface MasterDataset {
  dataset_name: string;
  source_of_truth: string[];
  canonical_order_basis: string;
  master_watchlist: CheckpointEntity[];
  side_quests: SideQuestDefinition[];
  views: Record<string, unknown>;
  data_audit: DataAudit;
  raw_source_inventory?: Record<string, unknown>;
  data_loss_report?: Record<string, unknown>;
  field_inventory?: Record<string, unknown>;
}

export interface WatchOrderMetadata {
  dataset: string;
  stop_points: CheckpointEntity[];
  prerequisites: Record<string, string[]>;
  side_quests: SideQuestDefinition[];
}

export interface TypedDataset<T = CheckpointEntity> {
  dataset: string;
  items: T[];
}

/* =========================================================
   USER STATE TYPES (Separated cleanly from Content)
========================================================= */

export type WatchStatus = 'unwatched' | 'in_progress' | 'watched';

export interface UserCheckpointProgress {
  status: WatchStatus;
  updatedAt?: string;
  notes?: string;
}

export interface UserProgressState {
  version: number;
  checkpoints: Record<string, UserCheckpointProgress>;
  lastActiveCheckpointId: string | null;
  showSpoilers: boolean;
  preferences: {
    reducedMotion: boolean;
    filterType: 'all' | 'Movie' | 'TV Show' | 'Special';
    filterImportance: 'all' | ClassificationImportance;
  };
}

/* =========================================================
   RESEARCH & CONTINUITY MODELS
========================================================= */

export interface UniverseDefinition {
  id: string;
  name: string;
  description: string;
  confidence: string;
  evidence: string;
}

export interface UniverseContinuityDataset {
  universes: UniverseDefinition[];
  unconfirmed_universe_numbering: string;
  convergence_mechanism_status: string;
}

export interface PostCreditEntry {
  entity_id: string;
  title: string;
  has_post_credit_scene: boolean;
  has_mid_credit_scene: boolean;
  scene_relevance: 'CRITICAL' | 'HIGH' | 'MODERATE' | 'LOW' | string;
  leads_to: string;
  foreshadows: string;
  introduces: string;
}

export interface PostCreditDataset {
  entries: PostCreditEntry[];
  paired_reveal_note: string;
}

export interface CharacterRelationship {
  id: string;
  name: string;
  universe: string;
  origin_title: string;
  origin_entity_id: string;
  key_appearances: string[];
  doomsday_role: string;
  evidence_type: ConfidenceTier | string;
  confidence: ConfidenceTier | string;
  speculation_notes: string | null;
}

export interface CharacterRelationshipsDataset {
  characters: CharacterRelationship[];
}

export interface ResearchSource {
  id: string;
  claim: string;
  source: string;
  source_type: string;
  access_date: string;
  confidence: string;
}

export interface SourceRegistryDataset {
  sources: ResearchSource[];
}

/* =========================================================
   WATCH ORDER MODES (Derived Views)
========================================================= */

export type WatchOrderMode = 'release' | 'timeline' | 'canonical' | 'doomsday_prep' | 'movies_only';

/* =========================================================
   SELECTOR / VIEW MODELS
========================================================= */

export interface ResolvedPrerequisite {
  text: string;
  resolvedId: string | null;
  resolvedOrder?: number | null;
  resolvedTitle?: string | null;
}

export interface ProgressSummary {
  totalCanonical: number;
  watchedCount: number;
  inProgressCount: number;
  unwatchedCount: number;
  percentComplete: number;
  nextCheckpoint: CheckpointEntity | null;
}

export interface DoomsdayProgressSummary {
  totalConnected: number;
  watchedConnected: number;
  inProgressConnected: number;
  unwatchedConnected: number;
  percentConnected: number;
  nextDoomsdayCheckpoint: CheckpointEntity | null;
}

/* =========================================================
   STREAMING AVAILABILITY TYPES (Independent Layer)
========================================================= */

export type StreamingFormat = 'subscription' | 'rent' | 'buy' | 'free' | string;
export type StreamingStatus = 'verified' | 'unverified' | 'unavailable' | 'upcoming' | string;

export interface StreamingAvailability {
  country: string; // e.g. "IN"
  platform: string; // e.g. "JioHotstar"
  url: string | null;
  status: StreamingStatus;
  format?: StreamingFormat;
  verified_at?: string | null;
  source?: string | null;
  notes?: string | null;
}

export interface EntityStreamingRecord {
  entity_id: string;
  availability: StreamingAvailability[];
}
