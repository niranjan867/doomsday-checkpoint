'use client';

import React from 'react';
import type { CheckpointEntity } from '@/lib/types';
import { useProgressStore } from '@/lib/progress';
import {
  calculateDoomsdayProgressStats,
  getCanonicalDoomsdayCheckpoints,
} from '@/lib/selectors';
import {
  Sparkles,
  Flame,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';

interface DoomsdaySummaryProps {
  onOpenCompanion?: (checkpoint: CheckpointEntity) => void;
}

export function DoomsdaySummary({ onOpenCompanion }: DoomsdaySummaryProps) {
  const checkpoints = useProgressStore((state) => state.checkpoints);
  const markWatched = useProgressStore((state) => state.markWatched);

  const stats = calculateDoomsdayProgressStats(checkpoints);
  const connectedItems = getCanonicalDoomsdayCheckpoints();

  const nextItem = stats.nextDoomsdayCheckpoint;

  return (
    <section className="doomsday-overview-card" aria-label="Doomsday Connection Overview">
      <div className="doomsday-overview-top">
        <div className="overview-title-group">
          <div className="overview-kicker">
            <Flame size={14} className="text-accent" />
            <span>AVENGERS: DOOMSDAY PREPARATION</span>
          </div>
          <h2 className="overview-headline">
            {stats.watchedConnected} of {stats.totalConnected} connected titles watched
          </h2>
        </div>

        <span className="overview-percent-badge">{stats.percentConnected}% Prepared</span>
      </div>

      {/* Progress Track */}
      <div
        className="doomsday-progress-bar"
        role="progressbar"
        aria-valuenow={stats.percentConnected}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="doomsday-progress-fill"
          style={{ width: `${stats.percentConnected}%` }}
        />
      </div>

      {/* Next Step Callout */}
      {nextItem && (
        <div className="doomsday-next-step-box">
          <div className="next-step-info">
            <span className="next-step-tag">UP NEXT FOR DOOMSDAY</span>
            <span className="next-step-title">
              #{nextItem.order?.toString().padStart(2, '0')} {nextItem.title}
            </span>
          </div>

          <div className="next-step-actions">
            <button
              onClick={() => markWatched(nextItem.id)}
              className="btn-next-step-watch"
              aria-label={`Mark ${nextItem.title} as watched`}
            >
              <CheckCircle2 size={14} />
              <span>Mark Watched</span>
            </button>
            {onOpenCompanion && (
              <button
                onClick={() => onOpenCompanion(nextItem)}
                className="btn-next-step-guide"
                aria-label={`Open guide for ${nextItem.title}`}
              >
                <span>Guide</span>
                <ArrowRight size={13} />
              </button>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
