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
            v-for="icon in icons" 
            :key="icon" 
            dark 
            small 
            color="white" 
            icon 
            class="mx-1 my-1">
            <v-icon color="red">{{ icon }}</v-icon>
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
      icons: [
        'fa fa-github',
        'fa fa-facebook-official',
        //   'fa fa-twitter-square',
        //   'fa fa-google-plus-official',
        //   'fa fa-linkedin-square',
        'fa fa-instagram'
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
