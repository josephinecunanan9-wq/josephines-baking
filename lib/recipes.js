import Papa from 'papaparse'

const SHEET_ID = '1P80Dh_QJj-ybCKRUsuISpkry_-yedYiRjuxTD5sDJ6I'
const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv`

export async function getAllRecipes() {
  const res = await fetch(SHEET_URL, { next: { revalidate: 3600 } })
  const csv = await res.text()

  const { data } = Papa.parse(csv, {
    header: true,
    skipEmptyLines: true,
  })

  return data.map((row) => ({
    title: row['Title'] || '',
    slug: row['Slug'] || '',
    postBody: row['Post Body'] || '',
    publishDate: row['Publish Date'] || '',
    status: row['Status'] || '',
    coverImage: row['Cover Image'] || '',
    tags: row['Tags'] ? row['Tags'].split(',').map((t) => t.trim()) : [],
    seoTitle: row['SEO Title'] || '',
    seoDescription: row['SEO Description'] || '',
    category: row['Category'] || '',
  }))
}

export async function getRecipeBySlug(slug) {
  const recipes = await getAllRecipes()
  return recipes.find((r) => r.slug === slug) || null
}

export async function getRecipesByCategory(category) {
  const recipes = await getAllRecipes()
  return recipes.filter((r) => r.category === category)
}

export async function getAllCategories() {
  const recipes = await getAllRecipes()
  const cats = [...new Set(recipes.map((r) => r.category).filter(Boolean))]
  return cats.sort()
}

export function parsePostBody(postBody) {
  if (!postBody) return { ingredients: [], instructions: '', sections: [] }

  const lines = postBody.split('\n')
  const ingredients = []
  const instructionLines = []
  let inIngredients = false
  let inInstructions = false
  let currentSection = null
  const sections = []

  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed) continue

    if (/^ingredients?:?$/i.test(trimmed)) {
      inIngredients = true
      inInstructions = false
      continue
    }

    if (/^instructions?:?$/i.test(trimmed)) {
      inInstructions = true
      inIngredients = false
      continue
    }

    if (inIngredients) {
      // Check for sub-section headers like "Cookie Dough:" or "Frosting:"
      if (/^[A-Z][^.!?\n]{2,40}:$/.test(trimmed) && !trimmed.startsWith('-')) {
        currentSection = trimmed.replace(/:$/, '')
        sections.push({ name: currentSection, ingredients: [] })
        continue
      }
      const clean = trimmed.replace(/^[-•]\s*/, '')
      if (clean) {
        if (currentSection && sections.length > 0) {
          sections[sections.length - 1].ingredients.push(clean)
        } else {
          ingredients.push(clean)
        }
      }
    }

    if (inInstructions) {
      instructionLines.push(trimmed)
    }
  }

  return {
    ingredients,
    instructions: instructionLines.join('\n'),
    sections,
  }
}
