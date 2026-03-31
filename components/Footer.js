import Link from 'next/link'

export default function Footer() {
  return (
    <>
      <footer>
        <div>
          <span className="footer-script">Josephine&apos;s Baking</span>
          <p className="footer-tagline">Recipes for comfort and curiosity ♡.</p>
        </div>
        <div>
          <div className="footer-col-label">Recipes</div>
          <ul className="footer-links">
            <li><Link href="/categories/cookies">Cookies</Link></li>
            <li><Link href="/categories/cakes">Cakes</Link></li>
            <li><Link href="/categories/muffins">Muffins</Link></li>
            <li><Link href="/categories/bars-brownies">Bars & Brownies</Link></li>
            <li><Link href="/categories/breads">Breads</Link></li>
          </ul>
        </div>
        <div>
          <div className="footer-col-label">Connect</div>
          <ul className="footer-links">
            <li><a href="https://instagram.com/josephinesbaking" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a href="https://tiktok.com/@josephinesbaking" target="_blank" rel="noopener noreferrer">TikTok</a></li>
            <li><a href="https://youtube.com/@josephinesbaking" target="_blank" rel="noopener noreferrer">YouTube</a></li>
            <li><Link href="/about">About</Link></li>
          </ul>
        </div>
      </footer>
      <div className="footer-bottom">
        <span className="footer-copy">© {new Date().getFullYear()} Josephine&apos;s Baking. All rights reserved.</span>
        <span className="footer-copy">Made with love.</span>
      </div>
    </>
  )
}
