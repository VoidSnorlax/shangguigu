<template>
  <div class="">
    <!-- 按钮el-button -->
    <el-button
      type="primary"
      icon="el-icon-plus"
      style="margin: 10px 0"
      @click="showDialog()"
      >添加</el-button
    >
    <!-- 表格组件el-table
         展示数据是安装列的方式展示
         data:表格组件展示的数据----数组类型  
         border:表格边框
    -->
    <el-table border :data="list">
      <!-- el-table-column 表格的列 
           label:显示标题
           width:对应列的宽度
           align:对齐方式
           prop:对应列的字段名 
      -->
      <el-table-column type="index" label="序号" width="80" align="center">
      </el-table-column>
      <el-table-column prop="tmName" label="品牌名称" width="col.width">
      </el-table-column>
      <el-table-column prop="col.id" label="品牌LOGO" width="col.width">
        <template slot-scope="{ row, $index }">
          <img
            :src="row.logoUrl"
            alt=""
            style="height: 100px; width: 100px; text-align: center"
          />
        </template>
      </el-table-column>
      <el-table-column prop="col.id" label="操作" width="col.width">
        <template slot-scope="{ row, $index }">
          <el-button
            type="warning"
            size="mini"
            @click="update()"
            icon="el-icon-edit"
            >操作</el-button
          >
          <el-button type="danger" size="mini" @click="" icon="el-icon-delete"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器el-pagination
         current-page:当前页 
         total:数据总数
         page-size:每一页条数
         pager-count:按钮数量
         @current-change:点击页数事件
         @size-change:页数改变事件
         可以通过layout控制分页器排版(->来控制部件位置)
    -->
    <el-pagination
      :current-page="1"
      :page-size="limit"
      :page-sizes="[3, 5, 10]"
      layout=" ->,prev,pager,next ,->,sizes, total"
      :total="total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      style="margin-top: 20px; text-align: center"
    >
    </el-pagination>
    <!-- 对话框el-dialog
         visible.sync控制对话框显示隐藏
    -->
    <el-dialog title="添加" :visible.sync="dialogFormVisible">
      <!-- 表单el-form 
           model收集表单数据存放于那个对象 
      -->
      <el-form style="width: 80%" :model="tmFrom">
        <el-form-item label="品牌名称" label-width="100px">
          <el-input autocomplete="off" v-model="tmFrom.tmName"></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px">
          <!-- 上传组件不能使用 v-model
               action:设置图片上传地址
               on-success:图片上传成功的回调
               before-upload:上传图片之前回调
               -->
          <el-upload
            class="avatar-uploader"
            action="list-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <!-- 通过 imageUrl控制图片显示-->
            <img v-if="tmFrom.logoUrl" :src="tmFrom.logoUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdate">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "tradeMark",
  data() {
    return {
      //分页器第几页
      page: 1,
      //当前页展示条数
      limit: 3,
      //总页数
      total: 0,
      //表格数据
      list: [],
      //对话框显示
      dialogFormVisible: false,
      //上传图片使用的属性
      imageUrl: "",
      //收集品牌信息(对象身上的属性必须和后端对接保持一直)
      tmFrom: {
        tmName: "",
        logoUrl: "",
      },
    };
  },
  mounted() {
    //获取列表数据方法
    this.getPageList();
    console.log(this.$API);
  },
  methods: {
    //获取表格数据
    async getPageList() {
      //解构参数
      const { page, limit } = this;
      //获取品牌列表接口
      let res = await this.$API.trademark.reqTreadeMark(page, limit);
      if (res.code == 200) {
        let { data } = res;
        this.total = data.total;
        this.list = data.records;
      }
      console.log(res);
    },
    //点击页数
    handleCurrentChange(pager) {
      console.log(pager);
      this.page = pager;
      this.getPageList();
    },
    //点击显示条数
    handleSizeChange(limit) {
      this.limit = limit;
      this.getPageList();
    },
    //增加方法
    showDialog() {
      this.dialogFormVisible = true;
      this.tmFrom.tmName = "";
      this.tmFrom.logoUrl = "";
    },
    //修改方法
    update() {
      this.dialogFormVisible = true;
    },
    //上传成功的回调
    handleAvatarSuccess(res, file) {
      //res:上传成功之后返回给前端的数据
      //file:上传成功后服务器返回的数据
      this.imageUrl = URL.createObjectURL(file.raw);
      console.log(res);
      this.tmFrom.logoUrl = res.data;
    },
    //上传之前的回调
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    async addOrUpdate() {
      this.dialogFormVisible = false;
      let res = await this.$API.trademark.reqAdd(this.tmFrom);
      console.log(res);
      if (res.code == 200) {
        //弹出信息
        this.$message(this.tmFrom.id ? "修改成功" : "添加成功");
        //再次获取数据
        this.getPageList();
      }
    },
  },
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
