<template>
  <div style="margin:10px">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>
        <i class="el-icon-menu"></i> 基础字典管理
      </el-breadcrumb-item>
      <el-breadcrumb-item>系统用户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="margin:15px;width:50%;display:flex;">
      <el-button type="primary" style="margin-right:5px" @click="openModal(null)">
        <i class="el-icon-plus" style="margin-right: 5px;font-size: 0.5px;"></i>新增用户
      </el-button>
      <el-input v-model="searchWord" placeholder="用户名/用户id/用户联系方式">
        <el-button class="el-icon-search" slot="append" @click="getData">查询</el-button>
      </el-input>
    </div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="UserName" label="用户名"></el-table-column>
      <el-table-column prop="OrgName" label="医疗机构"></el-table-column>
      <el-table-column prop="UserID" label="工号"></el-table-column>
      <el-table-column prop="UserPhone" label="联系方式"></el-table-column>
      <el-table-column prop="RoleLevel" label="用户组"></el-table-column>
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
      :title="modalData.CreateTime ? '编辑用户' : '新增用户'"
      :visible.sync="editDeptDialogVisible"
    >
      <el-form :model="modalData" label-width="120px">
        <el-form-item label="用户名">
          <el-input v-model="modalData.UserName"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="modalData.UserPassword"></el-input>
        </el-form-item>

        <el-form-item label="医疗机构">
          <el-select v-model="modalData.OrgName" placeholder="请选择医疗机构">
            <el-option
              v-for="item in deptOptions"
              :key="item.value"
              :label="item.code"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="工号">
          <el-input v-model="modalData.UserID"></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="modalData.UserPhone"></el-input>
        </el-form-item>
        <el-form-item label="用户组">
          <el-input v-model="modalData.RoleLevel"></el-input>
        </el-form-item>
        <el-form-item label="隐藏">
          <el-radio-group v-model="modalData.deleted" size="medium">
            <el-radio-button label="0">正常</el-radio-button>
            <el-radio-button label="1">隐藏</el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="显示顺序">
          <el-input-number v-model="modalData.DisplayOrder" :min="1" :max="10"></el-input-number>
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
import { getList, addUser } from "../../api/api";
export default {
  data() {
    return {
      searchWord: "",
      tableData: [],
      editDeptDialogVisible: false,
      editDeptDialogTitle: "新增/编辑用户",
      deptOptions: sessionStorage.deptOptions
        ? JSON.parse(sessionStorage.deptOptions)
        : [],
      modalData: {
        UserName: "",
        UserPassword: "",
        OrgName: "",
        UserID: "",
        UserPhone: "",
        RoleLevel: "",
        DisplayOrder: "",
        deleted: ""
      }
    };
  },
  methods: {
    openModal(modal) {
      this.modalData = {
        UserName: "",
        UserPassword: "",
        OrgName: "",
        UserID: "",
        UserPhone: "",
        RoleLevel: "",
        DisplayOrder: "",
        deleted: ""
      };
      if (modal) {
        this.modalData = modal;
      } else {
      }
      this.editDeptDialogVisible = true;
    },
    post() {
      if (this.modalData.CreateTime) {
        addUser(this.modalData, "updateUser").then(res => {
          this.editDeptDialogVisible = false;
          this.getData();
        });
      } else {
        addUser(this.modalData, "addUser").then(res => {
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
      this.$confirm("此操作将隐藏该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          addUser({ ...row, deleted: "1" }, "updateUser").then(res => {
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
      getList("T_USER", this.searchWord).then(res => {
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