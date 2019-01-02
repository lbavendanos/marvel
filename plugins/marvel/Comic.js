import Base from '@/plugins/marvel/Base'

export default class Comic extends Base {
  static BASE_URL = `${process.env.MARVEL_URL}/comics`

  constructor(context) {
    super(context)
  }
}
