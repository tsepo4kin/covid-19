<template>
    <main class="grey lighten-5 pa-2">
        <section>
            <h1 class="display-1 text-center">{{queryName}}</h1>
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
                <lineChart 
                  class="mx-2" 
                  v-for="(visual, i) in visuals" 
                  :key='i+ "visual"' 
                  :chartData='visual.chartData' 
                  :options='visual.options'
                ></lineChart>
            </v-row>
        </section>
    </main>
</template>

<script>
import StatCard from './StatCard'
import lineChart from './LineChart'
export default {
  name: 'Country',
  props: ['queryName'],
  data () {
    return {
      cards: [],
      visuals: []
    }
  },
  components: {
    StatCard,
    lineChart
  },
  mounted () {
    // this.$store.dispatch('newCountry', this.queryName)
    // this.$store.dispatch('newCountryName', this.queryName)
    this.updateCountryStats()
  },
  methods: {
    updateCountryStats () {
      let data = this.$store.getters.country
      this.cards.push({ title: 'total cases', bgColor: 'primary lighten-2', amount: data.cases, amountNew: data.cases, icon: 'mdi-alert-box' })
      this.cards.push({ title: 'deaths', bgColor: 'red accent-2', amount: data.deaths, amountNew: 0, icon: 'mdi-emoticon-dead' })
      this.cards.push({ title: 'recoveries', bgColor: 'teal lighten-1', amount: data.recoveries, amountNew: 0, icon: 'mdi-hospital-box' })
      this.visuals = []
      this.visuals.push({
        id: 1,
        chartData: {
          labels: data.visualLabels,
          datasets: [{
            label: 'Total cases',
            backgroundColor: '#6aaaff',
            data: data.visualData.cases
          }]
        },
        options: { responsive: true, maintainAspectRatio: false }
      })
      this.visuals.push({
        id: 2,
        chartData: {
          labels: data.visualLabels,
          datasets: [{
            label: 'Deaths',
            backgroundColor: '#ff5252',
            data: data.visualData.deaths
          }]
        },
        options: { responsive: true, maintainAspectRatio: false }
      })
      this.visuals.push({
        id: 3,
        chartData: {
          labels: data.visualLabels,
          datasets: [{
            label: 'Recoveries',
            backgroundColor: '#26a69a',
            data: data.visualData.recoveries
          }]
        },
        options: { responsive: true, maintainAspectRatio: false }
      })
    }
  },
  computed: {
    countryDataCards () {
      let countryData = this.$store.getters.country
      let cards = []
      cards.push({ title: 'total cases', bgColor: 'primary lighten-2', amount: countryData.cases, newAmont: 0, icon: 'mdi-alert-box' })
      cards.push({ title: 'deaths', bgColor: 'red accent-2', amount: countryData.deaths, newAmont: 0, icon: 'mdi-emoticon-dead' })
      cards.push({ title: 'recoveries', bgColor: 'teal lighten-1', amount: countryData.recoveries, newAmont: 0, icon: 'mdi-hospital-box' })
      return cards
    },
    countryDataVisuals () {
      let countryData = this.$store.getters.country
      let visuals = []
      visuals.push({
        id: 1,
        chartData: {
          labels: countryData.visualLabels,
          datasets: [{
            label: 'Total cases',
            backgroundColor: '#6aaaff',
            data: countryData.visualData.cases
          }]
        },
        options: { responsive: true, maintainAspectRatio: false }
      })
      visuals.push({
        id: 2,
        chartData: {
          labels: countryData.visualLabels,
          datasets: [{
            label: 'Deaths',
            backgroundColor: '#ff5252',
            data: countryData.visualData.deaths
          }]
        },
        options: { responsive: true, maintainAspectRatio: false }
      })
      visuals.push({
        id: 3,
        chartData: {
          labels: countryData.visualLabels,
          datasets: [{
            label: 'Recoveries',
            backgroundColor: '#26a69a',
            data: countryData.visualData.recoveries
          }]
        },
        options: { responsive: true, maintainAspectRatio: false }
      })
      return visuals
    }
  }
}
</script>