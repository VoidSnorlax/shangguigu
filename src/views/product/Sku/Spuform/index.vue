<template>
  <div class="">
    <el-form ref="form" label-width="80px" :model="spu">
      <!-- 输入框 -->
      <el-form-item label="SPU名称">
        <el-input placeholder="请输入Spu" v-model="spu.spuName"></el-input>
      </el-form-item>
      <!-- 选则器 -->
      <el-form-item label="品牌">
        <!-- 
          el-select选择器与el-option连用
          el-option中的value与el-select
          中的v-model绑定
        -->
        <el-select placeholder="请选则" clearable v-model="spu.tmId">
          <!-- el-option -->
          <el-option
            :label="item.tmName"
            :value="item.id"
            v-for="(item, index) in TrademarkList"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- 文本输入框 -->
      <el-form-item label="SPU描述">
        <el-input
          type="textarea"
          placeholder="请输入内容"
          maxlength="30"
          show-word-limit
          v-model="spu.description"
        ></el-input>
      </el-form-item>
      <!-- 照片墙 -->
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
          :on-success="handleAvatarSuccess"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="imgUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-select
          clearable
          :placeholder="`还有${selectData.length}个没有选则`"
          v-model="attrID"
        >
          <el-option
            :label="item.name"
            :value="`${item.id}:${item.name}`"
            v-for="(item, index) in selectData"
            :key="item.id"
          ></el-option>
        </el-select>
        <el-button
          type="primary"
          size="default"
          icon="el-icon-plus "
          style="margin-left: 10px"
          :disabled="!attrID"
          @click="addData"
          >选则</el-button
        >
        <el-table border stripe style="width: 100%" :data="spu.spuSaleAttrList">
          <el-table-column label="序号" type="index" width="80" align="center">
          </el-table-column>
          <el-table-column
            label="属性值名称"
            width="col.width"
            align="center"
            prop="saleAttrName"
          >
          </el-table-column>
          <el-table-column label="属性值列表" width="col.width" align="center">
            <template slot-scope="{ row, $index }">
              <el-tag
                :key="tag.id"
                v-for="(tag, index) in row.spuSaleAttrValueList"
                closable
                :disable-transitions="false"
                @close="handleClose(row, index)"
                style="margin: 3px"
              >
                {{ tag.saleAttrValueName }}
              </el-tag>
              <!--
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm" 
              -->
              <el-input
                class="input-new-tag"
                v-if="row.flag"
                v-model="row.inputvalue"
                ref="saveTagInput"
                size="small"
                style="width: 50px"
                @blur="handleInputConfirm(row)"
              >
              </el-input>
              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="addAttrValue(row)"
                >+ 添加</el-button
              >
            </template>
          </el-table-column>
          <el-table-column label="操作" width="col.width">
            <template slot-scope="{ row, $index }">
              <div>
                <el-button
                  type="danger"
                  size="mini"
                  icon="el-icon-delete"
                  @click="spu.spuSaleAttrList.splice($index, 1)"
                ></el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button @click="cancle">取消</el-button>
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
        spuImageList: [],
        /* 平台属性与属性值 */
        spuSaleAttrList: [],
      },
      spuImageList: [], //照片墙数据
      TrademarkList: [], //品牌数据
      BaseSaleAttrList: [], //销售属性
      attrID: "", //收集未选则属性的ID
      imgUrl: "", //图片地址
      dialogVisible: false, //控制图片展示
    };
  },
  methods: {
    async onSubmit() {
      this.spu.spuImageList = this.spuImageList.map((item, index) => {
        return {
          imgName: item.name,
          imgUrl: item.url,
        };
      });
      let res = await this.$API.sku.reqSaveOrUpdate(this.spu);
      if (res.code == 200) {
        this.$message.success("添加完成");
        this.$emit("cacel", { sence: 0, flag: this.spu.id ? "修改" : "增加" });
      }
      Object.assign(this._data, this.$options.data());
    },
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
      let BaseSaleAttrList = await this.$API.sku.getBaseSaleAttrList();
      console.log(BaseSaleAttrList);
      if (BaseSaleAttrList.code == 200) {
        this.BaseSaleAttrList = BaseSaleAttrList.data;
      }
    },
    handlePictureCardPreview(file) {
      this.imgUrl = file.url;
      this.dialogVisible = true;
    },
    handleRemove(file, fileList) {
      this.spuImageList = fileList;
    },
    handleAvatarSuccess(response, file, fileList) {
      this.spuImageList = fileList;
      console.log(file);
      file.url = response.data;
    },
    handleClose(row, index) {
      row.spuSaleAttrValueList.splice(index, 1);
    },
    addData() {
      let [baseSaleAttrId, saleAttrName] = this.attrID.split(":");
      let obj = { baseSaleAttrId, saleAttrName, spuSaleAttrValueList: [] };
      this.spu.spuSaleAttrList.push(obj);
      this.attrID = "";
    },
    addAttrValue(row) {
      this.$set(row, "flag", "true");
      this.$set(row, "inputvalue", "");
      this.$nextTick(() => {
        this.$refs.saveTagInput.focus();
      });

      //
    },
    handleInputConfirm(row) {
      row.flag = false;
      let { baseSaleAttrId, saleAttrName, spuId, inputvalue } = row;
      if (inputvalue.trim() == "") {
        this.$message.warning("请输入正确的属性值");
        return;
      }
      let res = (row.spuSaleAttrValueList || []).some((item, index) => {
        return item.saleAttrValueName == inputvalue;
      });
      if (res) {
        this.$message.warning("不允许有重复的值");
        return;
      }
      let obj = {
        baseSaleAttrId,
        saleAttrName,
        spuId,
        saleAttrValueName: inputvalue,
      };
      row.spuSaleAttrValueList.push(obj);
    },
    async addSku(ID) {
      this.spu.category3Id = ID;
      let TrademarkListData = await this.$API.sku.getTrademarkList();
      if (TrademarkListData.code == 200) {
        this.TrademarkList = TrademarkListData.data;
      }
      let BaseSaleAttrList = await this.$API.sku.getBaseSaleAttrList();
      if (BaseSaleAttrList.code == 200) {
        this.BaseSaleAttrList = BaseSaleAttrList.data;
      }
    },
    cancle() {
      this.$emit("cacel", { sence: 0, flag: this.spu.id ? "修改" : "增加" });
      Object.assign(this._data, this.$options.data());
    },
  },
  computed: {
    //计算属性,过滤掉BaseSaleAttrList数组中与spuSaleAttrList数组相同属性名的数据(求两个数组的交集并返回不包含交集的数组)
    selectData() {
      let res = this.BaseSaleAttrList.filter((item, index) => {
        return this.spu.spuSaleAttrList.every((item1, index) => {
          return item.name !== item1.saleAttrName;
        });
      });
      return res;
    },
  },
};
</script>

<style></style>
