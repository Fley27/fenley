import Build from '../../../src/site/pages/Build.jsx'
import { pageMetadata } from '../../../src/site/metadata.js'

export async function generateMetadata({ params }) {
  const { lang } = await params
  return pageMetadata(lang, 'build', '/build')
}

export default function Page() {
  return <Build />
}
