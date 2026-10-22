// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/sitemap', '@pinia/nuxt'],
  ssr: true,

  // Avoid Vite "#app-manifest" resolve race on cold/dev start (nuxt#30461 / #33606)
  // experimental: {
  //   appManifest: false,
  // },

  app: {
    head: {
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
      meta: [
        { name: 'robots', content: 'index, follow' },
        { name: 'googlebot', content: 'index, follow' },
      ],
      htmlAttrs: {
        lang: 'ru',
      },
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon.png' },
        { rel: 'apple-touch-icon', href: '/favicon.png' },
      ],
      script: [
        {
          key: 'gtag-js',
          src: 'https://www.googletagmanager.com/gtag/js?id=G-Y1P90KMD0K',
          async: true,
        },
        {
          key: 'gtag-config',
          innerHTML: `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-Y1P90KMD0K');`,
        },
      ],
    },
  },
  

  site: {
    url: 'https://darknovavpn.com',
  },



  runtimeConfig: {
    public: {
      // тот же hostname, что и у Nuxt (localhost ≠ 127.0.0.1 для cookie)
      apiBase: process.env.NUXT_PUBLIC_API_BASE || '',
    },
  },

  routeRules: {
    // '/account': { redirect: '/' },
    // '/account/**': { redirect: '/' },
  },

  sitemap: {
    sitemaps: {
      pages: {
        sources: [
          '/api/__sitemap__/urls',
        ],
      },
      blog: {
        sources: [
          '/api/__sitemap__/blog',
        ],
      },
      directions: {
        sources: [
          '/api/__sitemap__/directions',
        ],
      },
    },
  },





  plugins: ['~/plugins/anchor-scroll.client.js'],
  nitro: {
    output: {
      publicDir: 'dist',
    },
  },


  
})