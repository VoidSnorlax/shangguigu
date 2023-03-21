<template>
  <div class="line" ref="lines"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  mounted() {
    let myecharts = echarts.init(this.$refs.lines);
    myecharts.setOption({
      xAxis: {
        show: false,
        //均分
        type: "category",
      },
      yAxis: { show: false },
      series: [
        {
          type: "bar",
          data: [90, 100, 20, 49, 55, 77,18,66],
          color: "red",
        
        },
      ],
      tooltip: {
        show: true,
      },
      grid: {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
      },
    });
  },
};
</script>

<style scoped>
.line {
  width: 100%;
  height: 100%;
}
</style>
