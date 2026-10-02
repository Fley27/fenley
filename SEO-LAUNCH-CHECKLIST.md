# SEO + AI-visibility launch checklist

Domain: `https://fenleymenelas.com` · Host: Netlify · Languages: `en` (root), `es` (`/es`), `fr` (`/fr`)

Everything below that says **[DONE]** is already implemented in this repo and verified by
`node scripts/seo-verify.mjs` (run against `npm run start`). Everything else is manual and only needs to
be done once, at launch.

---

## 1. On-site — implemented **[DONE]**

- [x] Root layouts split by locale: `app/(en)/layout.js` (`<html lang="en">`) and `app/[lang]/layout.js`
      (`generateStaticParams` → `es`, `fr`, `dynamicParams = false`). The old catch-all
      `app/[...slug]` that redirected 404s to `/` is deleted — unknown URLs now return a real 404.
- [x] Every page exports complete metadata via `src/metadata.js` → `pageMetadata(lang, key, path)`:
      unique `<title>`, meta description, keywords, `robots`, full `openGraph`, `twitter`, canonical and
      `alternates.languages` (`en`, `es`, `fr`, `x-default`).
- [x] `hreflang` alternates are emitted on all 18 indexable URLs; `x-default` points at English.
- [x] Canonical URL per locale (`/services`, `/es/services`, `/fr/services` …) — no self-referencing
      duplicates across the three language trees.
- [x] `app/sitemap.js` — 18 URLs, each with `alternates.languages` (`xhtml:link hreflang` entries).
- [x] `app/robots.js` — explicit `Allow: /` for GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot,
      ClaudeBot, anthropic-ai, Google-Extended, CCBot; then Googlebot/Bingbot/DuckDuckBot/Applebot;
      then `*`. Includes `Sitemap:` and `Host:`.
- [x] `app/not-found.js` + `app/global-not-found.js` (`experimental.globalNotFound` in `next.config.mjs`) —
      unmatched URLs in **any** tree return HTTP 404 with the site theme, navigation and a `noindex`
      robots meta. If you upgrade Next, re-check that flag is still supported (build prints it under
      "Experiments").
- [x] Structured data (`src/jsonld.js`), rendered server-side in the layout:
      `Person`, `WebSite`, `Organization`, `ContactPoint` sitewide; `ProfessionalService` +
      `Offer` (pricing) + `FAQPage` on the services pages — in all three languages.
- [x] Language switching is real navigation (`<a href>` links with `hreflang`/`lang`), not a client-side
      state toggle — crawlers and AI bots discover the localized URLs from the DOM alone.
- [x] Internal links are locale-aware (`src/router.jsx` → `localize()`), so `/es` never links
      back to an English page by accident.
- [x] No-JS safety: `.reveal` content is only hidden when `html.js` is set by an inline script, so
      text is visible without JavaScript. FAQ answers are in the HTML (no `hidden` attribute) and
      animated with `grid-template-rows`, with correct `aria-expanded` / `aria-hidden`.
- [x] Client-side `localStorage` / `navigator.language` language sniffing removed — the URL is the
      single source of truth (`src/i18n.jsx`).
- [x] Fonts self-hosted with `next/font/google` (`Space Grotesk`, `Manrope`, `DM Mono`) — no request
      to `fonts.googleapis.com`, `@font-face` preloaded.
- [x] Open Graph images generated per language: `/og.png`, `/og.es.png`, `/og.fr.png` (1200×630,
      regenerate with `node og.mjs`). `apple-touch-icon.png` (180×180) also generated.
- [x] `public/portrait.jpg` compressed 645 KB → 127 KB (705×940) for the About page.
- [x] `public/llms.txt` — plain-text site map written for LLM crawlers: what the business does,
      pricing, page list, language/URL scheme, contact details.
- [x] `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` is read at build time into `verification.google`
      (see `src/metadata.js`) — set it in Netlify instead of hard-coding a code.

## 2. Netlify setup

- [ ] Point the apex domain `fenleymenelas.com` and `www.fenleymenelas.com` at the Netlify site;
      force a single canonical host (apex → `www`, or `www` → apex) so only one host is ever indexed.
