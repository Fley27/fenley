import Build from '../../../src/views/Build.jsx'
import { pageMetadata } from '../../../src/metadata.js'

export async function generateMetadata({ params }) {
  const { lang } = await params
  return pageMetadata(lang, 'build', '/build')
}

export default function Page() {
  return <Build />
}
