<template>
  <el-form ref="form" label-width="80px" size="normal">
    <el-form-item label="SPU名称" size="normal"> </el-form-item>
    <el-form-item label="sku名称">
      <el-input placeholder="请输入sku名称" style="width: 500px"></el-input>
    </el-form-item>
    <el-form-item label="价格(元)">
      <el-input placeholder="请输入价格" style="width: 500px"></el-input>
    </el-form-item>
    <el-form-item label="重量(千克)">
      <el-input placeholder="请输入价格" style="width: 500px"></el-input>
    </el-form-item>
    <el-form-item label="规格描述">
      <el-input type="textarea" maxlength="30" rows="4"></el-input>
    </el-form-item>
    <el-form-item label="平台属性">
      <el-form label-width="80px" :inline="true" size="normal">
        <el-form-item label="屏幕尺寸" size="normal">
          <el-select value="" placeholder="请选择" clearable @change="">
            <el-option key="" label="" value=""></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="销售属性">
      <el-form label-width="80px" :inline="true" size="normal">
        <el-form-item label="屏幕尺寸" size="normal">
          <el-select value="" placeholder="请选择" clearable @change="">
            <el-option key="" label="" value=""></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="图片列表" size="normal">
      <el-table border stripe>
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column
          label="图片"
          width="col.width"
          align="center"
        ></el-table-column>
        <el-table-column
          label="名称"
          width="col.width"
          align="center"
        ></el-table-column>
        <el-table-column
          label="操作"
          width="col.width"
          align="center"
        ></el-table-column>
      </el-table>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit">保存</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      spuImageList: [],
      spuSaleAttrList: [],
      attrInfoList: [],
    };
  },
  methods: {
    onSubmit() {},
    initSkuData(id1, id2, row) {
      Promise.all([
        this.$API.spu.spuImageList(row.id),
        this.$API.spu.spuSaleAttrList(row.id),
        this.$API.spu.attrInfoList(id1, id2, row.id),
      ]).then((res) => {
        console.log(res);
        if (res[0].code == 200 && res[1].code == 200 && res[2].code == 200) {
          this.spuImageList = res[0].data;
          this.spuSaleAttrList = res[1].data;
          this.attrInfoList = res[2].data;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
