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

const ICON_PALETTE = ['#710C21', '#9B7B8C', '#C4A8B6', '#B87A90', '#D4BEC8']
const ICON_KEYS = ['cookie', 'cupcake', 'donut', 'cake', 'muffin', 'roll', 'loaf', 'brownie', 'poptart']

function BakingIcon({ type, size = 28, colorIdx = 0 }) {
  const c = ICON_PALETTE[colorIdx % ICON_PALETTE.length]
  const w = 'rgba(255,255,255,0.75)'
  const m = 'rgba(255,255,255,0.45)'

  const icons = {
    cookie: (
      <svg width={size} height={size} viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="15" fill={c} />
        <circle cx="14" cy="15" r="2.8" fill={w} />
        <circle cx="25" cy="13" r="2.2" fill={w} />
        <circle cx="16" cy="26" r="2.5" fill={w} />
        <circle cx="27" cy="24" r="2" fill={w} />
        <circle cx="22" cy="20" r="1.6" fill={m} />
        <circle cx="12" cy="23" r="1.8" fill={m} />
      </svg>
    ),
    cupcake: (
      <svg width={size} height={size} viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
        <path d="M11 23 Q9 13 20 12 Q31 13 29 23Z" fill={c} />
        <rect x="9" y="23" width="22" height="10" rx="3" fill={c} />
        <path d="M20 23 Q17 16 17 11 Q17 8 20 8 Q23 8 23 11 Q23 16 20 23Z" fill={w} />
        <ellipse cx="20" cy="8" rx="3.5" ry="2.5" fill="#f0c0c8" />
        <circle cx="20" cy="6.5" r="1.5" fill="#e89090" />
      </svg>
    ),
    donut: (
      <svg width={size} height={size} viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="15" fill={c} />
        <circle cx="20" cy="20" r="6.5" fill="#EDE0E6" />
        <circle cx="14" cy="13" r="1.8" fill={w} opacity="0.8" />
        <circle cx="25" cy="14" r="1.4" fill={w} opacity="0.7" />
        <circle cx="27" cy="25" r="1.6" fill={w} opacity="0.8" />
        <circle cx="15" cy="27" r="1.3" fill={w} opacity="0.6" />
      </svg>
    ),
    cake: (
      <svg width={size} height={size} viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="22" width="28" height="13" rx="2" fill={c} />
        <rect x="10" y="13" width="20" height="10" fill={c} opacity="0.88" />
        <rect x="6" y="22" width="28" height="3" fill={w} opacity="0.25" />
        <rect x="10" y="13" width="20" height="2.5" fill={w} opacity="0.2" />
        <line x1="16" y1="13" x2="16" y2="8" stroke={w} strokeWidth="1.8" strokeLinecap="round" />
        <line x1="20" y1="13" x2="20" y2="7" stroke={w} strokeWidth="1.8" strokeLinecap="round" />
        <line x1="24" y1="13" x2="24" y2="8" stroke={w} strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="16" cy="7.5" r="2.2" fill="#f0c0a0" />
        <circle cx="20" cy="6.5" r="2.2" fill="#f0a0c0" />
        <circle cx="24" cy="7.5" r="2.2" fill="#f0c0a0" />
      </svg>
    ),
    muffin: (
      <svg width={size} height={size} viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
        <path d="M11 24 Q9 13 20 12 Q31 13 29 24Z" fill={c} />
        <rect x="10" y="24" width="20" height="10" rx="2" fill={c} opacity="0.9" />
        <path d="M14 17 Q20 11 26 17" fill="none" stroke={w} strokeWidth="1.6" strokeLinecap="round" opacity="0.8" />
        <path d="M12 21 Q20 15 28 21" fill="none" stroke={w} strokeWidth="1" strokeLinecap="round" opacity="0.35" />
      </svg>
    ),
    roll: (
      <svg width={size} height={size} viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="15" fill={c} />
        <path d="M20 20 m0-10 a10 10 0 0 1 0 20 a6.5 6.5 0 0 1 0-13 a3.5 3.5 0 0 1 0 7" fill="none" stroke={w} strokeWidth="2" strokeLinecap="round" opacity="0.7" />
        <circle cx="20" cy="20" r="2" fill={w} opacity="0.6" />
      </svg>
    ),
    loaf: (
      <svg width={size} height={size} viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 30 Q7 15 20 13 Q33 15 33 30Z" fill={c} />
        <rect x="7" y="30" width="26" height="5" rx="1.5" fill={c} opacity="0.9" />
        <path d="M13 23 Q20 18 27 23" fill="none" stroke={w} strokeWidth="1.8" strokeLinecap="round" opacity="0.7" />
        <path d="M10 28 Q20 24 30 28" fill="none" stroke={w} strokeWidth="1" strokeLinecap="round" opacity="0.3" />
      </svg>
    ),
    brownie: (
      <svg width={size} height={size} viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
        <rect x="7" y="7" width="26" height="26" rx="3" fill={c} />
        <line x1="7" y1="20" x2="33" y2="20" stroke={w} strokeWidth="1.8" opacity="0.5" />
        <line x1="20" y1="7" x2="20" y2="33" stroke={w} strokeWidth="1.8" opacity="0.5" />
        <circle cx="13.5" cy="13.5" r="1.5" fill={w} opacity="0.4" />
        <circle cx="26.5" cy="13.5" r="1.5" fill={w} opacity="0.4" />
        <circle cx="13.5" cy="26.5" r="1.5" fill={w} opacity="0.4" />
        <circle cx="26.5" cy="26.5" r="1.5" fill={w} opacity="0.4" />
      </svg>
    ),
    poptart: (
      <svg width={size} height={size} viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="8" width="28" height="24" rx="4" fill={c} />
        <rect x="10" y="12" width="20" height="16" rx="3" fill={w} opacity="0.35" />
        <circle cx="16" cy="18" r="1.8" fill={w} opacity="0.85" />
        <circle cx="21" cy="18" r="1.8" fill={w} opacity="0.85" />
        <circle cx="26" cy="18" r="1.8" fill={w} opacity="0.85" />
        <circle cx="16" cy="24" r="1.8" fill={w} opacity="0.85" />
        <circle cx="21" cy="24" r="1.8" fill={w} opacity="0.85" />
        <circle cx="26" cy="24" r="1.8" fill={w} opacity="0.85" />
      </svg>
    ),
  }
  return icons[type] || icons.cookie
}

