<template>
  <div class="">
    <el-card class="box-card" style="margin-bottom: 10px">
      <!-- 引入三级联动组件 -->
      <CreateSelect
        @getID="getID"
        :show="!showthis"
        style="text-align: center"
      ></CreateSelect>
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
            <template slot-scope="{ row }">
              <el-tag
                type="success"
                v-for="item in row.attrValueList"
                :key="item.id"
                style="margin: 0px 20px"
                >{{ item.valueName }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column type="index" label="序号" width="180" align="center">
            <template slot-scope="{ row }">
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
            <template slot-scope="{ row, $index }">
              <!-- 
                通过v-if控制编辑与查看
                不能在data中定义控制标记(这会导致所有行都会被影响,一个改变全都改变)
                通过给 ref="$index" 获取每一个input标签
              -->
              <el-input
                v-model="row.valueName"
                placeholder="请输入名称"
                size="mini"
                clearable
                v-if="row.flag"
                @blur="look(row)"
                :ref="$index"
              ></el-input>
              <!-- 添加一个默认高度(防止用户没有输入值后无法重新添加(解决空值问题)) -->
              <div v-else @click="showInput(row, $index)" style="height: 30px">
                {{ row.valueName }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="col.id" label="操作" width="col.width">
            <template slot-scope="{ row, $index }">
              <!-- 
                el-popconfirm气泡框
                title提示框
                @confirm确定事件回调 
              -->
              <el-popconfirm
                :title="'删除' + row.valueName + '?'"
                @onConfirm="del($index)"
              >
                <el-button
                  type="danger"
                  size="mini"
                  icon="el-icon-delete"
                  slot="reference"
                ></el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>

        <el-button
          type="primary"
          @click="save"
          :disabled="attrInfo.attrValueList.length < 1"
          >保存</el-button
        >
        <el-button @click="showthis = true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import { nextTick } from "process";

export default {
  name: "Attr",
  data() {
    return {
      id1: "", //一级分类产品ID
      id2: "", //二级分类产品ID
      id3: "", //三级分类产品ID
      dataList: [], //属性列表
      showthis: true, //表格显示(true),编辑模块显示(false)
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
    /**
     * @description: 自定义事件(获取子组件的分类ID)
     * @return {*}
     */
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
    /**
     * @description: 获取所有属性
     * @return {*}
     */
    async getall() {
      let { id1, id2, id3 } = this; //解构出各级id
      let res = await this.$API.attr.getCategory(id1, id2, id3); ///发送请求
      if (res.code == 200) {
        this.dataList = res.data; //渲染表格数据
      }
    },
    /**
     * @description: 新增属性值
     * @return {*}
     */
    addNew() {
      //每点击一次新增表格增加一行(向表格绑定的数组中push数据(vue中数组的push方法经过重新可以直接添加响应式数据))
      this.attrInfo.attrValueList.push({
        attrId: undefined, //对应属性名ID(新增默认没有id,id有后端创建)
        valueName: "", //属性值名
        flag: true, //控制表格化显示(span标签)或者编辑(input标签)
      });
      //对新添加的编辑行自动聚焦
      this.$nextTick(() => {
        this.$refs[this.attrInfo.attrValueList.length - 1].focus();
      });
    },
    /**
     * @description: 新增属性
     * @return {*}
     */
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
    /**
     * @description: 修改属性
     * @param {*} row 选中行
     * @return {*}
     */
    insertAttr(row) {
      /* 
        1.关闭展示表格切换为编辑模式
        2.修改属性要显示当前已有的数据(通过重新赋值深拷贝的方法)
        3.往每一个对象中添加一个flag属性,以便于后面进行数据操作
      */
      this.showthis = false; //关闭显示
      this.attrInfo = JSON.parse(JSON.stringify(row)); //深拷贝对象
      //修改属性添加编辑模式
      this.attrInfo.attrValueList.forEach((item, index) => {
        //因为vue无法检测数组的新增(调用$set方法),保证其响应式
        this.$set(item, "flag", false);
      });
    },
    /**
     * @description: 表格行编辑模式
     * @param {*} row 选中行
     * @return {*}
     */
    look(row) {
      /* 
        1.在input组件上绑定一个聚焦事件
        2.通过回调获取表格行的数据
        3.对用户输入的数据进行过滤
        4.失去焦点切换为查看模式
      */
      //判断用户输入是否为空
      if (row.valueName.trim() == "") {
        this.$message.warning("请输入正确的属性值"); //提示用户
        return;
      }
      //判断用户输入是否有重复
      /* 
        这里的逻辑:
        1.input框失去焦点时,触发look回调函数,通过回调函数获取新增行的数据
        2.调用some方法
          2.1因为some方法是:只要有一项满足回调函数测试就return
          2.2所有row是新增到数组中的(前面的plusAttr()方法),row也会出现在数组里
          2.3所以要让row与之前的数据进行操作比较
          2.4row!=item
            2.4.1进行业务逻辑书写
      */
      let res = this.attrInfo.attrValueList.some((item, index) => {
        if (row != item) {
          return row.valueName.trim() == item.valueName.trim(); //判断是否有重复
        }
      });
      //如果有重复跳出函数
      if (res) return;
      row.flag = false; //失去焦点为查看模式
    },
    /**
     * @description: 表格行查看模式
     * @param {*} row 行属性
     * @param {*} index 行索引
     * @return {*}
     */
    showInput(row, $index) {
      /* 
        1.在div上绑定一个点击的回调事件
        2.通过回调事件获取表格行绑定的数据
        3.显示输入框
        4.通过nextTick API 获取input组件的聚焦
      */
      row.flag = true; //显示输入框
      /* 
        注意:点击div(查看模式)的时候,切换input变为编辑模式,需要注意,对于浏览器而言,重绘与重排消耗时间,
        v-if是将标签直接从DOM树上移除
        因此我们不能立马获取input标签
      */
      this.$nextTick(() => {
        this.$refs[$index].focus(); //调用input组件的聚焦方法
      });
    },
    /**
     * @description: 删除属性值
     * @param {*} index 行索引
     * @return {*}
     */
    del(index) {
      /* 
        1.通过获取表格行的索引进行逻辑删除
      */
      this.attrInfo.attrValueList.splice(index, 1); //通过传入的下标删除数据
    },
    /**
     * @description: 提交
     * @return {*}
     */
    async save() {
      /* 
        1.整理提交的数据
        2.调用提交接口
        3.给用户提示信息
        4.关闭修改界面打开展示界面
        5.重新获取数据
      */

      //过滤掉flag字段(flag字段为自己添加的不需要提供给后端)
      this.attrInfo.attrValueList = this.attrInfo.attrValueList.filter(
        (item, index) => {
          return item.valueName != "";
        }
      );
      //整理需要的字段
      this.attrInfo.attrValueList = this.attrInfo.attrValueList.map(
        (item, index) => {
          return {
            attrId: item.attrId,
            valueName: item.valueName,
            id: item.id,
          };
        }
      );

      try {
        let res = await this.$API.attr.saveAttrInfo(this.attrInfo); //调用提交接口
        this.showthis = true; //关闭修改界面
        this.$message.success("添加成功"); //提示用户信息
        this.getall(); //重新获取数据
      } catch (error) {
        this.$message.error("失败");
      }
    },
  },
};
</script>

<style scoped></style>
