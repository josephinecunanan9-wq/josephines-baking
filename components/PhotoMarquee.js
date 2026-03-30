import { useEffect, useRef } from 'react'

// Photos in alternating action/holding order
const PHOTOS = [
  { src: '/photos/IMG_7512.PNG', alt: 'Frosting cinnamon rolls' },
  { src: '/photos/IMG_7513.PNG', alt: 'Holding oat bars' },
  { src: '/photos/Josephines Baking Recipes-2.PNG', alt: 'Decorating Halloween cookies' },
  { src: '/photos/IMG_7514.PNG', alt: 'Holding holiday muffins' },
  { src: '/photos/Josephines Baking Recipes-3.PNG', alt: 'Adding streusel to mini pies' },
  { src: '/photos/IMG_7515.PNG', alt: 'Holding holiday cinnamon rolls' },
  { src: '/photos/Josephines Baking Recipes-4.PNG', alt: 'Scooping cookie dough' },
  { src: '/photos/IMG_7516.PNG', alt: 'Holding red velvet cinnamon rolls' },
]

// Baking SVG decorations — only relevant items
const BAKING_SVGS = [
  // Cookie
  <svg key="cookie" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="20" cy="20" r="14"/>
    <circle cx="15" cy="16" r="1.5" fill="currentColor" stroke="none"/>
    <circle cx="24" cy="14" r="1.5" fill="currentColor" stroke="none"/>
    <circle cx="17" cy="24" r="1.5" fill="currentColor" stroke="none"/>
    <circle cx="25" cy="22" r="1.5" fill="currentColor" stroke="none"/>
  </svg>,
  // Cupcake
  <svg key="cupcake" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 22 c0-5 4-9 8-9s8 4 8 9"/>
    <rect x="10" y="22" width="20" height="8" rx="2"/>
    <path d="M20 22 c0-3-3-6-3-10 a3 3 0 0 1 6 0 c0 4-3 7-3 10"/>
    <path d="M17 14 q3-4 6 0"/>
  </svg>,
  // Cinnamon roll
  <svg key="roll" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="20" cy="20" r="13"/>
    <path d="M20 20 m0-8 a8 8 0 0 1 0 16 a5 5 0 0 1 0-10 a2.5 2.5 0 0 1 0 5"/>
  </svg>,
  // Cake slice
  <svg key="slice" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 30 L20 10 L32 30 Z"/>
    <line x1="8" y1="30" x2="32" y2="30"/>
    <line x1="11" y1="24" x2="29" y2="24"/>
    <circle cx="20" cy="9" r="1.5" fill="currentColor" stroke="none"/>
  </svg>,
  // Muffin
  <svg key="muffin" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 22 Q11 14 20 13 Q29 14 27 22"/>
    <rect x="11" y="22" width="18" height="9" rx="1"/>
    <path d="M15 16 Q20 11 25 16"/>
  </svg>,
  // Brownie
  <svg key="brownie" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="22" height="22" rx="2"/>
    <line x1="9" y1="20" x2="31" y2="20"/>
    <line x1="20" y1="9" x2="20" y2="31"/>
  </svg>,
  // Full cake
  <svg key="cake" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="7" y="22" width="26" height="10" rx="1"/>
    <rect x="11" y="14" width="18" height="8"/>
    <path d="M17 14 L17 10 M20 14 L20 9 M23 14 L23 10"/>
    <circle cx="17" cy="10" r="1.2" fill="currentColor" stroke="none"/>
    <circle cx="20" cy="9" r="1.2" fill="currentColor" stroke="none"/>
    <circle cx="23" cy="10" r="1.2" fill="currentColor" stroke="none"/>
  </svg>,
  // Donut
  <svg key="donut" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="20" cy="20" r="13"/>
    <circle cx="20" cy="20" r="5"/>
  </svg>,
]

// Scattered decoration positions for border overlay
const DECOR_POSITIONS = [
  { top: '8%', left: '2%', rotate: 12, size: 28 },
  { top: '35%', left: '1%', rotate: -8, size: 22 },
  { top: '65%', left: '3%', rotate: 20, size: 26 },
  { top: '88%', left: '1.5%', rotate: -15, size: 24 },
  { top: '12%', right: '2%', rotate: -10, size: 26 },
  { top: '45%', right: '1%', rotate: 18, size: 22 },
  { top: '72%', right: '2.5%', rotate: -5, size: 28 },
  { top: '90%', right: '1%', rotate: 14, size: 24 },
]

