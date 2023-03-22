<template>
  <el-card shadow="always" :body-style="{ padding: '20px' }">
    <div slot="header">
      <div class="header">
        <span>销售额类别占比</span>
        <el-radio-group v-model="radio3" size="small">
          <el-radio-button label="上海"></el-radio-button>
          <el-radio-button label="北京"></el-radio-button>
          <el-radio-button label="广州"></el-radio-button>
          <el-radio-button label="深圳"></el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <div>
      <div class="chart" ref="pine"></div>
    </div>
  </el-card>
</template>

<script>
import * as echarts from "echarts";
export default {
  data() {
    return {
      radio3: "上海",
    };
  },
  mounted() {
    let mychart = echarts.init(this.$refs.pine);
    mychart.setOption({
      title: {
        text: "视频",
        subtext: "1048",
        left: "center",
        top: "center",
      },
      tooltip: {
        trigger: "item",
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2,
          },
          label: {
            show: true,
            position: "outside",
          },
          labelLine: {
            show: true,
          },

          data: [
            { value: 1048, name: "视频" },
            { value: 735, name: "Direct" },
            { value: 580, name: "Email" },
            { value: 484, name: "Union Ads" },
            { value: 300, name: "Video Ads" },
          ],
        },
      ],
    });
    mychart.on("mouseover", (params) => {
      mychart.setOption({
        title: {
          text: params.data.name,
          subtext: params.data.value,
        },
      });
    });
  },
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.chart {
  width: 100%;
  height: 300px;
}
</style>
