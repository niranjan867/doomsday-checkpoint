'use client';

import React, { useState } from 'react';
import { useProgressStore } from '@/lib/progress';
import { calculateProgressStats } from '@/lib/selectors';
import type { WatchOrderMode } from '@/lib/types';
import {
  Film,
  Lock,
  Unlock,
  RotateCcw,
  Clock,
  Compass,
  Calendar,
  Layers,
} from 'lucide-react';

interface HeaderProps {
  currentMode: WatchOrderMode;
  onModeChange: (mode: WatchOrderMode) => void;
  onNavigateSection?: (sectionId: string) => void;
}

export function Header({ currentMode, onModeChange, onNavigateSection }: HeaderProps) {
  const checkpoints = useProgressStore((state) => state.checkpoints);
  const showSpoilers = useProgressStore((state) => state.showSpoilers);
  const toggleSpoilers = useProgressStore((state) => state.toggleSpoilers);
  const resetAllProgress = useProgressStore((state) => state.resetAllProgress);

  const [isResetConfirming, setIsResetConfirming] = useState(false);

  const stats = calculateProgressStats(checkpoints);

  const handleReset = () => {
    if (isResetConfirming) {
      resetAllProgress();
      setIsResetConfirming(false);
    } else {
      setIsResetConfirming(true);
      setTimeout(() => setIsResetConfirming(false), 4000);
    }
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    if (onNavigateSection) {
      onNavigateSection(id);
    }
  };

  return (
    <header className="site-header" role="banner">
      <div className="site-header-inner">
        {/* Brand */}
        <div className="header-brand" onClick={() => scrollTo('hero')} role="button" tabIndex={0}>
          <div className="brand-logo-mark">
            <Film size={18} className="text-accent" />
          </div>
          <div className="brand-titles">
            <span className="brand-name">DOOMSDAY CHECKPOINT</span>
            <span className="brand-tagline">The Complete MCU Watch Guide</span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="header-nav-tabs" aria-label="Main Navigation">
          <button
            onClick={() => {
              onModeChange('release');
              scrollTo('watch-guide');
            }}
            className={`nav-tab-btn ${currentMode === 'release' ? 'nav-tab-active' : ''}`}
            aria-label="Release Order Watch Guide"
          >
            <Compass size={14} />
            <span>Watch Guide</span>
          </button>

          <button
            onClick={() => {
              onModeChange('timeline');
              scrollTo('watch-guide');
            }}
            className={`nav-tab-btn ${currentMode === 'timeline' ? 'nav-tab-active' : ''}`}
            aria-label="MCU Timeline Order"
          >
            <Calendar size={14} />
            <span>Timeline</span>
          </button>

          <button
            onClick={() => scrollTo('side-quests')}
            className="nav-tab-btn"
            aria-label="Optional Side Quests"
          >
            <Layers size={14} />
            <span>Side Stories</span>
          </button>
        </nav>

        {/* Global Controls */}
        <div className="header-controls">
          {/* Progress Pill */}
          <div className="header-progress-chip" title="Shared Watch Progress across all views">
            <span className="chip-count">{stats.watchedCount} / 72</span>
            <span className="chip-pct">({stats.percentComplete}%)</span>
          </div>

          {/* Spoiler Protection Toggle */}
          <button
            onClick={toggleSpoilers}
            className={`btn-spoiler-toggle ${showSpoilers ? 'spoiler-active' : 'spoiler-safe'}`}
            aria-label={showSpoilers ? 'Spoilers are visible. Click to hide.' : 'Spoiler protection is active. Click to reveal.'}
            title={showSpoilers ? 'Spoilers: REVEALED' : 'Spoilers: PROTECTED'}
          >
            {showSpoilers ? <Unlock size={14} /> : <Lock size={14} />}
            <span className="spoiler-label">{showSpoilers ? 'Spoilers ON' : 'Spoiler Safe'}</span>
          </button>

          {/* Reset Action */}
          <button
            onClick={handleReset}
            className={`btn-header-reset ${isResetConfirming ? 'btn-reset-confirming' : ''}`}
            aria-label="Reset your watch progress"
            title="Reset watch progress"
          >
            <RotateCcw size={14} />
            <span>{isResetConfirming ? 'Confirm?' : 'Reset'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
