// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: [
    '~/assets/css/style.css',
    'semantic-ui-css/semantic.min.css',
  ],
  modules: [
    '@sidebase/nuxt-auth'
  ],
  auth: {
    globalAppMiddleware: true,
    provider: {
      type: 'authjs',
    }
  }
  // auth: {
  //   isEnabled: true,
  //   disableServerSideAuth: false,
  //   globalAppMiddleware: true,
  //   provider: {
  //     type: "authjs",
  //     trustHost: false,
  //   },
  //   sessionRefresh: {
  //     enablePeriodically: 60 * 1000, // refresh every x seconds
  //     enableOnWindowFocus: true,
  //   },
  // }
})