// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: [
    '@ant-design-vue/nuxt',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt'
  ],
  antd:{
    // Options
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