const H_CLUSTER_POSITIONS = [
  [
    { top: '-14px', left: '4px', rotate: -18, size: 26, colorIdx: 0 },
    { top: '30px', left: '-8px', rotate: 10, size: 20, colorIdx: 2 },
    { top: '65px', left: '6px', rotate: -8, size: 22, colorIdx: 1 },
    { top: '100px', left: '-4px', rotate: 15, size: 18, colorIdx: 3 },
  ],
  [
    { top: '-10px', left: '2px', rotate: 12, size: 22, colorIdx: 1 },
    { top: '40px', left: '-6px', rotate: -20, size: 28, colorIdx: 0 },
    { top: '85px', left: '4px', rotate: 8, size: 20, colorIdx: 4 },
  ],
  [
    { top: '-16px', left: '8px', rotate: -10, size: 24, colorIdx: 2 },
    { top: '25px', left: '-4px', rotate: 18, size: 18, colorIdx: 0 },
    { top: '60px', left: '6px', rotate: -14, size: 26, colorIdx: 3 },
    { top: '100px', left: '-2px', rotate: 6, size: 20, colorIdx: 1 },
    { top: '130px', left: '4px', rotate: -22, size: 18, colorIdx: 4 },
  ],
  [
    { top: '10px', left: '-6px', rotate: 14, size: 30, colorIdx: 0 },
    { top: '55px', left: '4px', rotate: -8, size: 22, colorIdx: 2 },
    { top: '100px', left: '-4px', rotate: 20, size: 24, colorIdx: 1 },
  ],
  [
    { top: '-12px', left: '2px', rotate: -16, size: 20, colorIdx: 3 },
    { top: '30px', left: '-8px', rotate: 10, size: 26, colorIdx: 0 },
    { top: '70px', left: '4px', rotate: -6, size: 18, colorIdx: 2 },
    { top: '108px', left: '-2px', rotate: 18, size: 22, colorIdx: 4 },
    { top: '-8px', left: '10px', rotate: -24, size: 16, colorIdx: 1 },
    { top: '50px', left: '8px', rotate: 12, size: 18, colorIdx: 0 },
  ],
  [
    { top: '-8px', left: '6px', rotate: 8, size: 24, colorIdx: 1 },
    { top: '45px', left: '-4px', rotate: -18, size: 20, colorIdx: 3 },
    { top: '90px', left: '6px', rotate: 14, size: 22, colorIdx: 0 },
  ],
  [
    { top: '-14px', left: '0px', rotate: -12, size: 28, colorIdx: 4 },
    { top: '35px', left: '-6px', rotate: 16, size: 20, colorIdx: 0 },
    { top: '75px', left: '4px', rotate: -8, size: 24, colorIdx: 2 },
    { top: '115px', left: '-4px', rotate: 22, size: 18, colorIdx: 1 },
  ],
  [
    { top: '-10px', left: '4px', rotate: 10, size: 22, colorIdx: 0 },
    { top: '40px', left: '-8px', rotate: -14, size: 26, colorIdx: 3 },
    { top: '88px', left: '2px', rotate: 8, size: 20, colorIdx: 1 },
    { top: '125px', left: '-2px', rotate: -20, size: 18, colorIdx: 2 },
    { top: '15px', left: '8px', rotate: 26, size: 16, colorIdx: 4 },
  ],
]

