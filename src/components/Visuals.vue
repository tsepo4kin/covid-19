<template>
    <div>
        <v-row align="center" justify="center">
            <line-chart
                class="mx-2"
                v-for="(lineVisual, i) in visualsLine"
                :key="i + 'lineVisual'"
                :chartData="lineVisual"
                :options="visualOptions"
            ></line-chart>
        </v-row>
        <v-row align="center" justify="center">
            <bar-chart
                class="mx-2"
                v-for="(barVisual, i) in barsVisuals"
                :key="i + 'barVisual'"
                :chartData="barVisual"
            ></bar-chart>
        </v-row>
    </div>
</template>
<script>
import LineChart from "./LineChart";
import BarChart from "./BarChart";
export default {
    props: ["dataCountry"],
    data: () => ({
        visualOptions: {
            responsive: true,
            maintainAspectRatio: false,
        }
    }),
    components: {
        LineChart,
        BarChart,
    },
    computed: {
        visualCases() {
            let labelsCases = [];
            let casesPerDay = [];
            for (let key in this.dataCountry.timeline.cases) {
                labelsCases.push(key);
                casesPerDay.push(this.dataCountry.timeline.cases[key]);
            }
            let cases = casesPerDay.map((e, i) => {
                return e - casesPerDay[i - 1];
            });
            cases.shift();
            labelsCases.shift();
            return {
                labels: labelsCases,
                casesPerDay: casesPerDay,
                cases: cases,
            };
        },

        visualDeaths() {
            let labelsDeaths = [];
            let deathsPerDay = [];
            for (let key in this.dataCountry.timeline.deaths) {
                labelsDeaths.push(key);
                deathsPerDay.push(this.dataCountry.timeline.deaths[key]);
            }
            let deaths = deathsPerDay.map((e, i) => {
                return e - deathsPerDay[i - 1];
            });

            deaths.shift();
            labelsDeaths.shift();

            return {
                labels: labelsDeaths,
                deathsPerDay: deathsPerDay,
                deaths: deaths,
            };
        },

        visualRecoveries() {
            let labelsRecoveries = [];
            let recoveriesPerDay = [];

            for (let key in this.dataCountry.timeline.recovered) {
                labelsRecoveries.push(key);
                recoveriesPerDay.push(this.dataCountry.timeline.recovered[key]);
            }
            let recovered = recoveriesPerDay.map((e, i) => {
                return e - recoveriesPerDay[i - 1];
            });
            recovered.shift();
            labelsRecoveries.shift();
            return {
                labels: labelsRecoveries,
                recoveriesPerDay: recoveriesPerDay,
                recovered: recovered,
            };
        },

        visualsLine() {
            let result = [
                {
                    labels: [],
                    datasets: [{
                          label: "Total cases",
                          backgroundColor: "#6AAAFF",
                          data: [],
                        }],
                },

                {
                    labels: [],
                    datasets: [{
                          label: "Deaths",
                          backgroundColor: "#ff5252",
                          data: [],
                        }],
                },

                {
                    labels: [],
                    datasets: [{
                        label: "Recoveries",
                        backgroundColor: "#26a69a",
                        data: [],
                      }],
                },
            ]
            for(let i = 0; i < result.length; i++) {
              result[0].labels = this.visualCases.labels
              result[1].labels = this.visualDeaths.labels
              result[2].labels = this.visualRecoveries.labels

              result[0].datasets[0].data = this.visualCases.casesPerDay
              result[1].datasets[0].data = this.visualDeaths.deathsPerDay
              result[2].datasets[0].data = this.visualRecoveries.recoveriesPerDay
            }
            return result
        },

        barsVisuals() {
            let res = [
                {
                    labels: [],
                    datasets: [
                        {
                            label: "Total cases",
                            backgroundColor: "#6AAAFF",
                            data: [],
                        },
                    ],
                },

                {
                    labels: [],
                    datasets: [
                        {
                            label: "Deaths",
                            backgroundColor: "#ff5252",
                            data: [],
                        },
                    ],
                },

                {
                    labels: [],
                    datasets: [
                        {
                            label: "Recoveries",
                            backgroundColor: "#26a69a",
                            data: [],
                        },
                    ],
                },
            ]
            for(let i = 0; i < res.length; i++) {
              res[0].labels = this.visualCases.labels
              res[1].labels = this.visualDeaths.labels
              res[2].labels = this.visualRecoveries.labels

              res[0].datasets[0].data = this.visualCases.cases
              res[1].datasets[0].data = this.visualDeaths.deaths
              res[2].datasets[0].data = this.visualRecoveries.recovered
            }

            return res
        }
    },
    mounted() {
      
    },
};
</script>

<style></style>
