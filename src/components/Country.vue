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
            <v-row v-if="!loader" align="center" justify="center">
                <lineChart
                    class="mx-2"
                    v-for="(visual, i) in visuals"
                    :key="i + 'visual'"
                    :chartData="visual.chartData"
                    :options="visual.options"
                ></lineChart>
            </v-row>
        </section>
    </main>
</template>

<script>
import StatCard from "./StatCard";
import lineChart from "./LineChart";
export default {
    name: "Country",
    props: ["queryName"],
    data: () => ({
        dataCountry: null,
        loader: true,
        visualOptions: {
            responsive: true,
            maintainAspectRatio: false,
        },
    }),
    components: {
        StatCard,
        lineChart,
    },
    computed: {
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

        visualCases() {
            let labelsCases = [];
            let casesPerDay = [];
            for (let key in this.dataCountry.timeline.cases) {
                labelsCases.push(key);
                casesPerDay.push(this.dataCountry.timeline.cases[key]);
            }
            return { labels: labelsCases, casesPerDay: casesPerDay };
        },

        visualDeaths() {
            let labelsDeaths = [];
            let deathsPerDay = [];

            for (let key in this.dataCountry.timeline.deaths) {
                labelsDeaths.push(key);
                deathsPerDay.push(this.dataCountry.timeline.deaths[key]);
            }
            return { labels: labelsDeaths, deathsPerDay: deathsPerDay };
        },

        visualRecoveries() {
            let labelsRecoveries = [];
            let recoveriesPerDay = [];

            for (let key in this.dataCountry.timeline.recovered) {
                labelsRecoveries.push(key);
                recoveriesPerDay.push(this.dataCountry.timeline.recovered[key]);
            }
            return {
                labels: labelsRecoveries,
                recoveriesPerDay: recoveriesPerDay,
            };
        },

        visuals() {
            return [
                {
                    options: this.visualOptions,
                    chartData: {
                        labels: this.visualCases.labels,
                        datasets: [
                            {
                                label: "Total cases",
                                backgroundColor: "#6AAAFF",
                                data: this.visualCases.casesPerDay,
                            },
                        ],
                    },
                },

                {
                    options: this.visualOptions,
                    chartData: {
                        labels: this.visualDeaths.labels,
                        datasets: [
                            {
                                label: "Deaths",
                                backgroundColor: "#ff5252",
                                data: this.visualDeaths.deathsPerDay,
                            },
                        ],
                    },
                },

                {
                    options: this.visualOptions,
                    chartData: {
                        labels: this.visualRecoveries.labels,
                        datasets: [
                            {
                                label: "Recoveries",
                                backgroundColor: "#26a69a",
                                data: this.visualRecoveries.recoveriesPerDay,
                            },
                        ],
                    },
                },
            ];
        },
    },
    async mounted() {
        await this.$store.dispatch("setCountries");
        await this.$store.dispatch("setCountryHistory", this.queryName)
        this.dataCountry = this.$store.getters.getCountryHistory.data

        console.log(this.dataCountry)
        console.log(this.visualCases)
        this.loader = false;
    },
};
</script>