- [ ] Build command `npm run build`, publish directory `.next` handled by the Netlify Next.js runtime
      (or `@netlify/plugin-nextjs`). Set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` as an env var.
- [ ] Confirm HTTPS is active and HSTS is enabled on both hosts.
- [ ] Confirm the deployed site returns the same results as `node scripts/seo-verify.mjs`:
      run `BASE=https://fenleymenelas.com node scripts/seo-verify.mjs`.

## 3. Google Search Console

- [ ] Add the property (DNS TXT record preferred — use the value of `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`).
- [ ] Submit `https://fenleymenelas.com/sitemap.xml`.
- [ ] Request indexing for `/`, `/services`, `/about`, `/contact` (and one localized URL per language).
- [ ] Check **Coverage** after a week: expect 18 indexed URLs, no "Duplicate without user-selected
      canonical", no soft 404s.
- [ ] Check **Web Vitals** and fix anything in the "needs improvement" band.

## 4. Other search / social

- [ ] Bing Webmaster Tools — add site, submit the sitemap, verify `loc` values.
- [ ] IndexNow: submit the sitemap URL once (Bing/Yandex/DuckDuckGo).
- [ ] Test the Open Graph card: <https://developers.facebook.com/tools/debug/> on `/` and `/es`.
- [ ] Test the X/Twitter card: <https://cards-dev.twitter.com/validator>.
- [ ] Test the LinkedIn preview: <https://www.linkedin.com/post-inspector/>.

## 5. AI-visibility extras (the "get cited" part)

- [x] `robots.txt` explicitly allows every major AI crawler (see §1).
- [x] `llms.txt` at the site root.
- [ ] Ask the AI crawlers to re-fetch after launch:
      - OpenAI: <https://chatgpt.com/backend-api/has.txt> is informational only — indexing is driven by
        `OAI-SearchBot` / `GPTBot`, which `robots.txt` already permits.
      - Perplexity: confirm `PerplexityBot` reaches `robots.txt` (it does) — no registration needed.
      - Claude / Anthropic: `ClaudeBot` permitted — no registration needed.
- [ ] Submit the site to the Google AI crawlers via Search Console (they respect `Google-Extended`,
      already allowed).
- [ ] Get at least 3–5 **independent** third-party mentions with a link (this is what actually drives
      LLM citation — models weight sources they saw during training):
      - LinkedIn profile "website" field + articles linking to the domain
      - GitHub profile / repo README linking to the domain
      - LinkedIn profile "website" field
      - Dev.to / Medium / Hashnode articles about the multilingual build
      - Haitian and LATAM developer directories, local business directories
      - A testimonial or directory listing from each served market (US, CA, DO, HT)
- [ ] Add the remaining social profiles to `sameAs` in `src/jsonld.js` (currently only the LinkedIn
      profile — add the real GitHub/Instagram URLs when they exist).

## 6. Content / on-page

- [ ] Decide whether `/work` should become a real indexed page. It exists as a component
      (`src/pages/Work.jsx`) but is not routed (`SHOW_PROJECTS = false`). If enabled, add it to
      `ROUTES` in `src/seo.js` and it will automatically appear in the sitemap and metadata.
- [ ] Add a genuine testimonial/case study once a client agrees — `FAQPage` + real reviews are the
      fastest way into AI answers.
- [ ] Check every translated string reads naturally in `src/content.es.js` / `content.fr.js`
      (AI-drafted copy with human review — do one native-speaker pass).

## 7. Performance / a11y (affects ranking)

- [ ] Run Lighthouse on `/`, `/es/services`, `/about` — target 90+ on Performance/Best Practices/SEO.
- [ ] Confirm the About portrait is `width`/`height` stable (no CLS) on a throttled connection.
- [ ] Keyboard-test the nav, language switch and FAQ accordion (focus ring, `aria-expanded`).

## 8. Re-verify after any change

```bash
npm run lint
npm run build
npm run start &
BASE=http://localhost:3111 node scripts/seo-verify.mjs
```

Regenerate social images after a copy change:

```bash
node og.mjs
```
