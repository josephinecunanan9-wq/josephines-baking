import Head from 'next/head'
import Link from 'next/link'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'

const CATEGORIES = [
  { name: 'Cookies', slug: 'cookies', emoji: '🍪' },
  { name: 'Cakes', slug: 'cakes', emoji: '🎂' },
  { name: 'Muffins', slug: 'muffins', emoji: '🧁' },
  { name: 'Bars & Brownies', slug: 'bars-brownies', emoji: '🍫' },
  { name: 'Breads', slug: 'breads', emoji: '🍞' },
  { name: 'Donuts', slug: 'donuts', emoji: '🍩' },
  { name: 'Scones', slug: 'scones', emoji: '☕' },
  { name: 'Pop Tarts', slug: 'pop-tarts', emoji: '🥧' },
  { name: 'Danishes', slug: 'danishes', emoji: '🥐' },
  { name: 'Frostings', slug: 'frostings', emoji: '🎀' },
  { name: 'Cinnamon Rolls', slug: 'cinnamon-rolls', emoji: '🌀' },
  { name: 'Fudge', slug: 'fudge', emoji: '🍬' },
  { name: 'Pies & Tarts', slug: 'pies-tarts', emoji: '🥧' },
  { name: 'Cheesecake', slug: 'cheesecake', emoji: '🍰' },
  { name: 'Rice Krispie Treats', slug: 'rice-krispie-treats', emoji: '✨' },
  { name: 'Sauces & Toppings', slug: 'sauces-toppings', emoji: '🍯' },
  { name: 'Pet Treats', slug: 'pet-treats', emoji: '🐾' },
]

export default function CategoriesIndex() {
  return (
    <>
      <Head>
        <title>Recipe Categories | Josephine&apos;s Baking</title>
        <meta name="description" content="Browse recipes by category. Cookies, cakes, brownies, muffins, breads, donuts and more from Josephine's Baking." />
      </Head>

      <Nav />

      <div style={{
        background: 'var(--warm-white)',
        padding: '56px 40px 48px',
        borderBottom: '0.5px solid var(--border-m)',
        textAlign: 'center',
      }}>
        <div style={{
          fontFamily: "'Jost', sans-serif",
          fontSize: '9px',
          letterSpacing: '0.32em',
          textTransform: 'uppercase',
          color: 'var(--mauve)',
          marginBottom: '12px',
          fontWeight: 400,
        }}>
          Browse by
        </div>
        <h1 style={{
          fontFamily: "'Alex Brush', cursive",
          fontSize: '64px',
          color: 'var(--plum)',
          lineHeight: 1,
        }}>
          Categories
        </h1>
      </div>

      <section style={{ padding: '64px 40px', background: 'var(--cream)' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '16px',
          maxWidth: '1100px',
          margin: '0 auto',
        }}>
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}`}
              style={{
                background: 'var(--warm-white)',
                border: '0.5px solid var(--border-m)',
                padding: '32px 24px',
                textAlign: 'center',
                textDecoration: 'none',
                display: 'block',
                transition: 'border-color 0.2s, background 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--mauve)'
                e.currentTarget.style.background = 'var(--blush)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(155,123,140,0.2)'
                e.currentTarget.style.background = 'var(--warm-white)'
              }}
            >
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>{cat.emoji}</div>
              <div style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: '20px',
                fontWeight: 400,
                color: 'var(--text-dark)',
                marginBottom: '4px',
              }}>
                {cat.name}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </>
  )
}
