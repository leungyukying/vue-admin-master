<template>
  <div style="margin:10px">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>
        <i class="el-icon-menu"></i> 接口维护管理
      </el-breadcrumb-item>
      <el-breadcrumb-item>院内号源接口管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="main-con">
      <div class="left-part">
        <div class="item-con">江阴市中医院</div>
        <div class="item-con">江阴市中医院</div>
        <div class="item-con">江阴市中医院</div>
        <div class="item-con">江阴市中医院</div>
      </div>
      <div class="right-part">
        <el-form :model="editDeptForm" label-width="200px">
          <el-form-item label="院内预约接口地址" prop="deptName">
            <el-input size="small"></el-input>
          </el-form-item>
          <el-form-item label="获取当天号源" prop="deptName">
            <el-input size="small"></el-input>
          </el-form-item>
          <el-form-item label="获取月份已有号源日期" prop="deptName">
            <el-input size="small"></el-input>
          </el-form-item>
          <el-form-item label="添加方法" prop="deptName">
            <el-input size="small"></el-input>
          </el-form-item>
          <el-form-item label="更新方法" prop="deptName">
            <el-input size="small"></el-input>
          </el-form-item>
          <el-form-item label="取消方法" prop="deptName">
            <el-input size="small"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="deptName">
            <el-input type="textarea" size="small"></el-input>
          </el-form-item>
        </el-form>
        <div class="tool-con">
          <el-button type="primary" size="small">保存</el-button>
          <el-button type="danger" size="small">删除</el-button>
          <el-button size="small">重置</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      editDeptForm: {}
    };
  },
  methods: {},
  components: {}
};
</script>

<style lang='scss' scoped>
.main-con {
  margin: 20px 10px;
  display: flex;
  align-items: stretch;
  min-height: calc(100vh - 145px);
  .left-part {
    width: 150px;
    background: #f6f6f6;
    overflow: auto;
    padding: 10px;
    box-sizing: border-box;
    .item-con {
      padding: 5px;
      cursor: pointer;
      &:hover {
        color: #20a0ff;
      }
    }
  }
  .right-part {
    flex: 1;
    width: 0;
    max-width: 700px;
    .tool-con {
      text-align: center;
    }
  }
}
</style>