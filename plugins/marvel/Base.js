export default class Base {
  static BASE_URL = null

  constructor(context) {
    this.context = context
  }

  async query(url, options = {}) {
    let urlWithParameters = this.context.$url.generate(url, options)
    let results = null

    try {
      let { data } = await this.context.$axios.$get(
        urlWithParameters.toString()
      )
      results = data.results
    } catch ({ response }) {
      throw {
        statusCode: response.status,
        code: response.data.code,
        message: response.data.status || response.data.message
      }
    }

    return results
  }

  async find(id) {
    let url = `${this.constructor.BASE_URL}/${id}`

    return await this.query(url)
  }

  async get(options = {}) {
    let url = this.constructor.BASE_URL

    return await this.query(url, options)
  }
}
