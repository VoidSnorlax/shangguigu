<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="12"><category></category></el-col>
      <el-col :span="12"><search></search></el-col>
    </el-row>
  </div>
</template>

<script>
import category from "./Category/index.vue";
import search from "./Search/index.vue";
export default {
  components: {
    category,
    search,
  },
};
</script>

<style></style>
