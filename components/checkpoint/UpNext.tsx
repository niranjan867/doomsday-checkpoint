'use client';

import React from 'react';
import type { CheckpointEntity } from '@/lib/types';
import { useProgressStore } from '@/lib/progress';
import { calculateProgressStats, getUpNextCheckpoint } from '@/lib/selectors';
import { getIndiaStreamingAvailability, getUpcomingStreamingStatus } from '@/lib/streaming';
import { getSafeWatchFor, getSafeWhyItMatters } from '@/lib/spoiler-sanitizer';
import {
  Play,
  CheckCircle2,
  Clock,
  ExternalLink,
  Info,
  Tv,
  Flame,
  AlertTriangle,
} from 'lucide-react';

interface UpNextProps {
  onOpenDetails?: (entity: CheckpointEntity) => void;
  onSwitchToTimeline?: () => void;
}

export function UpNext({ onOpenDetails, onSwitchToTimeline }: UpNextProps) {
  const checkpoints = useProgressStore((state) => state.checkpoints);
  const showSpoilers = useProgressStore((state) => state.showSpoilers);
  const markWatched = useProgressStore((state) => state.markWatched);
  const markInProgress = useProgressStore((state) => state.markInProgress);

  const stats = calculateProgressStats(checkpoints);
  const nextItem = getUpNextCheckpoint(checkpoints);

  // All 72 completed state
  if (!nextItem || stats.watchedCount >= stats.totalCanonical) {
    return (
      <section className="continue-watching-spotlight journey-complete-card" aria-label="Journey Complete">
        <div className="spotlight-badge-row">
          <span className="spotlight-kicker-tag complete-tag">
            <CheckCircle2 size={14} /> JOURNEY COMPLETE
          </span>
          <span className="spotlight-order-tag">72 / 72 WATCHED (100%)</span>
        </div>

        <div className="spotlight-complete-body">
          <h2 className="spotlight-title">You’re Ready for Avengers: Doomsday</h2>
          <p className="spotlight-complete-desc">
            You have completed all 72 canonical titles in the Marvel watch guide. You have the complete context across the Infinity Saga, the Street-Level Track, the Multiverse Saga, and the X-Men timeline.
          </p>

          {onSwitchToTimeline && (
            <button
              onClick={onSwitchToTimeline}
              className="btn-spotlight-primary"
              aria-label="Explore MCU in Timeline Order"
            >
              <Clock size={16} />
              <span>Explore Timeline Order Rewatch</span>
            </button>
          )}
        </div>
      </section>
    );
  }

  const currentStatus = checkpoints[nextItem.id]?.status || 'unwatched';
  const isFirstItem = stats.watchedCount === 0;

  // Format order
  const orderFormatted = nextItem.order
    ? `#${nextItem.order.toString().padStart(2, '0')}`
    : '';

  // Metadata parts
  const metaParts: string[] = [];
  if (nextItem.release?.year) metaParts.push(nextItem.release.year.toString());
  if (nextItem.watch?.duration) metaParts.push(nextItem.watch.duration);
  if (nextItem.type) metaParts.push(nextItem.type);
  if (nextItem.watch?.episodes) {
    const epCount = typeof nextItem.watch.episodes === 'number'
      ? `${nextItem.watch.episodes} eps`
      : nextItem.watch.episodes;
    metaParts.push(epCount);
  }

  // Streaming info for nextItem
  const streamingPlatforms = getIndiaStreamingAvailability(nextItem.id);
  const upcomingStatus = getUpcomingStreamingStatus(nextItem.id);
  const hasStreaming = Boolean(streamingPlatforms && streamingPlatforms.length > 0);
  const primaryPlatform = hasStreaming ? streamingPlatforms![0] : null;

  const safeWatchFor = getSafeWatchFor(nextItem, showSpoilers);
  const safeWhyItMatters = getSafeWhyItMatters(nextItem, showSpoilers);

  return (
    <section className="continue-watching-spotlight" aria-label="Continue Watching Next Title">
      {/* Top Tagline Row */}
      <div className="spotlight-badge-row">
        <span className="spotlight-kicker-tag">
          <Play size={12} fill="currentColor" />
          {isFirstItem ? 'START YOUR MCU JOURNEY' : 'CONTINUE WATCHING'}
        </span>
        <span className="spotlight-order-tag">
          {orderFormatted ? `${orderFormatted} · ` : ''}{stats.watchedCount} / 72 WATCHED ({stats.percentComplete}%)
        </span>
      </div>

      {/* Main Card Content */}
      <div className="spotlight-main-grid">
        {/* Left Column: Title & Editorial Guidance */}
        <div className="spotlight-info-column">
          <div className="spotlight-title-group">
            {nextItem.section && (
              <span className="spotlight-section-name">{nextItem.section}</span>
            )}
            <h2 className="spotlight-title">{nextItem.title}</h2>
            {nextItem.subtitle && (
              <span className="spotlight-subtitle">{nextItem.subtitle}</span>
            )}
          </div>

          <div className="spotlight-meta-row">
            <span className="spotlight-meta-text">{metaParts.join(' · ')}</span>
            {nextItem.classification?.importance && (
              <span className={`importance-tag importance-${nextItem.classification.importance.toLowerCase()}`}>
                {nextItem.classification.importance}
              </span>
            )}
          </div>

          {/* Contextual Stop Point Viewing Rule (Active when user reaches a Stop Point) */}
          {nextItem.stop_point?.enabled && nextItem.stop_point.instruction && (
            <div className="spotlight-viewing-instruction">
              <AlertTriangle size={14} className="text-warning" />
              <span>
                <strong>Spoiler-Safe Stop:</strong> {nextItem.stop_point.instruction}
              </span>
            </div>
          )}

          {/* Watch For Guidance */}
          {safeWatchFor && (
            <div className="spotlight-guidance-box">
              <span className="guidance-label">WATCH FOR 👀</span>
              <p className="guidance-text">{safeWatchFor}</p>
            </div>
          )}

          {/* Why It Matters */}
          {safeWhyItMatters && (
            <div className="spotlight-why-matters-box">
              <span className="guidance-label">WHY IT MATTERS</span>
              <p className="guidance-text">{safeWhyItMatters}</p>
            </div>
          )}
        </div>

        {/* Right Column: Prominent Streaming & Action Buttons */}
        <div className="spotlight-action-column">
          {/* Where to Watch in India Box */}
          <div className="spotlight-streaming-card">
            <div className="streaming-card-header">
              <Tv size={14} className="text-secondary" />
              <span className="streaming-card-label">WHERE TO WATCH IN INDIA</span>
            </div>

            {hasStreaming && primaryPlatform ? (
              <div className="streaming-card-body">
                <div className="platform-brand-row">
                  <span className="platform-name">{primaryPlatform.platform}</span>
                  <span className="platform-verified-badge">Verified in India</span>
                </div>

                {primaryPlatform.url ? (
                  <a
                    href={primaryPlatform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-stream-now"
                    aria-label={`Watch ${nextItem.title} on ${primaryPlatform.platform} (opens in new tab)`}
                  >
                    <span>WATCH ON {primaryPlatform.platform.toUpperCase()}</span>
                    <ExternalLink size={14} />
                  </a>
                ) : (
                  <span className="platform-available-text">Available on {primaryPlatform.platform}</span>
                )}
              </div>
            ) : upcomingStatus ? (
              <div className="streaming-card-body">
                <div className="platform-brand-row">
                  <span className="platform-name">COMING SOON</span>
                  <span className="platform-upcoming-badge">Upcoming</span>
                </div>
                <p className="streaming-note-text">Streaming availability not yet announced.</p>
              </div>
            ) : (
              <div className="streaming-card-body">
                <div className="platform-brand-row">
                  <span className="platform-unverified-name">STREAMING IN INDIA</span>
                </div>
                <p className="streaming-note-text">Availability not currently verified.</p>
              </div>
            )}
          </div>

          {/* Tracking Actions */}
          <div className="spotlight-tracking-actions">
            {currentStatus !== 'watched' ? (
              <button
                onClick={() => markWatched(nextItem.id)}
                className="btn-spotlight-watch"
                aria-label={`Mark ${nextItem.title} as watched`}
              >
                <CheckCircle2 size={16} />
                <span>MARK AS WATCHED</span>
              </button>
            ) : (
              <button className="btn-spotlight-watched-done" disabled>
                <CheckCircle2 size={16} />
                <span>✓ WATCHED</span>
              </button>
            )}

            {currentStatus === 'unwatched' && (
              <button
                onClick={() => markInProgress(nextItem.id)}
                className="btn-spotlight-secondary"
                aria-label={`Mark ${nextItem.title} in progress`}
              >
                <Clock size={15} />
                <span>In Progress</span>
              </button>
            )}

            {onOpenDetails && (
              <button
                onClick={() => onOpenDetails(nextItem)}
                className="btn-spotlight-details"
                aria-label={`View full details for ${nextItem.title}`}
              >
                <Info size={14} />
                <span>View Details</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
