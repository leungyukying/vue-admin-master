<template>
  <el-table :data="tableData" border style="width: 100%">
    <el-table-column prop="检查医院" label="检查医院" width="180"></el-table-column>
    <el-table-column prop="预约检查人数" label="预约检查人数" width="180"></el-table-column>
    <el-table-column prop="完成检查人数" label="完成检查人数"></el-table-column>
    <el-table-column prop="预约检查量" label="预约检查量"></el-table-column>
    <el-table-column prop="完成检查量" label="完成检查量"></el-table-column>
    <el-table-column prop="完成检查量总费用" label="完成检查量总费用"></el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          检查医院: "监网测试医院",
          预约检查人数: 1,
          完成检查人数: 0,
          预约检查量: 1,
          完成检查量: 0,
          完成检查量总费用: 356
        }
      ]
    };
  }
};
</script>

<style lang='scss' scoped>
</style>