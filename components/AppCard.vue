<template>
  <v-card 
    flat 
    dark>
    <v-img 
      :src="image" 
      height="200px">
      <v-layout 
        slot="placeholder" 
        fill-height 
        align-center 
        justify-center 
        ma-0>
        <v-progress-circular 
          indeterminate 
          color="white lighten-5"/>
      </v-layout>
    </v-img>

    <v-card-title
      v-if="title || subtitle"
      :class="textClass"
      primary-title
      class="justify-center align-center"
    >
      <div 
        v-if="title" 
        :class="titleClass" 
        class="subheading white--text">{{ title }}</div>
      <span 
        v-if="subtitle" 
        :class="subTitleClass" 
        class="body-1 grey--text">{{ subtitle }}</span>
    </v-card-title>
  </v-card>
</template>

<script>
export default {
  props: {
    id: { type: Number, default: 0 },
    title: { type: String, default: null },
    subtitle: { type: String, default: null },
    image: { type: String, default: null },
    textClass: { type: String, default: null },
    titleClass: { type: String, default: null },
    subTitleClass: { type: String, default: null }
  },
  data() {
    return {
      show: false
    }
  }
}
</script>

<style lang="scss" scoped>
.v-card__title {
  flex-direction: column;
}
</style>
