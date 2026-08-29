'use client';

import React, { useState, useEffect, useRef } from 'react';
import type { CheckpointEntity, WatchOrderMode } from '@/lib/types';
import { allMasterEntities } from '@/lib/data';
import { Header } from '@/components/shell/Header';
import { JourneyHero } from '@/components/shell/JourneyHero';
import { ProgressSummary } from '@/components/progress/ProgressSummary';
import { UpNext } from '@/components/checkpoint/UpNext';
import { Watchlist } from '@/components/watchlist/Watchlist';
import { CheckpointDetailModal } from '@/components/checkpoint/CheckpointDetailModal';
import { SideStoriesSection } from '@/components/sidequests/SideStoriesSection';

export default function HomePage() {
  const [currentMode, setCurrentMode] = useState<WatchOrderMode>('release');
  const [selectedEntity, setSelectedEntity] = useState<CheckpointEntity | null>(null);

  const guideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Expose all master entities for fast global lookup if needed
    if (typeof window !== 'undefined') {
      (window as unknown as { __allMasterEntities?: CheckpointEntity[] }).__allMasterEntities =
        allMasterEntities;
    }
  }, []);

  const handleStartWatching = () => {
    const continueEl = document.getElementById('continue-watching');
    if (continueEl) {
      continueEl.scrollIntoView({ behavior: 'smooth' });
    } else if (guideRef.current) {
      guideRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="app-container">
      {/* 1. Header with Mode Toggle & Navigation */}
      <Header
        currentMode={currentMode}
        onModeChange={(mode) => setCurrentMode(mode)}
        onNavigateSection={(id) => {
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 2. Cinematic Hero */}
      <JourneyHero
        currentMode={currentMode}
        onModeChange={(mode) => setCurrentMode(mode)}
        onStartWatching={handleStartWatching}
      />

      {/* 3. Continue Watching Spotlight */}
      <div id="continue-watching" className="continue-watching-anchor">
        <UpNext
          onOpenDetails={(entity) => setSelectedEntity(entity)}
          onSwitchToTimeline={() => setCurrentMode('timeline')}
        />
      </div>

      {/* 4. Useful Progress Summary */}
      <ProgressSummary />

      {/* 5. Main Watch List / Timeline Guide */}
      <div ref={guideRef} className="main-guide-wrapper">
        <Watchlist
          currentMode={currentMode}
          onModeChange={(mode) => setCurrentMode(mode)}
          onOpenDetails={(entity) => setSelectedEntity(entity)}
        />
      </div>

      {/* 6. Optional Side Stories Section */}
      <SideStoriesSection />

      {/* Title Details Dialog */}
      <CheckpointDetailModal
        checkpoint={selectedEntity}
        onClose={() => setSelectedEntity(null)}
        onSelectCheckpoint={(entity) => setSelectedEntity(entity)}
      />

      {/* 7. Clean Editorial Footer */}
      <footer className="site-footer" role="contentinfo">
        <div className="footer-inner">
          <p className="footer-brand-title">DOOMSDAY CHECKPOINT · THE COMPLETE MCU WATCH GUIDE</p>
          <p className="footer-subtext">
            An independent, spoiler-protected MCU watch guide and tracker prepared for <em>Avengers: Doomsday</em>. Verified streaming links for India via JioHotstar.
          </p>
          <p className="footer-copyright-note">
            Marvel characters and content are trademarks and copyright of Marvel Studios LLC and their respective owners.
          </p>
        </div>
      </footer>
    </div>
  );
}
