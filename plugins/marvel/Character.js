import Base from '@/plugins/marvel/Base'

export default class Character extends Base {
  static BASE_URL = `${process.env.MARVEL_URL}/characters`

  constructor(context) {
    super(context)
  }

  async comics(id, options = {}) {
    let url = `${this.constructor.BASE_URL}/${id}/comics`
    let data = await this.query(url, options)

    return data
  }
}
