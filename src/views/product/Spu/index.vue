<template>
  <div class="">
    <!-- 表格 -->
    <el-table :data="record" border stripe>
      <el-table-column type="index" label="序号" width="80" align="center">
      </el-table-column>
      <el-table-column prop="skuName" label="名称" width="col.width">
      </el-table-column>
      <el-table-column prop="skuDesc" label="描述" width="col.width">
      </el-table-column>
      <el-table-column prop="col.id" label="默认图片" width="110">
        <template slot-scope="{ row, $index }">
          <img :src="row.skuDefaultImg" style="width: 80px; height: 80px" />
        </template>
      </el-table-column>
      <el-table-column prop="weight" label="重量" width="80"> </el-table-column>
      <el-table-column prop="price" label="价格" width="80"> </el-table-column>
      <el-table-column prop="col.id" label="操作" width="col.width">
        <template slot-scope="{ row, $index }">
          <el-button
            type="success"
            size="mini"
            icon="el-icon-top"
            v-if="row.isSale == 0"
            @click="down(row)"
          ></el-button>
          <el-button
            type="info"
            size="mini"
            icon="el-icon-bottom"
            v-else
            @click="up(row)"
          ></el-button>
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-edit"
            @click="edit"
          ></el-button>
          <el-button
            type="info"
            size="mini"
            icon="el-icon-info"
            @click="showThis(row)"
          ></el-button>
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      style="text-align: center"
      @size-change="sizeChange"
      @current-change="getList"
      :current-page="1"
      :page-sizes="[3, 5, 10]"
      :page-size="10"
      layout=" prev, pager, next, jumper,->,total, sizes"
      :total="totals"
      background
    >
    </el-pagination>
    <!-- 抽屉 -->
    <el-drawer :visible.sync="show" direction="rtl" size="50%">
      <el-row>
        <el-col :span="5">名称:</el-col>
        <el-col :span="16">{{ infoData.skuName }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">描述:</el-col>
        <el-col :span="16">{{ infoData.skuDesc }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">价格:</el-col>
        <el-col :span="16">{{ infoData.price }}元</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">平台属性:</el-col>
        <el-col :span="16"
          ><el-tag
            type="success"
            size="normal"
            v-for="(item, index) in infoData.skuAttrValueList"
            :key="(item, id)"
            style="margin-right: 3px"
            >{{ item.attrId }}-{{ item.valueId }}</el-tag
          >
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">商品图片:</el-col>
        <el-col :span="16">
          <el-carousel height="450px" width="450px">
            <el-carousel-item
              v-for="item in infoData.skuImageList"
              :key="item.id"
            >
              <img :src="item.imgUrl" style="width: 100%; height: 100%" />
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: "Spu",
  data() {
    return {
      record: [],
      limits: 10,
      totals: 10,
      page: 1,
      show: false,
      infoData: {},
    };
  },
  methods: {
    currentChange() {},
    sizeChange(limit) {
      this.limits = limit;
      this.getList();
    },
    async getList(pages = 1) {
      this.page = pages;
      let res = await this.$API.spu.reqList(this.page, this.limits);
      console.log(res);
      if (res.code == 200) {
        this.record = res.data.records;
        this.totals = res.data.total;
      }
    },
    async down(row) {
      row.isSale = 1;
      let res = await this.$API.spu.reqCancel(row.id);
      console.log(res);
      if (res.code == 200) {
        this.$message.success("下架成功");
      }
    },
    async up(row) {
      row.isSale = 0;
      let res = await this.$API.spu.reqSale(row.id);
      if (res.code == 200) {
        this.$message.success("上架成功");
      }
    },
    edit() {
      this.$message("尚未开发完成");
    },
    async showThis(row) {
      this.show = true;
      let res = await this.$API.spu.reqGetSku(row.id);
      if (res.code == 200) {
        this.infoData = res.data;
      }
    },
  },
  mounted() {
    this.getList();
  },
};
</script>
<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
<style scoped>
.el-row .el-col-5 {
  text-align: center;
  font-size: 18px;
}
.el-col {
  margin: 10px 10px;
}
</style>
