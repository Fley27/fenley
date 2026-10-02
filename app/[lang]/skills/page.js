import Skills from '../../../src/site/pages/Skills.jsx'
import { pageMetadata } from '../../../src/site/metadata.js'

export async function generateMetadata({ params }) {
  const { lang } = await params
  return pageMetadata(lang, 'skills', '/skills')
}

export default function Page() {
  return <Skills />
}
