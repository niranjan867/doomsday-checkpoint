'use client';

import React, { useState, useMemo } from 'react';
import type { CheckpointEntity, WatchOrderMode } from '@/lib/types';
import { useProgressStore } from '@/lib/progress';
import { CheckpointCard } from '@/components/checkpoint/CheckpointCard';
import {
  RELEASE_SECTIONS,
  TIMELINE_ERAS,
  getReleaseOrderedEntities,
  getTimelineOrderedEntities,
} from '@/lib/timeline-order';
import {
  Search,
  CheckCircle2,
  Calendar,
  Compass,
  Sparkles,
  Info,
  Filter,
} from 'lucide-react';

interface WatchlistProps {
  currentMode: WatchOrderMode;
  onModeChange: (mode: WatchOrderMode) => void;
  onOpenDetails?: (entity: CheckpointEntity) => void;
}

export function Watchlist({ currentMode, onModeChange, onOpenDetails }: WatchlistProps) {
  const checkpoints = useProgressStore((state) => state.checkpoints);
  const markWatched = useProgressStore((state) => state.markWatched);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [formatFilter, setFormatFilter] = useState<'all' | 'Movie' | 'TV Show' | 'Special'>('all');
  const [importanceFilter, setImportanceFilter] = useState<'all' | 'Essential' | 'Recommended' | 'Optional'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'unwatched' | 'in_progress' | 'watched'>('all');
  const [doomsdayOnly, setDoomsdayOnly] = useState(false);

  // Get active entities list
  const baseEntities = useMemo(() => {
    return currentMode === 'timeline' ? getTimelineOrderedEntities() : getReleaseOrderedEntities();
  }, [currentMode]);

  // Filter predicate
  const filterEntity = (entity: CheckpointEntity) => {
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = entity.title.toLowerCase().includes(q);
      const matchSubtitle = entity.subtitle?.toLowerCase().includes(q);
      const matchSection = entity.section?.toLowerCase().includes(q);
      if (!matchTitle && !matchSubtitle && !matchSection) return false;
    }

    // Format filter
    if (formatFilter !== 'all' && entity.type !== formatFilter) {
      return false;
    }

    // Importance filter
    if (importanceFilter !== 'all' && entity.classification?.importance !== importanceFilter) {
      return false;
    }

    // Status filter
    const status = checkpoints[entity.id]?.status || 'unwatched';
    if (statusFilter !== 'all' && status !== statusFilter) {
      return false;
    }

    // Doomsday filter
    if (doomsdayOnly && !entity.doomsday?.has_connection) {
      return false;
    }

    return true;
  };

  const markSectionComplete = (entityIds: string[]) => {
    entityIds.forEach((id) => {
      markWatched(id);
    });
  };

  return (
    <section id="watch-guide" className="watch-guide-container" aria-label="Main MCU Watch Guide">
      {/* Mode Switcher Banner */}
      <div className="guide-view-switcher-bar">
        <div className="view-mode-tabs" role="tablist" aria-label="Viewing Mode">
          <button
            onClick={() => onModeChange('release')}
            className={`btn-mode-tab ${currentMode === 'release' ? 'mode-tab-active' : ''}`}
            role="tab"
            aria-selected={currentMode === 'release'}
          >
            <Compass size={15} />
            <span>RELEASE ORDER (Recommended)</span>
          </button>

          <button
            onClick={() => onModeChange('timeline')}
            className={`btn-mode-tab ${currentMode === 'timeline' ? 'mode-tab-active' : ''}`}
            role="tab"
            aria-selected={currentMode === 'timeline'}
          >
            <Calendar size={15} />
            <span>MCU TIMELINE ORDER (Rewatch)</span>
          </button>
        </div>
      </div>

      {/* Guide Mode Explanatory Header */}
      <div className="guide-mode-intro-card">
        {currentMode === 'release' ? (
          <>
            <div className="intro-header-group">
              <span className="intro-kicker-tag">PRIMARY VIEW</span>
              <h2 className="guide-mode-title">THE COMPLETE WATCH ORDER</h2>
              <span className="guide-mode-subtitle">Release Order</span>
            </div>
            <p className="guide-mode-desc">
              The recommended order for experiencing the MCU’s reveals, character introductions, post-credit scenes, and major connections as they were originally released.
            </p>
          </>
        ) : (
          <>
            <div className="intro-header-group">
              <span className="intro-kicker-tag timeline-tag">CHRONOLOGICAL REWATCH</span>
              <h2 className="guide-mode-title">THE MCU IN TIMELINE ORDER</h2>
              <span className="guide-mode-subtitle">A chronological rewatch lens</span>
            </div>
            <p className="guide-mode-desc">
              This is the same viewing library, rearranged by in-universe chronology. Your watched progress carries across both views because they are two ways of viewing the same journey.
            </p>
            <div className="timeline-notes-box">
              <div className="timeline-note-item">
                <Info size={14} className="text-secondary" />
                <span>
                  <strong>First time watching?</strong> Use Release Order. <strong>Rewatching?</strong> Timeline Order can provide a different way to experience the story.
                </span>
              </div>
              <p className="timeline-complexity-text">
                Note: Exact MCU chronology is nuanced due to alternate timelines (<em>Earth-10005</em> Fox X-Men, <em>Earth-828</em> Fantastic Four), stories outside normal time (<em>Loki</em>, <em>What If...?</em>), and estimated/disputed dates (marked with <code>~</code>).
              </p>
            </div>
          </>
        )}
      </div>

      {/* Search & Filter Bar */}
      <div className="guide-filter-toolbar">
        {/* Search Input */}
        <div className="search-input-wrapper">
          <Search size={15} className="search-icon" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search MCU titles..."
            className="guide-search-field"
            aria-label="Search Marvel titles"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="search-clear-btn"
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>

        {/* Filters Group */}
        <div className="filters-scroll-group">
          {/* Format Filter */}
          <div className="filter-pill-group" role="group" aria-label="Filter by format">
            <button
              onClick={() => setFormatFilter('all')}
              className={`filter-pill ${formatFilter === 'all' ? 'pill-active' : ''}`}
            >
              All Types
            </button>
            <button
              onClick={() => setFormatFilter('Movie')}
              className={`filter-pill ${formatFilter === 'Movie' ? 'pill-active' : ''}`}
            >
              Movies
            </button>
            <button
              onClick={() => setFormatFilter('TV Show')}
              className={`filter-pill ${formatFilter === 'TV Show' ? 'pill-active' : ''}`}
            >
              TV Shows
            </button>
            <button
              onClick={() => setFormatFilter('Special')}
              className={`filter-pill ${formatFilter === 'Special' ? 'pill-active' : ''}`}
            >
              Specials
            </button>
          </div>

          {/* Importance Filter */}
          <div className="filter-pill-group" role="group" aria-label="Filter by importance">
            <button
              onClick={() => setImportanceFilter('all')}
              className={`filter-pill ${importanceFilter === 'all' ? 'pill-active' : ''}`}
            >
              All Importance
            </button>
            <button
              onClick={() => setImportanceFilter('Essential')}
              className={`filter-pill ${importanceFilter === 'Essential' ? 'pill-active' : ''}`}
            >
              Essential
            </button>
            <button
              onClick={() => setImportanceFilter('Recommended')}
              className={`filter-pill ${importanceFilter === 'Recommended' ? 'pill-active' : ''}`}
            >
              Recommended
            </button>
            <button
              onClick={() => setImportanceFilter('Optional')}
              className={`filter-pill ${importanceFilter === 'Optional' ? 'pill-active' : ''}`}
            >
              Optional
            </button>
          </div>

          {/* Status Filter */}
          <div className="filter-pill-group" role="group" aria-label="Filter by status">
            <button
              onClick={() => setStatusFilter('all')}
              className={`filter-pill ${statusFilter === 'all' ? 'pill-active' : ''}`}
            >
              All Status
            </button>
            <button
              onClick={() => setStatusFilter('unwatched')}
              className={`filter-pill ${statusFilter === 'unwatched' ? 'pill-active' : ''}`}
            >
              Unwatched
            </button>
            <button
              onClick={() => setStatusFilter('in_progress')}
              className={`filter-pill ${statusFilter === 'in_progress' ? 'pill-active' : ''}`}
            >
              In Progress
            </button>
            <button
              onClick={() => setStatusFilter('watched')}
              className={`filter-pill ${statusFilter === 'watched' ? 'pill-active' : ''}`}
            >
              Watched
            </button>
          </div>

          {/* Doomsday Filter */}
          <button
            onClick={() => setDoomsdayOnly(!doomsdayOnly)}
            className={`filter-pill doomsday-filter-pill ${doomsdayOnly ? 'pill-active-doom' : ''}`}
          >
            <Sparkles size={12} />
            <span>Doomsday Connected</span>
          </button>
        </div>
      </div>

      {/* Sections and Cards */}
      <div className="guide-sections-stack">
        {currentMode === 'release' ? (
          // RELEASE ORDER SECTIONS (PART I to PART V)
          RELEASE_SECTIONS.map((section) => {
            const sectionEntities = baseEntities
              .filter((e) => section.entityIds.includes(e.id))
              .filter(filterEntity);

            if (sectionEntities.length === 0 && (searchQuery || formatFilter !== 'all' || importanceFilter !== 'all' || statusFilter !== 'all' || doomsdayOnly)) {
              return null;
            }

            const totalInSection = section.entityIds.length;
            const watchedInSection = section.entityIds.filter(
              (id) => checkpoints[id]?.status === 'watched'
            ).length;
            const isSectionComplete = watchedInSection >= totalInSection;

            return (
              <section key={section.id} className="guide-content-section" aria-label={section.title}>
                {/* Section Header */}
                <div className="section-header-banner">
                  <div className="section-header-titles">
                    <span className="section-number-kicker">{section.number}</span>
                    <h3 className="section-title">{section.title}</h3>
                    <p className="section-desc">{section.description}</p>
                  </div>

                  <div className="section-header-actions">
                    <span className="section-progress-count">
                      {watchedInSection} / {totalInSection} watched
                    </span>
                    {!isSectionComplete && (
                      <button
                        onClick={() => markSectionComplete(section.entityIds)}
                        className="btn-mark-section-done"
                        aria-label={`Mark entire ${section.title} section as watched`}
                      >
                        <CheckCircle2 size={13} />
                        <span>Mark Section Complete</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Title Cards Grid */}
                <div className="section-titles-grid">
                  {sectionEntities.map((entity) => (
                    <CheckpointCard
                      key={entity.id}
                      checkpoint={entity}
                      mode="release"
                      onOpenDetails={onOpenDetails}
                    />
                  ))}
                </div>
              </section>
            );
          })
        ) : (
          // TIMELINE ORDER ERAS
          TIMELINE_ERAS.map((era) => {
            const eraEntities = baseEntities
              .filter((e) => era.entityIds.includes(e.id))
              .filter(filterEntity);

            if (eraEntities.length === 0 && (searchQuery || formatFilter !== 'all' || importanceFilter !== 'all' || statusFilter !== 'all' || doomsdayOnly)) {
              return null;
            }

            const totalInEra = era.entityIds.length;
            const watchedInEra = era.entityIds.filter(
              (id) => checkpoints[id]?.status === 'watched'
            ).length;
            const isEraComplete = watchedInEra >= totalInEra;

            return (
              <section key={era.id} className="guide-content-section" aria-label={era.title}>
                {/* Era Header */}
                <div className="section-header-banner timeline-era-header">
                  <div className="section-header-titles">
                    <span className="section-number-kicker">{era.subtitle}</span>
                    <h3 className="section-title">{era.title}</h3>
                    <p className="section-desc">{era.description}</p>
                  </div>

                  <div className="section-header-actions">
                    <span className="section-progress-count">
                      {watchedInEra} / {totalInEra} watched
                    </span>
                    {!isEraComplete && (
                      <button
                        onClick={() => markSectionComplete(era.entityIds)}
                        className="btn-mark-section-done"
                        aria-label={`Mark entire ${era.title} era as watched`}
                      >
                        <CheckCircle2 size={13} />
                        <span>Mark Era Complete</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Title Cards Grid */}
                <div className="section-titles-grid">
                  {eraEntities.map((entity) => (
                    <CheckpointCard
                      key={entity.id}
                      checkpoint={entity}
                      mode="timeline"
                      onOpenDetails={onOpenDetails}
                    />
                  ))}
                </div>
              </section>
            );
          })
        )}
      </div>
    </section>
  );
}
