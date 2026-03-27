import React from 'react';
import { VideoFeed } from './components/VideoFeed';

function App() {
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: '#111', // Outer background
      display: 'flex',
      justifyContent: 'center',
    }}>
      <div style={{
        position: 'relative',
        height: '100vh',
        width: '100%',
        maxWidth: '480px', // Standardized mobile container
        background: '#000',
        overflow: 'hidden',
        userSelect: 'none',
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        boxShadow: '0 0 100px rgba(0,0,0,0.5)', // Subtle depth
      }}>
        {/* Top Navigation */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          display: 'flex', justifyContent: 'center',
          padding: '20px 0 12px',
          zIndex: 100,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)',
          pointerEvents: 'none',
        }}>
          <div style={{ 
            display: 'flex', gap: '32px', pointerEvents: 'auto',
            alignItems: 'center', position: 'relative', width: '100%',
            justifyContent: 'center',
          }}>
            <div style={{ display: 'flex', gap: '32px' }}>
              <button style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: 'rgba(255,255,255,0.55)', fontWeight: 700, fontSize: '16px',
                transition: 'color 0.2s',
              }}>
                Following
              </button>
              <button style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: 'white', fontWeight: 700, fontSize: '16px',
                borderBottom: '2px solid white', paddingBottom: '2px',
              }}>
                For You
              </button>
            </div>
          </div>
        </div>

        {/* Main Video Feed */}
        <VideoFeed />
      </div>
    </div>
  );
}

export default App;
