import Head from 'next/head'
import Link from 'next/link'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import RecipeCard from '../../components/RecipeCard'
import { getAllRecipes } from '../../lib/recipes'

const CATEGORIES = [
  'All', 'Cookies', 'Cakes', 'Muffins', 'Bars & Brownies',
  'Breads', 'Donuts', 'Scones', 'Pop Tarts', 'Danishes',
  'Frostings', 'Cinnamon Rolls',
]

export default function RecipesIndex({ recipes }) {
  return (
    <>
      <Head>
        <title>All Recipes | Josephine&apos;s Baking</title>
        <meta name="description" content="Browse all 205 homemade dessert recipes from Josephine's Baking. Cookies, cakes, brownies, muffins, and more." />
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
          The full collection
        </div>
        <h1 style={{
          fontFamily: "'Alex Brush', cursive",
          fontSize: '64px',
          color: 'var(--text-dark)',
          lineHeight: 1,
          marginBottom: '12px',
        }}>
          All Recipes
        </h1>
        <p style={{
          fontFamily: "'Jost', sans-serif",
          fontSize: '14px',
          color: 'var(--text-mid)',
          fontWeight: 300,
        }}>
          {recipes.length} recipes and counting
        </p>
      </div>

      {/* Category filter */}
      <div className="cat-strip">
        {CATEGORIES.map((cat) => (
          <a
            key={cat}
            href={cat === 'All' ? '/recipes' : `/categories/${cat.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
            className="cat-item"
          >
            {cat}
          </a>
        ))}
      </div>

      <section className="section" style={{ background: 'var(--cream)' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px',
        }}>
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.slug} recipe={recipe} />
          ))}
        </div>
      </section>

      <Footer />
    </>
  )
}

export async function getStaticProps() {
  const recipes = await getAllRecipes()
  const published = recipes.filter(r => r.title && r.slug)

  return {
    props: { recipes: published },
    revalidate: 3600,
  }
}
