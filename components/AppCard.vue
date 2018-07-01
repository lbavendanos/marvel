<template>
    <v-card flat dark>
        <v-card-media
            :src="image"
            height="200px"
        >
        </v-card-media>

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
        id: Number,
        title: String,
        subtitle: String,
        image: String
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
// .card {
//     &__description {
//         // font-size: 0.9rem;
//     }
// }
</style>

