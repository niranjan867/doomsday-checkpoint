'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useProgressStore } from '@/lib/progress';
import { calculateProgressStats, getUpNextCheckpoint } from '@/lib/selectors';
import type { WatchOrderMode } from '@/lib/types';
import {
  Play,
  Calendar,
  Sparkles,
  Clock,
  Film,
  CheckCircle2,
} from 'lucide-react';

interface JourneyHeroProps {
  currentMode: WatchOrderMode;
  onModeChange: (mode: WatchOrderMode) => void;
  onStartWatching: () => void;
}

export function JourneyHero({ currentMode, onModeChange, onStartWatching }: JourneyHeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  const checkpoints = useProgressStore((state) => state.checkpoints);
  const stats = calculateProgressStats(checkpoints);
  const nextItem = getUpNextCheckpoint(checkpoints);

  // Calculate days remaining to Doomsday (December 18, 2026)
  const doomsdayDate = new Date('2026-12-18T00:00:00Z');
  const now = new Date();
  const diffTime = Math.max(0, doomsdayDate.getTime() - now.getTime());
  const daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const hasStarted = stats.watchedCount > 0;
  const isComplete = stats.watchedCount >= stats.totalCanonical;

  useEffect(() => {
    // Attempt playback if browser allows autoplay
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Fallback silently if autoplay is blocked by browser policies
      });
    }
  }, []);

  return (
    <section id="hero" className="streaming-hero-section" aria-label="Hero Introduction">
      {/* Cinematic Marvel Intro Video Backdrop */}
      <div className="streaming-hero-backdrop" aria-hidden="true">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          loop
          preload="metadata"
          className={`hero-video-bg ${videoLoaded ? 'video-ready' : ''}`}
          poster="/videos/marvel-intro-poster.jpg"
          onLoadedData={() => setVideoLoaded(true)}
        >
          <source src="/videos/marvel-intro-seq.mp4" type="video/mp4" />
        </video>
        <div className="hero-gradient-overlay" />
        <div className="hero-vignette-overlay" />
      </div>

      <div className="streaming-hero-content">
        {/* Eyebrow / Brand Kicker */}
        <div className="hero-kicker-pill">
          <Sparkles size={13} className="text-accent" />
          <span>DOOMSDAY CHECKPOINT</span>
        </div>

        {/* Large Cinematic Title */}
        <h1 className="streaming-hero-title">THE COMPLETE MCU WATCH GUIDE</h1>

        {/* Concise Description */}
        <p className="streaming-hero-desc">
          Follow the MCU journey toward <strong>Avengers: Doomsday</strong>. 72 canonical titles across the Infinity Saga, the Street-Level Track, the Multiverse, and the X-Men legacy — with verified streaming in India.
        </p>

        {/* Quick Stats Summary */}
        <div className="hero-stats-row">
          <div className="hero-stat-item">
            <Film size={14} className="text-secondary" />
            <span>72 Titles (49 Movies · 11 Shows · 12 Specials)</span>
          </div>
          <span className="hero-stat-dot">•</span>
          <div className="hero-stat-item">
            <Clock size={14} className="text-secondary" />
            <span>~145 Hours Total</span>
          </div>
          <span className="hero-stat-dot">•</span>
          <div className="hero-stat-item">
            <CheckCircle2 size={14} className={hasStarted ? 'text-emerald' : 'text-secondary'} />
            <span>{stats.percentComplete}% Complete ({stats.watchedCount} / 72)</span>
          </div>
        </div>

        {/* Primary and Secondary Action CTAs */}
        <div className="streaming-hero-actions">
          <button
            onClick={onStartWatching}
            className="btn-hero-play"
            aria-label={
              isComplete
                ? 'Review complete watch guide'
                : hasStarted
                ? `Continue watching #${nextItem?.order || 1}: ${nextItem?.title || 'Next title'}`
                : 'Start watching from #01 Iron Man'
            }
          >
            <Play size={16} fill="currentColor" />
            <span>
              {isComplete
                ? 'Review Completed Guide'
                : hasStarted
                ? `Continue Watching · #${nextItem?.order?.toString().padStart(2, '0') || '01'} ${nextItem?.title || ''}`
                : 'Start Watching · #01 Iron Man'}
            </span>
          </button>

          <button
            onClick={() => {
              onModeChange(currentMode === 'timeline' ? 'release' : 'timeline');
              const guideEl = document.getElementById('watch-guide');
              if (guideEl) guideEl.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-hero-browse"
            aria-label="Explore MCU in chronological Timeline Order"
          >
            <Calendar size={16} />
            <span>{currentMode === 'timeline' ? 'Switch to Release Order' : 'Timeline Order'}</span>
          </button>
        </div>

        {/* Doomsday Countdown Strip */}
        <div className="hero-countdown-strip">
          <span className="countdown-label">AVENGERS: DOOMSDAY</span>
          <span className="countdown-dot">•</span>
          <span className="countdown-date">18 DECEMBER 2026</span>
          <span className="countdown-dot">•</span>
          <span className="countdown-days">{daysRemaining} DAYS REMAINING</span>
        </div>
      </div>
    </section>
  );
}
