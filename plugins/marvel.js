import Random from 'random-js'
import Character from '@/plugins/marvel/Character'
import Comic from '@/plugins/marvel/Comic'
import Creator from '@/plugins/marvel/Creator'
import Event from '@/plugins/marvel/Event'
import Serie from '@/plugins/marvel/Serie'
import Story from '@/plugins/marvel/Story'

export default (context, inject) => {
  const random = (max, min) => {
    let autoSeed = new Random(Random.engines.mt19937().autoSeed())
    let seed = null
    let r = null

    if (max > min) {
      while (r == null) {
        seed = autoSeed.integer(1, max) - min
        if (seed > 0) {
          r = seed
        }
      }
    }

    return r
  }

  const marvel = {
    random,
    characters: new Character(context),
    comics: new Comic(context),
    creators: new Creator(context),
    events: new Event(context),
    series: new Serie(context),
    stories: new Story(context)
  }

  // Set the function directly on the context and context.app object
  context.$marvel = marvel
  inject('marvel', marvel)
}
