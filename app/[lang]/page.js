import Home from '../../src/views/Home.jsx'
import { pageMetadata } from '../../src/metadata.js'

export async function generateMetadata({ params }) {
  const { lang } = await params
  return pageMetadata(lang, 'home', '/')
}

export default function Page() {
  return <Home />
}
