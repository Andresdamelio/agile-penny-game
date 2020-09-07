<script>
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  data() {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: false,
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
  mounted () {
    let config = {
      labels: this.labels,
      datasets: this.datasets
    };
    this.renderChart(config, this.options);
    this.$refs.canvas.height = 'auto';
  }
}
</script>