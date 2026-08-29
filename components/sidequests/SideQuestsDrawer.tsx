'use client';

import React, { useEffect } from 'react';
import { sideQuestDefinitions } from '@/lib/data';
import { X, Compass, Info, ArrowRight } from 'lucide-react';

interface SideQuestsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SideQuestsDrawer({ isOpen, onClose }: SideQuestsDrawerProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="sidequests-title">
      <div className="modal-card sidequests-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Top Header */}
        <div className="modal-top-bar">
          <div className="modal-order-badge-wrap">
            <Compass size={16} className="text-gold" />
            <span className="modal-order-badge">EXPANDED PATHS</span>
          </div>
          <button
            onClick={onClose}
            className="btn-modal-close"
            aria-label="Close side quests modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Title & Info Banner */}
        <div className="sidequests-header-area">
          <h2 id="sidequests-title" className="sidequests-main-title">
            SIDE QUEST DEFINITIONS
          </h2>
          <div className="sidequests-notice-box">
            <Info size={15} className="text-secondary flex-shrink-0" />
            <p className="sidequests-notice-text">
              Side quests are source-defined optional expansion paths. They provide rich context and character history, but remain separate definitions and do not alter the 72 canonical checkpoints.
            </p>
          </div>
        </div>

        {/* List of 3 Side Quests */}
        <div className="sidequests-list-content">
          {sideQuestDefinitions.map((sq, idx) => (
            <article key={idx} className="sidequest-card">
              <div className="sidequest-card-header">
                <span className="sidequest-index">QUEST 0{idx + 1}</span>
                <span className="sidequest-badge">{sq.category}</span>
              </div>

              <h3 className="sidequest-name">{sq.name}</h3>

              <div className="sidequest-order-block">
                <span className="sidequest-order-label">INTERLEAVING WATCH ORDER</span>
                <p className="sidequest-order-desc">{sq.watch_order}</p>
              </div>

              <div className="sidequest-provenance">
                <span>Source: {sq.source} ({sq.location})</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
