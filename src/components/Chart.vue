<template>
  <div>
    <div id="chart"></div>
  </div>
</template>

<script>
import ApexCharts from "apexcharts";

export default {
  props: {
    chartType: String,
    xAxisType: String,
    chartName: String,
    seriesData: Array,
  },

  mounted() {
    var options = {
      chart: {
        type: this.$props.chartType,
      },
      series: [
        {
          name: this.$props.chartName,
          data: this.$props.seriesData,
        },
      ],
      xaxis: {
        type: this.$props.xAxisType,
      },
    };

    var chart = new ApexCharts(document.querySelector("#chart"), options);

    chart.render();
  },
};
</script>