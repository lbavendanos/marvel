import Base from '@/plugins/marvel/Base'

export default class Comic extends Base {
  static BASE_URL = `${process.env.MARVEL_URL}/comics`

  constructor(context) {
    super(context)
  }

  async characters(id, params = {}, options = {}) {
    let url = `${this.constructor.BASE_URL}/${id}/characters`
    let data = await this.query(url, params, options)

    return data
  }

  async creators(id, params = {}, options = {}) {
    let url = `${this.constructor.BASE_URL}/${id}/creators`
    let data = await this.query(url, params, options)

    return data
  }

  async stories(id, params = {}, options = {}) {
    let url = `${this.constructor.BASE_URL}/${id}/stories`
    let data = await this.query(url, params, options)

    return data
  }

  async events(id, params = {}, options = {}) {
    let url = `${this.constructor.BASE_URL}/${id}/events`
    let data = await this.query(url, params, options)

    return data
  }
}
