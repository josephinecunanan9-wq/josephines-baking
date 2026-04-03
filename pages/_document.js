import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="google-site-verification" content="b5CiN4dnkVS4r_IpzYm3dwuGUD-wGZTBmu-JkQgPkfQ" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <style>{`
          .skip-to-content {
            position: absolute;
            top: -100px;
            left: 16px;
            z-index: 9999;
            background: #710C21;
            color: #fff;
            padding: 12px 20px;
            font-family: 'Jost', sans-serif;
            font-size: 13px;
            letter-spacing: 0.1em;
            text-decoration: none;
            transition: top 0.15s;
          }
          .skip-to-content:focus {
            top: 16px;
          }
          *:focus-visible {
            outline: 2px solid #710C21;
            outline-offset: 3px;
          }
        `}</style>
      </Head>
      <body>
        <a href="#main-content" className="skip-to-content">Skip to main content</a>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
