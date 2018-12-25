module.exports = {
  mode: 'universal',

  /*
    ** Headers of the page
    */
  head: {
    title: 'Marvel',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Marvel' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  /*
    ** Customize the progress-bar color
    */
  loading: { color: '#fff' },

  /*
    ** Global CSS
    */
  css: ['@/assets/sass/app.scss'],

  /*
    ** Plugins to load before mounting the App
    */
  plugins: ['@/plugins/url.js', '@/plugins/marvel.js'],

  /*
    ** Nuxt.js modules
    */
  modules: [
    '@nuxtjs/dotenv',
    '@nuxtjs/axios',
    '@nuxtjs/vuetify',
    '@nuxtjs/font-awesome'
  ],

  /*
    ** Build configuration
    */
  build: {
    /*
        ** You can extend webpack config here
        */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          options: {
            fix: true
          }
        })
      }
    }
  }
}
