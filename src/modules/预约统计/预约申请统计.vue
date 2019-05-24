<template>
  <div>
    <div class="left-part-con shadow">
      <leftMenu></leftMenu>
    </div>
    <div class="main-con">
      <div class="search-con shadow">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="预约时间">
            <el-date-picker
              v-model="value1"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>

          <el-form-item label="申请医院">
            <el-select v-model="formInline.region" placeholder="申请医院">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="检查类型">
            <el-select v-model="formInline.region" placeholder="检查类型">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="检查项目">
            <el-select v-model="formInline.region" placeholder="检查项目">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>

          <div class="btn-con">
            <el-button type="primary">确认</el-button>
            <el-button type="primary">导出数据</el-button>
            <el-button>重置</el-button>
          </div>
        </el-form>
      </div>

      <div class="detail-con" style="width: calc(100vw - 240px)">
        <el-radio-group v-model="showType" style="margin-bottom: 15px;">
          <el-radio-button label="表格"></el-radio-button>
          <el-radio-button label="图表"></el-radio-button>
        </el-radio-group>
        <dataTable v-if="showType == '表格'"></dataTable>
        <chart v-if="showType == '图表'"></chart>
      </div>
    </div>
  </div>
</template>

<script>
import leftMenu from "./components/left-menu";
import dataTable from "./components/dataTable";
import chart from "./components/chart";
export default {
  data() {
    return {
      formInline: {
        value1: [],
        user: "",
        region: ""
      },
      showType: "表格"
    };
  },
  methods: {},
  components: {
    leftMenu,
    dataTable,
    chart
  }
};
</script>

<style lang='scss' scoped>
.left-part-con {
  position: fixed;
  top: 70px;
  left: 0;
  bottom: 0;
  width: 200px;
}
.main-con {
  margin-left: 200px;
  padding: 10px 10px;
}
.search-con {
  padding: 15px;
  .btn-con {
    text-align: center;
  }
}
.detail-con {
  margin-top: 20px;
}
</style>