import Head from 'next/head'
import Link from 'next/link'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import Newsletter from '../components/Newsletter'
import RecipeCard from '../components/RecipeCard'
import { HorizontalPhotoMarquee } from '../components/PhotoMarquee'
import { getAllRecipes } from '../lib/recipes'

const CATEGORIES = [
  'Cookies', 'Cakes', 'Muffins', 'Bars & Brownies',
  'Breads', 'Donuts', 'Scones', 'Pop Tarts',
  'Danishes', 'Frostings', 'Cinnamon Rolls',
]

const PLUM_SHADOW = '0 12px 40px rgba(113,12,33,0.22), 0 4px 16px rgba(113,12,33,0.12)'

export default function Home({ featured, recent }) {
  return (
    <>
      <Head>
        <title>Josephine&apos;s Baking | Homemade Dessert Recipes</title>
        <meta name="description" content="Self-taught baker sharing tested dessert recipes. Cookies, cakes, brownies, muffins and more. Straight to the recipe, no filler." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />

      {/* ── HERO ── */}
      <section className="hero-section">
        <div className="hero-text">
          <div style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: '11px',
            letterSpacing: '0.32em',
            textTransform: 'uppercase',
            color: 'var(--mauve)',
            fontWeight: 400,
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
          }}>
            <span style={{ display: 'block', width: '28px', height: '0.5px', background: 'var(--mauve-light)' }} />
            Welcome
          </div>
          <h1 style={{
            fontSize: '34px',
            fontWeight: 300,
            lineHeight: 1.35,
            letterSpacing: '-0.01em',
            color: 'var(--text-dark)',
            marginBottom: '10px',
          }}>
            Hi, I&apos;m Josephine, a self-taught baker who learned everything by{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--plum)' }}>just starting.</em>
          </h1>
          <span style={{
            fontFamily: "'Alex Brush', cursive",
            fontSize: '46px',
            color: 'var(--mauve)',
            lineHeight: 1.2,
            marginBottom: '26px',
            display: 'block',
          }}>
            this is where I share what I loved along the way
          </span>
          <p style={{
            fontSize: '15px',
            color: 'var(--text-mid)',
            fontWeight: 300,
            lineHeight: 1.85,
            maxWidth: '400px',
            marginBottom: '38px',
            fontFamily: "'Jost', sans-serif",
          }}>
            Every recipe started with curiosity and ended up in the oven. Bake something with me.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
            <Link href="/recipes" className="btn-primary">Browse Recipes</Link>
            <Link href="/recipes?sort=popular" className="btn-ghost">What&apos;s popular</Link>
          </div>
        </div>

        <div className="hero-photos">
          {featured.slice(0, 3).map((recipe, i) => (
            <Link
              key={recipe.slug}
              href={`/recipes/${recipe.slug}`}
              className={i === 0 ? 'hero-photo-tall' : 'hero-photo-small'}
              style={{ boxShadow: PLUM_SHADOW }}
            >
              {recipe.coverImage && (
                <img
                  src={recipe.coverImage}
                  alt={recipe.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              )}
            </Link>
          ))}
        </div>
      </section>

      {/* ── CATEGORY STRIP ── */}
      <div className="cat-strip">
        <Link href="/recipes" className="cat-item active">All</Link>
        {CATEGORIES.map((cat) => (
          <Link
            key={cat}
            href={`/categories/${cat.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
            className="cat-item"
          >
            {cat}
          </Link>
        ))}
      </div>

      {/* ── FEATURED RECIPES ── */}
      <section className="section" style={{ background: 'var(--cream)' }}>
        <div className="sec-head">
          <div>
            <div className="sec-label">This week</div>
            <div className="sec-title">worth making</div>
          </div>
          <Link href="/recipes" className="sec-link">All recipes</Link>
        </div>

        {featured[0] && (
          <Link
            href={`/recipes/${featured[0].slug}`}
            className="featured-card-link"
            style={{ textDecoration: 'none' }}
          >
            <div className="featured-card" style={{ boxShadow: PLUM_SHADOW }}>
              <div className="featured-card-img">
                {featured[0].coverImage && (
                  <img
                    src={featured[0].coverImage}
                    alt={featured[0].title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                )}
              </div>
              <div className="featured-card-body">
                <div style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: '11px',
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  color: 'var(--mauve)',
                  marginBottom: '14px',
                  fontWeight: 400,
                }}>
                  {featured[0].category}
                </div>
                <h2 style={{
                  fontSize: '34px',
                  fontWeight: 300,
                  lineHeight: 1.15,
                  marginBottom: '14px',
                  color: 'var(--text-dark)',
                }}>
                  {featured[0].title}
                </h2>
                <p style={{
                  fontSize: '14px',
                  color: 'var(--text-mid)',
                  fontWeight: 300,
                  fontFamily: "'Jost', sans-serif",
                  lineHeight: 1.75,
                  marginBottom: '32px',
                }}>
                  {featured[0].seoDescription}
                </p>
                <span className="btn-primary" style={{ alignSelf: 'flex-start' }}>
                  Get the recipe
                </span>
              </div>
            </div>
          </Link>
        )}

        <div className="recipe-grid">
          {featured.slice(1, 4).map((recipe) => (
            <RecipeCard key={recipe.slug} recipe={recipe} />
          ))}
        </div>
      </section>

      {/* ── SPLIT MARQUEE + ABOUT ME ──
          Desktop: 3-col grid, marquee flanking centered text
          Mobile: text block + single horizontal marquee strip below */}
      <section style={{
        background: 'var(--warm-white)',
        borderTop: '0.5px solid var(--border-m)',
        borderBottom: '0.5px solid var(--border-m)',
      }}>
        <div className="about-split">

          {/* LEFT MARQUEE */}
          <div className="about-marquee-col">
            <div style={{ position: 'absolute', top: 0, left: 0, width: '32px', height: '100%', background: 'linear-gradient(to right, var(--warm-white), transparent)', zIndex: 5, pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', top: 0, right: 0, width: '32px', height: '100%', background: 'linear-gradient(to left, var(--warm-white), transparent)', zIndex: 5, pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '48px', background: 'linear-gradient(to bottom, var(--warm-white), transparent)', zIndex: 5, pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '48px', background: 'linear-gradient(to top, var(--warm-white), transparent)', zIndex: 5, pointerEvents: 'none' }} />
            <div className="about-marquee-inner">
              <HorizontalPhotoMarquee inline />
            </div>
          </div>

          {/* ABOUT TEXT */}
          <div className="about-text-col">
            <div style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: '11px',
              letterSpacing: '0.32em',
              textTransform: 'uppercase',
              color: 'var(--plum)',
              fontWeight: 400,
              marginBottom: '12px',
            }}>
              A little about me
            </div>
            <span style={{
              fontFamily: "'Alex Brush', cursive",
              fontSize: '52px',
              color: 'var(--text-dark)',
              lineHeight: 1,
              marginBottom: '24px',
              display: 'block',
            }}>
              Hi, I&apos;m Josephine
            </span>
            <div style={{ fontSize: '17px', fontWeight: 300, lineHeight: 1.9, color: 'var(--text-mid)' }}>
              <p style={{ marginBottom: '18px' }}>
                I&apos;m a self-taught baker, content creator, and full-time dessert enthusiast. I started baking at home out of comfort and curiosity, and somewhere between the failed first attempts and the recipes that actually worked, it became my favorite activity.
              </p>
              <p>
                Every recipe on this site is something I tweaked, tested, and documented myself. I love seasonal ingredients, brown butter, and finding new ways to make classic things feel exciting again. I&apos;m still learning with every bake, and I think that&apos;s kind of the point. 🤷‍♀️
              </p>
            </div>
            <Link href="/about" className="btn-ghost" style={{ marginTop: '32px', display: 'inline-flex' }}>
              More about me
            </Link>
          </div>

          {/* RIGHT MARQUEE */}
          <div className="about-marquee-col">
            <div style={{ position: 'absolute', top: 0, left: 0, width: '32px', height: '100%', background: 'linear-gradient(to right, var(--warm-white), transparent)', zIndex: 5, pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', top: 0, right: 0, width: '32px', height: '100%', background: 'linear-gradient(to left, var(--warm-white), transparent)', zIndex: 5, pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '48px', background: 'linear-gradient(to bottom, var(--warm-white), transparent)', zIndex: 5, pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '48px', background: 'linear-gradient(to top, var(--warm-white), transparent)', zIndex: 5, pointerEvents: 'none' }} />
            <div className="about-marquee-inner">
              <HorizontalPhotoMarquee inline />
            </div>
          </div>

        </div>

        {/* Mobile: text then marquee strip */}
        <div className="about-mobile-marquee">
          <div className="about-mobile-text">
            <div style={{ fontFamily: "'Jost', sans-serif", fontSize: '11px', letterSpacing: '0.32em', textTransform: 'uppercase', color: 'var(--plum)', fontWeight: 400, marginBottom: '12px' }}>A little about me</div>
            <span style={{ fontFamily: "'Alex Brush', cursive", fontSize: '44px', color: 'var(--text-dark)', lineHeight: 1, marginBottom: '20px', display: 'block' }}>Hi, I&apos;m Josephine</span>
            <div style={{ fontSize: '16px', fontWeight: 300, lineHeight: 1.85, color: 'var(--text-mid)' }}>
              <p style={{ marginBottom: '16px' }}>I&apos;m a self-taught baker, content creator, and full-time dessert enthusiast. I started baking at home out of comfort and curiosity, and somewhere between the failed first attempts and the recipes that actually worked, it became my favorite activity.</p>
              <p>Every recipe on this site is something I tweaked, tested, and documented myself. I love seasonal ingredients, brown butter, and finding new ways to make classic things feel exciting again. I&apos;m still learning with every bake, and I think that&apos;s kind of the point. 🤷‍♀️</p>
            </div>
            <Link href="/about" className="btn-ghost" style={{ marginTop: '28px', display: 'inline-flex' }}>More about me</Link>
          </div>
          <div style={{ position: 'relative', overflow: 'hidden', height: '180px', background: 'var(--warm-white)', display: 'flex', alignItems: 'center' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '40px', height: '100%', background: 'linear-gradient(to right, var(--warm-white), transparent)', zIndex: 5, pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', top: 0, right: 0, width: '40px', height: '100%', background: 'linear-gradient(to left, var(--warm-white), transparent)', zIndex: 5, pointerEvents: 'none' }} />
            <HorizontalPhotoMarquee inline />
          </div>
        </div>
      </section>

      {/* ── FEATURED IN ── */}
      <section style={{
        background: 'var(--warm-white)',
        borderTop: '0.5px solid var(--border-m)',
        borderBottom: '0.5px solid var(--border-m)',
        padding: '72px 40px',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          marginBottom: '36px',
          paddingBottom: '16px',
          borderBottom: '0.5px solid var(--border-m)',
          flexWrap: 'wrap',
          gap: '16px',
        }}>
          <div>
            <div style={{ fontFamily: "'Jost', sans-serif", fontSize: '11px', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--mauve)', fontWeight: 400, marginBottom: '3px' }}>In the press</div>
            <div style={{ fontFamily: "'Alex Brush', cursive", fontSize: '44px', color: 'var(--plum)', lineHeight: 1 }}>Featured In</div>
          </div>
          <div style={{ fontFamily: "'Jost', sans-serif", fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--text-mid)', border: '0.5px solid var(--border-m)', padding: '8px 18px', fontWeight: 400 }}>
            Hedessent.ca
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {[
            { href: 'https://hedessent.ca/dessert-recipes/peppermint-macarons/', slug: 'peppermint-macarons', name: 'Peppermint Macarons', desc: "My peppermint macaron recipe featured in Hedessent's dessert collection, made with their Peppermint Flavour Drops.", img: 'https://static.wixstatic.com/media/b3c1ed_526061a867174bc49e3da3f7e4f70c0d~mv2.jpg' },
            { href: 'https://hedessent.ca/dessert-recipes/passion-fruit-fudge/', slug: 'white-chocolate-passionfruit-fudge', name: 'White Chocolate Passionfruit Fudge', desc: "My white chocolate passionfruit fudge featured in Hedessent's dessert collection, made with their Passionfruit Flavour Drops.", img: 'https://static.wixstatic.com/media/b3c1ed_76bf153b93e947aebba9233bbc31a74c~mv2.jpg' },
          ].map((item) => (
            <a key={item.slug} href={item.href} target="_blank" rel="noopener noreferrer" className="featured-in-card"
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 12px 40px rgba(113,12,33,0.14)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 8px 32px rgba(113,12,33,0.08)'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              <div className="featured-in-img">
                <img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                <span style={{ position: 'absolute', top: '12px', left: '12px', background: 'var(--plum)', color: '#fff', fontFamily: "'Jost', sans-serif", fontSize: '11px', letterSpacing: '0.24em', textTransform: 'uppercase', padding: '4px 9px', fontWeight: 400 }}>Featured Recipe</span>
              </div>
              <div style={{ padding: '28px 32px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ fontFamily: "'Jost', sans-serif", fontSize: '11px', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--mauve)', fontWeight: 400, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ display: 'inline-block', width: '14px', height: '0.5px', background: 'var(--mauve-light)' }} />
                  Hedessent.ca
                </div>
                <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '26px', fontWeight: 400, color: 'var(--text-dark)', lineHeight: 1.2, marginBottom: '10px' }}>{item.name}</div>
                <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '13px', color: 'var(--text-mid)', fontWeight: 300, lineHeight: 1.7, marginBottom: '20px' }}>{item.desc}</p>
                <span style={{ fontFamily: "'Jost', sans-serif", fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--plum)', fontWeight: 400, display: 'inline-flex', alignItems: 'center', gap: '8px' }}>Read the feature &#8594;</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ── MORE RECIPES ── */}
      <section className="section" style={{ background: 'var(--warm-white)' }}>
        <div className="sec-head">
          <div>
            <div className="sec-label">Keep exploring</div>
            <div className="sec-title">more to make</div>
          </div>
          <Link href="/recipes" className="sec-link">See all</Link>
        </div>
        <div className="recipe-grid">
          {recent.slice(0, 6).map((recipe) => (
            <RecipeCard key={recipe.slug} recipe={recipe} />
          ))}
        </div>
      </section>

      <Newsletter />
      <Footer />

      <style>{`
        /* HERO */
        .hero-section {
          background: var(--warm-white);
          padding: 80px 40px 90px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 72px;
          align-items: center;
          border-bottom: 0.5px solid var(--border-m);
        }
        .hero-photos {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 210px 210px;
          gap: 10px;
        }
        .hero-photo-tall {
          grid-row: 1 / 3;
          overflow: hidden;
          display: block;
        }
        .hero-photo-small {
          overflow: hidden;
          display: block;
        }

        /* FEATURED CARD */
        .featured-card {
          display: grid;
          grid-template-columns: 1.15fr 1fr;
          background: var(--warm-white);
          border: 0.5px solid var(--border-m);
          margin-bottom: 24px;
        }
        .featured-card-img { height: 440px; overflow: hidden; background: var(--blush); }
        .featured-card-body { padding: 52px 48px; display: flex; flex-direction: column; justify-content: center; }

        /* SPLIT ABOUT */
        .about-split {
          display: grid;
          grid-template-columns: 1fr 680px 1fr;
        }
        .about-marquee-col {
          position: relative;
          overflow: hidden;
          background: var(--warm-white);
        }
        .about-marquee-inner {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          overflow: hidden;
        }
        .about-text-col {
          padding: 72px 56px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          background: var(--warm-white);
        }
        .about-mobile-marquee { display: none; }

        /* FEATURED IN */
        .featured-in-card {
          display: grid;
          grid-template-columns: 280px 1fr;
          background: var(--cream);
          border: 0.5px solid var(--border-m);
          box-shadow: 0 8px 32px rgba(113,12,33,0.08);
          text-decoration: none;
          overflow: hidden;
          transition: box-shadow 0.3s, transform 0.3s;
        }
        .featured-in-img {
          height: 200px;
          overflow: hidden;
          background: var(--blush);
          position: relative;
        }

        /* ── MOBILE ── */
        @media (max-width: 768px) {

          /* Hero — stack text above photos */
          .hero-section {
            grid-template-columns: 1fr;
            padding: 40px 20px 36px;
            gap: 28px;
          }
          .hero-section h1 { font-size: 26px; line-height: 1.3; }
          .hero-section span[style*="46px"] { font-size: 32px !important; }
          .hero-photos {
            grid-template-rows: 160px 160px;
          }

          /* Featured card — stack */
          .featured-card {
            grid-template-columns: 1fr;
          }
          .featured-card-img { height: 260px; }
          .featured-card-body { padding: 28px 24px; }
          .featured-card-body h2 { font-size: 24px; }

          /* Split about — hide desktop grid, show mobile stack */
          .about-split { display: none; }
          .about-mobile-marquee { display: block; }

          /* About mobile text */
          .about-mobile-text {
            padding: 48px 20px 32px;
            background: var(--warm-white);
          }

          /* Featured in — stack */
          .featured-in-card { grid-template-columns: 1fr; }
          .featured-in-img { height: 200px; }
        }
      `}</style>
    </>
  )
}

export async function getStaticProps() {
  const allRecipes = await getAllRecipes()
  const published = allRecipes.filter(r => r.title && r.slug && r.coverImage)
  const sorted = published.sort((a, b) => {
    const dateA = a.publishDate ? new Date(a.publishDate) : new Date(0)
    const dateB = b.publishDate ? new Date(b.publishDate) : new Date(0)
    return dateB - dateA
  })
  return {
    props: { featured: sorted.slice(0, 4), recent: sorted.slice(4, 10) },
    revalidate: 3600,
  }
}