// Horizontal marquee for homepage
export function HorizontalPhotoMarquee() {
  const repeated = [...PHOTOS, ...PHOTOS, ...PHOTOS]

  return (
    <div style={{
      position: 'relative',
      overflow: 'hidden',
      background: 'var(--mauve-pale)',
      borderTop: '0.5px solid var(--border-m)',
      borderBottom: '0.5px solid var(--border-m)',
      padding: '12px 0',
    }}>
      {/* Baking decorations scattered in borders */}
      {DECOR_POSITIONS.slice(0, 4).map((pos, i) => (
        <div key={i} style={{
          position: 'absolute',
          top: pos.top,
          left: pos.left,
          transform: `rotate(${pos.rotate}deg)`,
          color: 'var(--mauve)',
          opacity: 0.35,
          width: pos.size,
          height: pos.size,
          zIndex: 2,
          pointerEvents: 'none',
        }}>
          {BAKING_SVGS[i % BAKING_SVGS.length]}
        </div>
      ))}
      {DECOR_POSITIONS.slice(4).map((pos, i) => (
        <div key={i + 4} style={{
          position: 'absolute',
          top: pos.top,
          right: pos.right,
          transform: `rotate(${pos.rotate}deg)`,
          color: 'var(--mauve)',
          opacity: 0.35,
          width: pos.size,
          height: pos.size,
          zIndex: 2,
          pointerEvents: 'none',
        }}>
          {BAKING_SVGS[(i + 4) % BAKING_SVGS.length]}
        </div>
      ))}

      {/* Scrolling strip */}
      <div style={{
        display: 'flex',
        gap: '10px',
        animation: 'marquee-h 40s linear infinite',
        width: 'max-content',
        padding: '0 5px',
      }}>
        {repeated.map((photo, i) => (
          <div key={i} style={{
            flexShrink: 0,
            height: '140px',
            width: '110px',
            overflow: 'hidden',
            position: 'relative',
            boxShadow: '0 8px 32px rgba(113,12,33,0.08)',
          }}>
            <img
              src={photo.src}
              alt={photo.alt}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            {/* White overlay to soften video screenshots */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(255,255,255,0.18)',
              pointerEvents: 'none',
            }} />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marquee-h {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
      `}</style>
    </div>
  )
}

// Vertical marquee for about page
export function VerticalPhotoMarquee() {
  const repeated = [...PHOTOS, ...PHOTOS, ...PHOTOS]

  return (
    <div style={{
      position: 'relative',
      overflow: 'hidden',
      height: '600px',
      background: 'var(--mauve-pale)',
      borderLeft: '0.5px solid var(--border-m)',
      borderRight: '0.5px solid var(--border-m)',
    }}>
      {/* Baking decorations scattered on sides */}
      {DECOR_POSITIONS.map((pos, i) => (
        <div key={i} style={{
          position: 'absolute',
          top: pos.top,
          left: pos.left,
          right: pos.right,
          transform: `rotate(${pos.rotate}deg)`,
          color: 'var(--mauve)',
          opacity: 0.35,
          width: pos.size,
          height: pos.size,
          zIndex: 2,
          pointerEvents: 'none',
        }}>
          {BAKING_SVGS[i % BAKING_SVGS.length]}
        </div>
      ))}

      {/* Scrolling strip */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        animation: 'marquee-v 35s linear infinite',
        padding: '5px 12px',
      }}>
        {repeated.map((photo, i) => (
          <div key={i} style={{
            flexShrink: 0,
            height: '200px',
            width: '100%',
            overflow: 'hidden',
            position: 'relative',
            boxShadow: '0 8px 32px rgba(113,12,33,0.08)',
          }}>
            <img
              src={photo.src}
              alt={photo.alt}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(255,255,255,0.18)',
              pointerEvents: 'none',
            }} />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marquee-v {
          0% { transform: translateY(0); }
          100% { transform: translateY(-33.333%); }
        }
      `}</style>
    </div>
  )
}
