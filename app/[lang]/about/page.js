import About from '../../../src/site/pages/About.jsx'
import { pageMetadata } from '../../../src/site/metadata.js'

export async function generateMetadata({ params }) {
  const { lang } = await params
  return pageMetadata(lang, 'about', '/about')
}

export default function Page() {
  return <About />
}