const H_PHOTO_OVERLAYS = [
  [{ top: '-10px', left: '-8px', rotate: -12, size: 24, colorIdx: 0 }],
  [{ top: '-8px', right: '-6px', rotate: 14, size: 20, colorIdx: 2 }, { bottom: '-10px', left: '20px', rotate: -8, size: 18, colorIdx: 1 }],
  [{ bottom: '-8px', right: '-6px', rotate: 18, size: 22, colorIdx: 3 }],
  [{ top: '-12px', right: '-4px', rotate: -16, size: 20, colorIdx: 0 }, { bottom: '-6px', left: '-4px', rotate: 10, size: 16, colorIdx: 4 }],
  [{ top: '-8px', left: '-6px', rotate: 8, size: 26, colorIdx: 1 }],
  [{ bottom: '-10px', right: '-8px', rotate: -20, size: 22, colorIdx: 0 }, { top: '-6px', left: '30px', rotate: 12, size: 16, colorIdx: 2 }],
  [{ top: '-12px', left: '-4px', rotate: -10, size: 20, colorIdx: 3 }],
  [{ bottom: '-8px', left: '-6px', rotate: 16, size: 24, colorIdx: 0 }, { top: '-10px', right: '-8px', rotate: -18, size: 18, colorIdx: 1 }],
]

