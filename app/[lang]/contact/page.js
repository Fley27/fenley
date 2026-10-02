import Contact from '../../../src/views/Contact.jsx'
import { pageMetadata } from '../../../src/metadata.js'

export async function generateMetadata({ params }) {
  const { lang } = await params
  return pageMetadata(lang, 'contact', '/contact')
}

export default function Page() {
  return <Contact />
}
