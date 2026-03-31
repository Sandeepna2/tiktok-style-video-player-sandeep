import React, { useState, useRef, useEffect } from 'react';
import { ActionBar } from './ActionBar';
import { UserInfo } from './UserInfo';
import { VideoProgress } from './VideoProgress';
import { VideoSkeleton } from './VideoSkeleton';
import { Play, Pause, Volume2, VolumeX, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const VideoCard = ({ video, isMuted, toggleMute, isActive }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showIcon, setShowIcon] = useState(null); // 'play' | 'pause' | null
  const [tapLikes, setTapLikes] = useState([]);
  const [isPausedByLongPress, setIsPausedByLongPress] = useState(false);
  const [showCenterHeart, setShowCenterHeart] = useState(false);

  // --- Playback helpers ---
  const play = async () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = isMuted;
    try {
      await v.play();
      setIsPlaying(true);
      console.log("Video playback started:", video.url);
    } catch (e) {
      console.warn("Autoplay blocked/failed. Interaction required:", e);
      // Autoplay blocked — user must tap
      setIsPlaying(false);
    }
  };

  const pause = () => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    setIsPlaying(false);
  };

  const toggle = () => {
    if (isPlaying) {
      pause();
      flash('pause');
    } else {
      play().then(() => flash('play'));
    }
  };

  const flash = (icon) => {
    setShowIcon(icon);
    setTimeout(() => setShowIcon(null), 900);
  };

  // Sync muted on global toggle 
  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = isMuted;
  }, [isMuted]);

  // Auto-play/pause based on isActive prop
  useEffect(() => {
    if (isActive) {
      play();
    } else {
      pause();
    }
  }, [isActive]);

  // Space key: toggle-active-video custom event
  useEffect(() => {
    const handler = () => { if (isActive) toggle(); };
    window.addEventListener('toggle-active-video', handler);
    return () => window.removeEventListener('toggle-active-video', handler);
  }, [isActive, isPlaying]);

  // --- Double-tap to like ---
  const lastTapRef = useRef(0);
  const singleTapTimer = useRef(null);

  const handleTap = (e) => {
    const now = Date.now();
    if (now - lastTapRef.current < 280) {
      clearTimeout(singleTapTimer.current);
      const rect = e.currentTarget.getBoundingClientRect();
      const heart = { x: e.clientX - rect.left, y: e.clientY - rect.top, id: now };
      setTapLikes(prev => [...prev, heart]);

      // Trigger large center heart
      setShowCenterHeart(true);
      setTimeout(() => setShowCenterHeart(false), 800);

      setTimeout(() => setTapLikes(prev => prev.filter(h => h.id !== heart.id)), 1100);
    } else {
      singleTapTimer.current = setTimeout(() => toggle(), 280);
    }
    lastTapRef.current = now;
  };

  // --- Long-press to pause ---
  const longPressRef = useRef(null);
  const resumeAfterLongPress = useRef(false);

  const handlePointerDown = () => {
    longPressRef.current = setTimeout(() => {
      if (isPlaying) {
        pause();
        resumeAfterLongPress.current = true;
        setIsPausedByLongPress(true);
      }
    }, 450);
  };

  const handlePointerUp = () => {
    clearTimeout(longPressRef.current);
    if (resumeAfterLongPress.current) {
      play();
      resumeAfterLongPress.current = false;
      setIsPausedByLongPress(false);
    }
  };

  return (
    <div
      style={{
        position: 'relative', width: '100%', height: '100%',
        background: '#000', display: 'flex',
        alignItems: 'center', justifyContent: 'center',
      }}
    >
      <div style={{
        position: 'relative',
        width: '100%', height: '100%',
        background: '#111',
        overflow: 'hidden',
        userSelect: 'none',
      }}>

        {/* Loading Skeleton */}
        {isLoading && <VideoSkeleton />}

        {/* Tap-to-play overlay (when video hasn't started yet) */}
        {!isLoading && !isPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggle}
            style={{
              position: 'absolute', inset: 0, zIndex: 25,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              background: 'rgba(0,0,0,0.4)', cursor: 'pointer', gap: '14px',
            }}
          >
            <div style={{
              width: '80px', height: '80px', borderRadius: '50%',
              background: 'rgba(255,255,255,0.12)',
              border: '2.5px solid rgba(255,255,255,0.7)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              backdropFilter: 'blur(6px)',
              boxShadow: '0 0 40px rgba(254,44,85,0.3)',
              animation: 'pulse-beat 1.5s infinite ease-in-out',
            }}>
              <Play color="white" size={36} fill="white" style={{ marginLeft: '5px' }} />
            </div>
            <span style={{
              color: 'rgba(255,255,255,0.85)', fontSize: '13px',
              fontWeight: 600, letterSpacing: '0.5px',
            }}>Tap to play</span>
          </motion.div>
        )}

        {/* Native HTML5 Video */}
        <video
          ref={videoRef}
          src={video.url}
          playsInline
          autoPlay={isActive}
          muted={isMuted}
          loop={false}
          preload="auto"
          onLoadedData={() => setIsLoading(false)}
          onWaiting={() => setIsLoading(true)}
          onPlaying={() => setIsLoading(false)}
          onError={(e) => {
            console.error("Video failed to load or source is invalid:", video.url, e);
            setIsLoading(false); // Clear skeleton so it doesn't spin forever
          }}
          onTimeUpdate={() => {
            const v = videoRef.current;
            if (v && v.duration) setProgress((v.currentTime / v.duration) * 100);
          }}
          onEnded={() => {
            if (videoRef.current) {
              videoRef.current.currentTime = 0;
              play();
            }
          }}
          onClick={handleTap}
          onMouseDown={handlePointerDown}
          onMouseUp={handlePointerUp}
          onTouchStart={handlePointerDown}
          onTouchEnd={handlePointerUp}
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover',
            cursor: 'pointer',
            opacity: isLoading ? 0 : 1,
            transition: 'opacity 0.4s ease',
          }}
        />

        {/* Gradient overlay for readability of overlays at bottom */}
        {!isLoading && (
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            height: '70%',
            background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)',
            pointerEvents: 'none', zIndex: 5,
          }} />
        )}

        {/* Play/Pause flash icon */}
        <AnimatePresence>
          {showIcon && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 0.9, scale: 1.1 }}
              exit={{ opacity: 0, scale: 1.5 }}
              transition={{ duration: 0.15 }}
              style={{
                position: 'absolute', inset: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                pointerEvents: 'none', zIndex: 30,
              }}
            >
              <div style={{
                background: 'rgba(0,0,0,0.5)', padding: '20px',
                borderRadius: '50%', backdropFilter: 'blur(4px)',
              }}>
                {showIcon === 'play'
                  ? <Play color="white" size={44} fill="white" />
                  : <Pause color="white" size={44} fill="white" />
                }
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sound Toggle */}
        <button
          onClick={(e) => { e.stopPropagation(); toggleMute(); }}
          style={{
            position: 'absolute', top: '60px', right: '14px',
            background: 'rgba(0,0,0,0.45)', border: 'none',
            borderRadius: '50%', padding: '9px',
            cursor: 'pointer', zIndex: 20,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(6px)',
          }}
        >
          {isMuted ? <VolumeX color="white" size={20} /> : <Volume2 color="white" size={20} />}
        </button>

        {/* Double-tap heart animations */}
        <AnimatePresence>
          {showCenterHeart && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.3, 1], opacity: [0, 1, 0.8] }}
              exit={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 0.4 }}
              style={{
                position: 'absolute', inset: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                pointerEvents: 'none', zIndex: 60,
              }}
            >
              <Heart size={140} fill="#FE2C55" color="#FE2C55"
                style={{ filter: 'drop-shadow(0 0 30px rgba(254,44,85,0.8))' }} />
            </motion.div>
          )}

          {tapLikes.map(heart => (
            <motion.div
              key={heart.id}
              initial={{ scale: 0, opacity: 1, rotate: (Math.random() * 30 - 15) }}
              animate={{ scale: [0.5, 1.4, 1.2], opacity: [1, 1, 0], y: -130 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              style={{
                position: 'absolute', left: heart.x - 44, top: heart.y - 44,
                pointerEvents: 'none', zIndex: 50,
              }}
            >
              <Heart size={88} fill="#FE2C55" color="#FE2C55"
                style={{ filter: 'drop-shadow(0 0 16px rgba(254,44,85,0.6))' }} />
            </motion.div>
          ))}

          {isPausedByLongPress && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'absolute', inset: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'rgba(0,0,0,0.2)',
                backdropFilter: 'blur(3px)',
                zIndex: 65,
                pointerEvents: 'none',
              }}
            >
              <div style={{
                background: 'rgba(0,0,0,0.6)',
                padding: '16px 32px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                border: '1px solid rgba(255,255,255,0.1)',
              }}>
                <Pause size={32} color="white" fill="white" />
                <span style={{
                  color: 'white',
                  fontSize: '20px',
                  fontWeight: 700,
                  letterSpacing: '1px'
                }}>PAUSED</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Right-side Action Bar */}
        <ActionBar
          likes={video.likes}
          comments={video.comments}
          shares={video.shares}
          bookmarks={video.bookmarks}
          userAvatar={video.user.avatar}
          followed={video.user.followed}
        />

        {/* Bottom-left User Info */}
        <UserInfo
          userName={video.user.name}
          description={video.description}
          music={video.music}
        />

        {/* Spinning Music Disc - bottom right, above action bar */}
        <motion.div
          animate={{ rotate: isPlaying ? 360 : 0 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatType: 'loop' }}
          style={{
            position: 'absolute', right: '14px', bottom: '98px', zIndex: 10,
            width: '48px', height: '48px', borderRadius: '50%',
            border: '3px solid rgba(255,255,255,0.15)',
            overflow: 'hidden', background: '#000',
            boxShadow: '0 0 0 2px rgba(255,255,255,0.08)',
          }}
        >
          <img
            src={video.user.avatar}
            alt="disc"
            style={{
              width: '100%', height: '100%',
              objectFit: 'cover',
              transform: 'scale(0.72)',
              borderRadius: '50%',
            }}
          />
        </motion.div>

        {/* Progress Bar */}
        <VideoProgress progress={progress} />
      </div>
    </div>
  );
};
