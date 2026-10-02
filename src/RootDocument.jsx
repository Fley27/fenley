import Script from 'next/script'
import { LanguageProvider } from './i18n.jsx'
import Shell from './Layout.jsx'
import JsonLd from './JsonLd.jsx'
import { siteJsonLd } from './jsonld.js'
import { fontVariables } from './fonts.js'

const GA_ID = 'G-RCRG7FPQPW'

export default function RootDocument({ lang, children }) {
  return (
    <html lang={lang} className={fontVariables} suppressHydrationWarning>
      <body>
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
        <Script
          id="gtag-config"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${GA_ID}');`,
          }}
        />
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <JsonLd data={siteJsonLd(lang)} />
        <LanguageProvider lang={lang}>
          <Shell>{children}</Shell>
        </LanguageProvider>
      </body>
    </html>
  )
}
