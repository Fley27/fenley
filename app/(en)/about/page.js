import About from '../../../src/site/pages/About.jsx'
import { pageMetadata } from '../../../src/site/metadata.js'

export const metadata = pageMetadata('en', 'about', '/about')

export default function Page() {
  return <About />
}
