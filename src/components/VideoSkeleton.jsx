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
      <div style={{ height: '16px', width: '40%', background: '#2a2a2a', borderRadius: '8px', animation: 'shimmer 1.5s infinite' }} />
      <div style={{ height: '13px', width: '70%', background: '#2a2a2a', borderRadius: '8px', animation: 'shimmer 1.5s infinite 0.1s' }} />
      <div style={{ height: '13px', width: '55%', background: '#2a2a2a', borderRadius: '8px', animation: 'shimmer 1.5s infinite 0.2s' }} />

      {/* Skeleton action icons */}
      <div style={{
        position: 'absolute', right: '16px', bottom: '80px',
        display: 'flex', flexDirection: 'column', gap: '20px',
      }}>
        {[1,2,3,4,5].map(i => (
          <div key={i} style={{
            width: '44px', height: '44px', borderRadius: '50%',
            background: '#2a2a2a', animation: `shimmer 1.5s infinite ${i * 0.1}s`,
          }} />
        ))}
      </div>

      {/* Center Spinner */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{
          width: '48px', height: '48px',
          border: '4px solid rgba(254,44,85,0.3)',
          borderTop: '4px solid #FE2C55',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }} />
      </div>

      <style>{`
        @keyframes shimmer {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
