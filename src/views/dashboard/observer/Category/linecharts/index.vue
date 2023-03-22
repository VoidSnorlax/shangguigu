<template>
  <div>
    <div class="header">
      <span class="text">搜索用户数</span>
      <i class="el-icon-info"></i>
    </div>
    <div class="main">
      <span class="main-title">12313</span
      ><span class="main-context">17.1</span>
    </div>
    <div class="footer"><div class="charts" ref="lines"></div></div>
  </div>
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
          data: [90, 10, 90, 49, 55, 97],
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
                  color: "yellow", // 0% 处的颜色
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
.text {
  margin: 20px 20px;
}
.main {
  margin-top: 10px;
}
.main-title {
  margin-right: 30px;
  margin-left: 20px;
}
.charts {
  width: 100%;
  height: 50px;
}
</style>
