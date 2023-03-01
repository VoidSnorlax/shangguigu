<template>
  <div class="">
    <el-card class="box-card" style="margin-bottom: 10px">
      <!-- 引入三级联动组件 -->
      <CreateSelect @getID="getID"></CreateSelect>
    </el-card>

    <el-card class="box-card">
      <!-- v-show="showthis"控制表格或者添加表单的显示 -->
      <!-- 显示全部属性表格 -->
      <div v-show="showthis">
        <!-- :disabled="!id3" 如果三级分类id不存在禁用按钮 -->
        <el-button
          type="primary"
          size="default"
          icon="el-icon-plus"
          style="margin: 10px"
          :disabled="!id3"
          @click="plusAttr"
          >增加</el-button
        >
        <el-table :data="dataList" border stripe style="width: 100%">
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column
            prop="attrName"
            label="序号"
            width="150"
            align="center"
          >
          </el-table-column>
          <el-table-column label="序号" width="col.width" prop="attrValueList">
            <template slot-scope="{ row, index }">
              <el-tag
                type="success"
                v-for="(item, index) in row.attrValueList"
                :key="item.id"
                style="margin: 0px 20px"
                >{{ item.valueName }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column type="index" label="序号" width="180" align="center">
            <template slot-scope="{ row, index }">
              <el-button
                type="warning"
                icon="el-icon-edit"
                @click="insertAttr(row)"
              ></el-button>
              <el-button type="primary" icon="el-icon-delete"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 修改属性表单 -->
      <div v-show="!showthis">
        <el-form ref="form" :inline="false" :model="attrInfo">
          <el-form-item label="属性名">
            <!-- v-model="attrInfo.attrName"双向绑定获取用户输入的属性名 -->
            <el-input
              placeholder="请输入属性"
              style="width: 400px"
              v-model="attrInfo.attrName"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <!-- 如果没有输入属性名按钮禁用 -->
            <el-button
              type="primary"
              icon="el-icon-plus"
              :disabled="!attrInfo.attrName"
              @click="addNew"
              >添加属性</el-button
            >
            <el-button @click="showthis = true">取消</el-button>
          </el-form-item>
        </el-form>
        <el-table
          border
          stripe
          style="margin: 20px 0"
          :data="attrInfo.attrValueList"
        >
          <el-table-column type="index" label="序号" width="80">
          </el-table-column>
          <el-table-column
            prop="valueName"
            label="属性值名称"
            width="col.width"
          >
            <template slot-scope="{ row, index }">
              <el-input
                v-model="row.valueName"
                placeholder="请输入名称"
                size="mini"
                clearable
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="col.id" label="操作" width="col.width">
            <template slot-scope="{ row, index }">
              <el-button
                type="danger"
                size="mini"
                @click=""
                icon="el-icon-delete"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-button type="primary">保存</el-button>
        <el-button @click="showthis = true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Attr",
  data() {
    return {
      id1: "", //一级分类产品ID
      id2: "", //二级分类产品ID
      id3: "", //三级分类产品ID
      dataList: [], //属性列表
      showthis: true, //表格显示
      attrInfo: {
        attrName: "", //属性名
        //属性值列表
        attrValueList: [],
        categoryId: 0, //三级分类ID
        categoryLevel: 3,
      },
    };
  },
  methods: {
    //自定义事件(获取子组件的分类ID)
    getID({ ID, leave }) {
      //根据传入的leave进行判断确定对应的ID号
      if (leave == 1) {
        this.id1 = ID;
        this.id2 = "";
        this.id3 = "";
      } else if (leave == 2) {
        this.id2 = ID;
        this.id3 = "";
      } else if (leave == 3) {
        this.id3 = ID;
        //发送请求获取数据
        this.getall();
      }
    },
    //获取所有属性
    async getall() {
      let { id1, id2, id3 } = this; //解构出各级id
      let res = await this.$API.attr.getCategory(id1, id2, id3); ///发送请求
      if (res.code == 200) {
        this.dataList = res.data; //渲染表格数据
      }
    },
    //新增属性值
    addNew() {
      //每点击一次新增表格增加一行(向表格绑定的数组中push数据)
      this.attrInfo.attrValueList.push({
        attrId: undefined, //对应属性名ID(新增默认没有id,id有后端创建)
        valueName: "", //属性值名
      });
    },
    //新增属性
    plusAttr() {
      this.showthis = false; //关闭所有属性表格
      //解决返回数据回显问题(将对象值置空)
      this.attrInfo = {
        attrName: "",
        attrValueList: [],
        categoryId: this.id3, //获取三级分类ID
        categoryLevel: 3,
      };
    },
    //修改属性
    insertAttr(row) {
      /* 修改属性要显示当前已有的数据(通过重新赋值深拷贝的方法) */
      this.showthis = false; //关闭显示
      console.log(row);
      this.attrInfo = JSON.parse(JSON.stringify(row)); //深拷贝对象
    },
  },
};
</script>

<style scoped></style>
