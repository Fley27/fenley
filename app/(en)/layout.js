import '../../src/styles/base.css'
import '../../src/styles/chrome.css'
import '../../src/styles/pages.css'
import RootDocument from '../../src/RootDocument.jsx'
import { rootMetadata } from '../../src/metadata.js'

export const metadata = rootMetadata('en')

export const viewport = {
  themeColor: '#05060a',
}

export default function RootLayout({ children }) {
  return <RootDocument lang="en">{children}</RootDocument>
}
