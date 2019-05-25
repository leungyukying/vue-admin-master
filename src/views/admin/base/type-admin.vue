<template>
  <div style="margin:10px">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>
        <i class="el-icon-menu"></i> 基础字典管理
      </el-breadcrumb-item>
      <el-breadcrumb-item>检查类型管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="margin:15px;width:50%;display:flex;">
      <el-button type="primary" style="margin-right:5px" @click="openModal(null)">
        <i class="el-icon-plus" style="margin-right: 5px;font-size: 0.5px;"></i>新增类型
      </el-button>
      <el-input v-model="searchWord" placeholder="类型名/类型id/类型联系方式">
        <el-button class="el-icon-search" slot="append" @click="getData">查询</el-button>
      </el-input>
    </div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="StudyTypeName" label="检查类型名称" width="140"></el-table-column>
      <el-table-column prop="StuduTypeID" label="检查类型代码" width="140"></el-table-column>
      <el-table-column prop="StudyMethod" label="检查方式" width="140"></el-table-column>
      <el-table-column prop="order" label="顺序" width="100"></el-table-column>
      <el-table-column prop="deleted" label="隐藏">
        <template slot-scope="scope">
          <span v-if="scope.row.deleted == '1'">隐藏</span>
          <span v-else>正常</span>
        </template>
      </el-table-column>
      <el-table-column prop="DisplayOrder" label="顺序"></el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button @click="openModal(scope.row)" size="small">编辑</el-button>
          <el-button type="danger" size="small" @click="hiddenDept(scope.row)">隐藏</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--弹出手工预约页面-->
    <el-dialog
      id="editDeptDialog"
      :title="modalData.StudyTypeIdentity ? '编辑类型' : '新增类型'"
      :visible.sync="editDeptDialogVisible"
    >
      <el-form :model="modalData" label-width="120px">
        <el-form-item label="检查类型名称">
          <el-input v-model="modalData.StudyTypeName"></el-input>
        </el-form-item>
        <el-form-item label="检查类型编码">
          <el-input v-model="modalData.StuduTypeID"></el-input>
        </el-form-item>
        <el-form-item label="显示顺序">
          <el-input-number v-model="modalData.DisplayOrder" :min="1" :max="10"></el-input-number>
        </el-form-item>
        <el-form-item label="检查方式">
          <el-select v-model="modalData.StudyMethod" placeholder="请选择检查方式">
            <el-option label="增强" value="增强"></el-option>
            <el-option label="平扫" value="平扫"></el-option>
            <el-option label="平扫+增强" value="平扫+增强"></el-option>
            <el-option label="平扫+重建" value="平扫+重建"></el-option>
            <el-option label="平扫+增强+三维重建" value="平扫+增强+三维重建"></el-option>
            <el-option label="普通" value="普通"></el-option>
            <el-option label="无痛" value="无痛"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align:center">
        <el-button @click="editDeptDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="post">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import moment from "moment";
import { getList, addUser } from "../../../api/api.1";
export default {
  data() {
    return {
      searchWord: "",
      tableData: [],
      editDeptDialogVisible: false,
      editDeptDialogTitle: "新增/编辑类型",
      modalData: {
        StuduTypeID: "",
        StudyTypeName: "",
        DisplayOrder: "",
        Deleted: "0",
        StudyMethod: ""
      }
    };
  },
  methods: {
    openModal(modal) {
      this.modalData = {
        StuduTypeID: "",
        StudyTypeName: "",
        DisplayOrder: "",
        Deleted: "0",
        StudyMethod: ""
      };
      if (modal) {
        this.modalData = modal;
      } else {
      }
      this.editDeptDialogVisible = true;
    },
    post() {
      if (this.modalData.StudyTypeIdentity) {
        addUser(this.modalData, "updateStudyType").then(res => {
          this.editDeptDialogVisible = false;
          this.getData();
        });
      } else {
        addUser(this.modalData, "addStudyType").then(res => {
          this.editDeptDialogVisible = false;
          this.getData();
        });
      }
    },
    handleClick(row) {
      this.editDeptDialogTitle = "新增/编辑";
      this.editDeptDialogVisible = true;
    },
    hiddenDept(row) {
      this.$confirm("此操作将隐藏该类型, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          addUser({ ...row, deleted: "1" }, "updateStudyType").then(res => {
            this.getData();
            this.$message({
              type: "success",
              message: "隐藏成功!"
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消隐藏"
          });
        });
    },
    deleteBody() {
      this.$confirm("此操作将删除部位, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    async getData() {
      getList("T_StudyType", this.searchWord).then(res => {
        this.tableData = res.data;
      });
    }
  },
  created() {
    this.getData();
  }
};
</script>

<style scoped>
</style>