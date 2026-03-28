import { getAllRecipes, getAllCategories } from '../lib/recipes'

const SITE_URL = 'https://josephinesbaking.com'

const CATEGORY_SLUGS = {
  'Cookies': 'cookies',
  'Cakes': 'cakes',
  'Muffins': 'muffins',
  'Bars & Brownies': 'bars-brownies',
  'Breads': 'breads',
  'Donuts': 'donuts',
  'Scones': 'scones',
  'Pop Tarts': 'pop-tarts',
  'Danishes': 'danishes',
  'Frostings': 'frostings',
  'Cinnamon Rolls': 'cinnamon-rolls',
  'Fudge': 'fudge',
  'Pies & Tarts': 'pies-tarts',
  'Cheesecake': 'cheesecake',
  'Rice Krispie Treats': 'rice-krispie-treats',
  'Sauces & Toppings': 'sauces-toppings',
  'Pet Treats': 'pet-treats',
}

function generateSitemap(recipes, categories) {
  const staticPages = [
    { url: '', priority: '1.0', changefreq: 'weekly' },
    { url: '/recipes', priority: '0.9', changefreq: 'daily' },
    { url: '/categories', priority: '0.8', changefreq: 'weekly' },
    { url: '/about', priority: '0.7', changefreq: 'monthly' },
    { url: '/search', priority: '0.6', changefreq: 'monthly' },
  ]

  const categoryPages = categories
    .filter(cat => CATEGORY_SLUGS[cat])
    .map(cat => ({
      url: `/categories/${CATEGORY_SLUGS[cat]}`,
      priority: '0.8',
      changefreq: 'weekly',
    }))

  const recipePages = recipes
    .filter(r => r.slug)
    .map(r => ({
      url: `/recipes/${r.slug}`,
      priority: '0.9',
      changefreq: 'monthly',
      lastmod: r.publishDate || '',
    }))

  const allPages = [...staticPages, ...categoryPages, ...recipePages]

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${SITE_URL}${page.url}</loc>
    ${page.lastmod ? `<lastmod>${page.lastmod}</lastmod>` : ''}
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`
}

export async function getServerSideProps({ res }) {
  const recipes = await getAllRecipes()
  const categories = await getAllCategories()

  const sitemap = generateSitemap(
    recipes.filter(r => r.slug),
    categories
  )

  res.setHeader('Content-Type', 'text/xml')
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate')
  res.write(sitemap)
  res.end()

  return { props: {} }
}

export default function Sitemap() {
  return null
}
