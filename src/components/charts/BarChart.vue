<script>
import { HorizontalBar } from "vue-chartjs";

export default {
  extends: HorizontalBar,
  data() {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "tiempo (seg)"
              },
              stacked: true,
              ticks: {
                    suggestedMin: 0,
                    suggestedMax: this.maxValTicks
                }
            }
          ],
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "Jugadores"
              },
              barThickness: 15, // number (pixels) or 'flex',/*  */
              stacked: true,
              gridLines: {
                tickMarkLength: 10
              }
            }
          ]
        }
      }
    };
  },
  props: {
    labels: {
      type: Array
    },
    datasets: {
      type: Array
    },
    maxValTicks:{
      type: Number,
      default: 100,
    }
  },

  mounted() {
    let config = {
      labels: this.labels,
      datasets: this.datasets
    };
    this.renderChart(config, this.options);
    this.$refs.canvas.height = "auto";
  }
};
</script>
<style lang="scss">
.chartjs-render-monitor {
  height: auto !important;
}
</style>