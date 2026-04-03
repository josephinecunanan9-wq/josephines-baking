import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const router = useRouter()

  return (
    <>
      <nav className="nav">
        <Link href="/" className="nav-logo">
          <span className="nav-logo-script">Josephine&apos;s</span>
          <span className="nav-logo-sub">Baking</span>
        </Link>

        <ul className="nav-links">
          <li><Link href="/recipes">Recipes</Link></li>
          <li><Link href="/categories">Categories</Link></li>
          <li><Link href="/about">About</Link></li>
        </ul>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Link
            href="/search"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: "'Jost', sans-serif",
              fontSize: '10px',
              letterSpacing: '0.15em',
              color: 'var(--text-mid)',
              border: '0.5px solid var(--border-m)',
              padding: '7px 14px',
              background: 'transparent',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              transition: 'border-color 0.2s, color 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--plum)'
              e.currentTarget.style.color = 'var(--plum)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(155,123,140,0.2)'
              e.currentTarget.style.color = 'var(--text-mid)'
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
            Search for a recipe
          </Link>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-mid)',
              padding: '4px',
            }}
            className="nav-hamburger"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              {mobileOpen
                ? <path d="M18 6 6 18M6 6l12 12"/>
                : <path d="M3 12h18M3 6h18M3 18h18"/>
              }
            </svg>
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div style={{
          position: 'fixed',
          top: '68px',
          left: 0,
          right: 0,
          bottom: 0,
          background: 'var(--warm-white)',
          zIndex: 99,
          display: 'flex',
          flexDirection: 'column',
          padding: '40px 32px',
          borderTop: '0.5px solid var(--border-m)',
        }}>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '32px', marginBottom: '40px' }}>
            {[
              { href: '/recipes', label: 'Recipes' },
              { href: '/categories', label: 'Categories' },
              { href: '/about', label: 'About' },
            ].map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: '36px',
                    fontWeight: 300,
                    color: router.pathname === href ? 'var(--plum)' : 'var(--text-dark)',
                    textDecoration: 'none',
                  }}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/search"
            onClick={() => setMobileOpen(false)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontFamily: "'Jost', sans-serif",
              fontSize: '11px',
              letterSpacing: '0.18em',
              color: 'var(--text-mid)',
              border: '0.5px solid var(--border-m)',
              padding: '14px 20px',
              textDecoration: 'none',
              alignSelf: 'flex-start',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
            Search for a recipe here
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>
    </>
  )
}
