<template>
  <el-table :data="tableData" border style="width: 100%">
    <el-table-column prop="病人姓名" label="病人姓名"></el-table-column>
    <el-table-column prop="年龄" label="年龄" width="70"></el-table-column>
    <el-table-column prop="性别" label="性别" width="70"></el-table-column>
    <el-table-column prop="HIS号" label="HIS号" width="70"></el-table-column>
    <el-table-column prop="病人来源" label="病人来源"></el-table-column>
    <el-table-column prop="检查医院" label="检查医院"></el-table-column>
    <el-table-column prop="检查类型" label="检查类型"></el-table-column>
    <el-table-column prop="检查项目" label="检查项目"></el-table-column>
    <el-table-column prop="费用" label="费用" width="70"></el-table-column>
    <el-table-column prop="预约时间" label="预约时间" width="150"></el-table-column>
    <el-table-column prop="申请医院" label="申请医院"></el-table-column>
    <el-table-column prop="申请医生" label="申请医生"></el-table-column>
    <el-table-column prop="申请时间" label="申请时间" width="150"></el-table-column>
  </el-table>
</template>

<script>
export default {
  props: {
    tableData: Array
  },
  data() {
    return {};
  }
};
</script>

<style lang='scss' scoped>
</style>