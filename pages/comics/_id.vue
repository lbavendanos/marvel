<template>
  <section>
    <v-container text-xs-center>
      <v-layout row warp>
        <v-flex xs12 pa-2 class="white--text">
          <h1 class="display-1 mb-2">{{ comic.title }}</h1>
          <p
            class="subheading font-weight-light"
          >{{ comic.description || 'This comic does not have any description' }}</p>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12 sm12 md6 pa-4>
          <v-img :src="`${comic.thumbnail.path}.${comic.thumbnail.extension}`" aspect-ratio="1">
            <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
              <v-progress-circular indeterminate color="white lighten-5"></v-progress-circular>
            </v-layout>
          </v-img>
        </v-flex>
        <v-flex xs12 sm12 md6 pa-4>
          <v-container v-if="comic.characters.available > 0" class="white--text" grid-list-lg pa-0>
            <h2 class="subheading red--text text-xs-left pb-1">
              CHARACTERS:
              <span class="white--text">{{ comic.characters.available }}</span>
            </h2>
            <h3
              class="caption font-weight-light text-xs-left pb-1"
            >The first {{ limit }} characters will be shown randomly</h3>
            <v-layout raw wrap>
              <v-flex
                class="card-item"
                v-for="character in characters"
                :key="character.id"
                xs12
                sm6
                md4
                lg3
              >
                <nuxt-link :to="`/characters/${character.id}`" class="card-link d-block">
                  <AppCard
                    dark
                    :id="character.id"
                    :image="`${character.thumbnail.path}.${character.thumbnail.extension}`"
                    :title="character.title"
                    :subtitle="`${character.comics.available} comics, ${character.series.available} series, ${character.stories.available} stories and ${character.events.available} events`"
                    textClass="hidden-md-and-up"
                  />
                </nuxt-link>
              </v-flex>
            </v-layout>
          </v-container>
          <v-container v-if="comic.creators.available > 0" class="white--text" grid-list-lg pa-0>
            <h2 class="subheading red--text text-xs-left pb-1">
              CREATORS:
              <span class="white--text">{{ comic.creators.available }}</span>
            </h2>
            <h3
              class="caption font-weight-light text-xs-left pb-1"
            >The first {{ limit }} creators will be shown randomly</h3>
            <v-layout raw wrap>
              <v-flex
                class="card-item"
                v-for="creators in creators"
                :key="creators.id"
                xs12
                sm6
                md4
                lg3
              >
                <nuxt-link :to="`/creators/${creators.id}`" class="card-link d-block">
                  <AppCard
                    dark
                    :id="creators.id"
                    :image="`${creators.thumbnail.path}.${creators.thumbnail.extension}`"
                    :title="creators.title"
                    :subtitle="`${creators.comics.available} comics, ${creators.stories.available} stories and ${creators.events.available} events`"
                    textClass="hidden-md-and-up"
                  />
                </nuxt-link>
              </v-flex>
            </v-layout>
          </v-container>
          <v-container v-if="comic.events.available > 0" class="white--text" grid-list-lg pa-0>
            <h2 class="subheading red--text text-xs-left pb-1">
              EVENTS:
              <span class="white--text">{{ comic.events.available }}</span>
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
                    :subtitle="`${event.creators.available} creators, ${event.comics.available} comics, ${event.series.available} series, ${event.comics.available} comics and ${event.stories.available} stories`"
                    textClass="hidden-md-and-up"
                  />
                </nuxt-link>
              </v-flex>
            </v-layout>
          </v-container>
          <v-container v-if="comic.stories.available > 0" class="white--text" grid-list-lg pa-0>
            <h2 class="subheading red--text text-xs-left pb-1">
              STORIES:
              <span class="white--text">{{ comic.stories.available }}</span>
            </h2>
            <h3
              class="caption font-weight-light text-xs-left pb-1"
            >This section does not present images to show</h3>
          </v-container>
        </v-flex>
      </v-layout>
      <v-layout class="py-2" raw wrap justify-center>
        <v-btn nuxt to="/comics" color="grey darken-3 white--text" large>BACK TO THE COMICS SECTION</v-btn>
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
    let comic = null
    let characters = null
    let creators = null
    let events = null
    let stories = null

    try {
      comic = await $marvel.comics.find(id, options)
      const charactersAvailable = comic.characters.available
      const creatorsAvailable = comic.creators.available
      const eventsAvailable = comic.events.available
      const storiesAvailable = comic.stories.available

      if (charactersAvailable > 0) {
        characters = await $marvel.comics.characters(
          id,
          {
            limit,
            offset: $marvel.random(charactersAvailable, limit)
          },
          options
        )
      }

      if (creatorsAvailable > 0) {
        creators = await $marvel.comics.creators(
          id,
          {
            limit,
            offset: $marvel.random(creatorsAvailable, limit)
          },
          options
        )
      }

      if (eventsAvailable > 0) {
        events = await $marvel.comics.events(
          id,
          {
            limit,
            offset: $marvel.random(eventsAvailable, limit)
          },
          options
        )
      }

      if (storiesAvailable > 0) {
        stories = await $marvel.comics.stories(
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

    return { limit, comic, characters, creators, events, stories }
  },
  head() {
    const url = `${process.env.APP_URL}/comics/${this.comic.id}`
    const title = this.comic.title
    const description = this.comic.description || title
    const image = `${this.comic.thumbnail.path}.${
      this.comic.thumbnail.extension
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
