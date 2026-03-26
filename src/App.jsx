import React from 'react';
import { VideoFeed } from './components/VideoFeed';

import { Home, Search, MessageSquare, User, Plus } from 'lucide-react';

function App() {
  const navItems = [
    { icon: Home, label: 'Home', active: true },
    { icon: Search, label: 'Friends', active: false },
    { icon: null, label: null, active: false }, // Plus button
    { icon: MessageSquare, label: 'Inbox', active: false },
    { icon: User, label: 'Profile', active: false },
  ];

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
          height: '70px', // slightly taller for indicator
          display: 'flex', flexDirection: 'column',
          zIndex: 100,
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-around',
            background: 'rgba(0,0,0,0.92)',
            backdropFilter: 'blur(20px)',
            borderTop: '0.5px solid rgba(255,255,255,0.08)',
            height: '60px',
            padding: '0 8px',
          }}>
            {navItems.map((item, i) => {
              if (item.icon === null) {
                // Create button (+)
                return (
                  <div key="create" style={{ position: 'relative', cursor: 'pointer' }}>
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: '#25F4EE', borderRadius: '8px',
                      transform: 'translateX(3px)',
                    }} />
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: '#FE2C55', borderRadius: '8px',
                      transform: 'translateX(-3px)',
                    }} />
                    <div style={{
                      position: 'relative',
                      background: 'white', borderRadius: '8px',
                      width: '44px', height: '28px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Plus color="#000" size={24} strokeWidth={3} />
                    </div>
                  </div>
                );
              }
              return (
                <button key={item.label} style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: item.active ? 'white' : 'rgba(255,255,255,0.5)',
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                  gap: '4px', width: '20%',
                }}>
                  <item.icon size={22} strokeWidth={item.active ? 2.5 : 2} />
                  <span style={{ fontSize: '10px', fontWeight: 600 }}>{item.label}</span>
                </button>
              );
            })}
          </div>
          
          {/* Home Indicator (iPhone style) */}
          <div style={{
            height: '10px', background: 'rgba(0,0,0,0.92)',
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            paddingBottom: '4px'
          }}>
            <div style={{
              width: '134px', height: '5px',
              background: 'white', borderRadius: '100px',
              opacity: 0.9
            }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
