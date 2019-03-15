<template>
  <v-footer
    class="red"
    height="auto">
    <v-container class="py-1">
      <v-layout
        row
        wrap
        justify-space-between
        align-center>
        <div>
          <h6 class="caption white--text">LBAVENDANOS &copy; {{ new Date().getFullYear() }}</h6>
        </div>
        <div>
          <v-btn
            v-for="(value, key, index) in social"
            :key="index"
            :href="value.to"
            dark
            small
            color="white"
            icon
            class="mx-1 my-1">
            <v-icon color="red">{{ value.icon }}</v-icon>
          </v-btn>
        </div>
      </v-layout>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  data() {
    return {
      social: [
        { icon: 'fa fa-github', to: 'https://lbavendanos.github.io' },
        {
          icon: 'fa fa-facebook-official',
          to: 'https://www.facebook.com/lbavendanos'
        },
        //   'fa fa-twitter-square',
        //   'fa fa-google-plus-official',
        //   'fa fa-linkedin-square',
        {
          icon: 'fa fa-instagram',
          to: 'https://www.instagram.com/lbrayan.avendano'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.v-footer {
  margin-top: auto;
}
</style>
