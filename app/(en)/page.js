import Home from '../../src/views/Home.jsx'
import { pageMetadata } from '../../src/metadata.js'

export const metadata = pageMetadata('en', 'home', '/')

export default function Page() {
  return <Home />
}
