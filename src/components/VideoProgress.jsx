import React from 'react';

export const VideoProgress = ({ progress }) => {
  return (
    <div style={{
      position: 'absolute',
      bottom: '60px', left: 0,
      width: '100%',
      height: '3px',
      background: 'rgba(255,255,255,0.2)',
      zIndex: 20,
    }}>
      <div style={{
        height: '100%',
        width: `${progress}%`,
        background: 'white',
        boxShadow: '0 0 8px white',
        transition: 'width 0.1s linear',
      }} />
    </div>
  );
};
