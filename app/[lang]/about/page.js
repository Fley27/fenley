import About from '../../../src/views/About.jsx'
import { pageMetadata } from '../../../src/metadata.js'

export async function generateMetadata({ params }) {
  const { lang } = await params
  return pageMetadata(lang, 'about', '/about')
}

export default function Page() {
  return <About />
}
