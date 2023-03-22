<template>
  <el-card shadow="always" :body-style="{ padding: '20px' }">
    <div slot="header">
      <div class="el-haeader">
        <span>线上热门搜索</span>
        <el-dropdown>
          <span class="el-dropdown-link">
            <i class="el-icon-more"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
            <el-dropdown-item>双皮奶</el-dropdown-item>
            <el-dropdown-item>蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div>
      <el-row>
        <el-col :span="12"><lines></lines></el-col>
        <el-col :span="12"><lines></lines></el-col>
      </el-row>
      <el-table :data="tableData" style="width: 100%" border class="table">
        <el-table-column label="排名" type="index" width="80">
        </el-table-column>
        <el-table-column label="搜索关键字" width="180"> </el-table-column>
        <el-table-column label="用户数" sortable> </el-table-column>
        <el-table-column label="地址" sortable> </el-table-column>
      </el-table>
      <el-pagination layout="prev, pager, next" :total="50" class="pagination">
      </el-pagination>
    </div>
  </el-card>
</template>

<script>
import lines from "./linecharts/index.vue";
export default {
  name: "category",
  data() {
    return {
      tableData: [],
    };
  },
  components: {
    lines,
  },
};
</script>

<style scoped>
.el-haeader {
  display: flex;
  justify-content: space-between;
}
.table {
  margin-top: 10px;
}
.pagination {
  float: right;
}
</style>
