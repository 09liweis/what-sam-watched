// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  css: ['~/assets/css/main.css'],
  modules: ['@pinia/nuxt','@nuxt/image'],
  server: {
    host: '0.0.0.0',
  },
  runtimeConfig: {
    public: {
      apiHost: process.env.API_HOST || '',
    },
  },
  nitro: {
    plugins: ['~/server/index.ts'],
  },
  routeRules: {
    '/api/visuals': { cors: true },
    '/api/visual': { cors: true },
    '/api/upsert': { cors: true },
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
      meta: [{ name: 'description', content: 'My amazing movie dashboard.' }],
    },
  },
});
