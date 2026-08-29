'use client';

import React, { useState } from 'react';
import { sideQuestDefinitions } from '@/lib/data';
import { Layers, ChevronDown, ChevronUp, Sparkles, Film, Compass } from 'lucide-react';

export function SideStoriesSection() {
  const [expandedQuest, setExpandedQuest] = useState<number | null>(null);

  const toggleQuest = (idx: number) => {
    setExpandedQuest(expandedQuest === idx ? null : idx);
  };

  return (
    <section id="side-quests" className="side-stories-section" aria-label="Optional Side Stories">
      <div className="side-stories-header">
        <div className="side-stories-title-group">
          <span className="side-stories-kicker">OPTIONAL VIEWING</span>
          <h3 className="side-stories-main-title">SIDE STORIES & EXPANDED PATHS</h3>
          <p className="side-stories-desc">
            These three expansions are not required for the main 72-title Doomsday path, but provide rich lore, character histories, and alternate universe context.
          </p>
        </div>
      </div>

      <div className="side-stories-grid">
        {sideQuestDefinitions.map((sq, idx) => {
          const isExpanded = expandedQuest === idx;

          return (
            <div
              key={idx}
              className={`side-story-card ${isExpanded ? 'side-story-expanded' : ''}`}
            >
              <div
                className="side-story-card-top"
                onClick={() => toggleQuest(idx)}
                role="button"
                tabIndex={0}
                aria-expanded={isExpanded}
              >
                <div className="side-story-badge-row">
                  <span className="side-story-tag">SIDE STORY 0{idx + 1}</span>
                  <span className="side-story-category">{sq.category}</span>
                </div>

                <h4 className="side-story-name">{sq.name}</h4>

                <div className="side-story-expand-btn">
                  <span>{isExpanded ? 'Hide Details' : 'View Watch Guide'}</span>
                  {isExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                </div>
              </div>

              {isExpanded && (
                <div className="side-story-card-body">
                  <div className="side-story-order-box">
                    <span className="side-story-box-label">RECOMMENDED INTERLEAVING ORDER</span>
                    <p className="side-story-order-text">{sq.watch_order}</p>
                  </div>

                  <div className="side-story-meta-note">
                    <span>Note: Progress for side stories does not alter the canonical 72-title total.</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
