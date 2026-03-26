import React from 'react';
import { VideoFeed } from './components/VideoFeed';

function App() {
  return (
    <div style={{
      position: 'relative',
      height: '100vh',
      width: '100%',
      background: '#000',
      overflow: 'hidden',
      userSelect: 'none',
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
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
        <div style={{ display: 'flex', gap: '32px', pointerEvents: 'auto' }}>
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

      {/* Main Video Feed */}
      <VideoFeed />

      {/* Bottom Navigation */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: '60px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-around',
        background: 'rgba(0,0,0,0.8)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        zIndex: 100,
      }}>
        {['Home', 'Friends', null, 'Inbox', 'Profile'].map((label, i) => {
          if (label === null) {
            // Create button
            return (
              <div key="create" style={{ position: 'relative' }}>
                <div style={{
                  position: 'absolute', inset: 0,
                  background: '#25F4EE', borderRadius: '8px',
                  transform: 'translateX(4px)',
                }} />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: '#FE2C55', borderRadius: '8px',
                  transform: 'translateX(-4px)',
                }} />
                <div style={{
                  position: 'relative',
                  background: 'white', borderRadius: '8px',
                  width: '44px', height: '28px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{ color: '#000', fontWeight: 700, fontSize: '20px', lineHeight: 1 }}>+</span>
                </div>
              </div>
            );
          }
          return (
            <button key={label} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: i === 0 ? 'white' : 'rgba(255,255,255,0.45)',
              fontSize: '11px', fontWeight: 600,
              display: 'flex', flexDirection: 'column', alignItems: 'center',
            }}>
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default App;
