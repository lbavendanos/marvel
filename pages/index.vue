<template>
  <section>
    <v-img :src="require('@/assets/images/banner1.jpg')">
      <v-container 
        fill-height 
        class="white--text">
        <v-layout align-center>
          <v-flex class="text-xs-center">
            <h3 class="display-3">Welcome to the Marvel site</h3>
            <span
              class="subheading"
            >Browse Marvel characters, comics, creators, events and television series and more.</span>
            <!-- <v-divider class="my-3"/> -->
            <!-- <div class="title mb-3">Check out our newest features!</div> -->
            <!-- <v-btn
              class="mx-0"
              color="grey darken-3 white--text"
            large>See more</v-btn>-->
          </v-flex>
        </v-layout>
      </v-container>
    </v-img>
    <v-container 
      grid-list-lg 
      py-5>
      <h1 class="title white--text mb-3 font-weight-black">COMICS</h1>
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
              :title="comic.title || 'none'"
              :subtitle="`${comic.creators.available} creators, ${comic.characters.available} characters, ${comic.stories.available} stories and ${comic.events.available} events`"
              :image="`${comic.thumbnail.path}.${comic.thumbnail.extension}`"
              dark
            />
          </nuxt-link>
        </v-flex>
      </v-layout>
      <v-layout 
        class="py-2" 
        raw 
        wrap 
        justify-center>
        <v-btn 
          nuxt 
          to="/comics" 
          color="red white--text" 
          large>SEE MORE</v-btn>
      </v-layout>
    </v-container>
    <div
      :style="{background: `url(${require('@/assets/images/banner7.jpg')}) center center / cover no-repeat;`}"
      class="d-block container-characters"
    >
      <v-container 
        grid-list-lg 
        py-5>
        <h1 class="title white--text mb-3">CHARACTERS</h1>
        <v-layout 
          align-center 
          wrap>
          <v-flex 
            v-for="character in characters" 
            :key="character.id" 
            xs3 
            sm2 
            md1>
            <nuxt-link 
              :to="`/characters/${character.id}`" 
              class="d-block">
              <v-avatar 
                color="gray" 
                size="60">
                <v-img :src="`${character.thumbnail.path}.${character.thumbnail.extension}`"/>
              </v-avatar>
            </nuxt-link>
          </v-flex>
        </v-layout>
        <v-layout 
          class="py-2" 
          raw 
          wrap 
          justify-center>
          <v-btn 
            nuxt 
            to="/characters" 
            color="red white--text" 
            large>SEE MORE</v-btn>
        </v-layout>
      </v-container>
    </div>
    <v-container 
      grid-list-lg 
      py-5>
      <h1 class="title white--text mb-3 font-weight-black">SERIES</h1>
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
              :title="serie.title || 'none'"
              :subtitle="`${serie.creators.available} creators, ${serie.characters.available} characters, ${serie.stories.available} stories, ${serie.comics.available} comics and ${serie.events.available} events`"
              :image="`${serie.thumbnail.path}.${serie.thumbnail.extension}`"
              dark
            />
          </nuxt-link>
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
          color="red white--text" 
          large>SEE MORE</v-btn>
      </v-layout>
    </v-container>
    <v-container 
      grid-list-lg 
      py-5>
      <h1 class="title white--text mb-3 font-weight-black">EVENTS</h1>
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
              :title="event.title || 'none'"
              :subtitle="`${event.creators.available} creators, ${event.characters.available} characters, ${event.stories.available} stories, ${event.comics.available} comics and ${event.series.available} series`"
              :image="`${event.thumbnail.path}.${event.thumbnail.extension}`"
              dark
            />
          </nuxt-link>
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
          color="red white--text" 
          large>SEE MORE</v-btn>
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
  async asyncData({ $marvel, error }) {
    const options = { progress: false }
    let comics = null
    let characters = null
    let series = null
    let events = null

    try {
      comics = await $marvel.comics.get(
        {
          limit: 8,
          offset: $marvel.random(42117, 8)
        },
        options
      )

      characters = await $marvel.characters.get(
        {
          limit: 24,
          offset: $marvel.random(1491, 24)
        },
        options
      )

      series = await $marvel.series.get(
        {
          limit: 8,
          offset: $marvel.random(10250, 8)
        },
        options
      )

      events = await $marvel.events.get(
        {
          limit: 8,
          offset: $marvel.random(75, 8)
        },
        options
      )
    } catch (e) {
      error(e)
    }

    return {
      comics,
      characters,
      series,
      events
    }
  },
  head() {
    // const url = `${process.env.APP_URL}/characters`
    // const title = `${process.env.APP_NAME} - Characters`
    // const description = `${process.env.APP_NAME} - Characters`
    const image = `${process.env.APP_URL}${require('@/assets/images/logo.png')}`

    return {
      // title,
      meta: [
        // {
        //   hid: 'description',
        //   name: 'description',
        //   content: description
        // },
        // { hid: 'og:url', property: 'og:url', content: url },
        // { hid: 'og:title', property: 'og:title', content: title },
        // {
        //   hid: 'og:description',
        //   property: 'og:description',
        //   content: description
        // },
        { hid: 'og:image', property: 'og:image', content: image },
        // { hid: 'twitter:url', property: 'twitter:url', content: url },
        // { hid: 'twitter:title', property: 'twitter:title', content: title },
        // {
        //   hid: 'twitter:description',
        //   property: 'twitter:description',
        //   content: description
        // }
        { hid: 'twitter:image', property: 'twitter:image', content: image }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.container-characters {
  // background: url(https://community.algolia.com/marvel-search/img/profile-bg-default.gif)
  // background: url('./_nuxt/assets/images/banner7.jpg') center center / cover
  // no-repeat;
}
.v-avatar {
  transition: transform 0.5s;
  &:hover {
    transform: scale(1.1);
    z-index: 1;
  }
}
</style>
