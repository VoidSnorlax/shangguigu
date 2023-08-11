<template>
  <el-form ref="form" label-width="80px" size="normal">
    <el-form-item label="SPU名称" size="normal"
      >{{ row.spuName }}
    </el-form-item>
    <el-form-item label="sku名称">
      <el-input
        placeholder="请输入sku名称"
        style="width: 500px"
        v-model="skuInfo.skuName"
      ></el-input>
    </el-form-item>
    <el-form-item label="价格(元)">
      <el-input
        placeholder="请输入价格"
        style="width: 500px"
        type="number"
        v-model="skuInfo.price"
      ></el-input>
    </el-form-item>
    <el-form-item label="重量(千克)">
      <el-input-number
        v-model="skuInfo.weight"
        :min="1"
        :max="10"
        label="描述文字"
      ></el-input-number>
    </el-form-item>
    <el-form-item label="规格描述">
      <el-input
        type="textarea"
        maxlength="30"
        rows="4"
        v-model="skuInfo.skuDesc"
      ></el-input>
    </el-form-item>
    <el-form-item label="平台属性">
      <el-form label-width="80px" :inline="true" size="normal">
        <el-form-item
          :label="item.attrName"
          size="normal"
          v-for="(item, index) in attrInfoList"
          :key="item.id"
        >
          <el-select v-model="item.ValueOrId" placeholder="请选择">
            <el-option
              :label="item1.valueName"
              :value="`${item1.id}:${item.id}`"
              v-for="(item1, index) in item.attrValueList"
              :key="item1.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="销售属性">
      <el-form label-width="80px" :inline="true" size="normal">
        <el-form-item
          label="屏幕尺寸"
          size="normal"
          v-for="(item, index) in spuSaleAttrList"
          :key="item.id"
        >
          <el-select
            v-model="item.spuvalueOrId"
            placeholder="请选择"
            clearable
            @change=""
          >
            <el-option
              :label="item1.saleAttrValueName"
              :value="`${item1.id}:${item.id}`"
              v-for="(item1, index) in item.spuSaleAttrValueList"
              :key="item1.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="图片列表" size="normal">
      <el-table
        border
        :data="spuImageList"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column label="图片" width="col.width" align="center">
          <template slot-scope="{ row, $index }">
            <img :src="row.imgUrl" style="height: 25%; width: 25%" />
          </template>
        </el-table-column>
        <el-table-column
          label="名称"
          width="col.width"
          align="center"
          prop="imgName"
        ></el-table-column>
        <el-table-column label="操作" width="col.width" align="center">
          <template slot-scope="{ row, $index }">
            <el-button
              type="primary"
              size="default"
              v-if="row.isDefault == 0"
              @click="isDefault(row)"
              >设置默认</el-button
            >
            <el-button v-else>默认</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit">保存</el-button>
      <el-button @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import api from "@/api";
import { Message } from "element-ui";

export default {
  data() {
    return {
      spuImageList: [],
      spuSaleAttrList: [],
      attrInfoList: [],
      row: {},
      skuInfo: {
        category3id: "",
        spuld: "",
        tmId: "", //第二类:需要通过数据双向绑定v-m
        skuName: "",
        price: "",
        weight: "",
        skuDesc: "",
        skuDefaultImg: "",
        //收集图片的字段
        skuImageList: [],
        //平台属性
        skuAttrValueList: [],
        //销售属性
        skuSaleAttrValueList: [],
      },
      ImgList: [],
    };
  },
  methods: {
    async onSubmit() {
      let { category3Id, tmId, id } = this.row;
      this.skuInfo.category3id = category3Id;
      this.skuInfo.tmId = tmId;
      this.skuInfo.spuld = id;
      this.attrInfoList.forEach((item, index) => {
        if (item.ValueOrId) {
          let [valueId, attrId] = item.ValueOrId.split(":");
          let obj = { attrId, valueId };
          this.skuInfo.skuAttrValueList.push(obj);
        }
      });
      this.spuSaleAttrList.forEach((item, index) => {
        if (item.spuvalueOrId) {
          let [saleAttrValueId, saleAttrId] = item.spuvalueOrId.split(":");
          let obj = { saleAttrId, saleAttrValueId };
          this.skuInfo.skuSaleAttrValueList.push(obj);
        }
      });
      this.skuInfo.skuImageList = this.ImgList.map((item, index) => {
        return {
          imgName: item.imgName,
          imgUrl: item.imgUrl,
          isDefault: item.isDefault,
          spuImgId: item.id,
        };
      });
      let res = await this.$API.spu.saveData(this.skuInfo);
      if (res.code == 200) {
        this.$message.success("添加成功");
        this.$emit("cancel", 0);
      }
    },
    /**
     * 
     * @param {*} id1 
     * @param {*} id2 
     * @param {*} row 
     */
    initSkuData(id1, id2, row) {
      this.row = row;
      Promise.all([
        this.$API.spu.spuImageList(row.id),
        this.$API.spu.spuSaleAttrList(row.id),
        this.$API.spu.attrInfoList(id1, id2, row.id),
      ]).then((res) => {
        console.log(res);
        if (res[0].code == 200 && res[1].code == 200 && res[2].code == 200) {
          let list = res[0].data;
          (list || []).forEach((item, index) => {
            item.isDefault = 0;
          });
          this.spuImageList = list;
          console.log(list);
          this.spuSaleAttrList = res[1].data;
          this.attrInfoList = res[2].data;
        }
      });
    },
    //设置默认(只允许有一个默认)
     isDefault(row) {
      /* 
        排他算法
        1.点击谁设置谁为默认(通过参数row)
        2.将数组其他的改为不默认(遍历数组设置参数)
      */
      this.spuImageList.forEach((item, index) => {
        item.isDefault = 0;
      });
      row.isDefault = 1;
      this.skuInfo.skuDefaultImg = row.imgUrl;
    },
    //选中行
    handleSelectionChange(params) {
      this.ImgList = params;
    },
    //取消
    cancel() {
      Object.assign(this._data, this.$options.data());
      this.$emit("cancel", 0);
    },
  },
};
</script>

<style lang="scss" scoped></style>
