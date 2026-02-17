// https://v3.nuxtjs.org/api/configuration/nuxt.config
import { SITE_URL } from './constants/seo';

export default defineNuxtConfig({
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  css: ['~/assets/css/main.css'],
  modules: ['@pinia/nuxt','@nuxt/image'],

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
        { rel: "icon", type: "image/png", href: "/favicon.ico" }
      ],
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'What Sam Watched',
      meta: [
        { name: 'description', content: 'My amazing movie dashboard.' },
        { name: 'robots', content: 'index,follow' },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'What Sam Watched' },
        { property: 'og:description', content: 'A dashboard of movies Sam has watched.' },
        { property: 'og:url', content: process.env.PUBLIC_URL || SITE_URL },
        { property: 'og:image', content: '/og-image.png' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'What Sam Watched' },
        { name: 'twitter:description', content: 'A dashboard of movies Sam has watched.' },
        { name: 'twitter:image', content: '/og-image.png' }
      ],
      script: [
        {
          type: 'application/ld+json',
          children: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'What Sam Watched',
            url: process.env.PUBLIC_URL || SITE_URL,
            description: 'A dashboard of movies Sam has watched.'
          })
        }
      ]
    },
  },

  compatibilityDate: '2024-12-10',
});