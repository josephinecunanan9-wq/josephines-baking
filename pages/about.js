import Head from 'next/head'
import Link from 'next/link'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import Newsletter from '../components/Newsletter'
import { VerticalPhotoMarquee } from '../components/PhotoMarquee'

export default function About() {
  return (
    <>
      <Head>
        <title>About | Josephine&apos;s Baking</title>
        <meta name="description" content="Hi, I'm Josephine. A self-taught baker, content creator, and full-time dessert enthusiast sharing tested recipes from scratch." />
      </Head>
      <Nav />
      <main>
        <section className="about-section">
          <div className="about-text">
            <div style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: '11px',
              letterSpacing: '0.32em',
              textTransform: 'uppercase',
              color: 'var(--plum)',
              fontWeight: 400,
              marginBottom: '14px',
            }}>
              About me
            </div>
            <span style={{
              fontFamily: "'Alex Brush', cursive",
              fontSize: '64px',
              color: 'var(--plum)',
              lineHeight: 1,
              marginBottom: '32px',
              display: 'block',
            }}>
              Hi, I&apos;m Josephine
            </span>
            <div style={{ fontSize: '18px', fontWeight: 300, lineHeight: 1.9, color: 'var(--text-mid)' }}>
              <p style={{ marginBottom: '20px' }}>
                I&apos;m a self-taught baker, content creator, and full-time dessert enthusiast. I started baking at home out of comfort and curiosity, and somewhere between the failed first attempts and the recipes that actually worked, it became my favorite activity.
              </p>
              <p style={{ marginBottom: '20px' }}>
                Every recipe on this site is something I tweaked, tested, and documented myself. I love seasonal ingredients, brown butter, and finding new ways to make classic things feel exciting again. I&apos;m still learning with every bake, and I think that&apos;s kind of the point. 🤷‍♀️
              </p>
              <p>
                This site is where I share everything I&apos;ve loved along the way. No filler, no long stories before the recipe. Just the good stuff.
              </p>
            </div>
            <Link href="/recipes" className="btn-primary" style={{ marginTop: '40px', display: 'inline-block' }}>
              Browse all recipes
            </Link>
          </div>

          <div className="about-marquee">
            <VerticalPhotoMarquee />
          </div>
        </section>
      </main>

      <Newsletter />
      <Footer />

      <style>{`
        .about-section {
          background: var(--warm-white);
          padding: 80px 40px;
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          gap: 80px;
          align-items: center;
          max-width: 1100px;
          margin: 0 auto;
        }

        @media (max-width: 768px) {
          .about-section {
            grid-template-columns: 1fr;
            padding: 48px 20px 40px;
            gap: 0;
            max-width: 100%;
          }
          .about-text span[style] {
            font-size: 48px !important;
          }
          .about-text div[style*="18px"] {
            font-size: 16px !important;
          }
          /* Hide vertical marquee on mobile — it breaks the layout */
          .about-marquee {
            display: none;
          }
        }
      `}</style>
    </>
  )
}
