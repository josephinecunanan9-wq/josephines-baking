import '../styles/globals.css'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Newsletter />
      <Footer />
    </>
  )
}
