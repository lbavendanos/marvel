import URI from 'urijs'
import md5 from 'crypto-js/md5'
import _ from 'lodash'

export default ({ app }, inject) => {
  // Set the function directly on the context.app object
  app.url = {
    generate: (url, options = {}) => {
      let apikey = process.env.KEY_PUBLIC
      let ts = Date.now()
      let hash = md5(
        `${ts}${process.env.KEY_SECRET}${process.env.KEY_PUBLIC}`
      ).toString()

      let params = _.assignIn(
        {
          ts,
          apikey,
          hash
        },
        options
      )

      let uri = new URI(url)
      uri.addSearch(params)

      return uri
    }
  }
}
