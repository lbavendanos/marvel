<template>
  <header>
    <v-toolbar 
      dark 
      color="red">
      <v-toolbar-side-icon 
        class="hidden-md-and-up" 
        @click.stop="drawer = !drawer"/>
      <nuxt-link
        flat
        color="white"
        large
        to="/"
        active-class
        exact
        nuxt
        class="text-decoration-none"
      >
        <v-toolbar-title class="white--text">{{ title }}</v-toolbar-title>
      </nuxt-link>
      <v-spacer/>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn
          v-for="item in items"
          :key="item.title"
          :to="item.to"
          flat
          active-class
          exact
          nuxt
        >{{ item.title }}</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-navigation-drawer 
      v-show="drawer" 
      v-model="drawer" 
      temporary 
      absolute 
      dark 
      class="red">
      <v-list class="pa-1">
        <v-list-tile 
          to="/" 
          active-class 
          exact 
          nuxt>
          <v-list-tile-content class="title">
            <v-list-tile-title>{{ title }}</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-btn 
              icon 
              @click.stop="drawer = !drawer">
              <v-icon>close</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
      <v-list 
        class="pt-0" 
        dense>
        <v-divider/>
        <v-list-tile 
          v-for="item in items" 
          :key="item.title" 
          :to="item.to" 
          exact 
          nuxt>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </header>
</template>

<script>
export default {
  data() {
    return {
      drawer: null,
      title: 'MARVEL',
      items: [
        { title: 'Characters', to: '/characters', icon: 'dashboard' },
        { title: 'Comics', to: '/comics', icon: 'question_answer' },
        { title: 'Creators', to: '/creators', icon: 'question_answer' },
        { title: 'Events', to: '/events', icon: 'question_answer' },
        { title: 'Series', to: '/series', icon: 'question_answer' },
        { title: 'Stories', to: '/stories', icon: 'question_answer' }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
header {
  z-index: 1;
}
.text-decoration-none {
  text-decoration: none;
}
</style>
