<template>
  <div>
    <div class="header"><span>{{ title }}</span><i class="el-icon-info"></i></div>
    <div class="context">{{value}}</div>
    <div class="charts">
      <slot name="charts"></slot>
    </div>
    <div class="footer"><slot name="footer"></slot></div>
  </div>
</template>

<script>
export default {
  name: "details",
  props: ["title",'value'],
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
}
.context {
  font-size: 50px;
  padding: 10px 0;
}
.charts {
  height: 40px;
}
.footer {
  border-top: 1px solid wheat;
  padding: 10px 0;
}
</style>
