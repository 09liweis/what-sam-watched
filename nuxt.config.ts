// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  server: {
    host: '0.0.0.0',
  },
  runtimeConfig: {
    mongoUrl: process.env.MONGO_URL,
    public: {
      apiHost: process.env.API_HOST || '',
    },
  },
  nitro: {
    plugins: ['~/server/index.ts'],
  },
  routeRules: {
    '/api/visuals': { cors: true },
  },
  image: {
    domains: ['https://img9.doubanio.com'],
  },
  app: {
    head: {
      charset: 'utf-16',
      viewport: 'width=device-width, initial-scale=1',
      title: 'What Sam Watched',
      meta: [
        // <meta name="description" content="My amazing site">
        { name: 'description', content: 'My amazing movie dashboard.' },
      ],
      // link:[
      //   {href :'https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css',rel:'stylesheet'}
      // ],
      script: [{ src: 'https://cdn.tailwindcss.com' }],
    },
  },
});
