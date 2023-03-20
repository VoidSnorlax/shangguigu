<template>
  <div class="dashboard-container">
    <el-row :gutter="10">
      <el-col :span="6"
        ><el-card class="box-card"
          ><detail title="总销售额" value="￥126560">
            <template slot="footer">
              <span>日销售额￥ 12423</span>
            </template>
          </detail></el-card
        ></el-col
      >
      <el-col :span="6"
        ><el-card class="box-card"
          ><detail title="访问量" value="88460">
            <template slot="footer">
              <!-- 使用 v-html解决&nbsp;空格只有一个生效的问题-->
              <div v-html="` <span>日访问量 &nbsp;&nbsp;1234</span>`"></div>
            </template> </detail></el-card
      ></el-col>
      <el-col :span="6"
        ><el-card class="box-card"
          ><detail title="支付笔数" value="88462">
            <template slot="footer">
              <span>转化率&nbsp; 65%</span>
            </template>
          </detail></el-card
        ></el-col
      >
      <el-col :span="6"
        ><el-card class="box-card"
          ><detail title="运营活动效果" value="78%">
            <template slot="footer">
              <span
                >周同比 &nbsp; 12%&nbsp;<i class="el-icon-caret-top"></i
                >&nbsp;日同比 11% &nbsp; <i class="el-icon-caret-bottom"></i
              ></span>
            </template> </detail></el-card
      ></el-col>
    </el-row>
  </div>
</template>

<script>
import detail from "./detail/index.vue";
export default {
  name: "card",
  components: {
    detail,
  },
};
</script>

<style lang="scss" scoped></style>
