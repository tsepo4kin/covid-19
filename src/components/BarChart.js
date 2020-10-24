import Vue from 'vue'
import { Bar, mixins } from 'vue-chartjs'
const {reactiveProp} = mixins

export default Vue.component('bar-chart', {
    extends: Bar,
    props: {
        chartData: Object,
    },
    mixins: [reactiveProp],
    mounted() {
        this.renderChart(this.chartData)
    }
}) 