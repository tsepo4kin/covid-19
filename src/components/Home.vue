<template>
  <main class="grey lighten-5 pa-2">
    <section>
      <h1 class="display-1 text-center">World summary stats</h1>
      <v-row v-if='!loader' align="center" justify="center">
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
    <section v-if='!loader'>
      <h2 class="display-1 text-center">Visuals</h2>
      <visuals :dataCountry='allData'></visuals>
    </section>
  </main>
</template>
<script>
import statCard from "./StatCard";
import Visuals from "./Visuals"
export default {
  data: () => ({
    loader: true,
    continents: null,
    allData: {
      timeline: null
    },
    cards: [
      {
        title: "total cases",
        bg: "primary lighten-2",
        amont: 1000,
        newAmont: 200,
        icon: "mdi-alert-box"
      },
      {
        title: "deaths",
        bg: "red accent-2",
        amont: 1000,
        newAmont: 200,
        icon: "mdi-emoticon-dead"
      },
      {
        title: "recoveries",
        bg: "teal lighten-1",
        amont: 1000,
        newAmont: 200,
        icon: "mdi-hospital-box"
      }
    ]
  }),
  async mounted() {
    await this.axios
      .get("https://corona.lmao.ninja/v2/continents")
      .then(res => {
        this.continents = res;
        this.updateStats();
      })
      .catch(e => console.log(e));

    await this.axios
      .get("https://corona.lmao.ninja/v2/historical/all")
      .then(res => {
        this.allData.timeline = res.data;
      })
      .catch(e => console.log(e));

    this.loader = false
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

      for (let el of data) {
        cases += el.cases;
        todayCases += el.todayCases;
        todayDeaths += el.todayDeaths;
        deaths += el.deaths;
        recoveries += el.recovered;
        todayRecoveries += el.todayRecovered;
      }

      this.cards[0].amont = cases;
      this.cards[0].newAmont = todayCases;
      this.cards[1].amont = deaths;
      this.cards[1].newAmont = todayDeaths;
      this.cards[2].amont = recoveries;
      this.cards[2].newAmont = todayRecoveries;
    },
    
  },
  components: {
    statCard,
    Visuals
  }
};
</script>
