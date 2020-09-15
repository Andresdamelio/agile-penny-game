<script>
import { Line } from "vue-chartjs";

export default {
  extends: Line,
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
                labelString: "Tamaños de lote"
              }
            }
          ],
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "Tiempo (seg)"
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
    }
  },
  mounted() {
    let config = {
      labels: this.labels,
      datasets: this.datasets
    };
    this.renderChart(config, this.options);
    document.getElementById("horizontalbar-chart").height = "auto";
  }
};
</script>