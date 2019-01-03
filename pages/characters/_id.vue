<template>
  <section>
    <v-container text-xs-center>
      <v-layout row wrap>
        <v-flex xs12 sm6 pa-4>
          <v-img
            :src="`${character.thumbnail.path}.${character.thumbnail.extension}`"
            aspect-ratio="1"
          >
            <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
              <v-progress-circular indeterminate color="white lighten-5"></v-progress-circular>
            </v-layout>
          </v-img>
        </v-flex>
        <v-flex xs12 sm6 pa-4 class="white--text">
          <h1 class="display-1 mb-3">{{ character.name }}</h1>
          <p class="subheading font-weight-light">{{ character.description }}</p>
          <!-- <v-container> -->
          <!-- <v-layout row wrap> -->
          <!-- <v-flex xs12 class="text-xs-left"> -->
          <h2 class="subheading red--text text-xs-left pb-2">
            COMICS:
            <span class="white--text">{{ character.comics.available }}</span>
          </h2>
          <v-layout raw wrap>
            <v-flex class="card-item" v-for="comic in comics" :key="comic.id" xs12 sm6 md4 lg3>
              <nuxt-link :to="`/comics/${comic.id}`" class="card-link d-block">
                <AppCard
                  dark
                  :id="comic.id"
                  :image="`${comic.thumbnail.path}.${comic.thumbnail.extension}`"
                />
              </nuxt-link>
            </v-flex>
          </v-layout>

          <!-- </v-flex> -->
          <!-- </v-layout> -->
          <!-- </v-container> -->
        </v-flex>
      </v-layout>
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
  async asyncData({ $marvel, params, error }) {
    let id = params.id
    let random = new Random(Random.engines.mt19937().autoSeed())
    let character = null
    let comics = null

    try {
      character = await $marvel.characters.find(id)
      comics = await $marvel.characters.comics(id, {
        limit: 8,
        offset: random.integer(1, character.comics.available)
      })
    } catch (e) {
      error(e)
    }
    // console.log(character)
    return { character, comics }
  }
}
</script>
