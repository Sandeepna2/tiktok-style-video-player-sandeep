import React, { useState } from 'react';
import { Heart, MessageSquare, Share2, Bookmark, Plus, Check } from 'lucide-react';
import { motion } from 'framer-motion';

export const ActionBar = ({ likes, comments, shares, bookmarks, userAvatar, followed: initialFollowed }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [bookmarked, setBookmarked] = useState(false);
  const [followed, setFollowed] = useState(initialFollowed);

  const handleLike = () => {
    setLiked(prev => !prev);
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
  };

  const fmt = (n) => n >= 1000 ? (n / 1000).toFixed(1) + 'K' : n;

  const iconStyle = {
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px',
  };

  const btnStyle = {
    background: 'none', border: 'none', cursor: 'pointer',
    padding: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center',
  };

  const labelStyle = {
    fontSize: '12px', fontWeight: 700,
    color: 'white',
    textShadow: '0 1px 4px rgba(0,0,0,0.9)',
  };

  return (
    <div style={{
      position: 'absolute',
      right: '10px',
      bottom: '160px',   // clear 60px bottom nav + spacing
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '18px',
      zIndex: 10,
    }}>

      {/* Avatar + Follow */}
      <div style={{ position: 'relative', marginBottom: '6px' }}>
        <div style={{
          width: '46px', height: '46px', borderRadius: '50%',
          border: '2px solid white', overflow: 'hidden',
          boxShadow: '0 2px 10px rgba(0,0,0,0.5)',
        }}>
          <img src={userAvatar} alt="avatar"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <motion.button
          whileTap={{ scale: 0.8 }}
          onClick={() => setFollowed(v => !v)}
          style={{
            position: 'absolute',
            bottom: '-9px', left: '50%',
            transform: 'translateX(-50%)',
            width: '20px', height: '20px',
            borderRadius: '50%',
            background: followed ? '#25F4EE' : '#FE2C55',
            border: '1.5px solid white',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          {followed
            ? <Check size={11} color="white" strokeWidth={3} />
            : <Plus size={11} color="white" strokeWidth={3} />
          }
        </motion.button>
      </div>

      {/* Like */}
      <div style={iconStyle}>
        <motion.button whileTap={{ scale: 1.5 }} onClick={handleLike} style={btnStyle}>
          <Heart size={30}
            fill={liked ? '#FE2C55' : 'transparent'}
            color={liked ? '#FE2C55' : 'white'} />
        </motion.button>
        <span style={labelStyle}>{fmt(likeCount)}</span>
      </div>

      {/* Comment */}
      <div style={iconStyle}>
        <motion.button whileTap={{ scale: 1.2 }} style={btnStyle}>
          <MessageSquare size={30} color="white" fill="rgba(255,255,255,0.15)" />
        </motion.button>
        <span style={labelStyle}>{fmt(comments)}</span>
      </div>

      {/* Bookmark */}
      <div style={iconStyle}>
        <motion.button whileTap={{ scale: 1.2 }}
          onClick={() => setBookmarked(v => !v)} style={btnStyle}>
          <Bookmark size={30}
            fill={bookmarked ? '#facc15' : 'transparent'}
            color={bookmarked ? '#facc15' : 'white'} />
        </motion.button>
        <span style={labelStyle}>{fmt(bookmarks)}</span>
      </div>

      {/* Share */}
      <div style={iconStyle}>
        <motion.button whileTap={{ scale: 1.2 }} style={btnStyle}>
          <Share2 size={30} color="white" fill="rgba(255,255,255,0.15)" />
        </motion.button>
        <span style={labelStyle}>{fmt(shares)}</span>
      </div>
    </div>
  );
};
