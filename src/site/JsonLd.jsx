import { jsonLdScript } from './jsonld.js'

export default function JsonLd({ data }) {
  if (!data) return null
  return <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(data)} />
}
