<template>
  <v-card flat dark>
    <v-img :src="image" height="200px"></v-img>

    <v-card-title v-if="title || subtitle" primary-title>
      <div>
        <div v-if="title" class="subheading white--text">{{ title }}</div>
        <span v-if="subtitle" class="body-1 grey--text">{{ subtitle }}</span>
      </div>
    </v-card-title>
  </v-card>
</template>

<script>
export default {
  props: {
    id: { type: Number, default: 0 },
    title: { type: String, default: null },
    subtitle: { type: String, default: null },
    image: { type: String, default: null }
  },
  data() {
    return {
      show: false
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

