'use client';

import React, { useState } from 'react';
import type { CheckpointEntity } from '@/lib/types';
import { useProgressStore } from '@/lib/progress';
import { getIndiaStreamingAvailability, getUpcomingStreamingStatus } from '@/lib/streaming';
import { getSafeWatchFor, getSafeWhyItMatters } from '@/lib/spoiler-sanitizer';
import { TIMELINE_METADATA_MAP } from '@/lib/timeline-order';
import {
  X,
  CheckCircle2,
  Clock,
  ExternalLink,
  Lock,
  Unlock,
  ChevronLeft,
  ChevronRight,
  Tv,
  Play,
  Sparkles,
  AlertTriangle,
} from 'lucide-react';

interface CheckpointDetailModalProps {
  checkpoint: CheckpointEntity | null;
  onClose: () => void;
  onSelectCheckpoint: (checkpoint: CheckpointEntity) => void;
}

export function CheckpointDetailModal({
  checkpoint,
  onClose,
  onSelectCheckpoint,
}: CheckpointDetailModalProps) {
  const [localShowSpoilers, setLocalShowSpoilers] = useState(false);

  const checkpoints = useProgressStore((state) => state.checkpoints);
  const globalShowSpoilers = useProgressStore((state) => state.showSpoilers);
  const markWatched = useProgressStore((state) => state.markWatched);
  const markInProgress = useProgressStore((state) => state.markInProgress);
  const markUnwatched = useProgressStore((state) => state.markUnwatched);

  if (!checkpoint) return null;

  const showSpoilers = globalShowSpoilers || localShowSpoilers;
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
  const timelineMeta = TIMELINE_METADATA_MAP[checkpoint.id];

  // Metadata parts
  const metaParts: string[] = [];
  if (checkpoint.release?.year) metaParts.push(checkpoint.release.year.toString());
  if (checkpoint.watch?.duration) metaParts.push(checkpoint.watch.duration);
  if (checkpoint.type) metaParts.push(checkpoint.type);
  if (checkpoint.watch?.episodes) {
    const epCount = typeof checkpoint.watch.episodes === 'number'
      ? `${checkpoint.watch.episodes} eps`
      : checkpoint.watch.episodes;
    metaParts.push(epCount);
  }

  // Doomsday relevance label
  let doomsdayRelevanceLabel = '— GENERAL MCU CONTEXT';
  let doomsdayRelevanceClass = 'relevance-general';
  if (checkpoint.doomsday?.has_connection && checkpoint.classification?.importance === 'Essential') {
    doomsdayRelevanceLabel = '● DIRECT DOOMSDAY CONNECTION';
    doomsdayRelevanceClass = 'relevance-direct';
  } else if (checkpoint.doomsday?.has_connection) {
    doomsdayRelevanceLabel = '● IMPORTANT PREPARATION';
    doomsdayRelevanceClass = 'relevance-important';
  }

  return (
    <div
      className="modal-backdrop-layer"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="modal-backdrop-dismiss" onClick={onClose} />

      <div className="cinema-detail-modal">
        {/* Modal Header */}
        <div className="modal-top-bar">
          <div className="modal-header-titles">
            {checkpoint.order && (
              <span className="modal-order-tag">
                #{checkpoint.order.toString().padStart(2, '0')} OF 72
              </span>
            )}
            <h2 id="modal-title" className="modal-main-title">{checkpoint.title}</h2>
            {checkpoint.subtitle && (
              <span className="modal-subtitle">{checkpoint.subtitle}</span>
            )}
          </div>

          <button
            onClick={onClose}
            className="btn-modal-close"
            aria-label="Close details dialog"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-scroll-content">
          {/* Metadata & Importance Row */}
          <div className="modal-meta-row">
            <span className="modal-meta-text">{metaParts.join(' · ')}</span>
            {checkpoint.classification?.importance && (
              <span className={`importance-tag importance-${checkpoint.classification.importance.toLowerCase()}`}>
                {checkpoint.classification.importance}
              </span>
            )}
            {timelineMeta?.timelineYear && (
              <span className="modal-timeline-tag">Timeline: {timelineMeta.timelineYear}</span>
            )}
          </div>

          {/* Doomsday Relevance Tag */}
          <div className={`modal-relevance-strip ${doomsdayRelevanceClass}`}>
            <Sparkles size={13} />
            <span>{doomsdayRelevanceLabel}</span>
          </div>

          {/* Where to Watch in India Box */}
          <div className="modal-streaming-section">
            <div className="modal-streaming-header">
              <Tv size={14} className="text-secondary" />
              <span className="modal-section-heading">WHERE TO WATCH IN INDIA</span>
            </div>

            {hasStreaming && primaryPlatform ? (
              <div className="modal-streaming-card">
                <div className="platform-brand-row">
                  <span className="platform-name">{primaryPlatform.platform}</span>
                  <span className="platform-verified-badge">Verified in India</span>
                </div>

                {primaryPlatform.url ? (
                  <a
                    href={primaryPlatform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-modal-stream-now"
                    aria-label={`Watch ${checkpoint.title} on ${primaryPlatform.platform} (opens in new tab)`}
                  >
                    <Play size={14} fill="currentColor" />
                    <span>WATCH ON {primaryPlatform.platform.toUpperCase()}</span>
                    <ExternalLink size={13} />
                  </a>
                ) : (
                  <span className="platform-available-text">Available on {primaryPlatform.platform}</span>
                )}
              </div>
            ) : upcomingStatus ? (
              <div className="modal-streaming-card">
                <div className="platform-brand-row">
                  <span className="platform-name">COMING SOON</span>
                  <span className="platform-upcoming-badge">Upcoming Release</span>
                </div>
                <p className="streaming-note-text">Streaming availability will be announced closer to release.</p>
              </div>
            ) : (
              <div className="modal-streaming-card">
                <div className="platform-brand-row">
                  <span className="platform-unverified-name">STREAMING IN INDIA</span>
                </div>
                <p className="streaming-note-text">Streaming availability not currently verified in India.</p>
              </div>
            )}
          </div>

          {/* Contextual Stop Point Rule */}
          {checkpoint.stop_point?.enabled && checkpoint.stop_point.instruction && (
            <div className="modal-stoppoint-notice">
              <AlertTriangle size={15} className="text-warning" />
              <div>
                <strong>Spoiler-Safe Stop:</strong> {checkpoint.stop_point.instruction}
              </div>
            </div>
          )}

          {/* Watch For Guidance */}
          {safeWatchFor && (
            <div className="modal-editorial-block">
              <span className="modal-block-label">WATCH FOR 👀</span>
              <p className="modal-block-text">{safeWatchFor}</p>
            </div>
          )}

          {/* Why It Matters */}
          {safeWhyItMatters && (
            <div className="modal-editorial-block">
              <span className="modal-block-label">WHY IT MATTERS</span>
              <p className="modal-block-text">{safeWhyItMatters}</p>
            </div>
          )}

          {/* Prerequisites */}
          {checkpoint.prerequisites && checkpoint.prerequisites.length > 0 && (
            <div className="modal-editorial-block">
              <span className="modal-block-label">RECOMMENDED PRIOR TITLES</span>
              <ul className="modal-prereq-list">
                {checkpoint.prerequisites.map((prereq: string, idx: number) => (
                  <li key={idx} className="modal-prereq-item">
                    {prereq}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Spoiler Protected Information */}
          <div className="modal-spoiler-container">
            <div className="modal-spoiler-header">
              <span className="modal-block-label">SPOILER-PROTECTED INFORMATION</span>
              <button
                onClick={() => setLocalShowSpoilers(!localShowSpoilers)}
                className="btn-reveal-spoilers"
                aria-label={showSpoilers ? 'Hide sensitive spoilers' : 'Reveal sensitive story information'}
              >
                {showSpoilers ? <Unlock size={13} /> : <Lock size={13} />}
                <span>{showSpoilers ? 'Hide Spoilers' : 'Reveal Spoilers'}</span>
              </button>
            </div>

            {showSpoilers ? (
              <div className="modal-spoiler-content-open">
                {checkpoint.doomsday?.connection && (
                  <div className="spoiler-entry">
                    <strong>Storyline & Multiverse Ties:</strong>
                    <p>{checkpoint.doomsday.connection}</p>
                  </div>
                )}
                {checkpoint.guidance?.watch_instruction && (
                  <div className="spoiler-entry">
                    <strong>Post-Credits & In-Depth Intel:</strong>
                    <p>{checkpoint.guidance.watch_instruction}</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="modal-spoiler-locked-placeholder">
                <Lock size={14} className="text-secondary" />
                <span>Contains future storyline developments and post-credits details.</span>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer Tracking Bar */}
        <div className="modal-footer-bar">
          <div className="modal-status-buttons">
            {isWatched ? (
              <button
                onClick={() => markUnwatched(checkpoint.id)}
                className="btn-modal-status btn-watched-active"
                aria-label="Mark as unwatched"
              >
                <CheckCircle2 size={15} />
                <span>✓ WATCHED</span>
              </button>
            ) : (
              <button
                onClick={() => markWatched(checkpoint.id)}
                className="btn-modal-status btn-status-primary"
                aria-label="Mark as watched"
              >
                <CheckCircle2 size={15} />
                <span>Mark as Watched</span>
              </button>
            )}

            {!isWatched && !isInProgress && (
              <button
                onClick={() => markInProgress(checkpoint.id)}
                className="btn-modal-status btn-status-secondary"
                aria-label="Mark in progress"
              >
                <Clock size={15} />
                <span>In Progress</span>
              </button>
            )}
          </div>

          <button
            onClick={onClose}
            className="btn-modal-dismiss-footer"
            aria-label="Close modal"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