const V_PHOTO_OVERLAYS = [
  [
    { top: '-14px', left: '-12px', rotate: -15, size: 30, colorIdx: 0 },
    { top: '60px', left: '-16px', rotate: 10, size: 24, colorIdx: 2 },
    { bottom: '-12px', left: '-8px', rotate: -8, size: 26, colorIdx: 1 },
    { top: '-10px', right: '-10px', rotate: 18, size: 22, colorIdx: 3 },
  ],
  [
    { top: '-12px', right: '-12px', rotate: -20, size: 28, colorIdx: 1 },
    { top: '80px', left: '-14px', rotate: 14, size: 22, colorIdx: 0 },
    { bottom: '-10px', right: '-8px', rotate: -10, size: 24, colorIdx: 4 },
    { top: '160px', left: '-10px', rotate: 8, size: 20, colorIdx: 2 },
    { bottom: '50px', right: '-12px', rotate: -18, size: 18, colorIdx: 3 },
  ],
  [
    { top: '-16px', left: '-8px', rotate: 12, size: 26, colorIdx: 3 },
    { top: '40px', right: '-14px', rotate: -16, size: 30, colorIdx: 0 },
    { bottom: '-14px', right: '-6px', rotate: 20, size: 22, colorIdx: 1 },
    { top: '140px', left: '-12px', rotate: -8, size: 24, colorIdx: 4 },
  ],
  [
    { top: '-10px', left: '-10px', rotate: -12, size: 24, colorIdx: 2 },
    { top: '100px', right: '-12px', rotate: 16, size: 28, colorIdx: 0 },
    { bottom: '-12px', left: '-4px', rotate: -14, size: 20, colorIdx: 1 },
    { top: '50px', left: '-14px', rotate: 8, size: 22, colorIdx: 3 },
    { bottom: '60px', right: '-10px', rotate: -22, size: 18, colorIdx: 4 },
  ],
  [
    { top: '-14px', right: '-10px', rotate: 10, size: 32, colorIdx: 0 },
    { top: '70px', left: '-12px', rotate: -18, size: 24, colorIdx: 2 },
    { bottom: '-10px', left: '-8px', rotate: 14, size: 26, colorIdx: 3 },
  ],
  [
    { top: '-12px', left: '-14px', rotate: -8, size: 28, colorIdx: 1 },
    { top: '120px', right: '-14px', rotate: 20, size: 22, colorIdx: 0 },
    { bottom: '-14px', right: '-10px', rotate: -16, size: 24, colorIdx: 4 },
    { top: '50px', left: '-10px', rotate: 12, size: 20, colorIdx: 2 },
  ],
  [
    { top: '-10px', right: '-8px', rotate: -14, size: 26, colorIdx: 3 },
    { top: '90px', left: '-14px', rotate: 10, size: 30, colorIdx: 0 },
    { bottom: '-12px', left: '-6px', rotate: -20, size: 22, colorIdx: 1 },
    { top: '170px', right: '-12px', rotate: 16, size: 18, colorIdx: 2 },
    { bottom: '40px', left: '-8px', rotate: -8, size: 20, colorIdx: 4 },
  ],
  [
    { top: '-14px', left: '-10px', rotate: 18, size: 24, colorIdx: 0 },
    { top: '60px', right: '-12px', rotate: -12, size: 28, colorIdx: 3 },
    { bottom: '-10px', right: '-8px', rotate: 8, size: 22, colorIdx: 1 },
    { top: '150px', left: '-14px', rotate: -18, size: 20, colorIdx: 2 },
  ],
]

