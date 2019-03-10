import Base from '@/plugins/marvel/Base'

export default class Event extends Base {
  static BASE_URL = `${process.env.MARVEL_URL}/events`

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

  async comics(id, params = {}, options = {}) {
    let url = `${this.constructor.BASE_URL}/${id}/comics`
    let data = await this.query(url, params, options)

    return data
  }

  async series(id, params = {}, options = {}) {
    let url = `${this.constructor.BASE_URL}/${id}/series`
    let data = await this.query(url, params, options)

    return data
  }

  async stories(id, params = {}, options = {}) {
    let url = `${this.constructor.BASE_URL}/${id}/stories`
    let data = await this.query(url, params, options)

    return data
  }
}
