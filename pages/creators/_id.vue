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
          <h1 class="display-1 mb-2">{{ creator.fullName }}</h1>
          <p
            class="subheading font-weight-light"
          >{{ creator.description || 'This creator does not have any description' }}</p>
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
            :src="`${creator.thumbnail.path}.${creator.thumbnail.extension}`" 
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
            v-if="creator.comics.available > 0" 
            class="white--text" 
            grid-list-lg 
            pa-0>
            <h2 class="subheading red--text text-xs-left pb-1">
              COMICS:
              <span class="white--text">{{ creator.comics.available }}</span>
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
            v-if="creator.series.available > 0" 
            class="white--text" 
            grid-list-lg 
            pa-0>
            <h2 class="subheading red--text text-xs-left pb-1">
              SERIES:
              <span class="white--text">{{ creator.series.available }}</span>
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
                    :subtitle="`${serie.creators.available} creators, ${serie.characters.available} characters, ${serie.stories.available} stories and ${serie.events.available} events`"
                    dark
                    text-class="hidden-md-and-up"
                  />
                </nuxt-link>
              </v-flex>
            </v-layout>
          </v-container>
          <v-container 
            v-if="creator.events.available > 0" 
            class="white--text" 
            grid-list-lg 
            pa-0>
            <h2 class="subheading red--text text-xs-left pb-1">
              EVENTS:
              <span class="white--text">{{ creator.events.available }}</span>
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
                    :subtitle="`${event.creators.available} creators, ${event.creators.available} creators, ${event.series.available} series, ${event.creators.available} creators and ${event.stories.available} stories`"
                    dark
                    text-class="hidden-md-and-up"
                  />
                </nuxt-link>
              </v-flex>
            </v-layout>
          </v-container>
          <v-container 
            v-if="creator.stories.available > 0" 
            class="white--text" 
            grid-list-lg 
            pa-0>
            <h2 class="subheading red--text text-xs-left pb-1">
              STORIES:
              <span class="white--text">{{ creator.stories.available }}</span>
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
          to="/creators"
          color="grey darken-3 white--text"
          large
        >BACK TO THE CREATORS SECTION</v-btn>
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
    let creator = null
    let comics = null
    let series = null
    let events = null
    let stories = null

    try {
      creator = await $marvel.creators.find(id, options)
      const comicsAvailable = creator.comics.available
      const seriesAvailable = creator.series.available
      const eventsAvailable = creator.events.available
      const storiesAvailable = creator.stories.available

      if (comicsAvailable > 0) {
        comics = await $marvel.creators.comics(
          id,
          {
            limit,
            offset: $marvel.random(comicsAvailable, limit)
          },
          options
        )
      }

      if (seriesAvailable > 0) {
        series = await $marvel.creators.series(
          id,
          {
            limit,
            offset: $marvel.random(seriesAvailable, limit)
          },
          options
        )
      }

      if (eventsAvailable > 0) {
        events = await $marvel.creators.events(
          id,
          {
            limit,
            offset: $marvel.random(eventsAvailable, limit)
          },
          options
        )
      }

      if (storiesAvailable > 0) {
        stories = await $marvel.creators.stories(
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

    return { limit, creator, comics, series, events, stories }
  },
  head() {
    const url = `${process.env.APP_URL}/creators/${this.creator.id}`
    const title = this.creator.fullName
    const description = this.creator.description || title
    const image = `${this.creator.thumbnail.path}.${
      this.creator.thumbnail.extension
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
