<template>
  <div style="width: 100%">
    <div class="search-con shadow">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="His号">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="患者姓名">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="formInline.region" placeholder="性别">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input></el-input>
        </el-form-item>

        <div class="btn-con">
          <el-button type="primary">确认</el-button>
          <el-button @click="onSubmit">重置</el-button>
        </div>
      </el-form>
    </div>
    <div class="table-con">
      <dataTable></dataTable>
    </div>
  </div>
</template>

<script>
import dataTable from "./components/dataTable";
export default {
  data() {
    return {
      formInline: {
        region: ""
      }
    };
  },
  methods: {},
  components: {
    dataTable
  }
};
</script>

<style lang='scss' scoped>
.search-con {
  padding: 15px;
  margin: 10px;
  .btn-con {
    text-align: center;
  }
}
.table-con {
  margin: 20px 10px;
}
</style>