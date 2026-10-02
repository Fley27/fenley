import Skills from '../../../src/views/Skills.jsx'
import { pageMetadata } from '../../../src/metadata.js'

export async function generateMetadata({ params }) {
  const { lang } = await params
  return pageMetadata(lang, 'skills', '/skills')
}

export default function Page() {
  return <Skills />
}
