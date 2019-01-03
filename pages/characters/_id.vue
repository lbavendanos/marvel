<template>
  <section>
    <v-container text-xs-center>
      <v-layout row wrap>
        <v-flex xs12 md6></v-flex>
        <v-flex xs12 md6></v-flex>
      </v-layout>
    </v-container>
  </section>
</template>

<script>
// Import other libraries
import Random from 'random-js'

export default {
  async asyncData({ $marvel, params, error }) {
    // console.log($marvel.characters)
    // console.log($axios)
    let id = params.id
    let character = null

    try {
      character = await $marvel.characters.find(id)
    } catch (e) {
      error(e)
    }
    console.log(character)

    // let random = new Random(Random.engines.mt19937().autoSeed())
  }
}
</script>
