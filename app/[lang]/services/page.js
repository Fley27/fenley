import Services from '../../../src/views/Services.jsx'
import { pageMetadata } from '../../../src/metadata.js'
import JsonLd from '../../../src/JsonLd.jsx'
import { servicesJsonLd } from '../../../src/jsonld.js'

export async function generateMetadata({ params }) {
  const { lang } = await params
  return pageMetadata(lang, 'services', '/services')
}

export default async function Page({ params }) {
  const { lang } = await params
  return (
    <>
      <JsonLd data={servicesJsonLd(lang)} />
      <Services />
    </>
  )
}
