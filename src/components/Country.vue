<template>
    <main class="grey lighten-5 pa-2">
        <section>
            <h1 class="display-1 text-center">{{ queryName }}</h1>
            <v-row align="center" justify="center">
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
        </section>
        <section>
            <h2 class="display-1 text-center">Visuals</h2>
            <v-row align="center" justify="center">
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
        cards: [
            {
                title: "total cases",
                bg: "primary lighten-2",
                amont: 1000,
                newAmont: 200,
                icon: "mdi-alert-box",
            },
            {
                title: "deaths",
                bg: "red accent-2",
                amont: 1000,
                newAmont: 200,
                icon: "mdi-emoticon-dead",
            },
            {
                title: "recoveries",
                bg: "teal lighten-1",
                amont: 1000,
                newAmont: 200,
                icon: "mdi-hospital-box",
            },
        ],
        visuals: [],
    }),
    components: {
        StatCard,
        lineChart,
    },
    mounted() {
      console.log(this.$store.getters.getCountries.find(country => country.country === this.queryName))
    },
    methods: {
    
    }
};
</script>
