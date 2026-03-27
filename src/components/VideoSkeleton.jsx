import React from 'react';

export const VideoSkeleton = () => {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: '#1a1a1a',
      display: 'flex', flexDirection: 'column',
      justifyContent: 'flex-end',
      padding: '24px',
      gap: '12px',
      zIndex: 40,
    }}>
      {/* Skeleton text lines */}
      <div style={{ height: '16px', width: '40%', background: '#222', borderRadius: '8px', position: 'relative', overflow: 'hidden' }}>
        <div className="shimmer-bar" />
      </div>
      <div style={{ height: '13px', width: '70%', background: '#222', borderRadius: '8px', position: 'relative', overflow: 'hidden' }}>
        <div className="shimmer-bar" />
      </div>
      <div style={{ height: '13px', width: '55%', background: '#222', borderRadius: '8px', position: 'relative', overflow: 'hidden' }}>
        <div className="shimmer-bar" />
      </div>

      {/* Skeleton action icons */}
      <div style={{
        position: 'absolute', right: '16px', bottom: '80px',
        display: 'flex', flexDirection: 'column', gap: '20px',
      }}>
        {[1,2,3,4,5].map(i => (
          <div key={i} style={{
            width: '44px', height: '44px', borderRadius: '50%',
            background: '#222', position: 'relative', overflow: 'hidden'
          }}>
            <div className="shimmer-bar" style={{ animationDelay: `${i * 0.1}s` }} />
          </div>
        ))}
      </div>

      {/* Center Spinner */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{
          width: '56px', height: '56px',
          border: '4px solid rgba(254,44,85,0.1)',
          borderTop: '4px solid #FE2C55',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
          boxShadow: '0 0 20px rgba(254,44,85,0.2)',
        }} />
      </div>

      <style>{`
        .shimmer-bar {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.05),
            transparent
          );
          transform: translateX(-100%);
          animation: shimmer-load 1.8s infinite linear;
        }
        @keyframes shimmer-load {
          to { transform: translateX(100%); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
