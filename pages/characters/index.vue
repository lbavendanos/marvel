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
    <v-container grid-list-lg py-5>
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
          <a href class="card-link d-block">
            <AppCard
              dark
              :id="character.id"
              :title="character.name"
              :subtitle="`${character.series.available} series,  ${character.stories.available} stories and ${character.events.available} events`"
              :image="`${character.thumbnail.path}.${character.thumbnail.extension}`"
            />
          </a>
        </v-flex>
      </v-layout>
    </v-container>
    <v-form>
      <v-container>
        <h3
          class="subheading white--text text-xs-center font-weight-light"
        >Search your favorite character</h3>
        <v-layout row wrap align-center justify-center>
          <v-flex xs12 sm8>
            <v-text-field color="red" solo clearable label="Search"></v-text-field>
          </v-flex>
        </v-layout>
      </v-container>
    </v-form>
  </section>
</template>

<script>
import URI from 'urijs'
import Random from 'random-js'
import md5 from 'crypto-js/md5'

import AppCard from '@/components/AppCard'

const generateURL = (url, limit = 0, offset = 0) => {
  let random = new Random(Random.engines.mt19937().autoSeed())
  let ts = Date.now()
  let hash = md5(
    `${ts}${process.env.KEY_SECRET}${process.env.KEY_PUBLIC}`
  ).toString()

  let uri = new URI(url)
  uri.addSearch({
    limit: limit,
    offset: offset != 0 ? random.integer(1, offset) : offset,
    ts,
    apikey: process.env.KEY_PUBLIC,
    hash
  })

  return uri
}

export default {
  components: {
    AppCard
  },
  async asyncData({ app }) {
    try {
      let charactersUrl = generateURL(
        'https://gateway.marvel.com:443/v1/public/characters',
        4,
        1491
      )

      let characters = await app.$axios.$get(charactersUrl.toString())

      return {
        characters: characters.data.results
      }
    } catch (error) {
      console.log(error)
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  &-item {
    transition: transform 0.5s;
    &:hover {
      transform: scale(1.1);
      z-index: 1;
    }
  }

  &-link {
    text-decoration: none;
  }
}
</style>
