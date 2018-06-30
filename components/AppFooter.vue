<template>
  <v-footer height="auto" class="footer">
    <v-card
      flat
      tile
      width="100%"
      class="red lighten-1 white--text text-xs-center"
    >
      <v-card-text>
        <v-btn
          v-for="icon in icons"
          :key="icon"
          icon
          class="mx-3 white--text"
        >
          <v-icon size="24px">{{ icon }}</v-icon>
        </v-btn>
      </v-card-text>
      <v-card-text class="white--text">
        &copy;2018 — <strong>LBAVENDANOS</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
  export default {
      data() {
          return {
              icons: ['fa fa-facebook-official', 'fa fa-twitter-square', 'fa fa-google-plus-official', 'fa fa-linkedin-square', 'fa fa-instagram']
          }
      }
  }
</script>

<style lang="scss" scoped>
    .footer {
        margin-top: auto;
    }
</style>
