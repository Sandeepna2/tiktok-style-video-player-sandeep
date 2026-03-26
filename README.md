# TikTok-Style Video Player (React)

A high-performance, mobile-responsive vertical video player built with React, Vite, and Tailwind CSS. This project simulates the core TikTok experience with smooth vertical scroll snapping, interactive overlays, and auto-playback management.

### 🌐 Live Demo: [tiktok-style-video-player-sandeep.vercel.app](https://tiktok-style-video-player-sandeep.vercel.app/)

## 🚀 Features

### Core Features (Implemented)
- **Vertical Video Feed**: Full-screen vertical layout with smooth CSS Scroll Snapping.
- **Auto-play/Pause**: Videos automatically play when scrolled into view and pause when scrolled away using `IntersectionObserver`.
- **Tap to Play/Pause**: Tapping the video area toggles playback with a visible overlay icon.
- **Progress Bar**: A thin, sleek progress bar at the bottom of each video.
- **Interactive Overlays**:
  - Right-side Action Bar: Like (with animation), Comment, Share, and Bookmark.
  - User Info: Username, expandable caption, and scrolling music marquee.
  - Spinning Music Disc: Rotates while the video is playing.
- **Sound Toggle**: Global mute/unmute control for all videos.

### Bonus Features (Implemented)
- **Double-tap to Like**: Large heart animation appears at the tap location.
- **Follow Button**: Interactive follow/following state on the user avatar.
- **Long-press to Pause**: Holding down pauses playback; releasing resumes it.
- **Video Loading Skeleton**: Shimmering placeholder shown while videos buffer.
- **Responsive Design**: Optimized for both mobile (375x812) and desktop viewports.
- **Keyboard Navigation**: Use `Arrow Up/Down` to scroll and `Space` to play/pause.

## 🛠️ Tech Stack & Rationale

- **React 18**: Functional components and hooks (`useState`, `useRef`, `useEffect`) for efficient state management.
- **Vite**: Ultra-fast build tool for a superior developer experience.
- **Tailwind CSS**: For rapid, utility-first styling with high performance and "Rich Aesthetics".
- **Framer Motion**: For smooth, high-quality UI animations (Liked heart, follow button, play/pause icons).
- **Lucide React**: Clean and consistent icon set.
- **Native HTML5 `<video>`**: No external player libraries used, ensuring full control over the playback lifecycle.

## 📦 Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Sandeepna2/tiktok-style-video-player-sandeep.git
cd tiktok-style-video-player-sandeep
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

## 📝 Known Limitations / Trade-offs

- **Video Loop**: Currently, the infinite scroll works by appending clones of the initial data. In a real-world app, this would be replaced with a paginated API call.
- **Mute Policy**: To comply with browser autoplay policies, videos start muted by default.
- **Audio Sync**: The "Spinning Music Disc" uses the user's avatar as a placeholder for the album art.
