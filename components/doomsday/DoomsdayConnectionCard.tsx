'use client';

import React, { useState } from 'react';
import type { CheckpointEntity } from '@/lib/types';
import { useProgressStore } from '@/lib/progress';
import { getIndiaStreamingAvailability, getUpcomingStreamingStatus } from '@/lib/streaming';
import {
  CheckCircle2,
  Circle,
  Clock,
  Sparkles,
  AlertTriangle,
  Eye,
  EyeOff,
  Info,
  ExternalLink,
} from 'lucide-react';

interface DoomsdayConnectionCardProps {
  checkpoint: CheckpointEntity;
  isNext?: boolean;
  onOpenCompanion?: (checkpoint: CheckpointEntity) => void;
}

export function DoomsdayConnectionCard({
  checkpoint,
  isNext = false,
  onOpenCompanion,
}: DoomsdayConnectionCardProps) {
  const userProgress = useProgressStore((state) => state.checkpoints[checkpoint.id]);
  const globalShowSpoilers = useProgressStore((state) => state.showSpoilers);
  const markWatched = useProgressStore((state) => state.markWatched);
  const markUnwatched = useProgressStore((state) => state.markUnwatched);

  const [localSpoilerRevealed, setLocalSpoilerRevealed] = useState(false);

  const status = userProgress?.status || 'unwatched';
  const isWatched = status === 'watched';

  const orderFormatted =
    typeof checkpoint.order === 'number'
      ? `#${checkpoint.order.toString().padStart(2, '0')}`
      : 'Article';

  const safeConnection = checkpoint.doomsday?.connection;
  const hasSpoiler = checkpoint.doomsday?.spoiler?.contains_spoiler;
  const isSpoilerVisible = globalShowSpoilers || localSpoilerRevealed;

  // Streaming platform data
  const streamingPlatforms = getIndiaStreamingAvailability(checkpoint.id);
  const upcomingStatus = getUpcomingStreamingStatus(checkpoint.id);
  const hasStreaming = Boolean(streamingPlatforms && streamingPlatforms.length > 0);
  const primaryPlatform = hasStreaming ? streamingPlatforms![0] : null;

  return (
    <article
      id={`doomsday-card-${checkpoint.id}`}
      className={`media-watchlist-card ${isNext ? 'card-is-up-next' : ''} ${isWatched ? 'card-is-watched' : ''}`}
    >
      {/* Order & Status */}
      <div className="media-card-status-col">
        <span className="media-card-order">{orderFormatted}</span>
        <button
          onClick={() => isWatched ? markUnwatched(checkpoint.id) : markWatched(checkpoint.id)}
          className={`btn-media-status-toggle status-${status}`}
          aria-label={`Mark ${checkpoint.title} as ${isWatched ? 'unwatched' : 'watched'}`}
        >
          {isWatched ? (
            <CheckCircle2 size={20} className="icon-status-watched" />
          ) : (
            <Circle size={20} className="icon-status-unwatched" />
          )}
        </button>
      </div>

      {/* Main Content */}
      <div className="media-card-content-col">
        <div className="media-card-header-row">
          <div className="media-title-wrap">
            <h3 className="media-card-title">{checkpoint.title}</h3>
            {checkpoint.subtitle && (
              <span className="media-card-subtitle">{checkpoint.subtitle}</span>
            )}
          </div>
          {isNext && (
            <span className="badge-up-next-pill">
              <Sparkles size={11} /> NEXT DOOMSDAY STEP
            </span>
          )}
        </div>

        {/* Clean Meta Line */}
        <div className="media-card-meta-line">
          <span className="media-meta-text">
            {[checkpoint.release?.year, checkpoint.type, checkpoint.watch?.duration].filter(Boolean).join(' · ')}
          </span>
        </div>

        {/* Doomsday Connection Narrative */}
        {safeConnection && (
          <div className="media-card-watch-for">
            {isSpoilerVisible ? (
              <p className="spoiler-revealed-text">
                <strong>Connection: </strong>
                {checkpoint.doomsday?.spoiler?.content || safeConnection}
              </p>
            ) : (
              <div className="spoiler-inline-gate">
                <span className="gate-text">🔒 Connection details hidden</span>
                <button
                  onClick={() => setLocalSpoilerRevealed(true)}
                  className="btn-reveal-inline"
                  aria-label={`Reveal connection for ${checkpoint.title}`}
                >
                  <Eye size={12} />
                  <span>Reveal</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Streaming Availability Strip */}
        <div className="media-card-streaming-strip">
          <span className="streaming-strip-label">WHERE TO WATCH:</span>
          {hasStreaming && primaryPlatform ? (
            primaryPlatform.url ? (
              <a
                href={primaryPlatform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-card-stream-link"
                aria-label={`Watch ${checkpoint.title} on ${primaryPlatform.platform} (opens in new tab)`}
              >
                <span>{primaryPlatform.platform}</span>
                <ExternalLink size={12} />
              </a>
            ) : (
              <span className="streaming-strip-avail">{primaryPlatform.platform}</span>
            )
          ) : upcomingStatus ? (
            <span className="streaming-strip-upcoming">Coming Soon</span>
          ) : (
            <span className="streaming-strip-unverified">Not Verified</span>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="media-card-actions-col">
        {!isWatched ? (
          <button
            onClick={() => markWatched(checkpoint.id)}
            className="btn-card-mark-watched"
            aria-label={`Mark ${checkpoint.title} as watched`}
          >
            <CheckCircle2 size={15} />
            <span>Mark Watched</span>
          </button>
        ) : (
          <button
            onClick={() => markUnwatched(checkpoint.id)}
            className="btn-card-marked-done"
            aria-label={`Mark ${checkpoint.title} as unwatched`}
          >
            <CheckCircle2 size={15} />
            <span>Watched</span>
          </button>
        )}

        {onOpenCompanion && (
          <button
            onClick={() => onOpenCompanion(checkpoint)}
            className="btn-card-details"
            aria-label={`Open details for ${checkpoint.title}`}
          >
            <Info size={14} />
            <span>Details</span>
          </button>
        )}
      </div>
    </article>
  );
}
