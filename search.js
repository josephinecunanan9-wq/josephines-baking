import Head from 'next/head'
import { useState, useEffect, useRef } from 'react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import RecipeCard from '../components/RecipeCard'
import { getAllRecipes } from '../lib/recipes'

export default function SearchPage({ recipes }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [searched, setSearched] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      setSearched(false)
      return
    }

    const q = query.toLowerCase().trim()
    const filtered = recipes.filter(r => {
      return (
        r.title?.toLowerCase().includes(q) ||
        r.category?.toLowerCase().includes(q) ||
        r.tags?.some(t => t.toLowerCase().includes(q)) ||
        r.seoDescription?.toLowerCase().includes(q) ||
        r.postBody?.toLowerCase().includes(q)
      )
    })

    setResults(filtered)
    setSearched(true)
  }, [query, recipes])

  return (
    <>
      <Head>
        <title>Search Recipes | Josephine&apos;s Baking</title>
        <meta name="description" content="Search all recipes on Josephine's Baking." />
      </Head>

      <Nav />

      <div style={{
        background: 'var(--warm-white)',
        borderBottom: '0.5px solid var(--border-m)',
        padding: '64px 40px 56px',
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
          Find something delicious
        </div>
        <h1 style={{
          fontFamily: "'Alex Brush', cursive",
          fontSize: '64px',
          color: 'var(--plum)',
          lineHeight: 1,
          marginBottom: '36px',
        }}>
          Search for a recipe
        </h1>

        <div style={{
          maxWidth: '600px',
          margin: '0 auto',
          position: 'relative',
        }}>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search for a recipe here..."
            style={{
              width: '100%',
              padding: '18px 56px 18px 24px',
              border: '1px solid var(--mauve-light)',
              background: 'var(--cream)',
              fontFamily: "'Jost', sans-serif",
              fontSize: '15px',
              color: 'var(--text-dark)',
              outline: 'none',
              fontWeight: 300,
              borderRadius: '0',
            }}
            onFocus={e => e.target.style.borderColor = 'var(--plum)'}
            onBlur={e => e.target.style.borderColor = 'var(--mauve-light)'}
          />
          <div style={{
            position: 'absolute',
            right: '18px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--mauve)',
            pointerEvents: 'none',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
          </div>
        </div>

        {/* Quick suggestions */}
        {!query && (
          <div style={{
            marginTop: '20px',
            display: 'flex',
            gap: '10px',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}>
            {['Brown Butter', 'Matcha', 'Pumpkin', 'Chocolate', 'Lemon', 'Cinnamon'].map(suggestion => (
              <button
                key={suggestion}
                onClick={() => setQuery(suggestion)}
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: '10px',
                  letterSpacing: '0.15em',
                  color: 'var(--mauve)',
                  border: '0.5px solid var(--border-m)',
                  background: 'transparent',
                  padding: '6px 14px',
                  cursor: 'pointer',
                  fontWeight: 400,
                }}
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>

      <section style={{ padding: '56px 40px', background: 'var(--cream)', minHeight: '400px' }}>
        {searched && query && (
          <div style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: '11px',
            letterSpacing: '0.15em',
            color: 'var(--mauve)',
            marginBottom: '32px',
            textAlign: 'center',
          }}>
            {results.length > 0
              ? `${results.length} recipe${results.length === 1 ? '' : 's'} for "${query}"`
              : `No recipes found for "${query}"`
            }
          </div>
        )}

        {results.length > 0 && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '20px',
          }}>
            {results.map(recipe => (
              <RecipeCard key={recipe.slug} recipe={recipe} />
            ))}
          </div>
        )}

        {searched && results.length === 0 && query && (
          <div style={{ textAlign: 'center', paddingTop: '40px' }}>
            <span style={{
              fontFamily: "'Alex Brush', cursive",
              fontSize: '48px',
              color: 'var(--mauve-light)',
              display: 'block',
              marginBottom: '16px',
            }}>
              nothing yet...
            </span>
            <p style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: '13px',
              color: 'var(--text-mid)',
              fontWeight: 300,
            }}>
              Try searching for an ingredient, category, or flavor.
            </p>
          </div>
        )}
      </section>

      <Footer />
    </>
  )
}

export async function getStaticProps() {
  const recipes = await getAllRecipes()
  return {
    props: { recipes: recipes.filter(r => r.title && r.slug) },
    revalidate: 3600,
  }
}
