<template>
  <section>
    <v-img :src="require('@/assets/images/banner3.jpg')">
      <v-container 
        fill-height 
        class="white--text">
        <v-layout align-center>
          <v-flex>
            <h3 class="display-3 text-xs-center">CREATORS</h3>
            <h4 class="text-xs-center subheading">Discover the creators of amazing comics</h4>
          </v-flex>
        </v-layout>
      </v-container>
    </v-img>
    <v-form @submit.prevent="onSearch">
      <v-container>
        <h3
          class="subheading white--text text-xs-center font-weight-light"
        >Search your favorite creator</h3>
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
      <h1 class="title white--text mb-3 font-weight-black">SOME CREATORS</h1>
      <v-layout 
        raw 
        wrap>
        <v-flex 
          v-for="creator in creators" 
          :key="creator.id" 
          class="card-item" 
          xs12 
          sm6 
          md4 
          lg3>
          <nuxt-link 
            :to="`creators/${creator.id}`" 
            class="card-link d-block">
            <AppCard
              :id="creator.id"
              :title="creator.fullName || 'none'"
              :subtitle="`${creator.comics.available} comics, ${creator.series.available} series, ${creator.stories.available} stories and ${creator.events.available} events`"
              :image="`${creator.thumbnail.path}.${creator.thumbnail.extension}`"
              dark
            />
          </nuxt-link>
        </v-flex>
      </v-layout>
      <h5
        v-if="creators.length == 0"
        class="subheading white--text text-xs-center"
      >No results were found for your search</h5>
    </v-container>
  </section>
</template>

<script>
// Import components
import AppCard from '@/components/AppCard'

const limit = 24
const available = 6198

export default {
  components: {
    AppCard
  },
  async asyncData({ $marvel, error }) {
    let loading = false
    let creators = null
    let search = null

    try {
      creators = await $marvel.creators.get({
        limit,
        offset: $marvel.random(available, limit)
      })
    } catch (error) {
      error(e)
    }

    return {
      creators,
      search,
      loading
    }
  },
  head() {
    const url = `${process.env.APP_URL}/creators`
    const title = `${process.env.APP_NAME} - Creators`
    const description = `${process.env.APP_NAME} - Creators`
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
      this.creators = await this.getCreators(this.search)
    },
    async clearSearch() {
      this.creators = await this.getCreators(null)
    },
    async getCreators(search = null) {
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
        data = await this.$marvel.creators.get(params)
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
