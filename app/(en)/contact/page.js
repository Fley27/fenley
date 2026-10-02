import Contact from '../../../src/views/Contact.jsx'
import { pageMetadata } from '../../../src/metadata.js'

export const metadata = pageMetadata('en', 'contact', '/contact')

export default function Page() {
  return <Contact />
}
