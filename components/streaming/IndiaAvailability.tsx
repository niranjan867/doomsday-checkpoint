'use client';

import React from 'react';
import { getIndiaStreamingAvailability, getUpcomingStreamingStatus } from '@/lib/streaming';
import { Tv, ExternalLink, Calendar, Info, Clock, AlertCircle } from 'lucide-react';

interface IndiaAvailabilityProps {
  entityId: string;
  entityTitle: string;
}

export function IndiaAvailability({
  entityId,
  entityTitle,
}: IndiaAvailabilityProps) {
  const verifiedPlatforms = getIndiaStreamingAvailability(entityId);
  const upcomingStatus = getUpcomingStreamingStatus(entityId);
  const hasVerifiedData = Boolean(verifiedPlatforms && verifiedPlatforms.length > 0);

  return (
    <div className="companion-section-card card-streaming-availability" aria-label="India Streaming Availability">
      <div className="companion-section-header">
        <Tv size={14} className="text-secondary" />
        <h3 className="companion-section-title">WHERE TO WATCH IN INDIA</h3>
      </div>

      {hasVerifiedData && verifiedPlatforms ? (
        <div className="streaming-platforms-list">
          {verifiedPlatforms.map((platform, idx) => (
            <div key={idx} className="streaming-platform-item">
              <div className="streaming-platform-info">
                <div className="streaming-platform-badge-row">
                  <span className="streaming-platform-name">{platform.platform}</span>
                  {platform.format && (
                    <span className="streaming-format-badge">
                      {platform.format.toUpperCase()}
                    </span>
                  )}
                </div>
                {platform.notes && (
                  <span className="streaming-notes-text">{platform.notes}</span>
                )}
              </div>

              {platform.url ? (
                <a
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-watch-platform"
                  aria-label={`Watch ${entityTitle} on ${platform.platform} (opens in new tab)`}
                >
                  <span>Watch on {platform.platform}</span>
                  <ExternalLink size={12} />
                </a>
              ) : (
                <span className="streaming-available-tag">Available on JioHotstar</span>
              )}
            </div>
          ))}
        </div>
      ) : upcomingStatus ? (
        <div className="streaming-upcoming-box">
          <div className="streaming-status-row">
            <Calendar size={13} className="text-gold" />
            <span className="streaming-status-label">COMING SOON</span>
          </div>
          <div className="streaming-status-content">
            <p className="streaming-upcoming-text">
              Upcoming release — streaming availability not yet announced.
            </p>
            <span className="badge-coming-soon">Coming to JioHotstar</span>
          </div>
        </div>
      ) : (
        <div className="streaming-unverified-box">
          <div className="streaming-status-row">
            <AlertCircle size={13} className="text-muted" />
            <span className="streaming-status-label">UNVERIFIED AVAILABILITY</span>
          </div>
          <div className="streaming-status-content">
            <p className="streaming-unverified-text">
              Streaming availability not yet verified for India.
            </p>
            <span className="badge-not-available">Not verified on JioHotstar</span>
          </div>
        </div>
      )}
    </div>
  );
}
