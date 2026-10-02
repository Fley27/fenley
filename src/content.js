import es from './content.es.js'
import fr from './content.fr.js'

export const LANGS = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'es', label: 'ES', name: 'Español' },
  { code: 'fr', label: 'FR', name: 'Français' },
]

const en = {
  nav: {
    home: 'Home',
    services: 'Services',
    build: 'How I Build',
    skills: 'Skills',
    work: 'Work',
    about: 'About',
    contact: 'Contact',
    cta: 'Start a project',
    menu: 'Menu',
    close: 'Close',
    language: 'Language',
  },
  meta: {
    home: {
      title: 'Fenley Menelas — Websites that earn trust, in three languages',
      desc: 'AI-assisted web design and development. Fast, multilingual sites in English, Spanish and French, starting at $1,000.',
    },
    services: {
      title: 'Services & Pricing — Fenley Menelas',
      desc: 'Custom websites and web apps, multilingual builds, SEO, analytics and maintenance. Website builds from $1,000, membership $50/month.',
    },
    build: {
      title: 'How I Build — Fenley Menelas',
      desc: 'Fast by default and built to last — the principles behind every build: speed, audience-first design, shared stakes and a foundation made to grow.',
    },
    skills: {
      title: 'Skills — Fenley Menelas',
      desc: 'Project management, CMS and e-commerce, custom applications, cloud infrastructure and AI — the skills behind every build.',
    },
    work: {
      title: 'Work — Fenley Menelas',
      desc: 'Representative builds: multilingual sites, booking experiences and analytics dashboards designed to feel instant.',
    },
    about: {
      title: 'About — Fenley Menelas',
      desc: 'Software engineer based in Haiti. Almost a decade building web, mobile and desktop products for clients in the US, Canada, the Dominican Republic and Haiti.',
    },
    contact: {
      title: 'Contact — Fenley Menelas',
      desc: 'Tell me about your project. A personal reply within 24 hours, in English, Spanish or French.',
    },
  },
  common: {
    start: 'Start your project',
    explore: 'Explore services',
    viewWork: 'View the showcase',
    allServices: 'All services & pricing',
    howBuild: 'See how I build',
    talk: 'Let’s talk',
    reply: 'Reply within 24h',
    sample: 'Sample build',
    included: 'What’s included',
    optional: 'Optional',
  },
  cta: {
    kicker: 'Ready when you are',
    title: 'Let’s build the site your audience will trust.',
    text: 'Tell me about your project. You’ll get a personal reply within 24 hours and a clear, fixed quote — starting at $1,000.',
    primary: 'Start your project',
    secondary: 'See services & pricing',
  },
  footer: {
    tagline: 'Websites that earn trust — in three languages.',
    location: 'Based in Haiti · Clients across North & Latin America',
    pages: 'Pages',
    contact: 'Contact',
    rights: '© 2026 Fenley Menelas. All rights reserved.',
    top: 'Back to top',
  },
  home: {
    hero: {
      eyebrow: 'Serving clients across North & Latin America',
      title1: 'Built for your audience.',
      title2: 'Designed to earn trust.',
      lead: 'I design and build websites and web apps that feel instant, look luxurious, and speak your customers’ language — English, Spanish or French. The product adapts to your business and your audience, not the other way around.',
      cta1: 'Start your project',
      cta2: 'See how I build',
      micro: 'Starting at $1,000 · No $10,000 budget required · Three languages',
      frameUrl: 'yourbrand.com',
      stats: [
        { v: 'Almost 10', l: 'Years shipping web, mobile & desktop' },
        { v: '3', l: 'Languages, with support available' },
        { v: 'Custom-built', l: 'architecture, zero heavy templates' },
      ],
    },
    story: {
      kicker: '01 — Your audience first',
      title: 'Your customers decide in seconds.',
      lead: 'Before anyone reads your prices, they decide whether you feel trustworthy. Every section of your site is written for the people you are trying to reach — their language, their habits, their expectations.',
      cards: [
        {
          t: 'Three cultures, one site',
          d: 'American, Hispanic and French-speaking audiences behave differently online. I have studied each one and shape how your product is presented to match.',
        },
        {
          t: 'Continuity across every section',
          d: 'Nothing is bolted on. The story flows from the first pixel to the final call to action, so visitors never lose the thread.',
        },
        {
          t: 'Trust first, then inspiration',
          d: 'A site that feels fast, secure and considered makes people ready to act — and ready to believe you.',
        },
      ],
    },
    services: {
      kicker: '02 — Services',
      title: 'Everything a serious site needs.',
      lead: 'Design, build, languages, search and care — one person accountable for the whole thing.',
      items: [
        {
          n: '01',
          t: 'Design & development',
          d: 'Custom websites and web apps built from scratch around your business — never a template stretched to fit.',
        },
        {
          n: '02',
          t: 'Three languages, built in',
          d: 'English, Spanish and French with support available from day one — not a plug-in bolted on at the end.',
        },
        {
          n: '03',
          t: 'Growth after launch',
          d: 'SEO, analytics and lead channels that often cost less per click and per impression than Facebook or Google.',
        },
      ],
      link: 'All services & pricing',
    },
    speed: {
      kicker: '03 — How I work',
      title: 'AI-assisted. Accountable.',
      lead: 'AI-assisted development means your site ships much faster than traditional timelines — and the extra speed never goes into shortcuts. It goes into improving the product.',
      points: [
        { t: 'Faster for both of us', d: 'Faster delivery is better for both sides, and I stand behind every line I ship.' },
        { t: 'Start today', d: 'No $10,000 starting budget. Projects begin at $1,000, and the scope grows when you are ready.' },
        { t: 'Built to grow', d: 'A solid database and architecture, so new features slot in later without starting over.' },
      ],
      link: 'See how I build',
    },
    work: {
      kicker: '04 — Selected work',
      title: 'Proof, not promises.',
      lead: 'A look at the kinds of products I build — each one designed to feel instant on any connection.',
      items: [
        { tag: 'Multilingual', t: 'Multilingual business site', d: 'One site, three languages, one voice — indexed cleanly in every locale.' },
        { tag: 'Web app', t: 'Booking & ordering', d: 'Friction removed on a phone: quick to load, easy to finish on a weak signal.' },
        { tag: 'Analytics', t: 'Retention dashboard', d: 'Real user behaviour turned into a short list of what to fix next.' },
      ],
      link: 'View the showcase',
    },
    langs: {
      kicker: '04 — Multilingual',
      title: 'Speak your customer’s language.',
      lead: 'English. Español. Français. Translation is woven into the build from the first draft — tone, rhythm and intent carried across, never word-swapped by a plug-in.',
      note: 'Your audience should not have to translate you.',
    },
  },
  services: {
    hero: {
      kicker: 'Services & pricing',
      title1: 'Everything your site needs.',
      title2: 'Nothing it doesn’t.',
      lead: 'Six services, two ways to pay. Clear scope, clear price, no surprises — and no $10,000 budget required to begin.',
    },
    listKicker: 'What’s included',
    listTitle: 'One service, start to finish.',
    list: [
      {
        n: '01',
        t: 'Custom website & web app development',
        d: 'Design and build from scratch: marketing sites, portals, booking flows and dashboards — shaped around your business and the audience you need to reach.',
        bullets: ['Mobile-first and responsive', 'Fast on slow connections', 'Built to scale as you grow'],
      },
      {
        n: '02',
        t: 'Multilingual setup — EN · ES · FR',
        d: 'Careful AI-assisted translation with human review, wired into the structure of the site from the start instead of pasted on at the end.',
        bullets: ['Translated alongside the design', 'Language switcher included', 'Search-engine friendly for each locale'],
      },
      {
        n: '03',
        t: 'SEO content support & backlinks',
        d: 'Content planned around what your customers actually search for, plus backlink support for your blog so the site keeps being found.',
        bullets: ['Page and keyword planning', 'Backlinks for client blogs', 'Technical SEO foundations'],
      },
      {
        n: '04',
        t: 'Analytics & conversion monitoring',
        d: 'Real user behaviour on your site, watched over time — with conversion and retention improvements based on what people actually do.',
        bullets: ['Analytics setup and dashboards', 'Conversion improvements', 'Retention improvements'],
      },
      {
        n: '05',
        t: 'Security updates & maintenance',
        d: 'Ongoing patches and upkeep so the site stays safe and fast. Covered by your membership — never a surprise invoice.',
        bullets: ['Regular security updates', 'Existing features maintained', 'Analytics kept under watch'],
      },
      {
        n: '06',
        t: 'New feature development',
        d: 'A new idea after launch? New features are available anytime and quoted directly with you before any work begins.',
        bullets: ['Quoted feature by feature', 'No lock-in', 'Added to your existing site'],
      },
    ],
    pricing: {
      kicker: 'Pricing',
      title: 'Build it once. Keep it growing.',
      lead: 'Start small and grow, or launch complete and let the membership carry the upkeep.',
      popular: 'Start here',
      cards: [
        {
          name: 'Step 1, Custom build',
          price: '$1,000',
          per: 'starting from',
          note: 'A flat fee based on scope, agreed with you before anything is built.',
          items: ['Design & development', 'Three-language foundation (English, Spanish, French)', 'SEO & analytics setup', 'Launch support'],
          cta: 'Start your project',
        },
        {
          name: 'Step 2, Membership',
          price: '$50',
          per: 'per month',
          note: 'After launch, we keep your site secure, healthy, and improving. Cancel whenever you want.',
          items: ['Security updates', 'Maintenance of existing features', 'Analytics monitoring'],
          cta: 'Add to my build',
        },
      ],
      note: 'Need something new down the road? We’ll scope it together.',
    },
    process: {
      kicker: 'How it works',
      title: 'Four steps, no guesswork.',
      steps: [
        { n: '01', t: 'Tell me the goal', d: 'A short conversation about your business and the audience you need to reach.' },
        { n: '02', t: 'Get a fixed quote', d: 'Clear scope and a clear price, agreed before anything is built.' },
        { n: '03', t: 'Watch it take shape', d: 'AI-assisted speed, with the extra time spent improving the product.' },
        { n: '04', t: 'Launch & care', d: 'Go live, then stay secure, monitored and improving through your membership.' },
      ],
    },
    faq: {
      kicker: 'Common questions',
      title: 'Fair questions, straight answers.',
      lead: 'These are the things people ask me first — answered the same way I would answer on a call.',
      items: [
        {
          q: 'How much does a website cost?',
          a: 'Website builds start at $1,000. The final fee depends on scope — pages, languages, custom features — and it is a flat price agreed with you in writing before anything is built. New features after launch are quoted directly too, so you always know the price before the work starts.',
        },
        {
          q: 'How fast will my site be ready?',
          a: 'AI-assisted development means your site ships in a fraction of traditional timelines. You get a clear delivery estimate together with your quote, and I never promise a date I cannot keep — the extra speed goes into improving the product, not cutting corners.',
        },
        {
          q: 'Do you really work in three languages?',
          a: 'Yes — English, Spanish and French. Translation is part of the build from the first draft, with human review, so your site sounds native in every language instead of machine-translated. Your audience should not have to translate you.',
        },
        {
          q: 'I already have a site — or an AI-generated draft. Can you take over?',
          a: 'Absolutely. I can take an existing site or a rough AI draft and turn it into a fast, structured, scalable product — cleaning up and rebuilding what is there when that makes sense, keeping what already works, and explaining exactly what I would change and why.',
        },
        {
          q: 'What does the monthly membership cover?',
          a: 'Security updates, maintenance of your existing features, and analytics monitoring — for $50 a month. It is the quiet part: the site stays safe, fast and watched over. Cancel whenever you want.',
        },
        {
          q: 'Who owns the website?',
          a: 'You do. You own the site, the domain, the accounts and the code. The membership is care, not captivity — there is no lock-in, and everything is handed over in your name.',
        },
        {
          q: 'How do I know it will work for my audience?',
          a: 'Every section is written for the people you are trying to reach — their language, their habits, their expectations. And once you are live, analytics show what real visitors actually do, so we keep improving based on evidence rather than guesswork.',
        },
        {
          q: 'How do we start?',
          a: 'Send me a short message about your business and who you need to reach. You get a personal reply within 24 hours — in English, Spanish or French — with clear next steps and a fixed quote.',
        },
      ],
    },
  },
  build: {
    hero: {
      kicker: 'How I build',
      title1: 'Fast by default,',
      title2: 'built to last.',
      lead: 'Here’s what actually guides every project I take on.',
    },
    principles: [
      { t: 'Speed isn’t an afterthought, it’s respect.', d: 'I’ve seen what a slow, heavy site costs you: visitors, trust, and sales. So everything I build is fast and seamless by default, never an upgrade you have to ask for.' },
      { t: 'Your product adapts to your audience, not the other way around.', d: 'I don’t start with a template and squeeze your business into it. I start with who you’re trying to reach, and build toward them.' },
      { t: 'Your win is my win.', d: 'I run my own ventures too, so I know what’s actually at stake for you. I don’t treat your project like a transaction, I treat it like it’s mine.' },
      { t: 'Built to last, and built to grow.', d: 'Whether that means a new feature next year or ten times the traffic, the foundation is already there to support it.' },
    ],
    closing: 'I build the way I’d want mine built: honestly, fast, and made to last.',
  },
  work: {
    hero: {
      kicker: 'Selected work',
      title1: 'Proof,',
      title2: 'not promises.',
      lead: 'Representative builds that show how I think about structure, speed and language. Full case studies and references are shared on request.',
    },
    note: 'Sample builds shown here. Client case studies and testimonials are available when you ask.',
    projects: [
      {
        n: '01',
        title: 'Multilingual business site',
        tags: ['EN · ES · FR', 'Marketing site'],
        desc: 'One brand voice across three languages, structured so search engines index each locale cleanly and visitors never hit a wall of translation.',
        outcome: 'Outcome: every visitor reads it in their own language.',
        mock: 'browser',
      },
      {
        n: '02',
        title: 'Booking & ordering experience',
        tags: ['Web app', 'Mobile-first'],
        desc: 'A flow designed to remove friction on a phone — quick to load and easy to finish even on a weak signal.',
        outcome: 'Outcome: fewer abandoned bookings, more completed orders.',
        mock: 'phone',
      },
      {
        n: '03',
        title: 'Retention dashboard',
        tags: ['Dashboard', 'Analytics'],
        desc: 'Real user behaviour turned into a short list of what to fix next, with conversion and retention tracked over time.',
        outcome: 'Outcome: decisions from data, not guesses.',
        mock: 'dash',
      },
    ],
  },
  skills: {
    hero: {
      kicker: 'Skills',
      title1: 'The skills behind',
      title2: 'every build.',
      lead: 'Almost a decade of shipping web, mobile and desktop products. Here are the disciplines I bring to your project — how I plan it, build it, launch it and keep it growing.',
    },
    list: {
      kicker: 'What I bring',
      title: 'Six skills. One standard.',
      lead: 'From the first sprint to launch day and everything after — here is what working with me actually covers.',
    },
    items: [
      {
        n: '01',
        t: 'Project Management',
        d: 'I believe in staying close to your project, not disappearing for weeks at a time. I work in agile sprints, so you’ll always know where things stand — I’ll keep you updated without you ever having to chase me for news. And life happens, plans change. If you need to adjust something along the way, I’m flexible. We’ll just sit down, talk it through honestly, and look at what that means for the timeline together, no surprises.',
      },
      {
        n: '02',
        t: 'CMS & E-commerce',
        d: 'For five years, I’ve built beautiful, functional websites on WordPress, using tools like Elementor, Divi, and WooCommerce, often with a strong focus on getting clients found through search. When a business needs something more tailored, I go further and pair WordPress with React to build something leaner and more custom. And when it’s time to sell online, I build on Shopify too.',
      },
      {
        n: '03',
        t: 'Custom Application Development',
        d: 'When your vision goes beyond what a template can hold, I build it from the ground up — React for web applications, React Native so your app feels native on both iPhone and Android, and Next.js when speed and visibility matter most, giving you something fully yours, without ever weighing your site down with unnecessary plugins.',
      },
      {
        n: '04',
        t: 'Cloud & Infrastructure',
        d: 'I trust AWS as my foundation, it’s reliable and it scales with you. But this is your project, not mine, so if you already have a preferred platform, I’ll gladly work within it. And if having full ownership and control matters to you, I can set everything up on your own private server instead.',
      },
      {
        n: '05',
        t: 'AI Integration',
        d: 'The world is shifting, people don’t only search on Google anymore, they’re asking AI. I make sure you show up when they do. And beyond visibility, I can build AI right into your product, so your own customers get to experience that same magic directly inside what you offer them.',
      },
      {
        n: '06',
        t: 'Business & Entrepreneur Angle',
        d: 'I’m not just a developer behind a screen, I’m a business owner too, with ventures of my own. I’ve felt the pressure, the uncertainty, the late nights. That’s exactly why I don’t treat your project like a transaction, I treat it like it’s mine. Your win is my win. And honestly, I only want to work with people who care about being great at what they do, because that’s the standard I hold for myself, every single time.',
      },
    ],
  },
  about: {
    hero: {
      kicker: 'About',
      title1: 'I grew up where',
      title2: 'technology was slow.',
      lead: 'Slow connections, heavy pages, interfaces that fought back. I decided early to build the opposite: technology that feels fast, simple and seamless — for everyone.',
    },
    portrait: {
      alt: 'Portrait of Fenley Menelas',
      name: 'Fenley Menelas',
      role: 'Software engineer',
    },
    story: [
      'That frustration became my standard. Today everything I build starts from one question: will this feel effortless on a weak connection, on an old phone, for someone who has never seen it before? If the answer is no, I rebuild until it is yes.',
      'Almost a decade in, I have built web, mobile and desktop products for clients in the United States, Canada, the Dominican Republic and Haiti. Lately I focus almost entirely on the web.',
      'I work in English, French and Spanish. Each language changed how I understand people — what they expect, what they trust, how they decide — and I use that wider perspective to shape how your product is presented to your audience.',
    ],
    facts: [
      { v: 'Almost 10', l: 'Years of experience' },
      { v: 'US · CA · DR · HT', l: 'Clients served' },
      { v: '3', l: 'Languages spoken' },
      { v: 'Web · Mobile · Desktop', l: 'Products built' },
    ],
    languages: {
      kicker: 'Languages',
      title: 'Three languages. Three ways of understanding people.',
      lead: 'Each language is a different way of understanding people — what they expect, what they trust, how they decide. That wider perspective shapes everything I build.',
      items: [
        { t: 'English', d: 'The language of the web and of my daily work with clients — direct, clear and built for business.' },
        { t: 'French', d: 'A different rhythm of communication: nuance, tone and context first, so nothing gets lost between cultures.' },
        { t: 'Spanish', d: 'Close to home across the Dominican Republic and Latin America — warm, personal and relationship-first.' },
      ],
    },
    founder: {
      kicker: 'Entrepreneur',
      title: 'A business is a dream. I build to move it forward.',
      lead: 'To me a business is impact, community and hope — not just a product. That is why I build things that fit into people’s lives: simple to learn, easy to use, and focused on what actually drives sales and conversions.',
      points: [
        { t: 'Built for real lives', d: 'The people who matter to your business are busy. An easy learning curve is not a nicety — it is the difference between a tool they use and one they abandon.' },
        { t: 'Revenue over vanity', d: 'Every screen earns its place: clear paths to contact, checkout and conversion. Design that does not make money is decoration.' },
        { t: 'Impact that lasts', d: 'The best work keeps paying off long after launch — serving your customers and your community every day.' },
      ],
    },
    values: {
      kicker: 'How I work',
      title: 'Principles I do not bend.',
      items: [
        { t: 'Fast, simple, seamless', d: 'That is the whole idea. If it needs a manual, I have failed — technology should just work, for everyone.' },
        { t: 'Performance is respect', d: 'A slow site costs you visitors, trust and money. I have lived it, so I treat speed as non-negotiable.' },
        { t: 'The product adapts to people', d: 'Your product should fit your business and your customers — never the other way around.' },
        { t: 'I stand behind my work', d: 'Faster delivery is better for both sides, and I answer for everything I ship.' },
      ],
    },
  },
  contact: {
    hero: {
      kicker: 'Contact',
      title1: 'Tell me about',
      title2: 'your project.',
      lead: 'A few sentences are enough to start. You will get a personal reply within 24 hours — in English, Spanish or French.',
    },
    form: {
      title: 'Project intake',
      name: 'Name',
      namePh: 'Your name',
      email: 'Email',
      emailPh: 'you@company.com',
      business: 'Business',
      businessPh: 'Company or brand (optional)',
      need: 'What do you need?',
      needOptions: [
        'A new website',
        'A redesign of my current site',
        'A multilingual site',
        'A web app',
        'A maintenance membership',
        'Something else',
      ],
      lang: 'Preferred language',
      message: 'About your project',
      messagePh: 'Tell me about your business and the audience you want to reach...',
      submit: 'Send request',
      sent: 'Your draft is ready.',
      sentText: 'Your email app should open with the message filled in — press send and I will reply within 24 hours.',
      sendAnother: 'Write another',
    },
    steps: {
      kicker: 'What happens next',
      title: 'Three steps, no pressure.',
      items: [
        { n: '01', t: 'I reply within 24h', d: 'A personal answer from me — in your preferred language — not an automated funnel.' },
        { n: '02', t: 'We talk briefly', d: 'A focused conversation about your business, your audience and what you want the site to do.' },
        { n: '03', t: 'Fixed quote first', d: 'Clear scope and a clear price before any work begins. New features are quoted the same way, later.' },
      ],
    },
    direct: {
      kicker: 'Direct channels',
      title: 'Or reach me straight away.',
      response: 'Usually replies within 24 hours',
      location: 'Haiti (EST) · Working worldwide',
      whatsapp: 'WhatsApp',
      upwork: 'Upwork profile',
      email: 'Email',
    },
  },
}

export const content = { en, es, fr }
export default content
