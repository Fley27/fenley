import About from '../../../src/views/About.jsx'
import { pageMetadata } from '../../../src/metadata.js'

export const metadata = pageMetadata('en', 'about', '/about')

export default function Page() {
  return <About />
}
