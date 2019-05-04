<template>
  <div style="margin:10px">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>
        <i class="el-icon-menu"></i> 系统参数管理
      </el-breadcrumb-item>
      <el-breadcrumb-item>黑名单管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="main-con">
      <div class="left-part">
        <div class="item-con">黑名单</div>
      </div>
      <div class="right-part">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="参数的中文名称" label="参数的中文名称" min-width="200px"></el-table-column>
          <el-table-column prop="参数值" label="参数值" min-width="100px"></el-table-column>
          <el-table-column prop="顺序" label="顺序" min-width="100px"></el-table-column>
          <el-table-column prop="参数值显示类型" label="参数值显示类型" min-width="100px">
            <template slot-scope="scope">
              <el-input v-model="scope.row.参数值显示类型" size="small"></el-input>
            </template>
          </el-table-column>

          <el-table-column prop="参数说明" label="参数说明" min-width="300px"></el-table-column>
        </el-table>
        <div class="tool-con">
          <el-button type="primary" size="small">保存</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          参数的中文名称: "自动加黑权重设置",
          参数值: "1",
          顺序: "1",
          参数值显示类型: "1",
          参数说明: "配置达到多少权重就会自动加黑(0表示不会自动加黑)"
        },
        {
          参数的中文名称: "自动解黑设置",
          参数值: "0",
          顺序: "1",
          参数值显示类型: "0",
          参数说明: "配置多少天没有违约记录，自动解黑(0表示不会自动解黑)"
        },
        {
          参数的中文名称: "黑名单关联字段配置",
          参数值: "姓名;性别;",
          顺序: "1",
          参数值显示类型: "姓名;性别;",
          参数说明: "黑名单关联字段配置，多个用';'间隔，可选字段有：姓名"
        }
      ]
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
    padding: 0 10px;
    width: 0;
    .tool-con {
      text-align: left;
      margin-top: 10px;
    }
  }
}
</style>