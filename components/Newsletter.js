export default function Newsletter() {
  return (
    <section className="newsletter-strip">
      <div className="newsletter-strip-inner">
        <div className="newsletter-strip-copy">
          <div className="newsletter-strip-label">Stay in the loop</div>
          <h2 className="newsletter-strip-heading">
            New recipes, <em style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.5)' }}>straight to your inbox</em> 💌
          </h2>
          <p className="newsletter-strip-sub">No spam. Just the recipe.</p>
        </div>
        <form
          className="newsletter-strip-form"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            placeholder="your@email.com"
            className="newsletter-strip-input"
          />
          <button type="submit" className="newsletter-strip-btn">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  )
}
