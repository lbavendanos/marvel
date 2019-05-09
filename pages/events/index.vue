<template>
  <section>
    <v-img :src="require('@/assets/images/banner5.jpg')">
      <v-container 
        fill-height 
        class="white--text">
        <v-layout align-center>
          <v-flex>
            <h3 class="display-3 text-xs-center">EVENTS</h3>
            <h4 class="text-xs-center subheading">Discover the events of amazing comics</h4>
          </v-flex>
        </v-layout>
      </v-container>
    </v-img>
    <v-form @submit.prevent="onSearch">
      <v-container>
        <h3
          class="subheading white--text text-xs-center font-weight-light"
        >Search your favorite event</h3>
        <v-layout 
          row 
          wrap 
          align-center 
          justify-center>
          <v-flex 
            xs12 
            sm8>
            <v-text-field
              :append-icon="loading ? 'fa fa-circle-o-notch fa-spin' : ''"
              v-model="search"
              color="red"
              solo
              clearable
              label="Search"
              type="text"
              @click:clear="clearSearch"
            />
          </v-flex>
        </v-layout>
      </v-container>
    </v-form>
    <v-container 
      grid-list-lg 
      pt-2 
      pb-5>
      <h1 class="title white--text mb-3 font-weight-black">SOME EVENTS</h1>
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
            :to="`events/${event.id}`" 
            class="card-link d-block">
            <AppCard
              :id="event.id"
              :title="event.title || 'none'"
              :subtitle="`${event.creators.available} creators, ${event.characters.available} characters, ${event.stories.available} stories, ${event.comics.available} comics and ${event.series.available} series`"
              :image="`${event.thumbnail.path}.${event.thumbnail.extension}`"
              dark
            />
          </nuxt-link>
        </v-flex>
      </v-layout>
      <h5
        v-if="events.length == 0"
        class="subheading white--text text-xs-center"
      >No results were found for your search</h5>
    </v-container>
  </section>
</template>

<script>
// Import components
import AppCard from '@/components/AppCard'

const limit = 24
const available = 75

export default {
  components: {
    AppCard
  },
  async asyncData({ $marvel, error }) {
    let loading = false
    let events = null
    let search = null

    try {
      events = await $marvel.events.get({
        limit,
        offset: $marvel.random(available, limit)
      })
    } catch (error) {
      error(e)
    }

    return {
      events,
      search,
      loading
    }
  },
  head() {
    const url = `${process.env.APP_URL}/events`
    const title = `${process.env.APP_NAME} - Events`
    const description = `${process.env.APP_NAME} - Events`
    const image = `${process.env.APP_URL}${require('@/assets/images/logo.png')}`

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
  },
  methods: {
    async onSearch() {
      this.events = await this.getEvents(this.search)
    },
    async clearSearch() {
      this.events = await this.getEvents(null)
    },
    async getEvents(search = null) {
      this.startLoading()

      let data = null
      let params = {}

      if (search) {
        params.nameStartsWith = search
      } else {
        params.limit = limit
        params.offset = this.$marvel.random(available, limit)
      }

      try {
        data = await this.$marvel.events.get(params)
      } catch (error) {
        $nuxt.error(error)
      }

      this.endLoading()

      return data
    },
    startLoading() {
      this.loading = true
    },
    endLoading() {
      this.loading = false
    }
  }
}
</script>
