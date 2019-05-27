<template>
  <div style="margin:10px">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>
        <i class="el-icon-menu"></i> 号源管理
      </el-breadcrumb-item>
      <el-breadcrumb-item>号源管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="margin:15px;">
      <el-form :model="modalData" label-width="100px" :inline="true">
        <el-form-item label="机构名称" prop="deptName">
          <el-input v-model="name" size="small"></el-input>
        </el-form-item>
        <el-form-item label="检查类型" prop="deptName">
          <el-input v-model="type" size="small"></el-input>
        </el-form-item>
        <el-form-item label="日期" prop="deptName">
          <el-date-picker v-model="date" type="date" placeholder="选择日期" size="small"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button
            style="margin-left: 20px"
            class="el-icon-search"
            type="primary"
            @click="getData"
          >查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button style="margin-left: 20px" icon="plus" type="primary" @click="openModal">添加号源</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="BegTime" label="开始时间" min-width="100px"></el-table-column>
      <el-table-column prop="EndTime" label="结束时间" min-width="100px"></el-table-column>
      <el-table-column prop="TotalNumber" label="总号源" min-width="100px"></el-table-column>
      <el-table-column prop="NumberComment" label="备注" min-width="100px"></el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button @click="openModal(scope.row)" size="small">编辑</el-button>
          <el-button type="danger" size="small" @click="hiddenDept(scope.row)">隐藏</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--弹出手工预约页面-->
    <el-dialog id="editDeptDialog" :title="'添加号源'" :visible.sync="editDeptDialogVisible">
      <el-form label-width="120px" v-model="modalData">
        <el-form-item label="开始时间" prop="BegTime">
          <el-time-picker v-model="modalData.BegTime" placeholder="开始时间"></el-time-picker>
        </el-form-item>
        <el-form-item label="结束时间" prop="EndTime">
          <el-time-picker v-model="modalData.EndTime" placeholder="结束时间"></el-time-picker>
        </el-form-item>
        <el-form-item label="总号源" prop="address">
          <el-input v-model="modalData.TotalNumber"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="modalData.NumberComment"></el-input>
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
import { getList, addUser } from "../../api/api.2";
export default {
  data() {
    return {
      name: "",
      type: "",
      date: "",
      searchWord: "",
      tableData: [],
      editDeptDialogVisible: false,
      editDeptDialogTitle: "新增/编辑用户",
      deptOptions: sessionStorage.deptOptions
        ? JSON.parse(sessionStorage.deptOptions)
        : [],
      modalData: {
        BegTime: "",
        EndTime: "",
        TotalNumber: "",
        NumberComment: "",
        AppedNumber: "0",
        RemainNumber: "0",
        Deleted: "0"
      }
    };
  },
  methods: {
    openModal() {
      this.modalData = {
        BegTime: "",
        EndTime: "",
        TotalNumber: "",
        NumberComment: "",
        AppedNumber: "0",
        RemainNumber: "0",
        Deleted: "0"
      };

      this.editDeptDialogVisible = true;
    },
    post() {
      addUser(this.modalData, "addNumber").then(res => {
        this.editDeptDialogVisible = false;
        this.getData();
      });
    },
    handleClick(row) {
      this.editDeptDialogTitle = "新增/编辑";
      this.editDeptDialogVisible = true;
    },
    hiddenDept(row) {
      this.$confirm("此操作将隐藏该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          addUser({ ...row, Deleted: "1" }, "updateNumber").then(res => {
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
      // this.name, this.type, this.date
      getList("T_APP_NUMBER", this.name, this.type, this.date).then(res => {
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