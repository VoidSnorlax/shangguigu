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
        //x轴刻度最大值
        min: 0,
        //x轴刻度最小值
        max: 100,
      },
      yAxis: { show: false, type: "category" },
      series: [
        {
          type: "bar",
          data: [60],
          barWidth: 10,
          //设置图形颜色
          color: "yellowgreen",
          //背景颜色设置
          showBackground: true,
          //设置文本标签
          label: {
            show: true,
            //文本内容
            formatter: "|",
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
