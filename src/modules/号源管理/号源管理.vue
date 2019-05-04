<template>
  <div style="margin:10px">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>
        <i class="el-icon-menu"></i> 号源管理
      </el-breadcrumb-item>
      <el-breadcrumb-item>号源管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="margin:15px;">
      <el-form :model="editDeptForm" label-width="100px" :rules="editDeptRules" :inline="true">
        <el-form-item label="机构名称" prop="deptName">
          <el-input v-model="editDeptForm.deptName" size="small"></el-input>
        </el-form-item>
        <el-form-item label="检查类型" prop="deptName">
          <el-input v-model="editDeptForm.deptName" size="small"></el-input>
        </el-form-item>
        <el-form-item label="日期" prop="deptName">
          <el-date-picker v-model="date" type="date" placeholder="选择日期" size="small"></el-date-picker>
        </el-form-item>
      </el-form>
    </div>

    <div class="main-con">
      <div class="tool-con">
        <div style="flex: 1"></div>
        <el-button type="primary" icon="plus" size="small">添加</el-button>
      </div>
      <el-table :data="deptData" border style="width: 100%">
        <el-table-column prop="deptName" label="开始时间" min-width="100px"></el-table-column>
        <el-table-column prop="deptCode" label="结束时间" min-width="100px"></el-table-column>
        <el-table-column prop="preDeptName" label="总号源" min-width="100px"></el-table-column>
        <el-table-column prop="checkType" label="备注" min-width="100px"></el-table-column>
        <el-table-column label="操作" min-width="200px">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" size="small">编辑</el-button>
            <el-button type="danger" size="small" @click="hiddenDept(scope.row)">删除</el-button>
            <el-button type="danger" size="small" @click="hiddenDept(scope.row)">定向分配</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!--弹出手工预约页面-->
    <el-dialog
      id="editDeptDialog"
      :title="editDeptDialogTitle"
      :visible.sync="editDeptDialogVisible"
    >
      <el-form :model="editDeptForm" label-width="100px" :rules="editDeptRules">
        <el-form-item label="机构名称" prop="deptName">
          <el-input v-model="editDeptForm.deptName"></el-input>
        </el-form-item>
        <el-form-item label="检查类型" prop="deptCode">
          <el-input v-model="editDeptForm.deptCode"></el-input>
        </el-form-item>
        <el-form-item label="上级医院机构" prop="deptPre">
          <el-select v-model="editDeptForm.deptPre" placeholder="请选择上级医院机构">
            <el-option label="江阴市中医院" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="显示顺序" prop="order">
          <el-input-number v-model="editDeptForm.order" :min="1" :max="10"></el-input-number>
        </el-form-item>
        <el-form-item label="检查类型" prop="checkType">
          <el-select v-model="editDeptForm.checkType" placeholder="请选择检查类型">
            <el-option label="CT" value="1"></el-option>
            <el-option label="MR" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="电话" prop="phoneNum">
          <el-input v-model="editDeptForm.phoneNum"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="editDeptForm.address"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="editDeptForm.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align:center">
        <el-button @click="editDeptDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editDeptDialogVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      date: moment(),
      deptData: [
        {
          deptName: "1",
          deptCode: "1",
          preDeptName: "1",
          checkType: "1",
          hidden: "1",
          order: "1",
          phoneNum: "1",
          address: "1",
          marker: "1"
        }
      ],
      editDeptDialogVisible: false,
      editDeptDialogTitle: "新增机构",
      editDeptForm: {
        deptName: "",
        deptCode: "",
        deptPre: "",
        order: "1",
        checkType: "",
        phoneNum: "",
        address: "",
        remark: ""
      },
      editDeptRules: {
        deptName: [
          { required: true, message: "请输入机构名称", trigger: "change" }
        ],
        deptCode: [
          { required: true, message: "请输入机构编码", trigger: "change" }
        ],
        order: [
          { required: true, message: "请输入显示顺序", trigger: "change" }
        ],
        checkType: [
          { required: true, message: "请选择检查类型", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    handleClick(row) {
      this.editDeptDialogTitle = "修改机构";
      this.editDeptDialogVisible = true;
    },
    hiddenDept(row) {
      this.$confirm("此操作将隐藏该机构, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "隐藏成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消隐藏"
          });
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.tool-con {
  margin: -25px 15px 15px;
  display: flex;
}
</style>