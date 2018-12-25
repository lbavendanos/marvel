export default (context, inject) => {
  const CHARACTERS = 'characters'
  const COMICS = 'comics'
  const CREATORS = 'creators'
  const EVENTS = 'events'
  const SERIES = 'series'
  const STORIES = 'stories'

  const get = async (type, options = {}) => {
    try {
      let url = context.$url.generate(
        `https://gateway.marvel.com:443/v1/public/${type}`,
        options
      )

      let { data } = await context.$axios.$get(url.toString())
      return data.results
    } catch (error) {
      let response = error.response
      throw {
        status: response.status,
        code: response.data.code,
        message: response.data.message
      }
    }
  }

  const marvel = {
    CHARACTERS,
    COMICS,
    CREATORS,
    EVENTS,
    SERIES,
    STORIES,
    [CHARACTERS]: async (options = {}) => {
      return await get(CHARACTERS, options)
    },
    [COMICS]: async (options = {}) => {
      return await get(COMICS, options)
    },
    [CREATORS]: async (options = {}) => {
      return await get(CREATORS, options)
    },
    [EVENTS]: async (options = {}) => {
      return await get(EVENTS, options)
    },
    [SERIES]: async (options = {}) => {
      return await get(SERIES, options)
    },
    [STORIES]: async (options = {}) => {
      return await get(STORIES, options)
    }
  }

  // Set the function directly on the context and context.app object
  context.$marvel = marvel
  inject('marvel', marvel)
}
