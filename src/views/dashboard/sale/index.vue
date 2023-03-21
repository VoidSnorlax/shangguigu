<template>
  <el-card class="box-card">
    <!-- 卡片头部 -->
    <div slot="header" class="clearfix">
      <el-tabs @tab-click="handleClick" class="el-tabs" v-model="tabData">
        <el-tab-pane label="销售额" name="first"></el-tab-pane>
        <el-tab-pane label="访问量" name="second"></el-tab-pane>
      </el-tabs>
      <div class="right">
        <span @click="today">今日</span>
        <span @click="week">本周</span>
        <span @click="month">本月</span>
        <span @click="year">今年</span>
        <el-date-picker
          v-model="value"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          size="mini"
          class="datepicker"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </div>
    </div>
    <!-- 卡片内容 -->
    <el-row :gutter="10">
      <el-col :span="18">
        <!-- 容器 -->
        <div class="charts" ref="charts"></div>
      </el-col>
      <el-col :span="6" class="right">
        <h3>{{ title }}门店排名</h3>
        <ul>
          <li>
            <span class="rindex">0</span>
            <span>肯德基</span>
            <span class="rvalue">123456</span>
          </li>
          <li>
            <span class="rindex">1</span>
            <span>肯德基</span>
            <span class="rvalue">123456</span>
          </li>
          <li>
            <span class="rindex">3</span>
            <span>肯德基</span>
            <span class="rvalue">123456</span>
          </li>
          <li>
            <span>4</span>
            <span>肯德基</span>
            <span class="rvalue">123456</span>
          </li>
          <li>
            <span>5</span>
            <span>肯德基</span>
            <span class="rvalue">123456</span>
          </li>
          <li>
            <span>6</span>
            <span>肯德基</span>
            <span class="rvalue">123456</span>
          </li>
          <li>
            <span>7</span>
            <span>肯德基</span>
            <span class="rvalue">123456</span>
          </li>
        </ul>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import dayjs from "dayjs";
import * as echarts from "echarts";
export default {
  methods: {
    handleClick() {},
    today() {
      let today = dayjs().format("YYYY-MM-DD");
      console.log(today);
      this.value = [today, today];
    },
    week() {
      let start = dayjs().startOf("week").add(1, "day").format("YYYY-MM-DD");
      let end = dayjs().endOf("week").add(1, "day").format("YYYY-MM-DD");
      this.value = [start, end];
    },
    month() {
      let start_time = dayjs().startOf("month").format("YYYY-MM-DD");
      let end_time = dayjs().endOf("month").format("YYYY-MM-DD");
      this.value = [start_time, end_time];
    },
    year() {
      let start = dayjs().startOf("year").format("YYYY-MM-DD");
      let end = dayjs().endOf("year").format("YYYY-MM-DD");
      this.value = [start, end];
    },
  },
  data() {
    return {
      tabData: "first",
      mycharts: null,
      value: [],
    };
  },
  mounted() {
    /*
      mounted只会执行一次
      图表的标题不会随tab切换变化
      使用监听解决此问题
    */
    this.mycharts = echarts.init(this.$refs.charts);
    this.mycharts.setOption({
      title: {
        text: this.title + "趋势",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: [],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "Direct",
          type: "bar",
          barWidth: "60%",
          data: [],
          color: "yellowgreen",
        },
      ],
    });
  },
  computed: {
    //计算属性根据this.tabData的值进行数据显示处理

    title() {
      return this.tabData == "first" ? "销售额" : "访问量";
    },
  },

  watch: {
    //监视title变化
    //图表的信息可以再次赋值,如果有新的数据采用新数据,如果没有使用初始化配置的数据
    title() {
      this.mycharts.setOption({
        title: {
          text: this.title + "趋势",
        },
      });
    },
  },
};
</script>

<style scoped>
.el-tabs {
  width: 100%;
}
.box-card {
  margin: 10px 0;
}
>>> .el-card__header {
  border-bottom: none;
}
.clearfix {
  display: flex;
  justify-content: space-between;
  position: relative;
}
.right {
  position: absolute;
  right: 0px;
}
.datepicker {
  width: 260px;
  margin: 0px 20px;
}
.right span {
  margin: 0px 10px;
}
.charts {
  width: 100%;
  height: 300px;
}
ul {
  list-style: none;
  width: 100%;
  height: 300px;
  padding: 0px;
}
ul li {
  height: 8%;
  margin: 10px 0px;
}
.rindex {
  float: left;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: black;
  color: white;
  text-align: center;
}
.rvalue {
  float: right;
}
</style>
