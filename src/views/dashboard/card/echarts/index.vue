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
          type: "line",
          data: [90, 10, 20, 49, 55],
          itemStyle: {
            opacity: 0,
          },
          lineStyle: {
            color: "purple",
          },
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "purple", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#fff", // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
          },
        },
      ],
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
