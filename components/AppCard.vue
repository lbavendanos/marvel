<template>
  <v-card flat dark>
    <v-img :src="image" height="200px"></v-img>

    <v-card-title primary-title>
      <div>
        <div class="subheading white--text">{{ card.title }}</div>
        <span class="body-1 grey--text">{{ card.subtitle }}</span>
      </div>
    </v-card-title>
  </v-card>
</template>

<script>
export default {
  props: {
    id: { type: Number, default: 0 },
    title: { type: String, default: '' },
    subtitle: { type: String, default: '' },
    image: { type: String, default: '' }
  },
  data() {
    return {
      card: {
        id: this.id,
        title: this.title,
        subtitle: this.subtitle,
        image: this.imnage
      },
      show: false
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

