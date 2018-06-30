<template>
    <header>
        <v-toolbar dark color="red">
            <v-toolbar-side-icon class="hidden-md-and-up" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title class="white--text">{{ title }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-sm-and-down">
                <v-btn
                    flat
                    v-for="item in items"
                    :key="item.title"
                >{{item.title}}</v-btn>
            </v-toolbar-items>
        </v-toolbar>
        <v-navigation-drawer
        v-show="drawer"
        v-model="drawer"
        temporary
        absolute
        dark
        class="red"
        >
            <v-list class="pa-1">
                <v-list-tile>
                    <!-- <v-list-tile-title class="title">
                        {{ title }}
                    </v-list-tile-title> -->
                    <v-list-tile-content class="title">
                        <v-list-tile-title>{{ title }}</v-list-tile-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                        <v-btn icon @click.stop="drawer = !drawer">
                            <v-icon>close</v-icon>
                        </v-btn>
                    </v-list-tile-action>
                </v-list-tile>
            </v-list>
            <v-list class="pt-0" dense>
                <v-divider></v-divider>
                <v-list-tile v-for="item in items" :key="item.title">
                    <!-- <v-list-tile-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-tile-action> -->
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
    data () {
      return {
        drawer: null,
        title: 'MARVEL',
        items: [
          { title: 'Characters', icon: 'dashboard' },
          { title: 'Comics', icon: 'question_answer' },
          { title: 'Creators', icon: 'question_answer' },
          { title: 'Events', icon: 'question_answer' },
          { title: 'Series', icon: 'question_answer' },
          { title: 'Stories', icon: 'question_answer' }
        ]
      }
    }
  }
</script>
