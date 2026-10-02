import '../../src/site/styles/base.css'
import '../../src/site/styles/chrome.css'
import '../../src/site/styles/pages.css'
import RootDocument from '../../src/site/RootDocument.jsx'
import { rootMetadata } from '../../src/site/metadata.js'

export const metadata = rootMetadata('en')

export const viewport = {
  themeColor: '#05060a',
}

export default function RootLayout({ children }) {
  return <RootDocument lang="en">{children}</RootDocument>
}
