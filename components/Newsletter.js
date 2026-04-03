import { useState } from 'react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    if (!email || !email.includes('@')) return

    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (res.ok && data.success) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
        setErrorMsg(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setErrorMsg('Something went wrong. Please try again.')
    }
  }

  return (
    <section className="newsletter-strip">
      <div className="newsletter-strip-inner">

        {status === 'success' ? (
          <div style={{
            width: '100%',
            textAlign: 'center',
            padding: '8px 0',
          }}>
            <div style={{
              fontFamily: "'Alex Brush', cursive",
              fontSize: '36px',
              color: '#fff',
              marginBottom: '6px',
              lineHeight: 1.2,
            }}>
              you&apos;re in! 🎉
            </div>
            <p style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: '13px',
              color: 'rgba(255,255,255,0.8)',
              fontWeight: 300,
            }}>
              New recipes are coming your way. So glad you&apos;re here.
            </p>
          </div>
        ) : (
          <>
            <div className="newsletter-strip-copy">
              <div className="newsletter-strip-label">Stay in the loop</div>
              <h2 className="newsletter-strip-heading">
                New recipes, <em style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.85)' }}>straight to your inbox</em> 💌
              </h2>
              <p className="newsletter-strip-sub">No spam. Just the recipe.</p>
            </div>

            <div style={{ flexShrink: 0, maxWidth: '320px', width: '100%' }}>
              <form
                className="newsletter-strip-form"
                onSubmit={handleSubmit}
                style={{ display: 'flex', width: '100%' }}
              >
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="newsletter-strip-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === 'loading'}
                  required
                  style={{ flex: 1, minWidth: 0 }}
                />
                <button
                  type="submit"
                  className="newsletter-strip-btn"
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? '...' : 'Subscribe'}
                </button>
              </form>

              <p style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: '10px',
                color: 'rgba(255,255,255,0.7)',
                fontWeight: 300,
                marginTop: '8px',
                lineHeight: 1.5,
              }}>
                By subscribing you agree to receive email updates from Josephine&apos;s Baking.
                No spam, unsubscribe anytime.
              </p>

              {status === 'error' && (
                <p style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: '11px',
                  color: '#f87171',
                  fontWeight: 300,
                  marginTop: '6px',
                }}>
                  {errorMsg}
                </p>
              )}
            </div>
          </>
        )}

      </div>
    </section>
  )
}
