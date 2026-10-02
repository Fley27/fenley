import { LanguageProvider } from './i18n.jsx'
import Shell from './Layout.jsx'
import JsonLd from './JsonLd.jsx'
import { siteJsonLd } from './jsonld.js'
import { fontVariables } from './fonts.js'

export default function RootDocument({ lang, children }) {
  return (
    <html lang={lang} className={fontVariables} suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <JsonLd data={siteJsonLd(lang)} />
        <LanguageProvider lang={lang}>
          <Shell>{children}</Shell>
        </LanguageProvider>
      </body>
    </html>
  )
}
