import Head from 'next/head'
import Link from 'next/link'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import Newsletter from '../../components/Newsletter'
import { getAllRecipes, getRecipeBySlug, parsePostBody } from '../../lib/recipes'

export default function RecipePage({ recipe, parsed }) {
  if (!recipe) return null

  return (
    <>
      <Head>
        <title>{recipe.seoTitle || `${recipe.title} | Josephine's Baking`}</title>
        <meta name="description" content={recipe.seoDescription} />
        <meta property="og:title" content={recipe.seoTitle || recipe.title} />
        <meta property="og:description" content={recipe.seoDescription} />
        {recipe.coverImage && <meta property="og:image" content={recipe.coverImage} />}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Recipe',
              name: recipe.title,
              image: recipe.coverImage ? [recipe.coverImage] : [],
              description: recipe.seoDescription,
              author: { '@type': 'Person', name: 'Josephine' },
              recipeCategory: recipe.category,
              keywords: recipe.tags.join(', '),
              recipeIngredient: [
                ...parsed.ingredients,
                ...parsed.sections.flatMap(s => s.ingredients),
              ],
              recipeInstructions: parsed.instructions
                ? [{ '@type': 'HowToStep', text: parsed.instructions }]
                : [],
            }),
          }}
        />
      </Head>

      <Nav />

      {/* BREADCRUMB */}
      <div style={{
        background: 'var(--warm-white)',
        borderBottom: '0.5px solid var(--border-m)',
        padding: '14px 40px',
        fontFamily: "'Jost', sans-serif",
        fontSize: '10px',
        letterSpacing: '0.12em',
        color: 'var(--mauve)',
        display: 'flex',
        gap: '8px',
        alignItems: 'center',
      }}>
        <Link href="/" style={{ color: 'var(--mauve)' }}>Home</Link>
        <span>›</span>
        <Link href="/recipes" style={{ color: 'var(--mauve)' }}>Recipes</Link>
        <span>›</span>
        {recipe.category && (
          <>
            <Link
              href={`/categories/${recipe.category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
              style={{ color: 'var(--mauve)' }}
            >
              {recipe.category}
            </Link>
            <span>›</span>
          </>
        )}
        <span style={{ color: 'var(--text-dark)' }}>{recipe.title}</span>
      </div>

      {/* RECIPE CONTENT */}
      <main style={{
        background: 'var(--warm-white)',
        padding: '64px 40px 80px',
        maxWidth: '1100px',
        margin: '0 auto',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.3fr',
          gap: '64px',
          alignItems: 'start',
        }}>
          {/* LEFT: Image */}
          <div style={{ position: 'sticky', top: '88px' }}>
            {recipe.coverImage && (
              <div style={{ height: '520px', overflow: 'hidden', background: 'var(--blush)', marginBottom: '20px' }}>
                <img
                  src={recipe.coverImage}
                  alt={recipe.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            )}
            {recipe.tags.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {recipe.tags.map(tag => (
                  <span key={tag} style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: '9px',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'var(--mauve)',
                    border: '0.5px solid var(--border-m)',
                    padding: '4px 10px',
                    fontWeight: 400,
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: Content */}
          <div>
            <div style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: '9px',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'var(--mauve)',
              marginBottom: '10px',
              fontWeight: 400,
            }}>
              {recipe.category}
            </div>
            <h1 style={{
              fontSize: '42px',
              fontWeight: 300,
              lineHeight: 1.1,
              marginBottom: '6px',
              letterSpacing: '-0.01em',
              color: 'var(--text-dark)',
            }}>
              {recipe.title}
            </h1>
            <span style={{
              fontFamily: "'Alex Brush', cursive",
              fontSize: '28px',
              color: 'var(--mauve)',
              display: 'block',
              marginBottom: '20px',
            }}>
              by Josephine
            </span>
            <p style={{
              fontSize: '15px',
              color: 'var(--text-mid)',
              fontFamily: "'Jost', sans-serif",
              fontWeight: 300,
              lineHeight: 1.75,
              marginBottom: '28px',
              paddingBottom: '28px',
              borderBottom: '0.5px solid var(--border-m)',
            }}>
              {recipe.seoDescription}
            </p>

            {/* INGREDIENTS */}
            <div style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: '9px',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: 'var(--mauve)',
              fontWeight: 400,
              marginBottom: '16px',
            }}>
              Ingredients
            </div>

            {parsed.ingredients.length > 0 && (
              <ul style={{ listStyle: 'none', marginBottom: parsed.sections.length > 0 ? '24px' : '32px' }}>
                {parsed.ingredients.map((ing, i) => {
                  const parts = ing.split(':')
                  const name = parts[0]?.trim()
                  const amount = parts[1]?.trim()
                  return (
                    <li key={i} style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      padding: '9px 0',
                      borderBottom: '0.5px solid rgba(155,123,140,0.12)',
                      fontSize: '16px',
                      fontWeight: 300,
                      gap: '12px',
                    }}>
                      <input
                        type="checkbox"
                        id={`ing-${i}`}
                        style={{ width: '15px', height: '15px', flexShrink: 0, accentColor: 'var(--plum)', cursor: 'pointer', marginTop: '3px' }}
                        onChange={e => {
                          const label = e.target.nextSibling
                          label.style.textDecoration = e.target.checked ? 'line-through' : 'none'
                          label.style.color = e.target.checked ? 'var(--mauve-light)' : 'var(--text-dark)'
                        }}
                      />
                      <label htmlFor={`ing-${i}`} style={{
                        flex: 1, display: 'flex', justifyContent: 'space-between',
                        cursor: 'pointer', transition: 'color 0.2s', gap: '16px',
                      }}>
                        <span>{name}</span>
                        {amount && (
                          <span style={{
                            fontFamily: "'Jost', sans-serif", fontSize: '12px',
                            color: 'var(--mauve)', fontWeight: 400, whiteSpace: 'nowrap',
                          }}>
                            {amount}
                          </span>
                        )}
                      </label>
                    </li>
                  )
                })}
              </ul>
            )}

            {parsed.sections.map((section) => (
              <div key={section.name} style={{ marginBottom: '24px' }}>
                <div style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: '9px',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: 'var(--plum)',
                  fontWeight: 400,
                  marginBottom: '10px',
                  marginTop: '8px',
                }}>
                  {section.name}
                </div>
                <ul style={{ listStyle: 'none' }}>
                  {section.ingredients.map((ing, i) => {
                    const parts = ing.split(':')
                    const name = parts[0]?.trim()
                    const amount = parts[1]?.trim()
                    const id = `sec-${section.name}-${i}`
                    return (
                      <li key={i} style={{
                        display: 'flex', alignItems: 'baseline',
                        padding: '9px 0', borderBottom: '0.5px solid rgba(155,123,140,0.12)',
                        fontSize: '16px', fontWeight: 300, gap: '12px',
                      }}>
                        <input
                          type="checkbox" id={id}
                          style={{ width: '15px', height: '15px', flexShrink: 0, accentColor: 'var(--plum)', cursor: 'pointer', marginTop: '3px' }}
                          onChange={e => {
                            const label = e.target.nextSibling
                            label.style.textDecoration = e.target.checked ? 'line-through' : 'none'
                            label.style.color = e.target.checked ? 'var(--mauve-light)' : 'var(--text-dark)'
                          }}
                        />
                        <label htmlFor={id} style={{
                          flex: 1, display: 'flex', justifyContent: 'space-between',
                          cursor: 'pointer', transition: 'color 0.2s', gap: '16px',
                        }}>
                          <span>{name}</span>
                          {amount && (
                            <span style={{
                              fontFamily: "'Jost', sans-serif", fontSize: '12px',
                              color: 'var(--mauve)', fontWeight: 400, whiteSpace: 'nowrap',
                            }}>
                              {amount}
                            </span>
                          )}
                        </label>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}

            {/* INSTRUCTIONS */}
            <div style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: '9px',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: 'var(--mauve)',
              fontWeight: 400,
              marginBottom: '16px',
              marginTop: '32px',
            }}>
              Instructions
            </div>
            <div style={{ fontSize: '17px', fontWeight: 300, lineHeight: 1.9, color: 'var(--text-dark)' }}>
              {parsed.instructions.split('\n').filter(Boolean).map((para, i) => (
                <p key={i} style={{ marginBottom: '16px' }}>{para}</p>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Newsletter />
      <Footer />
    </>
  )
}

export async function getStaticPaths() {
  const recipes = await getAllRecipes()
  const paths = recipes.filter(r => r.slug).map(r => ({ params: { slug: r.slug } }))
  return { paths, fallback: 'blocking' }
}

export async function getStaticProps({ params }) {
  const recipe = await getRecipeBySlug(params.slug)
  if (!recipe) return { notFound: true }
  const parsed = parsePostBody(recipe.postBody)
  return { props: { recipe, parsed }, revalidate: 3600 }
}
