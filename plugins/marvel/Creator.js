import Base from '@/plugins/marvel/Base'

export default class Creator extends Base {
  static BASE_URL = `${process.env.MARVEL_URL}/creators`

  constructor(context) {
    super(context)
  }
}
