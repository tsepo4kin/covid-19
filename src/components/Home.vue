<template>
    <main class="grey lighten-5 pa-2">
        <section>
            <h1 class="display-1 text-center">World summary stats</h1>
            <v-row align='center' justify="center">
                <stat-card v-for='(card,i) in cards' 
                    :key='i+ "card"' 
                    :icon='card.icon' 
                    :title='card.title' 
                    :amont='card.amont' 
                    :newAmont='card.newAmont' 
                    :bgColor='card.bg'
                ></stat-card>
            </v-row>
        </section>
        <section>
            <h2 class="display-1 text-center">Visuals</h2>
            <v-row align="center" justify="center">
                <lineChart class="mx-2" v-for="(visual, i) in visuals" :key='i+ "visual"' :chartData='visual.chartData' :options='visual.options'></lineChart>
            </v-row>
        </section>
    </main>
</template>
<script>
import statCard from './StatCard'
import lineChart from './LineChart'
export default {
    data: () => ({
        continents: null,
        allData: null,
        cards: [
            {title: 'total cases', bg: 'primary lighten-2', amont: 1000, newAmont: 200, icon: 'mdi-alert-box'},
            {title: 'deaths', bg: 'red accent-2', amont: 1000, newAmont: 200, icon: 'mdi-emoticon-dead'},
            {title: 'recoveries', bg: 'teal lighten-1', amont: 1000, newAmont: 200, icon: 'mdi-hospital-box'}
        ],
        visuals: [
            {
                chartData: null,
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            },
            {
                chartData: null,
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            },
            {
                chartData: null,
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            }
        ]
    }),
    mounted() {
        this.axios
            .get('https://corona.lmao.ninja/v2/continents')
            .then(res => { this.continents = res; this.updateStats()})
            .catch(e => console.log(e));

        this.axios
            .get('https://corona.lmao.ninja/v2/historical/all')
            .then(res => {this.allData = res; this.updateVisuals();})
            .catch(e => console.log(e));
    },
    methods: {
        updateStats() {
            let data = this.continents.data;

            let cases = 0;
            let todayCases = 0;
            let deaths = 0;
            let todayDeaths = 0;
            let recoveries = 0;
            let todayRecoveries = 0;

            for(let el of data) {
                cases += el.cases
                todayCases += el.todayCases
                todayDeaths += el.todayDeaths
                deaths += el.deaths
                recoveries += el.recovered
                todayRecoveries += el.todayRecovered
            }

            this.cards[0].amont = cases;
            this.cards[0].newAmont = todayCases;
            this.cards[1].amont = deaths;
            this.cards[1].newAmont = todayDeaths;
            this.cards[2].amont = recoveries
            this.cards[2].newAmont = todayRecoveries
        },
        updateVisuals() {
            let data = this.allData.data;

            let labelsCases = [];
            let casesPerDay = [];
            let labelsDeaths = [];
            let deathsPerDay = [];
            let labelsRecoveries = [];
            let recoveriesPerDay = [];

            for(let key in data.cases) {
                labelsCases.push(key)
                casesPerDay.push(data.cases[key])
            }
            this.visuals[0].chartData = {
                labels: labelsCases,
                datasets: [{
                    label: 'Total cases',
                    backgroundColor: '#6AAAFF',
                    data: casesPerDay
                }]
            }

            for(let key in data.deaths) {
                labelsDeaths.push(key)
                deathsPerDay.push(data.deaths[key])
            }
            this.visuals[1].chartData = {
                labels: labelsDeaths,
                datasets: [{
                    label: 'Deaths',
                    backgroundColor: '#ff5252',
                    data: deathsPerDay
                }]
            }

            for(let key in data.recovered) {
                labelsRecoveries.push(key)
                recoveriesPerDay.push(data.recovered[key])
            }
            this.visuals[2].chartData = {
                labels: labelsRecoveries,
                datasets: [{
                    label: 'Recoveries',
                    backgroundColor: '#26a69a',
                    data: recoveriesPerDay
                }]
            }
        }
    },
    components: {
        statCard,
        lineChart
    }   
}
</script>