import React, { useState } from 'react';
import { Music } from 'lucide-react';

export const UserInfo = ({ userName, description, music }) => {
  const [expanded, setExpanded] = useState(false);
  const isLong = description.length > 80;

  return (
    <div style={{
      position: 'absolute',
      left: '16px',
      bottom: '96px', // pushed up to clear the bottom nav (60px) + progress bar (3px) + extra margin
      maxWidth: 'calc(100% - 90px)',
      zIndex: 10,
    }}>
      {/* Username */}
      <div style={{
        fontWeight: 700, fontSize: '15px', color: 'white',
        textShadow: '0 1px 6px rgba(0,0,0,0.9)',
        marginBottom: '6px',
      }}>
        @{userName}
      </div>

      {/* Description */}
      <div style={{ marginBottom: '10px' }}>
        <p style={{
          fontSize: '13px', lineHeight: '1.5', color: 'rgba(255,255,255,0.92)',
          textShadow: '0 1px 4px rgba(0,0,0,0.8)',
          margin: 0,
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: expanded ? 'unset' : 2,
          WebkitBoxOrient: 'vertical',
        }}>
          {description}
        </p>
        {isLong && (
          <button
            onClick={() => setExpanded(!expanded)}
            style={{
              background: 'none', border: 'none', padding: 0,
              color: 'rgba(255,255,255,0.65)', fontSize: '13px',
              fontWeight: 600, cursor: 'pointer', marginTop: '2px',
            }}
          >
            {expanded ? 'less' : 'more'}
          </button>
        )}
      </div>

      {/* Music Info */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden' }}>
        <Music size={13} color="white" style={{ flexShrink: 0 }} />
        <div style={{ overflow: 'hidden', maxWidth: '200px' }}>
          <div style={{
            fontSize: '13px', color: 'white', fontWeight: 500,
            whiteSpace: 'nowrap',
            animation: 'marquee 10s linear infinite',
          }}>
            {music}
          </div>
        </div>
      </div>
    </div>
  );
};
