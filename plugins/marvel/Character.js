import Base from '@/plugins/marvel/Base'

export default class Character extends Base {
  static BASE_URL = `${process.env.MARVEL_URL}/characters`

  constructor(context) {
    super(context)
  }
}
