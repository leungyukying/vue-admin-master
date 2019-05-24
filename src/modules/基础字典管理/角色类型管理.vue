<template>
  <div style="margin:10px">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>
        <i class="el-icon-menu"></i> 基础字典管理
      </el-breadcrumb-item>
      <el-breadcrumb-item>角色类型管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button
      type="primary"
      icon="plus"
      style="margin-top: 30px; margin-left: 10px;"
      @click="dialogVisible = true"
    >新增角色类型</el-button>
    <div class="main-con">
      <div class="left-part">
        <div class="item-con">后台管理</div>
        <div class="item-con">超级管理员</div>
        <div class="item-con">登记医生</div>
        <div class="item-con">黑名单</div>
        <div class="item-con">主任</div>
        <div class="item-con">统计</div>
        <div class="item-con">角色1</div>
        <div class="item-con">角色2</div>
        <div class="item-con">角色3</div>
        <div class="item-con">角色4</div>
      </div>
      <div class="right-part">
        <el-form :model="editDeptForm" label-width="100px">
          <el-form-item label="角色名称" prop="deptName">
            <el-input size="small"></el-input>
          </el-form-item>
          <el-form-item label="角色名称" prop="deptName">
            <el-input size="small"></el-input>
          </el-form-item>
          <el-form-item label="角色权限" prop="deptName">
            <el-checkbox-group>
              <el-checkbox label="信息登记"></el-checkbox>
            </el-checkbox-group>
            <el-checkbox-group>
              <el-checkbox label="后台管理"></el-checkbox>
            </el-checkbox-group>
            <el-checkbox-group style="margin-left: 30px">
              <el-checkbox label="修改所有机构号源权限"></el-checkbox>
              <el-checkbox label="接口维护管理"></el-checkbox>
              <el-checkbox label="号源管理"></el-checkbox>
              <el-checkbox label="基础字典管理"></el-checkbox>
            </el-checkbox-group>
            <el-checkbox-group>
              <el-checkbox label="预约查询"></el-checkbox>
            </el-checkbox-group>
            <el-checkbox-group style="margin-left: 30px">
              <el-checkbox label="日志查看"></el-checkbox>
              <el-checkbox label="重打小票"></el-checkbox>
              <el-checkbox label="取消预约"></el-checkbox>
              <el-checkbox label="修改预约"></el-checkbox>
              <el-checkbox label="查询所有机构预约"></el-checkbox>
            </el-checkbox-group>
            <el-checkbox-group>
              <el-checkbox label="预约统计"></el-checkbox>
            </el-checkbox-group>
            <el-checkbox-group style="margin-left: 30px">
              <el-checkbox label="导出数据"></el-checkbox>
            </el-checkbox-group>
            <el-checkbox-group>
              <el-checkbox label="黑名单"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
        <div class="tool-con">
          <el-button type="primary" size="small">保存</el-button>
          <el-button type="danger" size="small">删除</el-button>
          <el-button size="small">重置</el-button>
        </div>
      </div>
    </div>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="600px" :before-close="handleClose">
      <el-form :model="editDeptForm" label-width="100px">
        <el-form-item label="角色名称" prop="deptName">
          <el-input size="small"></el-input>
        </el-form-item>
        <el-form-item label="角色名称" prop="deptName">
          <el-input size="small"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" prop="deptName">
          <el-checkbox-group>
            <el-checkbox label="信息登记"></el-checkbox>
          </el-checkbox-group>
          <el-checkbox-group>
            <el-checkbox label="后台管理"></el-checkbox>
          </el-checkbox-group>
          <el-checkbox-group style="margin-left: 30px">
            <el-checkbox label="修改所有机构号源权限"></el-checkbox>
            <el-checkbox label="接口维护管理"></el-checkbox>
            <el-checkbox label="号源管理"></el-checkbox>
            <el-checkbox label="基础字典管理"></el-checkbox>
          </el-checkbox-group>
          <el-checkbox-group>
            <el-checkbox label="预约查询"></el-checkbox>
          </el-checkbox-group>
          <el-checkbox-group style="margin-left: 30px">
            <el-checkbox label="日志查看"></el-checkbox>
            <el-checkbox label="重打小票"></el-checkbox>
            <el-checkbox label="取消预约"></el-checkbox>
            <el-checkbox label="修改预约"></el-checkbox>
            <el-checkbox label="查询所有机构预约"></el-checkbox>
          </el-checkbox-group>
          <el-checkbox-group>
            <el-checkbox label="预约统计"></el-checkbox>
          </el-checkbox-group>
          <el-checkbox-group style="margin-left: 30px">
            <el-checkbox label="导出数据"></el-checkbox>
          </el-checkbox-group>
          <el-checkbox-group>
            <el-checkbox label="黑名单"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
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
    max-width: 1000px;
    .tool-con {
      text-align: center;
    }
  }
}
</style>