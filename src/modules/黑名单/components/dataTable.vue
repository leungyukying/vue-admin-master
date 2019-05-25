<template>
  <el-table :data="tableData" border style="width: 100%">
    <el-table-column prop="HisCode" label="HIS号" width="100"></el-table-column>
    <el-table-column prop="PatientName" label="患者姓名" width="100"></el-table-column>
    <el-table-column prop="Sex" label="性别"></el-table-column>
    <el-table-column prop="PhoneNumber" label="联系电话"></el-table-column>
    <el-table-column prop="BlackStatus" label="加黑状态">
      <template slot-scope="scope">
        <span v-if="scope.row.BlackStatus == '0'">取消加黑</span>
        <span v-if="scope.row.BlackStatus == '1'">加黑</span>
      </template>
    </el-table-column>
    <el-table-column prop="notArriveTime" label="爽约次数"></el-table-column>
    <el-table-column prop="BlackTime" label="加黑时间"></el-table-column>
    <el-table-column prop="Empi" label="empi"></el-table-column>
    <el-table-column prop="ChinaIdCard" label="身份证号"></el-table-column>
    <el-table-column prop="SocialCard" label="社保号"></el-table-column>
    <el-table-column prop="DiagnosticCard" label="诊疗卡号"></el-table-column>
    <el-table-column prop="操作" label="操作" width="150">
      <template slot-scope="scope">
        <!-- <el-button size="small" @click="handleEdit(scope.$index, scope.row)">详情</el-button> -->
        <el-button type="danger" size="small" @click="handelDel(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: {
    tableData: Array
  },
  data() {
    return {};
  },
  methods: {
    async del(HisCode, PatientName) {
      var msgBody = {
        "?xml": {
          "@version": "1.0",
          "@encoding": "utf-8"
        },
        root: {
          HisCode,
          PatientName
        }
      };
      var msgHeader = {
        "?xml": {
          "@version": "1.0",
          "@encoding": "utf-8"
        },
        root: {
          HeaderInfor: {
            sender: "发送方（请求的医院）",
            serviceName: "cancleBlackListInfor",
            operatorId: sessionStorage.user
              ? JSON.parse(sessionStorage.user).id
              : "",
            operator: sessionStorage.user
              ? JSON.parse(sessionStorage.user).name
              : "",
            callOrg: "调用机构编码",
            targetOrg: "目标机构编码",
            event: "事件",
            PostTime: "2019-5-22 20:52:00"
          }
        }
      };

      var patientParams = {
        msgHeader: JSON.stringify(msgHeader),
        msgBody: JSON.stringify(msgBody)
      };

      const res = await this.$http.post(
        "/blackListInterface/blackList.asmx/callInterface",
        patientParams
      );
      this.$emit("refresh");
    },
    handelDel(row) {
      this.$confirm("此操作删除黑名单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.del(row.HisCode, row.PatientName);
      });
    }
  }
};
</script>

<style lang='scss' scoped>
</style>