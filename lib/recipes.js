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

  const lines = postBody.split('\n').map((l) => l.trim()).filter(Boolean)

  // ── classifiers ────────────────────────────────────────────────────────────

  const isIngredientsHeader = (l) =>
    /^ingredients?:?\s*$/i.test(l)

  const isInstructionsHeader = (l) =>
    /^instructions?:?\s*$/i.test(l)

  const isSectionHeader = (l) => {
    if (!l[0] || !l[0].match(/[A-Z]/)) return false
    // With colon: "Cookie Dough:", "Frosting:", "Crust:"
    if (l.endsWith(':') && l.length <= 60 && !/[\d½¼¾⅓⅔⅛]/.test(l)) return true
    // Without colon: short title-case phrase, no measurements, no common filler words
    if (
      l.length <= 50 &&
      !/[\d½¼¾⅓⅔⅛:,.]/.test(l) &&
      !/\b(and|the|a|an|of|with|in|on|for|until|then|once|while)\b/i.test(l) &&
      l.split(' ').length <= 5
    ) return true
    return false
  }

  const isIngredientLine = (l) => {
    if (/^[-•]/.test(l)) return true
    if (/^[\d½¼¾⅓⅔⅛]/.test(l)) return true
    if (/:\s*[\d½¼¾⅓⅔⅛]/.test(l)) return true
    if (/\b(cup|tbsp|tsp|tablespoon|teaspoon|ounce|oz)\b/i.test(l) && l.includes(':')) return true
    return false
  }

  const INSTRUCTION_STARTERS = [
    'Preheat', 'In a', 'In the', 'Add ', 'Mix ', 'Whisk ', 'Fold ', 'Stir ',
    'Bake ', 'Pour ', 'Spread ', 'Roll ', 'Press ', 'Cover', 'Let ', 'Remove',
    'Place ', 'Line ', 'Scoop', 'Divide', 'Combine', 'Beat', 'Cook', 'Heat',
    'Melt', 'Prepare', 'Once', 'While', 'After', 'For the', 'Slice', 'Transfer',
    'Using', 'Sprinkle', 'Drizzle', 'Top ', 'Dip ', 'Cool', 'Chill', 'Shape',
    'Cut ', 'Pipe', 'Knead', 'Rise', 'Brush', 'Grease', 'Store', 'Serve',
    'Note', 'Tip', 'Return', 'Make the',
  ]

  const isInstructionLine = (l) => {
    if (isIngredientsHeader(l) || isInstructionsHeader(l)) return false
    if (isSectionHeader(l)) return false
    if (isIngredientLine(l)) return false
    if (INSTRUCTION_STARTERS.some((s) => l.startsWith(s))) return true
    if (l.length > 80 && !/:\s*\d/.test(l)) return true
    return false
  }

  // ── parse ──────────────────────────────────────────────────────────────────

  const hasIngHeader = lines.some(isIngredientsHeader)
  const hasInsHeader = lines.some(isInstructionsHeader)

  const ingredients = []
  const instructionLines = []
  const sections = []
  let currentSection = null

  // Start in 'before' if there's an explicit ingredients header to find first,
  // otherwise start collecting ingredients immediately
  let mode = hasIngHeader ? 'before' : 'ingredients'

  for (const line of lines) {
    if (isIngredientsHeader(line)) {
      mode = 'ingredients'
      currentSection = null
      continue
    }
    if (isInstructionsHeader(line)) {
      mode = 'instructions'
      continue
    }

    // Auto-detect instruction start even when no explicit Instructions header
    if ((mode === 'ingredients' || mode === 'before') && !hasInsHeader && isInstructionLine(line)) {
      mode = 'instructions'
    }
    // If we're still in 'before' and hit an instruction, switch anyway
    if (mode === 'before' && isInstructionLine(line)) {
      mode = 'instructions'
    }

    if (mode === 'ingredients') {
      if (isSectionHeader(line)) {
        currentSection = line.replace(/:$/, '')
        sections.push({ name: currentSection, ingredients: [] })
        continue
      }
      const clean = line.replace(/^[-•]\s*/, '')
      if (clean) {
        if (currentSection && sections.length > 0) {
          sections[sections.length - 1].ingredients.push(clean)
        } else {
          ingredients.push(clean)
        }
      }
    } else if (mode === 'instructions') {
      instructionLines.push(line)
    }
    // 'before' mode: skip lines until the ingredients header is found
  }

  const instructions = instructionLines
    .filter((l) => !isInstructionsHeader(l) && !isIngredientsHeader(l))
    .join('\n')

  return { ingredients, instructions, sections }
}
