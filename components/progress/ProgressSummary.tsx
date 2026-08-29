'use client';

import React from 'react';
import { useProgressStore } from '@/lib/progress';
import { calculateProgressStats } from '@/lib/selectors';
import { canonicalRoad } from '@/lib/data';
import { CheckCircle2, Film, Tv, Sparkles, Clock } from 'lucide-react';

export function ProgressSummary() {
  const checkpoints = useProgressStore((state) => state.checkpoints);
  const stats = calculateProgressStats(checkpoints);

  // Calculate format breakdown
  let watchedMovies = 0;
  let totalMovies = 0;
  let watchedTv = 0;
  let totalTv = 0;
  let watchedSpecials = 0;
  let totalSpecials = 0;

  for (const entity of canonicalRoad) {
    const isWatched = checkpoints[entity.id]?.status === 'watched';
    if (entity.type === 'Movie') {
      totalMovies++;
      if (isWatched) watchedMovies++;
    } else if (entity.type === 'TV Show') {
      totalTv++;
      if (isWatched) watchedTv++;
    } else if (entity.type === 'Special') {
      totalSpecials++;
      if (isWatched) watchedSpecials++;
    }
  }

  const remaining = Math.max(0, stats.totalCanonical - stats.watchedCount);

  return (
    <section className="progress-bar-section" aria-label="Your Watch Progress">
      <div className="progress-bar-inner">
        {/* Header Row */}
        <div className="progress-header-row">
          <div className="progress-title-group">
            <span className="progress-kicker">YOUR PROGRESS</span>
            <h3 className="progress-headline">
              {stats.watchedCount} / {stats.totalCanonical} WATCHED ({stats.percentComplete}%)
            </h3>
          </div>
          <span className="progress-remaining-tag">
            {remaining === 0 ? 'All Complete' : `${remaining} titles remaining`}
          </span>
        </div>

        {/* Progress Bar Track */}
        <div
          className="progress-track"
          role="progressbar"
          aria-valuenow={stats.percentComplete}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Overall progress: ${stats.percentComplete}% complete`}
        >
          <div
            className="progress-fill-watched"
            style={{ width: `${stats.percentComplete}%` }}
          />
          {stats.inProgressCount > 0 && (
            <div
              className="progress-fill-inprogress"
              style={{ width: `${(stats.inProgressCount / stats.totalCanonical) * 100}%` }}
            />
          )}
        </div>

        {/* Breakdown Row */}
        <div className="progress-breakdown-row">
          <div className="breakdown-item">
            <Film size={13} className="text-secondary" />
            <span>
              <strong>MOVIES:</strong> {watchedMovies} / {totalMovies}
            </span>
          </div>

          <div className="breakdown-item">
            <Tv size={13} className="text-secondary" />
            <span>
              <strong>TV SHOWS:</strong> {watchedTv} / {totalTv}
            </span>
          </div>

          <div className="breakdown-item">
            <Sparkles size={13} className="text-secondary" />
            <span>
              <strong>SPECIALS:</strong> {watchedSpecials} / {totalSpecials}
            </span>
          </div>

          {stats.inProgressCount > 0 && (
            <div className="breakdown-item in-progress-chip">
              <Clock size={13} className="text-warning" />
              <span>{stats.inProgressCount} in progress</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
