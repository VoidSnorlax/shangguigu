<template>
  <div class="">
    <el-card shadow="always" style="margin: 10px">
      <CreateSelect @getID="getID" :show="show !== 0"></CreateSelect>
    </el-card>
    <el-card shadow="always">
      <!-- Sku列表展示 -->
      <div v-show="show == 0">
        <!-- 增加按钮 -->
        <el-button
          type="primary"
          size="default"
          icon="el-icon-plus"
          style="margin: 10px"
          :disabled="!category3Id"
          @click="addSpu"
          >Sku增加</el-button
        >
        <!-- 数据展示表格 -->
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
              <Hitbutton
                type="primary"
                size="mini"
                icon="el-icon-plus"
                :title="name[0]"
                @click="optionSku(row)"
              ></Hitbutton>
              <Hitbutton
                type="success"
                size="mini"
                icon="el-icon-edit"
                :title="name[1]"
                @click="updateSpu(row)"
              ></Hitbutton>
              <el-popconfirm
                title="这是一段内容确定删除吗？"
                @onConfirm="del(row)"
              >
                <Hitbutton
                  type="warning"
                  size="mini"
                  icon="el-icon-delete"
                  :title="name[2]"
                  slot="reference"
                ></Hitbutton>
              </el-popconfirm>

              <Hitbutton
                type="info"
                size="mini"
                icon="el-icon-warning"
                :title="name[3]"
                @click="message(row)"
              ></Hitbutton>
            </template>
          </el-table-column>
        </el-table>
        <!-- 
          分页器 
          current-page:当前页
        -->
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

        <!-- 对话框 -->

        <el-dialog
          :title="row.spuName"
          :visible.sync="dialogTableVisible"
          :before-close="close"
        >
          <el-table
            :data="messageData"
            style="width: 100%"
            border
            v-loading="loading"
          >
            <el-table-column
              property="skuName"
              label="名称"
              width="150"
            ></el-table-column>
            <el-table-column
              property="price"
              label="价格"
              width="200"
            ></el-table-column>
            <el-table-column
              property="weight"
              label="重量"
              width="200"
            ></el-table-column>
            <el-table-column property="name" label="默认图片" width="400">
              <template slot-scope="{ row, $index }">
                <img
                  :src="row.skuDefaultImg"
                  alt=""
                  style="width: 100px; height: 100px"
                />
              </template>
            </el-table-column>
          </el-table>
        </el-dialog>
      </div>
      <!-- 添加或者修改SPU -->
      <Spuform v-show="show == 1" @cacel="cacel" ref="spf"></Spuform>
      <!-- 添加Sku -->
      <Skuform v-show="show == 2" ref="skf" @cancel="canel"></Skuform>
    </el-card>
  </div>
</template>

<script>
import Skuform from "./Skuform";
import Spuform from "./Spuform";
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
      limit: 3, //每一页多少条
      records: [], //获取数据
      total: 0, //分页器一共需要多少数据
      show: 0, //控制显示组件(0:Sku列表展示,1:添加或者修改SPU,2:添加Sku)
      name: ["操作", "更新", "删除", "信息"],
      dialogTableVisible: false, //控制对话框显示
      row: {}, //点击查看信息传入的表格行数据
      messageData: [], //获取信息数据
      loading: true, //等待动画
    };
  },
  methods: {
    //获取列表数据
    async getList(pages = 1) {
      //默认参数为1(如果不传入其他参数,默认是1)
      this.page = pages; //赋值page参数
      let { page, limit, category3Id } = this; //解构出需要的参数
      let res = await this.$API.sku.getProduct(page, limit, category3Id); //发送请求
      if (res.code == 200) {
        this.total = res.data.total;
        this.records = res.data.records;
      }
    },
    //自定义事件(获取子组件CreateSelect传入的分类产品ID)
    getID({ ID, leave }) {
      /* 当第三个下拉菜单触发时传入对应的ID,调用获取方法 */
      if (leave == 1) {
        this.id1 = ID;
        this.id2 = ""; //防止再次改变时数据出现问题(每一次改变数据的时候都讲剩余ID的置空)
        this.id3 = "";
      } else if (leave == 2) {
        this.id2 = ID;
        this.id3 = "";
      } else {
        this.category3Id = ID;
        this.getList();
      }
    },
    //点击改变显示数量
    handleSizeChange(limt) {
      //limit为每页条数
      this.limit = limt;
      this.getList();
    },
    //Sku增加
    addSpu() {
      this.show = 1; //打开编辑模式
      this.$refs.spf.addSku(this.category3Id); //调用子组件的方法(这样可以每点击一次都发送一次请求)
    },
    //自定义事件(子组件触发用于从编辑模式回到展示数据模式)
    cacel({ sence, flag }) {
      /*
        1.接受子组件传来的数据
        2.改变显示值(show)
      */
      this.show = sence; //控制显示
      //如果传入的是修改就调用获取列表数据并传入当前页
      if (flag == "修改") {
        this.getList(this.page);
      } else {
        //如果是新增就直接调用方法(默认参数为第一页)
        this.getList();
      }
    },
    //修改Sku
    updateSpu(row) {
      this.show = 1; //显示编辑模式
      this.$refs.spf.initSpudata(row); //在父组件直接调用子组件方法(initSpudata)传入每一行的数据
    },
    //删除方法
    async del(row) {
      let { id } = row; //解构出需要的参数
      let res = await this.$API.sku.delSpu(id); //调用接口发送请求
      if (res.code == 200) {
        this.$message.success("删除成功"); //提示用户
        /*
          如果数据小于1就返回上一页，大于1就是当前页,防止出现空数据页的情况
        */
        this.getList(this.records.length > 1 ? this.page : this.page - 1);
      }
    },
    //操作Sku
    optionSku(row) {
      this.show = 2; //切换显示
      this.$refs.skf.initSkuData(this.id1, this.id2, row); //调用子组件方法传入参数
    },
    //自定义事件(子组件触发用于从编辑模式回到展示数据模式)
    canel(num) {
      this.show = num;
    },
    //查看信息
    async message(row) {
      this.dialogTableVisible = true; //打开对话框
      this.row = row; //赋值
      let res = await this.$API.spu.Skulist(row.id); //调用接口
      if (res.code == 200) {
        this.loading = false;
        this.messageData = res.data;
      }
    },
    //关闭对话框回调
    close(done) {
      this.loading = true;
      this.messageData = [];
      done();
    },
  },
  components: {
    Skuform, //注册组件
    Spuform,
  },
};
</script>

<style scoped></style>
