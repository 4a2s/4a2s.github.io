// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    baseURL: '/4a2s.github.io/', // Remplace par le nom du repo GitHub
  },
  ssr: false, // GitHub Pages ne gère que du static
})
