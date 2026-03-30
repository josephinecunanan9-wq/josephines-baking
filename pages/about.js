import Head from 'next/head'
import Link from 'next/link'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

const PLUM_GLOW = '0 8px 32px rgba(113,12,33,0.08)'
const PLUM_GLOW_HOVER = '0 12px 40px rgba(113,12,33,0.14)'

// White overlay for screenshots that pulled dark
const overlayStyle = {
  position: 'absolute',
  inset: 0,
  background: 'rgba(255,255,255,0.22)',
  pointerEvents: 'none',
}

const photoStyle = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  display: 'block',
}

export default function About() {
  return (
    <>
      <Head>
        <title>About | Josephine&apos;s Baking</title>
        <meta name="description" content="Hi, I'm Josephine. A self-taught baker, content creator, and full-time dessert enthusiast sharing tested recipes from scratch." />
      </Head>

      <Nav />

      <main>
        {/* HERO BIO SECTION */}
        <section style={{
          background: 'var(--warm-white)',
          padding: '80px 40px',
          display: 'grid',
          gridTemplateColumns: '1fr 1.1fr',
          gap: '80px',
          alignItems: 'center',
          maxWidth: '1100px',
          margin: '0 auto',
        }}>
          <div>
            <div style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: '9px',
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

          {/* PHOTO GRID */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {/* Photo 1 — full width top, no overlay */}
            <div style={{
              gridColumn: '1 / 3',
              height: '320px',
              overflow: 'hidden',
              position: 'relative',
              boxShadow: PLUM_GLOW,
            }}>
              <img src="/Josephines Baking Recipes-1.jpeg" alt="Josephine's Baking" style={photoStyle} />
            </div>

            {/* Photo 2 — with soft white overlay */}
            <div style={{ height: '190px', overflow: 'hidden', position: 'relative', boxShadow: PLUM_GLOW }}>
              <img src="/Josephines Baking Recipes-2.PNG" alt="Josephine's Baking" style={photoStyle} />
              <div style={overlayStyle} />
            </div>

            {/* Photo 3 — with soft white overlay */}
            <div style={{ height: '190px', overflow: 'hidden', position: 'relative', boxShadow: PLUM_GLOW }}>
              <img src="/Josephines Baking Recipes-3.PNG" alt="Josephine's Baking" style={photoStyle} />
              <div style={overlayStyle} />
            </div>

            {/* Photo 4 — full width bottom, with soft white overlay */}
            <div style={{
              gridColumn: '1 / 3',
              height: '220px',
              overflow: 'hidden',
              position: 'relative',
              boxShadow: PLUM_GLOW,
            }}>
              <img src="/Josephines Baking Recipes-4.PNG" alt="Josephine's Baking" style={photoStyle} />
              <div style={overlayStyle} />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
