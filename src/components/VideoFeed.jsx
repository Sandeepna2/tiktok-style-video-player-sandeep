import React, { useState, useEffect, useRef } from 'react';
import { VideoCard } from './VideoCard';
import { videos as initialVideos } from '../data/videoData';

export const VideoFeed = () => {
  const [videos, setVideos] = useState(initialVideos);
  const [isMuted, setIsMuted] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown') { e.preventDefault(); scrollToIndex(activeIndex + 1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); scrollToIndex(activeIndex - 1); }
      else if (e.key === ' ') { e.preventDefault(); window.dispatchEvent(new CustomEvent('toggle-active-video')); }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex]);

  const scrollToIndex = (index) => {
    if (index < 0 || index >= videos.length) return;
    const container = containerRef.current;
    if (!container) return;
    const child = container.children[index];
    if (child) { child.scrollIntoView({ behavior: 'smooth' }); setActiveIndex(index); }
  };

  // IntersectionObserver to track active video on scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries.find(e => e.isIntersecting);
        if (entry) {
          const index = parseInt(entry.target.getAttribute('data-index'), 10);
          if (!isNaN(index)) setActiveIndex(index);
        }
      },
      { 
        threshold: 0.6, // Higher threshold for more reliable center detection
        root: container,
        rootMargin: '0px'
      }
    );

    Array.from(container.children).forEach((child) => {
      // Only observe video card wrappers, not other potential children
      if (child.hasAttribute('data-index')) {
        observer.observe(child);
      }
    });

    return () => observer.disconnect();
  }, [videos]);

  // Infinite scroll: append more when near bottom
  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;
    const { scrollTop, scrollHeight, clientHeight } = container;
    if (scrollTop + clientHeight >= scrollHeight - 50) {
      setVideos(prev => [
        ...prev,
        ...initialVideos.map(v => ({ ...v, id: `${v.id}-${Date.now()}-${Math.random()}` }))
      ]);
    }
  };

  const toggleMute = () => setIsMuted(prev => !prev);

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className="hide-scrollbar"
      style={{
        height: '100vh',
        width: '100%',
        overflowY: 'scroll',
        scrollSnapType: 'y mandatory',
        background: '#000',
      }}
    >

      {videos.map((video, index) => (
        <div
          key={video.id}
          data-index={index}
          style={{
            height: '100vh',
            width: '100%',
            scrollSnapAlign: 'start',
            flexShrink: 0,
          }}
        >
          <VideoCard
            video={video}
            isMuted={isMuted}
            isActive={index === activeIndex}
            toggleMute={toggleMute}
          />
        </div>
      ))}
    </div>
  );
};
