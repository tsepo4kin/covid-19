<template>
  <main>
    <h1>{{ msg }}</h1>
    <!-- {{ countries }} -->
    <v-list>
      <v-subheader>COUNTRIES</v-subheader>
      <v-list-item-group color="primary">
        <v-list-item v-for="(el, i) in countries" :key="i" :to="'/country/' + el.country">
          <v-list-item-icon>
            <!-- <v-icon v-text="item.icon"></v-icon> -->
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="el.country"></v-list-item-title>
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
      countries: null
    }
  },
  mounted () {
    this.countries = this.$store.getters.getCountries
  },
  components: {
  }
}
</script>