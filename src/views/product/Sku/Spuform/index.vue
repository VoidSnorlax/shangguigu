<template>
  <div class="">
    <el-form ref="form" label-width="80px">
      <el-form-item label="SPU名称">
        <el-input placeholder="请输入Spu"></el-input>
      </el-form-item>
      <el-form-item label="品牌">
        <el-select placeholder="请选则" clearable filterable value="">
          <el-option label="label" value="value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input
          type="textarea"
          placeholder="请输入内容"
          maxlength="30"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item label="图片">
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
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
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Spuform",
  methods: {
    onSubmit() {},
  },
};
</script>

<style lang="scss" scoped></style>
