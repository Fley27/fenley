import Home from '../../src/site/pages/Home.jsx'
import { pageMetadata } from '../../src/site/metadata.js'

export async function generateMetadata({ params }) {
  const { lang } = await params
  return pageMetadata(lang, 'home', '/')
}

export default function Page() {
  return <Home />
}
