<template>
  <v-card flat dark>
    <v-img :src="image" height="200px">
      <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
        <v-progress-circular indeterminate color="white lighten-5"></v-progress-circular>
      </v-layout>
    </v-img>

    <v-card-title
      v-if="title || subtitle"
      primary-title
      class="justify-center align-center"
      :class="textClass"
    >
      <div v-if="title" class="subheading white--text" :class="titleClass">{{ title }}</div>
      <span v-if="subtitle" class="body-1 grey--text" :class="subTitleClass">{{ subtitle }}</span>
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

