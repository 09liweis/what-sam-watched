// https://v3.nuxtjs.org/api/configuration/nuxt.config
import { SITE_URL, SEO_DEFAULTS } from './constants/seo';

export default defineNuxtConfig({
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  css: ['~/assets/css/main.css'],
  modules: [],

  // server: {
  //   host: '0.0.0.0',
  // },
  runtimeConfig: {
    public: {
      apiHost: process.env.API_HOST || '',
    },
  },

  nitro: {
    plugins: ['~/server/index.ts'],
  },

  ssr: true,

  routeRules: {
    '/': { prerender: true },
    // '/api/visuals': { cors: true },
    // '/api/visual': { cors: true },
    // '/api/upsert': { cors: true },
  },

  image: {
    inject:true,
    domains: ['https://img9.doubanio.com'],
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      link: [
        { rel: "icon", type: "image/png", href: "/favicon.ico" },
        { rel: "canonical", href: process.env.PUBLIC_URL || SITE_URL }
      ],
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
      title: SEO_DEFAULTS.title,
      meta: [
        { name: 'description', content: SEO_DEFAULTS.description },
        { name: 'keywords', content: SEO_DEFAULTS.keywords },
        { name: 'author', content: 'Sam Liweisen' },
        { name: 'theme-color', content: '#4f46e5' },
        { name: 'robots', content: 'index,follow' },
        { name: 'language', content: 'English' },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: SEO_DEFAULTS.title },
        { property: 'og:description', content: SEO_DEFAULTS.description },
        { property: 'og:url', content: process.env.PUBLIC_URL || SITE_URL },
        { property: 'og:image', content: `${process.env.PUBLIC_URL || SITE_URL}/og-image.png` },
        { property: 'og:site_name', content: SEO_DEFAULTS.site_name },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: SEO_DEFAULTS.title },
        { name: 'twitter:description', content: SEO_DEFAULTS.description },
        { name: 'twitter:image', content: `${process.env.PUBLIC_URL || SITE_URL}/og-image.png` }
      ],
      script: [
        {
          type: 'application/ld+json',
          children: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: SEO_DEFAULTS.site_name,
            url: process.env.PUBLIC_URL || SITE_URL,
            description: SEO_DEFAULTS.description,
            author: {
              '@type': 'Person',
              name: 'Sam Liweisen'
            }
          })
        }
      ]
    },
  },

  compatibilityDate: '2024-12-10',
});