<template>
  <div class="container-fluid" v-if="resume">
    <div class="flex justify-content-center">
      <h3 class="text-center">Resultados</h3>
    </div>
    <div class="container">
      <div class="row mt-5" v-for="(round, index) in resume.tableResults" :key="index">
        <h5
          class="col-12 text-center"
        >Ronda {{ round.number }} - Lotes de {{ round.sizeLot }} monedas</h5>
        <table class="table col-12 col-sm-6 rounds-results-tables-container">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Jugador</th>
              <th scope="col">Espera Inicial</th>
              <th scope="col">Tiempo de recepción</th>
              <th scope="col">Plazo de Entrega</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(res, index) in round.results" :key="index">
              <th scope="row">{{index+1}}</th>
              <td>{{res.player.name}}</td>
              <td>{{res.initWait}}</td>
              <td>{{res.receptionTime}}</td>
              <td>{{res.deliveryTerm}}</td>
            </tr>
          </tbody>
        </table>

        <bar-chart
          class="col-12 col-sm-6 rounds-results-tables-container h-auto"
          :labels="round.chartLabels"
          :datasets="round.chartData"
        />
      </div>
      <hr class="m-5">
      <div class="row pt-4">
        <h5 class="col-12 text-center">Plazo global vs Costo local según tamaños de lote</h5>
        <table class="table col-12 col-sm-6 rounds-results-tables-container">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Jugador</th>
              <th v-for="(res, index) in resume.termVsCost.chartLabels" :key="index" scope="col">{{ res }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(res, index) in resume.termVsCost.results" :key="index">
              <th scope="row">{{index+1}}</th>
              <td>{{res.player.name}}</td>
              <td v-for="(value, index) in res.values" :key="index">{{value}}</td>
            </tr>
            <tr class="table-row-color">
              <th scope="row"></th>
              <td>Plazo de entrega</td>
              <td v-for="(value, index) in resume.termVsCost.deliveryTerms" :key="index">{{value}}</td>
            </tr>
            <tr class="table-row-color">
              <th scope="row"></th>
              <td>Promedio individual</td>
              <td
                v-for="(value, index) in resume.termVsCost.individualAverage"
                :key="index"
              >{{value}}</td>
            </tr>
          </tbody>
        </table>

        <line-chart
          class="col-12 col-sm-6 rounds-results-tables-container h-auto"
          :labels="resume.termVsCost.chartLabels"
          :datasets="resume.termVsCost.chartData"
        />
      </div>
    </div>
  </div>
</template>

<script>
import BarChart from "../components/charts/BarChart";
import LineChart from "../components/charts/LineChart";
export default {
  name: "GameResult",
  props: ["results"],
  data() {
    return {
      resume2: {
        tableResults: [
          {
            number: 1,
            sizeLot: 20,
            results: [
              {
                player: { id: 1, name: "Ana" },
                initWait: 0,
                delay: 29,
                deliveryTerm: 29
              },
              {
                player: { id: 2, name: "Jose" },
                initWait: 30,
                delay: 55,
                deliveryTerm: 25
              }
            ],
            chartLabels: ["José", "Ana"],
            chartData: [
              {
                label: "Espera inicial",
                backgroundColor: "#ffecb3",
                borderColor: "#e64a19",
                borderWidth: 1,
                data: [30, 0]
              },
              {
                label: "Plazo de entrega",
                backgroundColor: "#e64a19",
                data: [25, 29]
              }
            ]
          },
          {
            number: 2,
            sizeLot: 10,
            results: [
              {
                player: { id: 1, name: "Ana" },
                initWait: 0,
                delay: 10,
                deliveryTerm: 10
              },
              {
                player: { id: 2, name: "Jose" },
                initWait: 10,
                delay: 10,
                deliveryTerm: 20
              }
            ],
            chartLabels: ["José", "Ana"],
            chartData: [
              {
                label: "Espera inicial",
                backgroundColor: "#ffecb3",
                borderColor: "#e64a19",
                borderWidth: 1,
                data: [0, 10]
              },
              {
                label: "Plazo de entrega",
                backgroundColor: "#e64a19",
                data: [10, 10]
              }
            ]
          }
        ],
        termVsCost: {
          results: [
            {
              player: { id: 1, name: "Ana" },
              values: [31, 26, 29]
            },
            {
              player: { id: 1, name: "Andres" },
              values: [28, 25, 25]
            },
            {
              player: { id: 1, name: "Julia" },
              values: [29, 27, 30]
            },
            {
              player: { id: 1, name: "Jose" },
              values: [32, 26, 24]
            }
          ],
          deliveryTerms: [38, 46, 110],
          individualAverage: [30, 26, 27],
          chartLabels: ["Lotes de 5", "Lotes de 10", "Lotes de 20"],
          chartData: [
            {
              label: "Promedio individual",
              borderColor: "#333",
              lineTension: 0.2,
              data: [30, 26, 27],
            },
            {
              label: "Plazo de entrega",
              borderColor: "#e64a19",
              lineTension: 0.2,
              data: [38, 46, 110],
            },
            
          ]
        }
      }
    };
  },
  components: {
    BarChart,
    LineChart
  },
  computed: {
    resume() {
      return this. $store.state.pennyModule.gameResults;
    }
  },
  beforeCreate() {
    this.$store.dispatch("get_results_by_room", this.$route.params.id);
  },
};
</script>

<style scoped>
.table-row-color td,
.table-row-color th {
  background-color: #ffecb3 !important;
  border-top: 1px solid #e64a19;
  font-weight: 500;
}
</style>
