import Base from '@/plugins/marvel/Base'

export default class Serie extends Base {
  static BASE_URL = `${process.env.MARVEL_URL}/series`

  constructor(context) {
    super(context)
  }
}
