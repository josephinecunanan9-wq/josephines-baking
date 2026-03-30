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

function BakingIcon({ type, size = 32, color = '#C4A8B6' }) {
  const icons = {
    cookie: <><circle cx="20" cy="20" r="14"/><circle cx="15" cy="16" r="1.5" fill={color} stroke="none"/><circle cx="24" cy="14" r="1.5" fill={color} stroke="none"/><circle cx="17" cy="24" r="1.5" fill={color} stroke="none"/><circle cx="25" cy="22" r="1.5" fill={color} stroke="none"/></>,
    cupcake: <><path d="M13 22 c0-5 4-9 8-9s8 4 8 9"/><rect x="10" y="22" width="20" height="8" rx="2"/><path d="M20 22 c0-3-3-6-3-10 a3 3 0 0 1 6 0 c0 4-3 7-3 10"/><path d="M17 14 q3-4 6 0"/></>,
    roll: <><circle cx="20" cy="20" r="13"/><path d="M20 20 m0-8 a8 8 0 0 1 0 16 a5 5 0 0 1 0-10 a2.5 2.5 0 0 1 0 5" fill="none"/></>,
    cake: <><rect x="7" y="22" width="26" height="10" rx="1"/><rect x="11" y="14" width="18" height="8"/><path d="M17 14 L17 10 M20 14 L20 9 M23 14 L23 10"/><circle cx="20" cy="9" r="1.2" fill={color} stroke="none"/></>,
    slice: <><path d="M8 30 L20 10 L32 30 Z"/><line x1="8" y1="30" x2="32" y2="30"/><line x1="11" y1="24" x2="29" y2="24"/></>,
    muffin: <><path d="M13 22 Q11 14 20 13 Q29 14 27 22"/><rect x="11" y="22" width="18" height="9" rx="1"/><path d="M15 16 Q20 11 25 16"/></>,
    brownie: <><rect x="9" y="9" width="22" height="22" rx="2"/><line x1="9" y1="20" x2="31" y2="20"/><line x1="20" y1="9" x2="20" y2="31"/></>,
    donut: <><circle cx="20" cy="20" r="13"/><circle cx="20" cy="20" r="5"/></>,
  }
  const types = Object.keys(icons)
  const iconType = typeof type === 'number' ? types[type % types.length] : type
  return (
    <svg viewBox="0 0 40 40" fill="none" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" style={{ width: size, height: size, display: 'block' }}>
      {icons[iconType]}
    </svg>
  )
}

const H_DECORS = [
  { top: '5px', left: '3%', rotate: 12, idx: 0 },
  { top: '5px', left: '15%', rotate: -8, idx: 1 },
  { top: '5px', left: '28%', rotate: 18, idx: 2 },
  { top: '5px', left: '42%', rotate: -5, idx: 3 },
  { top: '5px', left: '56%', rotate: 14, idx: 4 },
  { top: '5px', left: '70%', rotate: -12, idx: 5 },
  { top: '5px', left: '84%', rotate: 8, idx: 6 },
  { bottom: '5px', left: '8%', rotate: -10, idx: 7 },
  { bottom: '5px', left: '22%', rotate: 15, idx: 0 },
  { bottom: '5px', left: '36%', rotate: -6, idx: 1 },
  { bottom: '5px', left: '50%', rotate: 20, idx: 2 },
  { bottom: '5px', left: '64%', rotate: -14, idx: 3 },
  { bottom: '5px', left: '78%', rotate: 9, idx: 4 },
  { bottom: '5px', left: '92%', rotate: -18, idx: 5 },
]

const V_DECORS = [
  { top: '4%', left: '4px', rotate: 12, idx: 0 },
  { top: '16%', left: '2px', rotate: -8, idx: 2 },
  { top: '30%', left: '6px', rotate: 18, idx: 4 },
  { top: '45%', left: '3px', rotate: -5, idx: 6 },
  { top: '60%', left: '5px', rotate: 14, idx: 1 },
  { top: '75%', left: '2px', rotate: -12, idx: 3 },
  { top: '88%', left: '6px', rotate: 8, idx: 5 },
  { top: '8%', right: '4px', rotate: -10, idx: 3 },
  { top: '22%', right: '2px', rotate: 15, idx: 5 },
  { top: '36%', right: '5px', rotate: -6, idx: 7 },
  { top: '52%', right: '3px', rotate: 20, idx: 0 },
  { top: '66%', right: '4px', rotate: -14, idx: 2 },
  { top: '80%', right: '2px', rotate: 9, idx: 4 },
  { top: '92%', right: '5px', rotate: -18, idx: 6 },
]

export function HorizontalPhotoMarquee() {
  const repeated = [...PHOTOS, ...PHOTOS, ...PHOTOS]
  return (
    <div style={{ position: 'relative', overflow: 'hidden', background: 'var(--mauve-pale)', borderTop: '0.5px solid var(--border-m)', borderBottom: '0.5px solid var(--border-m)', padding: '20px 0' }}>
      {H_DECORS.map((d, i) => (
        <div key={i} style={{ position: 'absolute', top: d.top, bottom: d.bottom, left: d.left, transform: `rotate(${d.rotate}deg)`, zIndex: 3, pointerEvents: 'none', opacity: 0.75 }}>
          <BakingIcon type={d.idx} size={20} color="#C4A8B6" />
        </div>
      ))}
      <div style={{ display: 'flex', gap: '32px', animation: 'marquee-h 50s linear infinite', width: 'max-content', padding: '0 16px' }}>
        {repeated.map((photo, i) => (
          <div key={i} style={{ flexShrink: 0, height: '140px', width: '112px', overflow: 'hidden', position: 'relative', boxShadow: '0 8px 32px rgba(113,12,33,0.08)' }}>
            <img src={photo.src} alt={photo.alt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.18)', pointerEvents: 'none' }} />
          </div>
        ))}
      </div>
      <style>{`@keyframes marquee-h { 0% { transform: translateX(0); } 100% { transform: translateX(-33.333%); } }`}</style>
    </div>
  )
}

export function VerticalPhotoMarquee() {
  const repeated = [...PHOTOS, ...PHOTOS, ...PHOTOS]
  return (
    <div style={{ position: 'relative', overflow: 'hidden', height: '640px', background: 'var(--mauve-pale)', borderTop: '0.5px solid var(--border-m)', borderBottom: '0.5px solid var(--border-m)' }}>
      {V_DECORS.map((d, i) => (
        <div key={i} style={{ position: 'absolute', top: d.top, left: d.left, right: d.right, transform: `rotate(${d.rotate}deg)`, zIndex: 3, pointerEvents: 'none', opacity: 0.75 }}>
          <BakingIcon type={d.idx} size={20} color="#C4A8B6" />
        </div>
      ))}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', animation: 'marquee-v 45s linear infinite', padding: '8px 36px' }}>
        {repeated.map((photo, i) => (
          <div key={i} style={{ flexShrink: 0, width: '100%', aspectRatio: '9/16', overflow: 'hidden', position: 'relative', boxShadow: '0 8px 32px rgba(113,12,33,0.08)' }}>
            <img src={photo.src} alt={photo.alt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.18)', pointerEvents: 'none' }} />
          </div>
        ))}
      </div>
      <style>{`@keyframes marquee-v { 0% { transform: translateY(0); } 100% { transform: translateY(-33.333%); } }`}</style>
    </div>
  )
}
