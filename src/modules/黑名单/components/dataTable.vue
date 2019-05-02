<template>
  <el-table :data="tableData" border style="width: 100%">
    <el-table-column prop="HIS号" label="HIS号" width="180"></el-table-column>
    <el-table-column prop="患者姓名" label="患者姓名" width="180"></el-table-column>
    <el-table-column prop="性别" label="性别"></el-table-column>
    <el-table-column prop="联系电话" label="联系电话"></el-table-column>
    <el-table-column prop="加黑状态" label="加黑状态"></el-table-column>
    <el-table-column prop="爽约次数" label="爽约次数"></el-table-column>
    <el-table-column prop="加黑时间" label="加黑时间"></el-table-column>
    <el-table-column prop="empi" label="empi"></el-table-column>
    <el-table-column prop="身份证号" label="身份证号"></el-table-column>
    <el-table-column prop="设备卡号" label="设备卡号"></el-table-column>
    <el-table-column prop="诊疗卡号" label="诊疗卡号"></el-table-column>
    <el-table-column prop="操作" label="操作">
      <template slot-scope="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">详情</el-button>
        <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
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