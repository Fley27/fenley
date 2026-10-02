import Services from '../../../src/views/Services.jsx'
import { pageMetadata } from '../../../src/metadata.js'
import JsonLd from '../../../src/JsonLd.jsx'
import { servicesJsonLd } from '../../../src/jsonld.js'

export const metadata = pageMetadata('en', 'services', '/services')

export default function Page() {
  return (
    <>
      <JsonLd data={servicesJsonLd('en')} />
      <Services />
    </>
  )
}
