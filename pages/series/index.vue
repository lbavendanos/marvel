<template>
  <section>
    <v-img :src="require('@/assets/images/banner6.jpg')">
      <v-container 
        fill-height 
        class="white--text">
        <v-layout align-center>
          <v-flex>
            <h3 class="display-3 text-xs-center">SERIES</h3>
            <h4 class="text-xs-center subheading">Discover the series of amazing comics</h4>
          </v-flex>
        </v-layout>
      </v-container>
    </v-img>
    <v-form @submit.prevent="onSearch">
      <v-container>
        <h3
          class="subheading white--text text-xs-center font-weight-light"
        >Search your favorite serie</h3>
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
      <h1 class="title white--text mb-3 font-weight-black">SOME SERIES</h1>
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
            :to="`series/${serie.id}`" 
            class="card-link d-block">
            <AppCard
              :id="serie.id"
              :title="serie.title || 'none'"
              :subtitle="`${serie.creators.available} creators, ${serie.characters.available} characters, ${serie.stories.available} stories, ${serie.comics.available} comics and ${serie.events.available} events`"
              :image="`${serie.thumbnail.path}.${serie.thumbnail.extension}`"
              dark
            />
          </nuxt-link>
        </v-flex>
      </v-layout>
      <h5
        v-if="series.length == 0"
        class="subheading white--text text-xs-center"
      >No results were found for your search</h5>
    </v-container>
  </section>
</template>

<script>
// Import components
import AppCard from '@/components/AppCard'

const limit = 24
const available = 10679

export default {
  components: {
    AppCard
  },
  async asyncData({ $marvel, error }) {
    let loading = false
    let series = null
    let search = null

    try {
      series = await $marvel.series.get({
        limit,
        offset: $marvel.random(available, limit)
      })
    } catch (error) {
      error(e)
    }

    return {
      series,
      search,
      loading
    }
  },
  head() {
    const url = `${process.env.APP_URL}/series`
    const title = `${process.env.APP_NAME} - Series`
    const description = `${process.env.APP_NAME} - Series`
    const image = require('@/assets/images/logo.svg')

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
      this.series = await this.getEvents(this.search)
    },
    async clearSearch() {
      this.series = await this.getEvents(null)
    },
    async getEvents(search = null) {
      this.startLoading()

      let data = null
      let params = {}

      if (search) {
        params.titleStartsWith = search
      } else {
        params.limit = limit
        params.offset = this.$marvel.random(available, limit)
      }

      try {
        data = await this.$marvel.series.get(params)
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
