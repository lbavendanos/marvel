import Base from '@/plugins/marvel/Base'

export default class Story extends Base {
  static BASE_URL = `${process.env.MARVEL_URL}/stories`

  constructor(context) {
    super(context)
  }
}
