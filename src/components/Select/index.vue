<template>
  <div>
    <el-form :inline="true" class="demo-form-inline" :model="categoryID">
      <el-form-item label="一级品牌">
        <el-select
          placeholder="一级品牌"
          v-model="categoryID.category1Id"
          @change="getCategory2"
        >
          <el-option
            :label="item.name"
            :value="item.id"
            v-for="(item, index) in list1"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级品牌">
        <el-select
          placeholder="二级品牌"
          v-model="categoryID.category2Id"
          @change="getCategory3"
        >
          <el-option
            :label="item.name"
            :value="item.id"
            v-for="(item, index) in list2"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级品牌">
        <el-select
          placeholder="三级品牌"
          v-model="categoryID.category3Id"
          @change="getall"
        >
          <el-option
            :label="item.name"
            :value="item.id"
            v-for="(item, index) in list3"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "CreateSelect",
  data() {
    return {
      list1: [],
      list2: [],
      list3: [],
      categoryID: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
      },
    };
  },
  mounted() {
    this.getCategory1();
  },
  methods: {
    async getCategory1() {
      let res = await this.$API.attr.category1();
      if (res.code == 200) {
        console.log(res);
        this.list1 = res.data;
      }
    },
    async getCategory2() {
      let { category1Id } = this.categoryID;
      let res = await this.$API.attr.category2(category1Id);
      if (res.code == 200) {
        this.list2 = res.data;
      }
    },
    async getCategory3() {
      let { category2Id } = this.categoryID;
      let res = await this.$API.attr.category3(category2Id);
      if (res.code == 200) {
        this.list3 = res.data;
      }
    },
    getall() {},
  },
};
</script>
<style></style>
