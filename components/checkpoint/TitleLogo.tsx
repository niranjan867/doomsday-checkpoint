'use client';

import React, { useState } from 'react';

interface TitleLogoProps {
  title: string;
  subtitle?: string | null;
  logoUrl?: string | null;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function TitleLogo({
  title,
  subtitle,
  logoUrl,
  className = '',
  size = 'md',
}: TitleLogoProps) {
  const [imgError, setImgError] = useState(false);

  const showImage = Boolean(logoUrl) && !imgError;

  const fontSizes = {
    sm: '0.95rem',
    md: '1.2rem',
    lg: '1.65rem',
  };

  return (
    <div className={`title-logo-wrapper ${className}`}>
      {showImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={logoUrl || ''}
          alt={title}
          onError={() => setImgError(true)}
          className="title-logo-img"
          loading="lazy"
          style={{
            maxHeight: size === 'lg' ? '56px' : size === 'md' ? '40px' : '28px',
            maxWidth: '100%',
            objectFit: 'contain',
            display: 'block',
          }}
        />
      ) : (
        <div className="title-text-fallback">
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: fontSizes[size],
              fontWeight: 800,
              letterSpacing: '0.04em',
              color: '#ffffff',
              lineHeight: 1.25,
              display: 'block',
              textTransform: 'uppercase',
            }}
          >
            {title}
          </span>
          {subtitle && (
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: size === 'lg' ? '0.85rem' : '0.78rem',
                color: 'var(--text-secondary)',
                fontWeight: 500,
                marginTop: '0.2rem',
                display: 'block',
                letterSpacing: '0.01em',
              }}
            >
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
