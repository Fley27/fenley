import { LanguageProvider } from './i18n.jsx'
import Shell from './Layout.jsx'
import JsonLd from './JsonLd.jsx'
import { siteJsonLd } from './jsonld.js'
import { fontVariables } from './fonts.js'

const GA_ID = 'G-RCRG7FPQPW'

const GA_SNIPPET = `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');
(function(){
  function load(){
    requestIdleCallback(function(){
      var s = document.createElement('script');
      s.async = true;
      s.src = 'https://www.googletagmanager.com/gtag/js?id=${GA_ID}';
      document.head.appendChild(s);
    }, { timeout: 1000 });
  }
  if (document.readyState === 'complete') load();
  else window.addEventListener('load', load, { once: true });
})();`

export default function RootDocument({ lang, children }) {
  return (
    <html lang={lang} className={fontVariables} suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: GA_SNIPPET }} />
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <JsonLd data={siteJsonLd(lang)} />
        <LanguageProvider lang={lang}>
          <Shell>{children}</Shell>
        </LanguageProvider>
        <script
          dangerouslySetInnerHTML={{
            __html: `requestAnimationFrame(function(){var els=document.querySelectorAll('.reveal'),v=[],i,r;for(i=0;i<els.length;i++){r=els[i].getBoundingClientRect();if(r.top<window.innerHeight&&r.bottom>0)v.push(els[i])}if(v.length){getComputedStyle(v[0]).opacity;for(i=0;i<v.length;i++)v[i].classList.add('is-visible')}})`,
          }}
        />
      </body>
    </html>
  )
}
