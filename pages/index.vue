<template>
    <section>
        <v-img
            src="https://i.annihil.us/u/prod/marvel/html_pages_assets/mu-sellpage/prod/images/bg-topper-desktop.jpg">
            <v-container fill-height class="white--text">
                <v-layout align-center>
                    <v-flex>
                        <h3 class="display-3">Welcome to the site</h3>
                        <span class="subheading">Lorem ipsum dolor sit amet, pri veniam forensibus id. Vis maluisset molestiae id, ad semper lobortis cum. At impetus detraxit incorrupte usu, repudiare assueverit ex eum, ne nam essent vocent admodum.</span>
                        <v-divider class="my-3"></v-divider>
                        <div class="title mb-3">Check out our newest features!</div>

                        <v-btn
                            class="mx-0"
                            color="grey darken-3 white--text"
                            large
                        >
                            See more
                        </v-btn>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-img>
        <v-container grid-list-lg py-5>
            <h1 class="title white--text mb-3 font-weight-black">COMICS</h1>
            <v-layout raw wrap>
                <v-flex class="card-item" v-for="comic in comics" :key="comic.id" xs12 sm6 md4 lg3>
                    <a href="" class="card-link d-block">
                        <AppCard
                            dark
                            :id="comic.id"
                            :title="comic.title"
                            :subtitle="`${comic.creators.available} creators, ${comic.characters.available} characters, ${comic.stories.available} stories and ${comic.events.available} events`"
                            :image="`${comic.thumbnail.path}.${comic.thumbnail.extension}`"
                        />
                    </a>
                </v-flex>
            </v-layout>
            <v-layout class="py-2" raw wrap justify-center>
                <v-btn color="red white--text" large>SEE MORE</v-btn>
            </v-layout>
        </v-container>
        <div class="d-block container-characters">
            <v-container grid-list-lg py-5>
                <h1 class="title white--text mb-3">CHARACTERS</h1>
                <v-layout
                    align-center
                    wrap>
                    <v-flex v-for="character in characters" :key="character.id" xs3 sm2 md1>
                        <v-avatar
                            color="gray"
                            size="60"
                        >
                            <img
                                :src="`${character.thumbnail.path}.${character.thumbnail.extension}`"
                                :alt="character.name">
                        </v-avatar>
                    </v-flex>
                </v-layout>
                <v-layout class="py-2" raw wrap justify-center>
                    <v-btn color="red white--text" large>SEE MORE</v-btn>
                </v-layout>
            </v-container>
        </div>
        <v-container grid-list-lg py-5>
            <h1 class="title white--text mb-3 font-weight-black">SERIES</h1>
            <v-layout raw wrap>
                <v-flex class="card-item" v-for="serie in series" :key="serie.id" xs12 sm6 md4 lg3>
                    <a href="" class="card-link d-block">
                        <AppCard
                            dark
                            :id="serie.id"
                            :title="serie.title"
                            :subtitle="`${serie.creators.available} creators, ${serie.characters.available} characters, ${serie.stories.available} stories, ${serie.comics.available} comics and ${serie.events.available} events`"
                            :image="`${serie.thumbnail.path}.${serie.thumbnail.extension}`"
                        />
                    </a>
                </v-flex>
            </v-layout>
            <v-layout class="py-2" raw wrap justify-center>
                <v-btn color="red white--text" large>SEE MORE</v-btn>
            </v-layout>
        </v-container>
        <v-container grid-list-lg py-5>
            <h1 class="title white--text mb-3 font-weight-black">EVENTS</h1>
            <v-layout raw wrap>
                <v-flex class="card-item" v-for="event in events" :key="event.id" xs12 sm6 md4 lg3>
                    <a href="" class="card-link d-block">
                        <AppCard
                            dark
                            :id="event.id"
                            :title="event.title"
                            :subtitle="`${event.creators.available} creators, ${event.characters.available} characters, ${event.stories.available} stories, ${event.comics.available} comics and ${event.series.available} series`"
                            :image="`${event.thumbnail.path}.${event.thumbnail.extension}`"
                        />
                    </a>
                </v-flex>
            </v-layout>
            <v-layout class="py-2" raw wrap justify-center>
                <v-btn color="red white--text" large>SEE MORE</v-btn>
            </v-layout>
        </v-container>
    </section>
</template>

<script>

import URI from 'urijs';
import Random from 'random-js';
import md5 from 'crypto-js/md5';

import AppCard from '@/components/AppCard';

const generateURL = (url, limit = 0 ,offset = 0) => {
    let random = new Random(Random.engines.mt19937().autoSeed());
    let ts = Date.now();
    let hash = md5(`${ts}${process.env.KEY_SECRET}${process.env.KEY_PUBLIC}`).toString();

    let uri = new URI(url);
    uri.addSearch({
        limit: limit,
        offset : offset != 0 ? random.integer(1, offset) : offset,
        ts,
        apikey: process.env.KEY_PUBLIC,
        hash
    });

    return uri;
}

export default {
    components: {
        AppCard
    },
    async asyncData({ app }) {
        try {
            let comicsUrl = generateURL('https://gateway.marvel.com:443/v1/public/comics', 8, 42117);
            let charactersUrl = generateURL('https://gateway.marvel.com:443/v1/public/characters', 24, 1491);
            let seriesUrl = generateURL('https://gateway.marvel.com:443/v1/public/series', 8, 10250);
            let eventsUrl = generateURL('https://gateway.marvel.com:443/v1/public/events', 8, 75);

            let comics = await app.$axios.$get(comicsUrl.toString());
            let characters = await app.$axios.$get(charactersUrl.toString());
            let series = await app.$axios.$get(seriesUrl.toString());
            let events = await app.$axios.$get(eventsUrl.toString());

            return {
                comics: comics.data.results,
                characters: characters.data.results,
                series: series.data.results,
                events: events.data.results
            };
        } catch (error) {
            console.log(error);
        }
    }
}
</script>

<style lang="scss" scoped>
.card {
    &-item {
        transition: transform .5s;
        &:hover {
            transform: scale(1.1);
            z-index: 1;
        }
    }

    &-link {
        text-decoration: none;
    }
}

.container-characters {
    background: url(https://community.algolia.com/marvel-search/img/profile-bg-default.gif) center center / cover no-repeat;
}
</style>
