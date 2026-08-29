'use client';

import React, { useState, useMemo } from 'react';
import type { CheckpointEntity, DoomsdayConfidence } from '@/lib/types';
import {
  getCanonicalDoomsdayCheckpoints,
  getArticleOnlyDoomsdayEntities,
  getNextDoomsdayCheckpoint,
  getUniverseContinuityList,
  getAllCharacterRelationships,
  getAllPostCreditEntries,
  getPairedRevealNote,
} from '@/lib/selectors';
import { useProgressStore } from '@/lib/progress';
import { DoomsdaySummary } from './DoomsdaySummary';
import { DoomsdayConnectionCard } from './DoomsdayConnectionCard';
import {
  Search,
  X,
  Sparkles,
  Flame,
  ChevronDown,
  ChevronUp,
  Layers,
  Globe,
  Users,
  Film,
  AlertTriangle,
} from 'lucide-react';

interface DoomsdayViewProps {
  onOpenCompanion?: (checkpoint: CheckpointEntity) => void;
}

type DoomsdaySubTab = 'checkpoints' | 'multiverse' | 'characters' | 'credits';

export function DoomsdayView({ onOpenCompanion }: DoomsdayViewProps) {
  const checkpoints = useProgressStore((state) => state.checkpoints);
  const nextDoomsdayItem = getNextDoomsdayCheckpoint(checkpoints);

  const [activeSubTab, setActiveSubTab] = useState<DoomsdaySubTab>('checkpoints');

  const canonicalConnected = useMemo(() => getCanonicalDoomsdayCheckpoints(), []);
  const articleOnlyConnected = useMemo(() => getArticleOnlyDoomsdayEntities(), []);
  const universesList = useMemo(() => getUniverseContinuityList(), []);
  const charactersList = useMemo(() => getAllCharacterRelationships(), []);
  const postCreditEntries = useMemo(() => getAllPostCreditEntries(), []);
  const pairedRevealNote = useMemo(() => getPairedRevealNote(), []);

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [confidenceFilter, setConfidenceFilter] = useState<'all' | DoomsdayConfidence>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'watched' | 'in_progress' | 'unwatched'>('all');
  const [showArticleOnly, setShowArticleOnly] = useState(false);

  // Filter canonical items
  const filteredCanonical = useMemo(() => {
    return canonicalConnected.filter((item) => {
      if (searchQuery.trim().length > 0) {
        const query = searchQuery.toLowerCase().trim();
        const titleMatch = item.title.toLowerCase().includes(query);
        const subMatch = item.subtitle?.toLowerCase().includes(query) ?? false;
        const secMatch = item.section?.toLowerCase().includes(query) ?? false;
        const connMatch = item.doomsday?.connection?.toLowerCase().includes(query) ?? false;
        if (!titleMatch && !subMatch && !secMatch && !connMatch) return false;
      }
      if (confidenceFilter !== 'all') {
        if (item.doomsday?.confidence?.toLowerCase() !== confidenceFilter.toLowerCase()) return false;
      }
      if (statusFilter !== 'all') {
        const currentStatus = checkpoints[item.id]?.status || 'unwatched';
        if (currentStatus !== statusFilter) return false;
      }
      return true;
    });
  }, [canonicalConnected, searchQuery, confidenceFilter, statusFilter, checkpoints]);

  // Filter article-only items
  const filteredArticleOnly = useMemo(() => {
    return articleOnlyConnected.filter((item) => {
      if (searchQuery.trim().length > 0) {
        const query = searchQuery.toLowerCase().trim();
        const titleMatch = item.title.toLowerCase().includes(query);
        const connMatch = item.doomsday?.connection?.toLowerCase().includes(query) ?? false;
        if (!titleMatch && !connMatch) return false;
      }
      if (confidenceFilter !== 'all') {
        if (item.doomsday?.confidence?.toLowerCase() !== confidenceFilter.toLowerCase()) return false;
      }
      return true;
    });
  }, [articleOnlyConnected, searchQuery, confidenceFilter]);

  const hasActiveFilters =
    searchQuery.trim().length > 0 ||
    confidenceFilter !== 'all' ||
    statusFilter !== 'all';

  const clearAllFilters = () => {
    setSearchQuery('');
    setConfidenceFilter('all');
    setStatusFilter('all');
  };

  return (
    <div className="doomsday-hub-container">
      {/* 1. Header Overview Summary */}
      <DoomsdaySummary onOpenCompanion={onOpenCompanion} />

      {/* 2. Clean Navigation Sub-Tabs */}
      <div className="doomsday-nav-tabs" role="tablist" aria-label="Doomsday Sections">
        <button
          onClick={() => setActiveSubTab('checkpoints')}
          className={`doomsday-tab-button ${activeSubTab === 'checkpoints' ? 'tab-btn-active' : ''}`}
          role="tab"
          aria-selected={activeSubTab === 'checkpoints'}
        >
          <Layers size={14} />
          <span>Connected Titles ({canonicalConnected.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('multiverse')}
          className={`doomsday-tab-button ${activeSubTab === 'multiverse' ? 'tab-btn-active' : ''}`}
          role="tab"
          aria-selected={activeSubTab === 'multiverse'}
        >
          <Globe size={14} className="text-accent" />
          <span>Universes ({universesList.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('characters')}
          className={`doomsday-tab-button ${activeSubTab === 'characters' ? 'tab-btn-active' : ''}`}
          role="tab"
          aria-selected={activeSubTab === 'characters'}
        >
          <Users size={14} className="text-gold" />
          <span>Characters ({charactersList.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('credits')}
          className={`doomsday-tab-button ${activeSubTab === 'credits' ? 'tab-btn-active' : ''}`}
          role="tab"
          aria-selected={activeSubTab === 'credits'}
        >
          <Film size={14} />
          <span>Post-Credits ({postCreditEntries.length})</span>
        </button>
      </div>

      {/* SUB-TAB: CONNECTED TITLES */}
      {activeSubTab === 'checkpoints' && (
        <div className="doomsday-tab-content">
          {/* Controls Bar */}
          <div className="watchlist-filter-bar">
            <div className="search-bar-wrap">
              <Search size={15} className="search-bar-icon" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search connected titles or character storylines..."
                className="search-bar-input"
                aria-label="Search connected titles"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="btn-search-clear"
                  aria-label="Clear search"
                >
                  <X size={13} />
                </button>
              )}
            </div>

            <div className="filter-actions-group">
              <button
                onClick={() => setConfidenceFilter('all')}
                className={`filter-pill ${confidenceFilter === 'all' ? 'pill-active' : ''}`}
              >
                All
              </button>
              <button
                onClick={() => setConfidenceFilter('confirmed')}
                className={`filter-pill ${confidenceFilter === 'confirmed' ? 'pill-active' : ''}`}
              >
                Confirmed
              </button>
              <button
                onClick={() => setConfidenceFilter('established')}
                className={`filter-pill ${confidenceFilter === 'established' ? 'pill-active' : ''}`}
              >
                Established
              </button>
            </div>
          </div>

          {/* Results Summary */}
          <div className="watchlist-results-summary">
            <span className="results-count-text">
              Showing <strong>{filteredCanonical.length}</strong> of {canonicalConnected.length} connected titles
            </span>
            {hasActiveFilters && (
              <button onClick={clearAllFilters} className="btn-clear-filters">
                <X size={11} /> Clear filters
              </button>
            )}
          </div>

          {/* Cards Stack */}
          {filteredCanonical.length === 0 ? (
            <div className="empty-state-card">
              <p className="empty-state-title">No matching titles found</p>
              <button onClick={clearAllFilters} className="btn-empty-reset">
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="chapter-cards-stack">
              {filteredCanonical.map((item) => (
                <DoomsdayConnectionCard
                  key={item.id}
                  checkpoint={item}
                  isNext={nextDoomsdayItem?.id === item.id}
                  onOpenCompanion={onOpenCompanion}
                />
              ))}
            </div>
          )}

          {/* Supplementary Context Accordion */}
          <div className="supplementary-accordion-wrap">
            <button
              onClick={() => setShowArticleOnly(!showArticleOnly)}
              className="btn-supplementary-toggle"
              aria-expanded={showArticleOnly}
            >
              <div className="toggle-left">
                <Sparkles size={15} className="text-secondary" />
                <span>Supplementary Series & Context ({articleOnlyConnected.length})</span>
              </div>
              {showArticleOnly ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {showArticleOnly && (
              <div className="supplementary-drawer-body">
                <p className="supplementary-note">
                  These {articleOnlyConnected.length} television seasons provide additional background context for returning characters. They remain optional and do not alter the 72 primary checkpoints.
                </p>
                <div className="chapter-cards-stack">
                  {filteredArticleOnly.map((item) => (
                    <DoomsdayConnectionCard
                      key={item.id}
                      checkpoint={item}
                      onOpenCompanion={onOpenCompanion}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SUB-TAB: UNIVERSES */}
      {activeSubTab === 'multiverse' && (
        <div className="doomsday-tab-content">
          <div className="universes-intro-box">
            <h3 className="universes-intro-title">The Multiverse Continuities</h3>
            <p className="universes-intro-text">
              The road to <em>Avengers: Doomsday</em> draws upon 6 officially recognized universe continuities across Marvel film history.
            </p>
          </div>

          <div className="universes-cards-grid">
            {universesList.map((uni) => (
              <div key={uni.id} className="universe-entry-card">
                <div className="universe-entry-header">
                  <h4 className="universe-entry-name">{uni.name}</h4>
                  <span className="universe-entry-tag">{uni.confidence}</span>
                </div>
                <p className="universe-entry-desc">{uni.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB: CHARACTERS */}
      {activeSubTab === 'characters' && (
        <div className="doomsday-tab-content">
          <div className="universes-intro-box">
            <h3 className="universes-intro-title">Character Paths</h3>
            <p className="universes-intro-text">
              Key characters playing major roles or bridging universes on the road to Doomsday.
            </p>
          </div>

          <div className="characters-cards-grid">
            {charactersList.map((char) => (
              <div key={char.id} className="character-entry-card">
                <div className="char-entry-top">
                  <h4 className="char-entry-name">{char.name}</h4>
                  <span className="char-entry-tag">{char.confidence}</span>
                </div>
                <div className="char-entry-meta">
                  <span className="char-entry-uni">{char.universe}</span>
                  <span className="char-entry-origin">Origin: {char.origin_title}</span>
                </div>
                <p className="char-entry-role">
                  <strong>Role:</strong> {char.doomsday_role}
                </p>
                {char.key_appearances.length > 0 && (
                  <div className="char-appearances-strip">
                    <span className="strip-label">Key Stories:</span>
                    <div className="strip-chips">
                      {char.key_appearances.map((appId, idx) => (
                        <span key={idx} className="story-chip">{appId.replace(/-/g, ' ')}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB: POST-CREDITS */}
      {activeSubTab === 'credits' && (
        <div className="doomsday-tab-content">
          <div className="universes-intro-box">
            <h3 className="universes-intro-title">Critical Credits Scenes</h3>
            <p className="universes-intro-text">
              Key post-credits scenes that establish vital connective tissue leading into the Multiverse crossover.
            </p>
          </div>

          {pairedRevealNote && (
            <div className="paired-reveal-notice">
              <div className="paired-notice-header">
                <Sparkles size={15} className="text-accent" />
                <span className="paired-notice-title">Paired Reveal: Thunderbolts* ⟷ Fantastic Four</span>
              </div>
              <p className="paired-notice-text">{pairedRevealNote}</p>
            </div>
          )}

          <div className="credits-cards-grid">
            {postCreditEntries.map((entry) => (
              <div key={entry.entity_id} className="credit-entry-card">
                <div className="credit-entry-header">
                  <h4 className="credit-entry-title">{entry.title}</h4>
                  <span className="credit-entry-relevance">{entry.scene_relevance}</span>
                </div>
                <div className="credit-pills-row">
                  {entry.has_mid_credit_scene && <span className="credit-pill">Mid-Credits</span>}
                  {entry.has_post_credit_scene && <span className="credit-pill">Post-Credits</span>}
                </div>
                {entry.foreshadows && (
                  <p className="credit-entry-detail">
                    <strong>Foreshadows:</strong> {entry.foreshadows}
                  </p>
                )}
                {entry.leads_to && (
                  <p className="credit-entry-detail">
                    <strong>Leads to:</strong> {entry.leads_to}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
