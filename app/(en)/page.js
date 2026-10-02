import Home from '../../src/site/pages/Home.jsx'
import { pageMetadata } from '../../src/site/metadata.js'

export const metadata = pageMetadata('en', 'home', '/')

export default function Page() {
  return <Home />
}
