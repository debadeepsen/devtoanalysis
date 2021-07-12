<template>
  <div style="position:relative">
    <div class="y-axis-label">{{ yAxisLabel }}</div>
    <div id="chart"></div>
    <div class="x-axis-label">{{ xAxisLabel }}</div>
  </div>
</template>

<script>
import ApexCharts from "apexcharts";
// import { sd } from '../libraries/Constants';

export default {
  props: {
    chartType: String,
    xAxisType: String,
    chartName: String,
    xAxisLabel: String,
    yAxisLabel: String,
    seriesData: Array,
  },

  watch: {
    seriesData: function() {
      this.renderChart();
    },
  },

  mounted() {
    this.renderChart();
  },

  methods: {
    renderChart() {
      var options = {
        chart: {
          type: this.$props.chartType,
        },
        series: [
          {
            name: this.$props.chartName || "undefined",
            data: this.$props.seriesData || [],
          },
        ],
        xaxis: {
          type: this.$props.xAxisType,
        },
      };

      console.log("OPTIONS");
      console.log(options);

      var chart = new ApexCharts(document.querySelector("#chart"), options);

      chart.render();
    },
  },
};
</script>

<style scoped>
#chart {
  width: 90%;
  margin-left: 50px;
}

.x-axis-label, .y-axis-label {
  font-size: 0.85rem;
  text-align: center;
}

.y-axis-label {
  position: absolute;
  top: 40%;
  transform: rotate(-90deg);
}
</style>