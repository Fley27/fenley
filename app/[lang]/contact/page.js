import Contact from '../../../src/site/pages/Contact.jsx'
import { pageMetadata } from '../../../src/site/metadata.js'

export async function generateMetadata({ params }) {
  const { lang } = await params
  return pageMetadata(lang, 'contact', '/contact')
}

export default function Page() {
  return <Contact />
}
