import Base from '@/plugins/marvel/Base'

export default class Character extends Base {
  static BASE_URL = `${process.env.MARVEL_URL}/characters`
  static AVAILABLE = 1491

  constructor(context) {
    super(context)
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

  async events(id, params = {}, options = {}) {
    let url = `${this.constructor.BASE_URL}/${id}/events`
    let data = await this.query(url, params, options)

    return data
  }
}
