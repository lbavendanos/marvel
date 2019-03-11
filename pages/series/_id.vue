<template>
  <section>
    <v-container text-xs-center>
      <v-layout 
        row 
        warp>
        <v-flex 
          xs12 
          pa-2 
          class="white--text">
          <h1 class="display-1 mb-2">{{ serie.title }}</h1>
          <p
            class="subheading font-weight-light"
          >{{ serie.description || 'This serie does not have any description' }}</p>
        </v-flex>
      </v-layout>
      <v-layout 
        row 
        wrap>
        <v-flex 
          xs12 
          sm12 
          md6 
          pa-4>
          <v-img 
            :src="`${serie.thumbnail.path}.${serie.thumbnail.extension}`" 
            aspect-ratio="1">
            <v-layout 
              slot="placeholder" 
              fill-height 
              align-center 
              justify-center 
              ma-0>
              <v-progress-circular 
                indeterminate 
                color="white lighten-5"/>
            </v-layout>
          </v-img>
        </v-flex>
        <v-flex 
          xs12 
          sm12 
          md6 
          pa-4>
          <v-container 
            v-if="serie.comics.available > 0" 
            class="white--text" 
            grid-list-lg 
            pa-0>
            <h2 class="subheading red--text text-xs-left pb-1">
              COMICS:
              <span class="white--text">{{ serie.comics.available }}</span>
            </h2>
            <h3
              class="caption font-weight-light text-xs-left pb-1"
            >The first {{ limit }} comics will be shown randomly</h3>
            <v-layout 
              raw 
              wrap>
              <v-flex 
                v-for="comic in comics" 
                :key="comic.id" 
                class="card-item" 
                xs12 
                sm6 
                md4 
                lg3>
                <nuxt-link 
                  :to="`/comics/${comic.id}`" 
                  class="card-link d-block">
                  <AppCard
                    :id="comic.id"
                    :image="`${comic.thumbnail.path}.${comic.thumbnail.extension}`"
                    :title="comic.title"
                    :subtitle="`${comic.creators.available} creators, ${comic.characters.available} characters, ${comic.stories.available} stories and ${comic.events.available} events`"
                    dark
                    text-class="hidden-md-and-up"
                  />
                </nuxt-link>
              </v-flex>
            </v-layout>
          </v-container>
          <v-container 
            v-if="serie.characters.available > 0" 
            class="white--text" 
            grid-list-lg 
            pa-0>
            <h2 class="subheading red--text text-xs-left pb-1">
              CHARACTERS:
              <span class="white--text">{{ serie.characters.available }}</span>
            </h2>
            <h3
              class="caption font-weight-light text-xs-left pb-1"
            >The first {{ limit }} characters will be shown randomly</h3>
            <v-layout 
              raw 
              wrap>
              <v-flex
                v-for="character in characters"
                :key="character.id"
                class="card-item"
                xs12
                sm6
                md4
                lg3
              >
                <nuxt-link 
                  :to="`/characters/${character.id}`" 
                  class="card-link d-block">
                  <AppCard
                    :id="character.id"
                    :image="`${character.thumbnail.path}.${character.thumbnail.extension}`"
                    :title="character.title"
                    :subtitle="`${character.comics.available} comics, ${character.series.available} series, ${character.stories.available} stories and ${character.events.available} events`"
                    dark
                    text-class="hidden-md-and-up"
                  />
                </nuxt-link>
              </v-flex>
            </v-layout>
          </v-container>
          <v-container 
            v-if="serie.creators.available > 0" 
            class="white--text" 
            grid-list-lg 
            pa-0>
            <h2 class="subheading red--text text-xs-left pb-1">
              CREATORS:
              <span class="white--text">{{ serie.creators.available }}</span>
            </h2>
            <h3
              class="caption font-weight-light text-xs-left pb-1"
            >The first {{ limit }} creators will be shown randomly</h3>
            <v-layout 
              raw 
              wrap>
              <v-flex
                v-for="creators in creators"
                :key="creators.id"
                class="card-item"
                xs12
                sm6
                md4
                lg3
              >
                <nuxt-link 
                  :to="`/creators/${creators.id}`" 
                  class="card-link d-block">
                  <AppCard
                    :id="creators.id"
                    :image="`${creators.thumbnail.path}.${creators.thumbnail.extension}`"
                    :title="creators.title"
                    :subtitle="`${creators.comics.available} comics, ${creators.stories.available} stories and ${creators.events.available} events`"
                    dark
                    text-class="hidden-md-and-up"
                  />
                </nuxt-link>
              </v-flex>
            </v-layout>
          </v-container>
          <v-container 
            v-if="serie.events.available > 0" 
            class="white--text" 
            grid-list-lg 
            pa-0>
            <h2 class="subheading red--text text-xs-left pb-1">
              EVENTS:
              <span class="white--text">{{ serie.events.available }}</span>
            </h2>
            <h3
              class="caption font-weight-light text-xs-left pb-1"
            >The first {{ limit }} events will be shown randomly</h3>
            <v-layout 
              raw 
              wrap>
              <v-flex 
                v-for="event in events" 
                :key="event.id" 
                class="card-item" 
                xs12 
                sm6 
                md4 
                lg3>
                <nuxt-link 
                  :to="`/events/${event.id}`" 
                  class="card-link d-block">
                  <AppCard
                    :id="event.id"
                    :image="`${event.thumbnail.path}.${event.thumbnail.extension}`"
                    :title="event.title"
                    :subtitle="`${event.creators.available} creators, ${event.comics.available} comics, ${event.series.available} series, ${event.comics.available} comics and ${event.stories.available} stories`"
                    dark
                    text-class="hidden-md-and-up"
                  />
                </nuxt-link>
              </v-flex>
            </v-layout>
          </v-container>
          <v-container 
            v-if="serie.stories.available > 0" 
            class="white--text" 
            grid-list-lg 
            pa-0>
            <h2 class="subheading red--text text-xs-left pb-1">
              STORIES:
              <span class="white--text">{{ serie.stories.available }}</span>
            </h2>
            <h3
              class="caption font-weight-light text-xs-left pb-1"
            >This section does not present images to show</h3>
          </v-container>
        </v-flex>
      </v-layout>
      <v-layout 
        class="py-2" 
        raw 
        wrap 
        justify-center>
        <v-btn 
          nuxt 
          to="/series" 
          color="grey darken-3 white--text" 
          large>BACK TO THE SERIES SECTION</v-btn>
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

    let serie = null
    let creators = null
    let characters = null
    let stories = null
    let comics = null
    let events = null

    try {
      serie = await $marvel.series.find(id, options)
      const creatorsAvailable = serie.creators.available
      const charactersAvailable = serie.characters.available
      const storiesAvailable = serie.stories.available
      const comicsAvailable = serie.comics.available
      const eventsAvailable = serie.events.available

      if (creatorsAvailable > 0) {
        creators = await $marvel.events.creators(
          id,
          {
            limit,
            offset: $marvel.random(creatorsAvailable, limit)
          },
          options
        )
      }

      if (charactersAvailable > 0) {
        characters = await $marvel.events.characters(
          id,
          {
            limit,
            offset: $marvel.random(charactersAvailable, limit)
          },
          options
        )
      }

      if (storiesAvailable > 0) {
        stories = await $marvel.events.stories(
          id,
          {
            limit,
            offset: $marvel.random(storiesAvailable, limit)
          },
          options
        )
      }

      if (comicsAvailable > 0) {
        comics = await $marvel.events.comics(
          id,
          {
            limit,
            offset: $marvel.random(comicsAvailable, limit)
          },
          options
        )
      }

      if (eventsAvailable > 0) {
        events = await $marvel.events.events(
          id,
          {
            limit,
            offset: $marvel.random(eventsAvailable, limit)
          },
          options
        )
      }
    } catch (e) {
      error(e)
    }

    return { limit, serie, creators, characters, stories, comics, events }
  },
  head() {
    const url = `${process.env.APP_URL}/events/${this.serie.id}`
    const title = this.serie.title
    const description = this.serie.description || title
    const image = `${this.serie.thumbnail.path}.${
      this.serie.thumbnail.extension
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
