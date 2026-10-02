import { SITE_URL, absoluteUrl } from '../src/site/seo.js'
const AI_AGENTS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'PerplexityBot',
  'ClaudeBot',
  'anthropic-ai',
  'Google-Extended',
  'CCBot',
]

const SEARCH_AGENTS = ['Googlebot', 'Googlebot-Image', 'Bingbot', 'BingWebSearch', 'DuckDuckBot', 'Applebot']

export default function robots() {
  return {
    rules: [
      { userAgent: AI_AGENTS, allow: '/' },
      { userAgent: SEARCH_AGENTS, allow: '/' },
      { userAgent: '*', allow: '/' },
    ],
    sitemap: absoluteUrl('/sitemap.xml'),
    host: new URL(SITE_URL).host,
  }
}
