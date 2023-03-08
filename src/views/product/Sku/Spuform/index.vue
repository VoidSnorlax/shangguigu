<template>
  <div class="">
    <el-form ref="form" label-width="80px" :model="spu">
      <el-form-item label="SPU名称">
        <el-input placeholder="请输入Spu" v-model="spu.spuName"></el-input>
      </el-form-item>
      <el-form-item label="品牌">
        <el-select placeholder="请选则" clearable v-model="spu.tmId">
          <el-option
            :label="item.tmName"
            :value="item.id"
            v-for="(item, index) in TrademarkList"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input
          type="textarea"
          placeholder="请输入内容"
          maxlength="30"
          show-word-limit
          v-model="spu.description"
        ></el-input>
      </el-form-item>
      <el-form-item label="图片">
        <!-- 
          图片墙组件
          action上传地址
          list-type组件类型(picture-card为照片墙)
          on-preview点击展示回调
          on-remove当删除图片触发
        -->
        <el-upload
          action="list-api/admin/product/fileUpload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :file-list="spuImageList"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog visible.sync="">
          <img width="100%" src="" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-select clearable filterable placeholder="还有三个未选择" value="">
          <el-option label="label" value="value"> </el-option>
        </el-select>
        <el-button
          type="primary"
          size="default"
          icon="el-icon-plus "
          style="margin-left: 10px"
          >选则</el-button
        >
        <el-table border stripe style="width: 100%">
          <el-table-column label="序号" type="index" width="80" align="center">
          </el-table-column>
          <el-table-column label="属性值名称" width="col.width" align="center">
          </el-table-column>
          <el-table-column label="操作" width="col.width"> </el-table-column>
        </el-table>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button @click="$emit('cacel', 0)">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
/* 
  Spuform发请求分析:
  1.不能将发请求的操作放在mounted中,因为每一次显示Spuform都会重新发送请求,
    因为v-show只是控制子组件的显示与隐藏,子组件并没有卸载(只是显示与隐藏,v-if是挂载与卸载),导致mounted 
    只能执行一次 
    1.1通过父组件调用this.$refs.组件名.方法的API在父组件直接调用子组件的方法,用来解决上面的问题
*/
export default {
  name: "Spuform",
  data() {
    return {
      /* 表单数据 */
      spu: {
        category3Id: 0, //三级分类ID
        description: "", //描述
        spuName: "", //spu名称
        tmId: "", //品牌ID
        id: 0,
        /* 收集图片信息 */
        spuImageList: [
          {
            id: 0,
            imgName: "string",
            imgUrl: "string",
            spuId: 0,
          },
        ],
        /* 平台属性与属性值 */
        spuSaleAttrList: [
          {
            baseSaleAttrId: 0,
            id: 0,
            saleAttrName: "string",
            spuId: 0,
            spuSaleAttrValueList: [
              {
                baseSaleAttrId: 0,
                id: 0,
                isChecked: "string",
                saleAttrName: "string",
                saleAttrValueName: "string",
                spuId: 0,
              },
            ],
          },
        ],
      },
      spuImageList: [], //照片墙数据
      TrademarkList: [], //品牌数据
    };
  },
  methods: {
    onSubmit() {},
    //初始化表单
    async initSpudata(row) {
      let { id } = row; //从父组件中解构出row(row为每一行的属性)
      let TrademarkListData = await this.$API.sku.getTrademarkList();
      if (TrademarkListData.code == 200) {
        this.TrademarkList = TrademarkListData.data;
      }
      let SpuData = await this.$API.sku.reqSpu(id);
      if (SpuData.code == 200) {
        this.spu = SpuData.data;
      }
      let SpuImageList = await this.$API.sku.getSpuImageList(id);
      if (SpuImageList.code == 200) {
        this.spuImageList = (SpuImageList.data || []).map((item, index) => {
          return {
            name: item.imgName,
            url: item.imgUrl,
          };
        });
        console.log(this.spuImageList);
      }
    },
    handlePictureCardPreview() {},
    handleRemove() {},
  },
};
</script>

<style></style>
