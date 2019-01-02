<template>
  <section>
    <v-img src="https://terrigen-cdn-dev.marvel.com/content/prod/2x/characters_art_mas_dsk_01.jpg">
      <v-container fill-height class="white--text">
        <v-layout align-center>
          <v-flex>
            <h3 class="display-3 text-xs-center">CHARACTERS</h3>
            <h4
              class="text-xs-center subheading"
            >Dive into the dazzling domain of all the classic characters you love - and those you’ll soon discover!</h4>
          </v-flex>
        </v-layout>
      </v-container>
    </v-img>
    <v-form @submit.prevent="onSearch">
      <v-container>
        <h3
          class="subheading white--text text-xs-center font-weight-light"
        >Search your favorite character</h3>
        <v-layout row wrap align-center justify-center>
          <v-flex xs12 sm8>
            <v-text-field
              color="red"
              solo
              clearable
              label="Search"
              type="text"
              :append-icon="loading ? 'fa fa-circle-o-notch fa-spin' : ''"
              v-model="search"
              @click:clear="clearSearch"
            ></v-text-field>
          </v-flex>
        </v-layout>
      </v-container>
    </v-form>
    <v-container grid-list-lg pt-2 pb-5>
      <h1 class="title white--text mb-3 font-weight-black">SOME CHARACTERS</h1>
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
          <nuxt-link :to="`characters/${character.id}`" class="card-link d-block">
            <AppCard
              dark
              :id="character.id"
              :title="character.name"
              :subtitle="`${character.series.available} series,  ${character.stories.available} stories and ${character.events.available} events`"
              :image="`${character.thumbnail.path}.${character.thumbnail.extension}`"
            />
          </nuxt-link>
        </v-flex>
      </v-layout>
      <h5
        v-if="characters.length == 0"
        class="subheading white--text text-xs-center"
      >No results were found for your search</h5>
    </v-container>
  </section>
</template>

<script>
// Import components
import AppCard from '@/components/AppCard'
// Import other libraries
import Random from 'random-js'

export default {
  components: {
    AppCard
  },
  async asyncData({ $marvel }) {
    let loading = false
    let characters = null
    let search = null
    let random = new Random(Random.engines.mt19937().autoSeed())
    let options = {
      limit: 24,
      offset: random.integer(1, 1491)
    }

    try {
      characters = await $marvel.characters.get(options)
    } catch (error) {
      console.log(error)
    }

    return {
      characters,
      search,
      loading
    }
  },
  methods: {
    async onSearch() {
      this.characters = await this.getCharacters(this.search)
    },
    async clearSearch() {
      this.characters = await this.getCharacters(null)
    },
    async getCharacters(search = null) {
      this.startLoading()

      let data = null
      let random = new Random(Random.engines.mt19937().autoSeed())
      let options = {}

      if (search) {
        options.nameStartsWith = search
      } else {
        options.limit = 24
        options.offset = random.integer(1, 1491)
      }

      try {
        data = await this.$marvel.characters.get(options)
      } catch (error) {
        console.log(error)
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

<style lang="scss" scoped>
</style>
