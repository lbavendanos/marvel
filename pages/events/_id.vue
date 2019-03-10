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
          <h1 class="display-1 mb-2">{{ event.title }}</h1>
          <p
            class="subheading font-weight-light"
          >{{ event.description || 'This event does not have any description' }}</p>
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
            :src="`${event.thumbnail.path}.${event.thumbnail.extension}`" 
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
            v-if="event.comics.available > 0" 
            class="white--text" 
            grid-list-lg 
            pa-0>
            <h2 class="subheading red--text text-xs-left pb-1">
              COMICS:
              <span class="white--text">{{ event.comics.available }}</span>
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
            v-if="event.characters.available > 0" 
            class="white--text" 
            grid-list-lg 
            pa-0>
            <h2 class="subheading red--text text-xs-left pb-1">
              CHARACTERS:
              <span class="white--text">{{ event.characters.available }}</span>
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
            v-if="event.creators.available > 0" 
            class="white--text" 
            grid-list-lg 
            pa-0>
            <h2 class="subheading red--text text-xs-left pb-1">
              CREATORS:
              <span class="white--text">{{ event.creators.available }}</span>
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
            v-if="event.series.available > 0" 
            class="white--text" 
            grid-list-lg 
            pa-0>
            <h2 class="subheading red--text text-xs-left pb-1">
              SERIES:
              <span class="white--text">{{ event.series.available }}</span>
            </h2>
            <h3
              class="caption font-weight-light text-xs-left pb-1"
            >The first {{ limit }} series will be shown randomly</h3>
            <v-layout 
              raw 
              wrap>
              <v-flex 
                v-for="serie in series" 
                :key="serie.id" 
                class="card-item" 
                xs12 
                sm6 
                md4 
                lg3>
                <nuxt-link 
                  :to="`/series/${serie.id}`" 
                  class="card-link d-block">
                  <AppCard
                    :id="serie.id"
                    :image="`${serie.thumbnail.path}.${serie.thumbnail.extension}`"
                    :title="serie.title"
                    :subtitle="`${serie.events.available} events, ${serie.characters.available} characters, ${serie.stories.available} stories and ${serie.events.available} events`"
                    dark
                    text-class="hidden-md-and-up"
                  />
                </nuxt-link>
              </v-flex>
            </v-layout>
          </v-container>
          <v-container 
            v-if="event.stories.available > 0" 
            class="white--text" 
            grid-list-lg 
            pa-0>
            <h2 class="subheading red--text text-xs-left pb-1">
              STORIES:
              <span class="white--text">{{ event.stories.available }}</span>
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
          to="/events" 
          color="grey darken-3 white--text" 
          large>BACK TO THE events SECTION</v-btn>
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

    let event = null
    let creators = null
    let characters = null
    let stories = null
    let comics = null
    let series = null

    try {
      event = await $marvel.events.find(id, options)
      const creatorsAvailable = event.creators.available
      const charactersAvailable = event.characters.available
      const storiesAvailable = event.stories.available
      const comicsAvailable = event.comics.available
      const seriesAvailable = event.series.available

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

      if (seriesAvailable > 0) {
        series = await $marvel.events.series(
          id,
          {
            limit,
            offset: $marvel.random(seriesAvailable, limit)
          },
          options
        )
      }
    } catch (e) {
      error(e)
    }

    return { limit, event, creators, characters, stories, comics, series }
  },
  head() {
    const url = `${process.env.APP_URL}/events/${this.event.id}`
    const title = this.event.title
    const description = this.event.description || title
    const image = `${this.event.thumbnail.path}.${
      this.event.thumbnail.extension
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
