<template>
  <div class="">
    <!-- 按钮el-button -->
    <el-button
      type="primary"
      icon="el-icon-plus"
      style="margin: 10px 0"
      @click="showDialog"
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
        <!-- row对应这一行的信息 -->
        <template slot-scope="{ row, $index }">
          <el-button
            type="warning"
            size="mini"
            @click="update(row)"
            icon="el-icon-edit"
            >操作</el-button
          >
          <el-button
            type="danger"
            size="mini"
            @click="del(row)"
            icon="el-icon-delete"
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
    <el-dialog
      :title="tmFrom.id ? '修改品牌' : '添加品牌'"
      :visible.sync="dialogFormVisible"
    >
      <!-- 表单el-form 
           model收集表单数据存放于那个对象
           rules定义表单规则(规范用户输入) 
      -->
      <el-form style="width: 80%" :model="tmFrom" :rules="rules" ref="ruleForm">
        <!--el-form-item表单的每一项
            label名称
            prop与规则对象名对应(:rules="rules",rules对象里的属性)   
         -->
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <!--v-model双向数据绑定收集到表单绑定的数据对象中(:model="tmFrom")  -->
          <el-input autocomplete="off" v-model="tmFrom.tmName"></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
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
              只能上传jpg/png文件,且不超过500kb
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
      tmFromFrom: {}, //备份数据
      //验证规则
      rules: {
        tmName: [
          { required: true, message: "请输入品牌名称", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" },
        ],
        logoUrl: [{ required: true, message: "请上传LOGO图片" }],
      },
    };
  },
  mounted() {
    //获取列表数据方法
    this.getPageList();
  },
  methods: {
    //获取表格数据(如果不传入参数默认第一页)
    async getPageList(page = 1) {
      //解构参数
      //const { page, limit } = this;
      //获取品牌列表接口
      let res = await this.$API.trademark.reqTreadeMark(page, this.limit);
      if (res.code == 200) {
        let { data } = res; //解构
        this.total = data.total;
        this.list = data.records;
      }
    },
    //点击页数
    handleCurrentChange(pager) {
      //pager为当前页数
      console.log(pager);
      this.page = pager; //赋值给分页器第几页
      this.getPageList(pager); //调用显示列表接口
    },
    //点击显示条数
    handleSizeChange(limit) {
      this.limit = limit;
      this.getPageList();
    },
    //显示对话框方法
    showDialog() {
      //每次显示对话框都将数据清楚
      this.dialogFormVisible = true;
      this.tmFrom.tmName = "";
      this.tmFrom.logoUrl = "";
      this.tmFrom.id = "";
    },
    //修改方法
    update(row) {
      //row是当前选中行的信息
      this.tmFrom = JSON.parse(JSON.stringify(row)); //深拷贝数据(双向绑定,不进行深拷贝会导致数据修改同步变化)
      this.tmFromFrom = JSON.parse(JSON.stringify(row));
      this.dialogFormVisible = true;
    },
    //上传成功的回调
    handleAvatarSuccess(res, file) {
      //res:上传成功之后返回给前端的数据
      //file:上传成功后服务器返回的数据
      this.imageUrl = URL.createObjectURL(file.raw);
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
    //新增修改接口
    addOrUpdate() {
      //如果数据没有发生修改,直接关闭对话框,不进行任何操作(将数据进行备份,判断两个数据是否相等)
      if (JSON.stringify(this.tmFromFrom) === JSON.stringify(this.tmFrom)) {
        this.dialogFormVisible = false;
        return true;
      }
      //调用表单自带的验证方法(传入一个回调函数)
      this.$refs.ruleForm.validate(async (success) => {
        //如果通过验证
        if (success) {
          this.dialogFormVisible = false; //关闭对话框
          let res = await this.$API.trademark.reqAdd(this.tmFrom); //调用接口
          if (res.code == 200) {
            //弹出信息
            this.$message.success(this.tmFrom.id ? "修改成功" : "添加成功");
            //再次获取数据(如果是修改就刷新显示当前页,如果是新增就显示第一页)
            this.getPageList(this.tmFrom.id ? this.page : 1);
          }
          this.tmFrom.id = "";
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //删除功能
    del(row) {
      //调用UI组件弹框
      this.$confirm(`是否删除${row.tmName}`, "删除", {
        distinguishCancelAndClose: true,
        confirmButtonText: "删除", //确定按钮
        cancelButtonText: "取消", //取消按钮
      })
        .then(async () => {
          let res = await this.$API.trademark.del(row.id); //调用删除接口(传入ID)
          //如果成功提示用户
          if (res.code == 200) {
            this.$message({
              type: "success",
              message: "删除成功",
            });
            //刷新页面(如果数据大于1,显示本页,如果小于1显示上一页)
            this.getPageList(this.list.length > 1 ? this.page : this.page - 1);
          }
        })
        //取消删除
        .catch((action) => {
          this.$message({
            type: "info",
            message: "取消删除",
          });
        });
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
