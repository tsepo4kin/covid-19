<template>
  <main>
    <h1>{{ msg }}</h1>
    {{ countries }}
    <v-list>
      <v-subheader>COUNTRIES</v-subheader>
      <v-list-item-group v-model="item" color="primary">
        <v-list-item v-for="(item, i) in countries" :key="i">
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.country"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </main>
</template>
<script>
// import lineChart from './LineChart'
export default {
  name: 'Countries',
  data () {
    return {
      msg: 'Countries stats',
      item: 1,
      items: [
        { text: 'Country 1', icon: 'mdi-clock' }
      ],
      countries: null
    }
  },
  mounted () {
    this.axios
      .get('https://corona.lmao.ninja/v2/historical?lastdays=30')
      .then(response => { this.countries = response })
  },
  components: {
    // lineChart
  }
}
</script>