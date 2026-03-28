import Head from 'next/head'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import RecipeCard from '../../components/RecipeCard'
import { getAllRecipes } from '../../lib/recipes'

const CATEGORY_SLUGS = {
  'cookies': 'Cookies',
  'cakes': 'Cakes',
  'muffins': 'Muffins',
  'bars-brownies': 'Bars & Brownies',
  'breads': 'Breads',
  'donuts': 'Donuts',
  'scones': 'Scones',
  'pop-tarts': 'Pop Tarts',
  'danishes': 'Danishes',
  'frostings': 'Frostings',
  'cinnamon-rolls': 'Cinnamon Rolls',
  'fudge': 'Fudge',
  'pies-tarts': 'Pies & Tarts',
  'rice-krispie-treats': 'Rice Krispie Treats',
  'sauces-toppings': 'Sauces & Toppings',
  'pet-treats': 'Pet Treats',
  'cheesecake': 'Cheesecake',
}

export default function CategoryPage({ category, recipes }) {
  return (
    <>
      <Head>
        <title>{category} Recipes | Josephine&apos;s Baking</title>
        <meta name="description" content={`Browse all ${category.toLowerCase()} recipes from Josephine's Baking. Homemade, tested, and straightforward.`} />
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
          Recipes
        </div>
        <h1 style={{
          fontFamily: "'Alex Brush', cursive",
          fontSize: '64px',
          color: 'var(--text-dark)',
          lineHeight: 1,
          marginBottom: '12px',
        }}>
          {category}
        </h1>
        <p style={{
          fontFamily: "'Jost', sans-serif",
          fontSize: '14px',
          color: 'var(--text-mid)',
          fontWeight: 300,
        }}>
          {recipes.length} {recipes.length === 1 ? 'recipe' : 'recipes'}
        </p>
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

export async function getStaticPaths() {
  return {
    paths: Object.keys(CATEGORY_SLUGS).map(slug => ({ params: { category: slug } })),
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params }) {
  const categoryName = CATEGORY_SLUGS[params.category]
  if (!categoryName) return { notFound: true }

  const allRecipes = await getAllRecipes()
  const recipes = allRecipes.filter(r => r.category === categoryName && r.slug)

  return {
    props: { category: categoryName, recipes },
    revalidate: 3600,
  }
}