// inline=true: used inside the split about-me layout — no outer wrapper padding/borders,
// fills the container height, no top/bottom fades (parent handles those)
export function HorizontalPhotoMarquee({ inline = false, offset = '0s' }) {
  const repeated = [...PHOTOS, ...PHOTOS, ...PHOTOS]

  const outerStyle = inline
    ? {
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        position: 'relative',
      }
    : {
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--mauve-pale)',
        padding: '28px 0',
      }

  return (
    <div style={outerStyle}>
      {/* Fades — only on standalone (not inline) */}
      {!inline && (
        <>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '32px', background: 'linear-gradient(to bottom, var(--cream), transparent)', zIndex: 5, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '32px', background: 'linear-gradient(to top, var(--cream), transparent)', zIndex: 5, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: 0, left: 0, width: '80px', height: '100%', background: 'linear-gradient(to right, var(--cream), transparent)', zIndex: 5, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: 0, right: 0, width: '80px', height: '100%', background: 'linear-gradient(to left, var(--cream), transparent)', zIndex: 5, pointerEvents: 'none' }} />
        </>
      )}

      <div style={{
        display: 'flex',
        gap: '0px',
        animation: `marquee-h 50s linear ${offset} infinite`,
        width: 'max-content',
        padding: inline ? '20px 8px' : '0 16px',
        alignItems: 'center',
      }}>
        {repeated.map((photo, i) => {
          const photoIdx = i % PHOTOS.length
          const clusterIdx = i % H_CLUSTER_POSITIONS.length
          const overlayIdx = i % H_PHOTO_OVERLAYS.length
          const cluster = H_CLUSTER_POSITIONS[clusterIdx]
          const overlays = H_PHOTO_OVERLAYS[overlayIdx]

          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
              <div style={{ position: 'relative', flexShrink: 0, margin: '0 4px' }}>
                <div style={{
                  width: '112px',
                  height: '140px',
                  overflow: 'hidden',
                  position: 'relative',
                  boxShadow: '0 12px 40px rgba(113,12,33,0.22), 0 4px 16px rgba(113,12,33,0.12)',
                }}>
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </div>
                {overlays.map((ov, j) => (
                  <div
                    key={j}
                    style={{
                      position: 'absolute',
                      ...(ov.top !== undefined && { top: ov.top }),
                      ...(ov.bottom !== undefined && { bottom: ov.bottom }),
                      ...(ov.left !== undefined && { left: ov.left }),
                      ...(ov.right !== undefined && { right: ov.right }),
                      transform: `rotate(${ov.rotate}deg)`,
                      zIndex: 4,
                      filter: 'drop-shadow(0 2px 5px rgba(0,0,0,0.18))',
                      pointerEvents: 'none',
                    }}
                  >
                    <BakingIcon
                      type={ICON_KEYS[(photoIdx * 3 + j * 4) % ICON_KEYS.length]}
                      size={ov.size}
                      colorIdx={ov.colorIdx}
                    />
                  </div>
                ))}
              </div>

              <div style={{ position: 'relative', width: '52px', flexShrink: 0, height: '140px' }}>
                {cluster.map((ic, j) => (
                  <div
                    key={j}
                    style={{
                      position: 'absolute',
                      top: ic.top,
                      left: ic.left,
                      transform: `rotate(${ic.rotate}deg)`,
                      zIndex: 3,
                      filter: 'drop-shadow(0 2px 5px rgba(0,0,0,0.15))',
                      pointerEvents: 'none',
                    }}
                  >
                    <BakingIcon
                      type={ICON_KEYS[(photoIdx * 2 + j * 3 + clusterIdx) % ICON_KEYS.length]}
                      size={ic.size}
                      colorIdx={ic.colorIdx}
                    />
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
      <style>{`@keyframes marquee-h { 0% { transform: translateX(0); } 100% { transform: translateX(-33.333%); } }`}</style>
    </div>
  )
}

export function VerticalPhotoMarquee() {
  const repeated = [...PHOTOS, ...PHOTOS, ...PHOTOS]

  return (
    <div style={{
      position: 'relative',
      overflow: 'hidden',
      height: '640px',
      background: 'var(--mauve-pale)',
    }}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '60px', background: 'linear-gradient(to bottom, var(--warm-white), transparent)', zIndex: 5, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '60px', background: 'linear-gradient(to top, var(--warm-white), transparent)', zIndex: 5, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: 0, left: 0, width: '16px', height: '100%', background: 'linear-gradient(to right, var(--warm-white), transparent)', zIndex: 5, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: 0, right: 0, width: '16px', height: '100%', background: 'linear-gradient(to left, var(--warm-white), transparent)', zIndex: 5, pointerEvents: 'none' }} />

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '28px',
        animation: 'marquee-v 45s linear infinite',
        padding: '16px 0',
      }}>
        {repeated.map((photo, i) => {
          const photoIdx = i % PHOTOS.length
          const overlayIdx = i % V_PHOTO_OVERLAYS.length
          const overlays = V_PHOTO_OVERLAYS[overlayIdx]

          return (
            <div
              key={i}
              style={{
                position: 'relative',
                flexShrink: 0,
                width: '189px',
                height: '252px',
                margin: '0 auto',
              }}
            >
              <div style={{
                width: '189px',
                height: '252px',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: '0 12px 40px rgba(113,12,33,0.22), 0 4px 16px rgba(113,12,33,0.12)',
              }}>
                <img
                  src={photo.src}
                  alt={photo.alt}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
              {overlays.map((ov, j) => (
                <div
                  key={j}
                  style={{
                    position: 'absolute',
                    ...(ov.top !== undefined && { top: ov.top }),
                    ...(ov.bottom !== undefined && { bottom: ov.bottom }),
                    ...(ov.left !== undefined && { left: ov.left }),
                    ...(ov.right !== undefined && { right: ov.right }),
                    transform: `rotate(${ov.rotate}deg)`,
                    zIndex: 4,
                    filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.2))',
                    pointerEvents: 'none',
                  }}
                >
                  <BakingIcon
                    type={ICON_KEYS[(photoIdx * 4 + j * 3) % ICON_KEYS.length]}
                    size={ov.size}
                    colorIdx={ov.colorIdx}
                  />
                </div>
              ))}
            </div>
          )
        })}
      </div>
      <style>{`@keyframes marquee-v { 0% { transform: translateY(0); } 100% { transform: translateY(-33.333%); } }`}</style>
    </div>
  )
}
