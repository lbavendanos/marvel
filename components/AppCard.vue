<template>
    <v-card dark>
        <v-card-media
            :src="`${card.thumbnail.path}.${card.thumbnail.extension}`"
            height="200px"
        >
        </v-card-media>

        <v-card-title primary-title>
            <div>
                <div class="headline white--text">{{ card.name }}</div>
                <span class="card__description grey--text">{{card.comics}} comics , {{card.series}} series, {{card.stories}} stories and {{card.events}} events</span>
            </div>
        </v-card-title>

        <v-card-actions>
            <v-btn flat>Share</v-btn>
            <v-btn flat color="red">Explore</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    props: {
        id: Number,
        name: String,
        description: String,
        thumbnail: Object,
        comics: Number,
        series: Number,
        stories: Number,
        events: Number,
    },
    data() {
        return {
            card: {
                id: this.id,
                name: this.name,
                description: this.description,
                thumbnail: this.thumbnail,
                comics: this.comics,
                series: this.series,
                stories: this.stories,
                events: this.events
            },
            show: false
        }
    }
}
</script>

<style lang="scss" scoped>
.card {
    &__description {
        // font-size: 0.9rem;
    }
}
</style>

