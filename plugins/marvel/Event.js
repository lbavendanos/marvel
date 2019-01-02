import Base from '@/plugins/marvel/Base'

export default class Event extends Base {
  static BASE_URL = `${process.env.MARVEL_URL}/events`

  constructor(context) {
    super(context)
  }
}
