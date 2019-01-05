<template>
  <section>
    <v-container text-xs-center>
      <v-layout row warp>
        <v-flex xs12 pa-2 class="white--text">
          <h1 class="display-1 mb-2">{{ character.name }}</h1>
          <p
            class="subheading font-weight-light"
          >{{ character.description || 'This character does not have any description' }}</p>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12 sm12 md6 pa-4>
          <v-img
            :src="`${character.thumbnail.path}.${character.thumbnail.extension}`"
            aspect-ratio="1"
          >
            <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
              <v-progress-circular indeterminate color="white lighten-5"></v-progress-circular>
            </v-layout>
          </v-img>
        </v-flex>
        <v-flex xs12 sm12 md6 pa-4>
          <v-container v-if="character.comics.available > 0" class="white--text" grid-list-lg pa-0>
            <h2 class="subheading red--text text-xs-left pb-1">
              COMICS:
              <span class="white--text">{{ character.comics.available }}</span>
            </h2>
            <h3
              class="caption font-weight-light text-xs-left pb-1"
            >The first {{ limit }} comics will be shown randomly</h3>
            <v-layout raw wrap>
              <v-flex class="card-item" v-for="comic in comics" :key="comic.id" xs12 sm6 md4 lg3>
                <nuxt-link :to="`/comics/${comic.id}`" class="card-link d-block">
                  <AppCard
                    dark
                    :id="comic.id"
                    :image="`${comic.thumbnail.path}.${comic.thumbnail.extension}`"
                    :title="comic.title"
                    :subtitle="`${comic.creators.available} creators, ${comic.characters.available} characters, ${comic.stories.available} stories and ${comic.events.available} events`"
                    textClass="hidden-md-and-up"
                  />
                </nuxt-link>
              </v-flex>
            </v-layout>
          </v-container>
          <v-container v-if="character.series.available > 0" class="white--text" grid-list-lg pa-0>
            <h2 class="subheading red--text text-xs-left pb-1">
              SERIES:
              <span class="white--text">{{ character.series.available }}</span>
            </h2>
            <h3
              class="caption font-weight-light text-xs-left pb-1"
            >The first {{ limit }} series will be shown randomly</h3>
            <v-layout raw wrap>
              <v-flex class="card-item" v-for="serie in series" :key="serie.id" xs12 sm6 md4 lg3>
                <nuxt-link :to="`/series/${serie.id}`" class="card-link d-block">
                  <AppCard
                    dark
                    :id="serie.id"
                    :image="`${serie.thumbnail.path}.${serie.thumbnail.extension}`"
                    :title="serie.title"
                    :subtitle="`${serie.creators.available} creators, ${serie.characters.available} characters, ${serie.stories.available} stories and ${serie.events.available} events`"
                    textClass="hidden-md-and-up"
                  />
                </nuxt-link>
              </v-flex>
            </v-layout>
          </v-container>
          <v-container v-if="character.events.available > 0" class="white--text" grid-list-lg pa-0>
            <h2 class="subheading red--text text-xs-left pb-1">
              EVENTS:
              <span class="white--text">{{ character.events.available }}</span>
            </h2>
            <h3
              class="caption font-weight-light text-xs-left pb-1"
            >The first {{ limit }} events will be shown randomly</h3>
            <v-layout raw wrap>
              <v-flex class="card-item" v-for="event in events" :key="event.id" xs12 sm6 md4 lg3>
                <nuxt-link :to="`/events/${event.id}`" class="card-link d-block">
                  <AppCard
                    dark
                    :id="event.id"
                    :image="`${event.thumbnail.path}.${event.thumbnail.extension}`"
                    :title="event.title"
                    :subtitle="`${event.creators.available} creators, ${event.characters.available} characters, ${event.series.available} series, ${event.comics.available} comics and ${event.stories.available} stories`"
                    textClass="hidden-md-and-up"
                  />
                </nuxt-link>
              </v-flex>
            </v-layout>
          </v-container>
          <v-container v-if="character.stories.available > 0" class="white--text" grid-list-lg pa-0>
            <h2 class="subheading red--text text-xs-left pb-1">
              STORIES:
              <span class="white--text">{{ character.stories.available }}</span>
            </h2>
            <h3
              class="caption font-weight-light text-xs-left pb-1"
            >This section does not present images to show</h3>
          </v-container>
        </v-flex>
      </v-layout>
      <v-layout class="py-2" raw wrap justify-center>
        <v-btn
          nuxt
          to="/characters"
          color="grey darken-3 white--text"
          large
        >BACK TO THE CHARACTER SECTION</v-btn>
      </v-layout>
    </v-container>
  </section>
</template>

<script>
// Import components
import AppCard from '@/components/AppCard'

export default {
  components: {
    AppCard
  },
  async asyncData({ $marvel, params, error }) {
    const id = params.id
    const limit = 4
    const options = { progress: false }
    let character = null
    let comics = null
    let series = null
    let events = null
    let stories = null

    try {
      character = await $marvel.characters.find(id, options)
      const comicsAvailable = character.comics.available
      const seriesAvailable = character.series.available
      const eventsAvailable = character.events.available
      const storiesAvailable = character.stories.available

      if (comicsAvailable > 0) {
        comics = await $marvel.characters.comics(
          id,
          {
            limit,
            offset: $marvel.random(comicsAvailable, limit)
          },
          options
        )
      }

      if (seriesAvailable > 0) {
        series = await $marvel.characters.series(
          id,
          {
            limit,
            offset: $marvel.random(seriesAvailable, limit)
          },
          options
        )
      }

      if (eventsAvailable > 0) {
        events = await $marvel.characters.events(
          id,
          {
            limit,
            offset: $marvel.random(eventsAvailable, limit)
          },
          options
        )
      }

      if (storiesAvailable > 0) {
        stories = await $marvel.characters.stories(
          id,
          {
            limit,
            offset: $marvel.random(storiesAvailable, limit)
          },
          options
        )
      }
    } catch (e) {
      error(e)
    }

    return { limit, character, comics, series, events, stories }
  },
  head() {
    const url = `${process.env.APP_URL}/characters/${this.character.id}`
    const title = this.character.name
    const description = this.character.description || title
    const image = `${this.character.thumbnail.path}.${
      this.character.thumbnail.extension
    }`

    return {
      title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: description
        },
        { hid: 'og:url', property: 'og:url', content: url },
        { hid: 'og:title', property: 'og:title', content: title },
        {
          hid: 'og:description',
          property: 'og:description',
          content: description
        },
        { hid: 'og:image', property: 'og:image', content: image },
        { hid: 'twitter:url', property: 'twitter:url', content: url },
        { hid: 'twitter:title', property: 'twitter:title', content: title },
        {
          hid: 'twitter:description',
          property: 'twitter:description',
          content: description
        },
        { hid: 'twitter:image', property: 'twitter:image', content: image }
      ]
    }
  }
}
</script>
