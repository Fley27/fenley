import Contact from '../../../src/site/pages/Contact.jsx'
import { pageMetadata } from '../../../src/site/metadata.js'

export const metadata = pageMetadata('en', 'contact', '/contact')

export default function Page() {
  return <Contact />
}
