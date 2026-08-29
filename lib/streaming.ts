import type { StreamingAvailability, EntityStreamingRecord } from './types';
import indiaStreamingRaw from '../data/india_streaming.json';

/**
 * DOOMSDAY CHECKPOINT — Streaming Availability Layer (India & Global)
 *
 * Architectural Principle:
 * CONTENT (master_dataset.json) + USER STATE (Zustand) + STREAMING (streaming.ts)
 * remain 100% independent.
 */

interface IndiaStreamingItem {
  id: string;
  order?: number | null;
  title: string;
  type?: string;
  availability: StreamingAvailability[];
}

interface IndiaStreamingFile {
  country: string;
  region: string;
  last_verified: string;
  platforms: { primary: string };
  items: IndiaStreamingItem[];
}

const indiaData = indiaStreamingRaw as unknown as IndiaStreamingFile;

// Pre-populate registry with verified India streaming data
const streamingRegistry: Record<string, StreamingAvailability[]> = {};

if (indiaData && Array.isArray(indiaData.items)) {
  indiaData.items.forEach((item) => {
    if (item.id && Array.isArray(item.availability)) {
      streamingRegistry[item.id] = item.availability;
    }
  });
}

/**
 * Retrieve verified streaming options for India (country code 'IN' or 'India')
 */
export function getIndiaStreamingAvailability(
  entityId: string
): StreamingAvailability[] | null {
  const records = streamingRegistry[entityId];
  if (!records || records.length === 0) {
    return null;
  }

  const indiaRecords = records.filter(
    (r) =>
      (r.country.toUpperCase() === 'IN' || r.country.toLowerCase() === 'india') &&
      r.status === 'verified' &&
      Boolean(r.url)
  );

  return indiaRecords.length > 0 ? indiaRecords : null;
}

/**
 * Check if the entity is designated as upcoming with no streaming yet announced
 */
export function getUpcomingStreamingStatus(
  entityId: string
): StreamingAvailability | null {
  const records = streamingRegistry[entityId];
  if (!records) return null;
  const upcoming = records.find((r) => r.status === 'upcoming');
  return upcoming || null;
}

/**
 * Check if verified India streaming exists for an entity
 */
export function hasVerifiedIndiaStreaming(entityId: string): boolean {
  const records = getIndiaStreamingAvailability(entityId);
  return Boolean(records && records.length > 0);
}

/**
 * Method to register additional verified streaming data
 */
export function registerStreamingData(records: EntityStreamingRecord[]): void {
  records.forEach((record) => {
    if (record.entity_id && Array.isArray(record.availability)) {
      streamingRegistry[record.entity_id] = record.availability;
    }
  });
}
