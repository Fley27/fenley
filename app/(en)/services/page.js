import Services from '../../../src/site/pages/Services.jsx'
import { pageMetadata } from '../../../src/site/metadata.js'
import JsonLd from '../../../src/site/JsonLd.jsx'
import { servicesJsonLd } from '../../../src/site/jsonld.js'

export const metadata = pageMetadata('en', 'services', '/services')

export default function Page() {
  return (
    <>
      <JsonLd data={servicesJsonLd('en')} />
      <Services />
    </>
  )
}
