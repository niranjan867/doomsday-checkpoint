'use client';

import React from 'react';
import type { CheckpointEntity, WatchOrderMode } from '@/lib/types';
import { useProgressStore } from '@/lib/progress';
import { getIndiaStreamingAvailability, getUpcomingStreamingStatus } from '@/lib/streaming';
import { getSafeWatchFor, getSafeWhyItMatters } from '@/lib/spoiler-sanitizer';
import { TIMELINE_METADATA_MAP } from '@/lib/timeline-order';
import {
  CheckCircle2,
  Clock,
  ExternalLink,
  Info,
  Tv,
  AlertTriangle,
  Play,
} from 'lucide-react';

interface CheckpointCardProps {
  checkpoint: CheckpointEntity;
  mode?: WatchOrderMode;
  onOpenDetails?: (entity: CheckpointEntity) => void;
}

export function CheckpointCard({ checkpoint, mode = 'release', onOpenDetails }: CheckpointCardProps) {
  const checkpoints = useProgressStore((state) => state.checkpoints);
  const showSpoilers = useProgressStore((state) => state.showSpoilers);
  const markWatched = useProgressStore((state) => state.markWatched);
  const markInProgress = useProgressStore((state) => state.markInProgress);
  const markUnwatched = useProgressStore((state) => state.markUnwatched);

  const status = checkpoints[checkpoint.id]?.status || 'unwatched';
  const isWatched = status === 'watched';
  const isInProgress = status === 'in_progress';

  // Streaming info
  const streamingPlatforms = getIndiaStreamingAvailability(checkpoint.id);
  const upcomingStatus = getUpcomingStreamingStatus(checkpoint.id);
  const hasStreaming = Boolean(streamingPlatforms && streamingPlatforms.length > 0);
  const primaryPlatform = hasStreaming ? streamingPlatforms![0] : null;

  // Editorial texts
  const safeWatchFor = getSafeWatchFor(checkpoint, showSpoilers);
  const safeWhyItMatters = getSafeWhyItMatters(checkpoint, showSpoilers);

  // Timeline metadata if in timeline mode
  const timelineMeta = TIMELINE_METADATA_MAP[checkpoint.id];

  // Order tag
  const orderFormatted = checkpoint.order
    ? `#${checkpoint.order.toString().padStart(2, '0')}`
    : '';

  // Metadata parts
  const metaParts: string[] = [];
  if (mode === 'timeline' && timelineMeta?.timelineYear) {
    metaParts.push(timelineMeta.timelineYear);
  } else if (checkpoint.release?.year) {
    metaParts.push(checkpoint.release.year.toString());
  }

  if (checkpoint.watch?.duration) metaParts.push(checkpoint.watch.duration);
  if (checkpoint.type) metaParts.push(checkpoint.type);
  if (checkpoint.watch?.episodes) {
    const epCount = typeof checkpoint.watch.episodes === 'number'
      ? `${checkpoint.watch.episodes} eps`
      : checkpoint.watch.episodes;
    metaParts.push(epCount);
  }

  const handleStatusCycle = () => {
    if (isWatched) {
      markUnwatched(checkpoint.id);
    } else {
      markWatched(checkpoint.id);
    }
  };

  return (
    <article
      id={`checkpoint-${checkpoint.id}`}
      className={`media-watchlist-card ${isWatched ? 'card-status-watched' : isInProgress ? 'card-status-inprogress' : ''}`}
      aria-label={`${checkpoint.title} (${isWatched ? 'Watched' : isInProgress ? 'In Progress' : 'Unwatched'})`}
    >
      {/* Left / Top Header Row */}
      <div className="media-card-main-col">
        <div className="media-card-header-row">
          <div className="media-card-title-group">
            {orderFormatted && (
              <span className="media-card-order">{orderFormatted}</span>
            )}
            <h4 className="media-card-title">{checkpoint.title}</h4>
            {checkpoint.subtitle && (
              <span className="media-card-subtitle">{checkpoint.subtitle}</span>
            )}
          </div>

          {checkpoint.classification?.importance && (
            <span
              className={`importance-tag importance-${checkpoint.classification.importance.toLowerCase()}`}
            >
              {checkpoint.classification.importance}
            </span>
          )}
        </div>

        {/* Metadata Row */}
        <div className="media-card-meta-row">
          <span className="media-card-meta-text">{metaParts.join(' · ')}</span>
          {timelineMeta?.universe && (
            <span className="timeline-universe-badge">{timelineMeta.universe}</span>
          )}
        </div>

        {/* Contextual Stop Point Note */}
        {checkpoint.stop_point?.enabled && checkpoint.stop_point.instruction && (
          <div className="media-card-stoppoint-notice">
            <AlertTriangle size={13} className="text-warning" />
            <span>
              <strong>Spoiler-Safe Stop:</strong> {checkpoint.stop_point.instruction}
            </span>
          </div>
        )}

        {/* Spoiler-Safe Watch For */}
        {safeWatchFor && (
          <div className="media-card-guidance-line">
            <span className="guidance-label-inline">Watch for:</span>
            <span className="guidance-text-inline">{safeWatchFor}</span>
          </div>
        )}

        {/* Why It Matters */}
        {safeWhyItMatters && (
          <div className="media-card-why-line">
            <span className="why-label-inline">Why it matters:</span>
            <span className="why-text-inline">{safeWhyItMatters}</span>
          </div>
        )}
      </div>

      {/* Right Column: Streaming Availability & Actions */}
      <div className="media-card-actions-col">
        {/* Streaming Platform & Link */}
        <div className="media-card-streaming-box">
          {hasStreaming && primaryPlatform ? (
            <div className="media-stream-available">
              <span className="stream-provider-name">
                <Tv size={13} className="text-secondary" />
                {primaryPlatform.platform}
              </span>
              {primaryPlatform.url ? (
                <a
                  href={primaryPlatform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-card-stream-now"
                  aria-label={`Watch ${checkpoint.title} on ${primaryPlatform.platform} (opens in new tab)`}
                >
                  <Play size={12} fill="currentColor" />
                  <span>WATCH ON {primaryPlatform.platform.toUpperCase()}</span>
                  <ExternalLink size={11} />
                </a>
              ) : (
                <span className="stream-badge-available">Available on {primaryPlatform.platform}</span>
              )}
            </div>
          ) : upcomingStatus ? (
            <div className="media-stream-upcoming">
              <span className="stream-badge-upcoming">COMING SOON</span>
            </div>
          ) : (
            <div className="media-stream-unverified">
              <span className="stream-badge-unverified">Streaming not verified</span>
            </div>
          )}
        </div>

        {/* Watch Status & Details Buttons */}
        <div className="media-card-btn-group">
          <button
            onClick={handleStatusCycle}
            className={`btn-card-mark-watched ${isWatched ? 'btn-watched-active' : ''}`}
            aria-label={isWatched ? `Mark ${checkpoint.title} unwatched` : `Mark ${checkpoint.title} watched`}
          >
            <CheckCircle2 size={14} />
            <span>{isWatched ? '✓ WATCHED' : 'Mark Watched'}</span>
          </button>

          {onOpenDetails && (
            <button
              onClick={() => onOpenDetails(checkpoint)}
              className="btn-card-details"
              aria-label={`View details and guide for ${checkpoint.title}`}
            >
              <Info size={14} />
              <span>Details</span>
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
