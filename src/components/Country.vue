<template>
    <main class="grey lighten-5 pa-2">
        <section>
            <h1 class="display-1 text-center">{{ queryName }}</h1>
            <v-row align="center" justify="center" v-if="!loader">
                <stat-card
                    v-for="(card, i) in cards"
                    :key="i + 'card'"
                    :icon="card.icon"
                    :title="card.title"
                    :amont="card.amont"
                    :newAmont="card.newAmont"
                    :bgColor="card.bg"
                ></stat-card>
            </v-row>
            <v-row v-else align="center" justify="center">
                <v-skeleton-loader
                    v-for="i in 3"
                    :key="i + 'skeleton-loader'"
                    class="summury-card ma-3"
                    type="image"
                    width="240px"
                    height="120px"
                ></v-skeleton-loader>
            </v-row>
        </section>
        <section>
            <h2 class="display-1 text-center">Visuals</h2>
            <visuals v-if="!loader" :dataCountry="dataCountry"></visuals>
        </section>
    </main>
</template>

<script>
import StatCard from "./StatCard";
import Visuals from "./Visuals";
export default {
    name: "Country",
    props: ["queryName"],
    data: () => ({
        loader: true,
    }),
    components: {
        StatCard,
        Visuals,
    },
    computed: {
        dataCountry() {
            if(this.queryName !== this.$store.getters.getCountryHistory.data.country) {
                this.$store.dispatch("setCountryHistory", this.queryName);
            }
            return this.$store.getters.getCountryHistory.data;
        },
        cards() {
            let dataCountry = this.$store.getters.getCountries.find(
                (e) => e.country === this.queryName
            );
            return [
                {
                    title: "total cases",
                    bg: "primary lighten-2",
                    amont: dataCountry.cases,
                    newAmont: dataCountry.todayCases,
                    icon: "mdi-alert-box",
                },
                {
                    title: "deaths",
                    bg: "red accent-2",
                    amont: dataCountry.deaths,
                    newAmont: dataCountry.todayDeaths,
                    icon: "mdi-emoticon-dead",
                },
                {
                    title: "recoveries",
                    bg: "teal lighten-1",
                    amont: dataCountry.recovered,
                    newAmont: dataCountry.todayRecovered,
                    icon: "mdi-hospital-box",
                },
            ];
        },
    },
    async mounted() {
        await this.$store.dispatch("setCountries");
        await this.$store.dispatch("setCountryHistory", this.queryName);

        this.loader = false;
    },
};
</script>
