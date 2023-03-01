<template>
  <div>
    <el-form :inline="true" class="demo-form-inline" :model="categoryID">
      <el-form-item label="一级品牌">
        <el-select
          placeholder="一级品牌"
          v-model="categoryID.category1Id"
          @change="getCategory2"
        >
          <!-- value:v-model通过value获取值在绑定到model中 -->
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
      list1: [], //一级分类数据
      list2: [], //二级分类数据
      list3: [], //三级分类数据
      //收集每个分类项的ID
      categoryID: {
        category1Id: "", //一级分类产品ID
        category2Id: "", //二级分类产品ID
        category3Id: "", //三级分类产品ID
      },
    };
  },
  mounted() {
    this.getCategory1(); //在页面组件挂载完成就获取一级分类数据
  },
  methods: {
    //获取一级分类数据
    async getCategory1() {
      let res = await this.$API.attr.category1();
      if (res.code == 200) {
        this.list1 = res.data;
      }
    },
    //触发一级分类下拉框
    async getCategory2() {
      /* 
      一级分类数据改变
      将二级三级联动的数据先置空
      并将ID也置空 
      */
      this.list2 = [];
      this.list3 = [];
      this.categoryID.category2Id = "";
      this.categoryID.category3Id = "";
      this.$emit("getID", { ID: this.categoryID.category1Id, leave: 1 });//触发自定义事件
      let { category1Id } = this.categoryID; //解构一级分类产品ID
      let res = await this.$API.attr.category2(category1Id);
      if (res.code == 200) {
        this.list2 = res.data;
      }
    },
    //触发二级分类下拉框
    async getCategory3() {
      this.list3 = [];
      this.categoryID.category3Id = "";
      this.$emit("getID", { ID: this.categoryID.category2Id, leave: 2 });
      let { category2Id } = this.categoryID;
      let res = await this.$API.attr.category3(category2Id);
      if (res.code == 200) {
        this.list3 = res.data;
      }
    },
    //触发三级分类下拉框
    getall() {
      this.$emit("getID", { ID: this.categoryID.category3Id, leave: 3 });
    },
  },
};
</script>
<style scoped></style>
