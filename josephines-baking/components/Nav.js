import Link from 'next/link'

export default function Nav() {
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
        <button className="nav-search" aria-label="Search">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
        </button>
      </nav>
    </>
  )
}
