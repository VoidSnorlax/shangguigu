<template>
  <div class="">
    <el-card shadow="always" style="margin: 10px">
      <CreateSelect @getID="getID" :show="!showthis"></CreateSelect>
    </el-card>
    <el-card shadow="always">
      <div>
        <el-button
          type="primary"
          size="default"
          icon="el-icon-plus"
          style="margin: 10px"
          >Sku增加</el-button
        >
        <el-table :data="records" border stripe style="width: 100%">
          <el-table-column label="序号" type="index" width="80" align="center">
          </el-table-column>
          <el-table-column
            prop="spuName"
            label="名称"
            width="150"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="description"
            label="描述"
            width="col.width"
            align="center"
          >
          </el-table-column>
          <el-table-column label="操作" width="col.width" prop="attrValueList">
            <template slot-scope="{ row, $index }">
              <el-button type="primary" size="mini"></el-button>
              <el-button type="success" size="mini"></el-button>
              <el-button type="warning" size="mini"></el-button>
              <el-button type="primary" size="mini"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          :current-page="1"
          :page-size="limit"
          :page-sizes="[3, 5, 10]"
          layout="prev,pager,next ,->,sizes, total"
          :total="total"
          @current-change="getList"
          @size-change="handleSizeChange"
          style="margin-top: 20px; text-align: center"
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Sku",
  data() {
    return {
      showthis: true,
      id1: "", //一级分类产品ID
      id2: "", //二级分类产品ID
      category3Id: "", //三级分类产品ID
      dataList: [],
      page: 1, //分页器当前第几页
      limit: 6, //每一页多少条
      records: [], //获取数据
      total: 0, //分页器一共需要多少数据
    };
  },
  methods: {
    async getList(pages = 1) {
      this.page = pages;
      let { page, limit, category3Id } = this;
      let res = await this.$API.sku.getProduct(page, limit, category3Id);
      console.log(res);
      if (res.code == 200) {
        this.total = res.data.total;
        this.records = res.data.records;
      }
    },
    getID({ ID, leave }) {
      if (leave == 1) {
        this.id1 = ID;
        this.id2 = "";
        this.id3 = "";
      } else if (leave == 2) {
        this.id2 = ID;
        this.id3 = "";
      } else {
        this.category3Id = ID;
        this.getList();
      }
    },
    handleSizeChange(limt) {
      this.limit = limt;
      this.getList();
    },
  },
};
</script>

<style scoped></style>
