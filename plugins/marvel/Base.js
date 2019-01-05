export default class Base {
  static BASE_URL = null

  constructor(context) {
    this.context = context
  }

  async query(url, params = {}, options = {}) {
    let urlWithParameters = this.context.$url.generate(url, params)
    let results = null

    try {
      let { data } = await this.context.$axios.$get(
        urlWithParameters.toString(),
        options
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

  async find(id, options = {}) {
    let url = `${this.constructor.BASE_URL}/${id}`
    let data = await this.query(url, {}, options)

    return data[0]
  }

  async get(params = {}, options = {}) {
    let url = this.constructor.BASE_URL
    let data = await this.query(url, params, options)

    return data
  }
}
