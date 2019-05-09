const name = process.env.APP_NAME
const title = 'Marvel'
const description =
  'Browse Marvel characters, comics, creators, events and television series and more.'
const author = 'lbavendanos'
const twitter = '@lbavendanos'
const url = process.env.APP_URL
// const image = `${process.env.APP_URL}/${require('@/assets/images/logo.svg')}`

module.exports = {
  mode: 'universal',

  /*
    ** Headers of the page
    */
  head: {
    title,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: description },
      { hid: 'author', name: 'author', content: author },
      { hid: 'keywords', name: 'keywords', content: title },
      { hid: 'robots', name: 'robots', content: 'index, follow' },
      { hid: 'og:url', property: 'og:url', content: url },
      { hid: 'og:site_name', property: 'og:site_name', content: name },
      { hid: 'og:title', property: 'og:title', content: title },
      {
        hid: 'og:description',
        property: 'og:description',
        content: description
      },
      // { hid: 'og:image', property: 'og:image', content: image },
      { hid: 'twitter:url', property: 'twitter:url', content: url },
      { hid: 'twitter:site', property: 'twitter:site', content: twitter },
      { hid: 'twitter:creator', property: 'twitter:creator', content: twitter },
      { hid: 'twitter:title', property: 'twitter:title', content: title },
      {
        hid: 'twitter:description',
        property: 'twitter:description',
        content: description
      }
      // { hid: 'twitter:image', property: 'twitter:image', content: image }
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
