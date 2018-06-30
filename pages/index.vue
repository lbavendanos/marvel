<template>
    <section>
        <v-jumbotron
            dark
            src="https://i.annihil.us/u/prod/marvel/html_pages_assets/mu-sellpage/prod/images/bg-topper-desktop.jpg">
            <v-container fill-height>
            <v-layout align-center>
                <v-flex>
                <h3 class="display-3">Welcome to the site</h3>

                <span class="subheading">Lorem ipsum dolor sit amet, pri veniam forensibus id. Vis maluisset molestiae id, ad semper lobortis cum. At impetus detraxit incorrupte usu, repudiare assueverit ex eum, ne nam essent vocent admodum.</span>

                <v-divider class="my-3"></v-divider>

                <div class="title mb-3">Check out our newest features!</div>

                <v-btn
                    class="mx-0"
                    color="primary"
                    large
                >
                    See more
                </v-btn>
                </v-flex>
            </v-layout>
            </v-container>
        </v-jumbotron>
        <v-container fluid grid-list-md>
            <h1 class="title white--text">SOME CHARACTERS</h1>
            <v-layout raw wrap>
                <v-flex v-for="item in items" :key="item.id" xs12 sm6 md4 lg3>
                    <AppCard
                        :id="item.id"
                        :name="item.name"
                        :description="item.description"
                        :thumbnail="item.thumbnail"
                        :comics="item.comics.available"
                        :series="item.series.available"
                        :stories="item.stories.available"
                        :events="item.events.available"
                    />
                </v-flex>
            </v-layout>
        </v-container>
    </section>
</template>

<script>

import URI from 'urijs';
import Random from 'random-js';
import md5 from 'crypto-js/md5';

import AppCard from '@/components/AppCard';

export default {
    components: {
        AppCard
    },
    async asyncData({ app }) {
        try {
            let random = new Random(Random.engines.mt19937().autoSeed());
            let ts = Date.now();
            let hash = md5(`${ts}${process.env.KEY_SECRET}${process.env.KEY_PUBLIC}`).toString();
            let uri = new URI('https://gateway.marvel.com:443/v1/public/characters');
            uri.addSearch({
                limit: 8,
                offset : random.integer(1, 1491),
                ts,
                apikey: process.env.KEY_PUBLIC,
                hash
            });

            let response = await app.$axios.$get(uri.toString());
            let data = {
                items: response.data.results
            };
            return data;
        } catch (error) {
            console.log(error);
        }
    }
}
</script>

<style lang="scss" scoped>
.title {
    margin-bottom: 0.5rem;
}
</style>
