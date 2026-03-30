import { useState, useMemo } from 'react'
import Head from 'next/head'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import Newsletter from '../../components/Newsletter'
import RecipeCard from '../../components/RecipeCard'
import { getAllRecipes } from '../../lib/recipes'

const CATEGORIES = [
  'Cookies', 'Cakes', 'Muffins', 'Bars & Brownies',
  'Breads', 'Donuts', 'Scones', 'Pop Tarts',
  'Danishes', 'Frostings', 'Cinnamon Rolls',
]

export default function RecipesIndex({ recipes }) {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = useMemo(() => {
    let result = recipes
    if (activeCategory !== 'All') {
      result = result.filter(r => r.category === activeCategory)
    }
    if (query.trim()) {
      const q = query.toLowerCase()
      result = result.filter(r =>
        r.title?.toLowerCase().includes(q) ||
        r.category?.toLowerCase().includes(q) ||
        r.seoDescription?.toLowerCase().includes(q) ||
        (Array.isArray(r.tags) ? r.tags.some(t => t?.toLowerCase().includes(q)) : r.tags?.toLowerCase?.().includes(q))
      )
    }
    return result
  }, [recipes, query, activeCategory])

  return (
    <>
      <Head>
        <title>All Recipes | Josephine&apos;s Baking</title>
        <meta name="description" content="Browse all of Josephine's tested dessert recipes. Cookies, cakes, muffins, brownies, breads and more." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Nav />

      {/* CATEGORY STRIP */}
      <div className="cat-strip">
        <button
          className={`cat-item${activeCategory === 'All' ? ' active' : ''}`}
          onClick={() => setActiveCategory('All')}
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          All
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`cat-item${activeCategory === cat ? ' active' : ''}`}
            onClick={() => setActiveCategory(cat)}
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* SEARCH BAR */}
      <div style={{
        background: 'var(--cream)',
        padding: '32px 40px 24px',
        borderBottom: '0.5px solid var(--border-m)',
      }}>
        <div style={{ maxWidth: '680px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            border: '1.5px solid var(--plum)',
            background: 'var(--warm-white)',
            overflow: 'hidden',
          }}>
            <svg
              width="18" height="18" viewBox="0 0 24 24"
              fill="none" stroke="var(--mauve)" strokeWidth="2" strokeLinecap="round"
              style={{ margin: '0 14px', flexShrink: 0 }}
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search recipes, ingredients, categories..."
              style={{
                flex: 1,
                padding: '16px 0',
                fontSize: '15px',
                border: 'none',
                outline: 'none',
                background: 'transparent',
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                color: 'var(--text-dark)',
              }}
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                style={{
                  padding: '0 14px', background: 'none', border: 'none',
                  cursor: 'pointer', color: 'var(--mauve)', fontSize: '18px', lineHeight: 1,
                }}
              >
                ×
              </button>
            )}
          </div>
          <div style={{
            marginTop: '10px',
            fontFamily: "'Jost', sans-serif",
            fontSize: '11px',
            color: 'var(--mauve)',
            letterSpacing: '0.06em',
          }}>
            Try: &ldquo;brown butter&rdquo; &nbsp;&middot;&nbsp; &ldquo;muffins&rdquo; &nbsp;&middot;&nbsp; &ldquo;cinnamon rolls&rdquo;
          </div>
        </div>
      </div>

      {/* RECIPE GRID */}
      <section className="section" style={{ background: 'var(--cream)' }}>
        {filtered.length > 0 ? (
          <div className="recipe-grid">
            {filtered.map((recipe) => (
              <RecipeCard key={recipe.slug} recipe={recipe} />
            ))}
          </div>
        ) : (
          <div style={{
            textAlign: 'center', padding: '80px 40px',
            color: 'var(--text-mid)', fontFamily: "'Jost', sans-serif",
            fontSize: '14px', letterSpacing: '0.06em',
          }}>
            No recipes found for &ldquo;{query}&rdquo;. Try a different search.
          </div>
        )}
      </section>

      <Newsletter />
      <Footer />
    </>
  )
}

export async function getStaticProps() {
  const allRecipes = await getAllRecipes()
  const recipes = allRecipes
    .filter(r => r.title && r.slug && r.coverImage)
    .sort((a, b) => {
      const dateA = a.publishDate ? new Date(a.publishDate) : new Date(0)
      const dateB = b.publishDate ? new Date(b.publishDate) : new Date(0)
      return dateB - dateA
    })
  return { props: { recipes }, revalidate: 3600 }
}
