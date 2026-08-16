// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/fonts.css', '~/assets/css/main.css'],
  app: {
    head: {
      htmlAttrs: { lang: 'de' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#2C4636' },
        { property: 'og:site_name', content: 'Gollner Gastro GmbH' },
        { property: 'og:locale', content: 'de_AT' },
        { property: 'og:type', content: 'website' }
        // Titel, Beschreibung, canonical und og:image setzt useSeo() pro Seite
      ],
      link: [
        // Schriften liegen lokal (public/fonts) — keine Verbindung zu Google.
        { rel: 'preload', as: 'font', type: 'font/woff2', href: '/fonts/fraunces-normal-latin.woff2', crossorigin: '' },
        { rel: 'preload', as: 'font', type: 'font/woff2', href: '/fonts/inter-normal-latin.woff2', crossorigin: '' }
      ]
    }
  }
})
