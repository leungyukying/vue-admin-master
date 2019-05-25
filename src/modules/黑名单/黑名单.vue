<template>
  <div style="width: 100%">
    <div class="search-con shadow">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="His号">
          <el-input v-model="HisCode"></el-input>
        </el-form-item>
        <el-form-item label="患者姓名">
          <el-input v-model="PatientName"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="PhoneNumber"></el-input>
        </el-form-item>

        <div class="btn-con">
          <el-button type="primary" @click="getData">确认</el-button>
          <el-button @click="reset">重置</el-button>
        </div>
      </el-form>
    </div>
    <div class="table-con">
      <dataTable :tableData="tableData" @refresh="getData"></dataTable>
    </div>
  </div>
</template>

<script>
import dataTable from "./components/dataTable";
export default {
  data() {
    return {
      HisCode: "",
      PatientName: "",
      PhoneNumber: "",
      BlackTime: "",
      BlackHospital: "",
      tableData: [],
      formInline: {
        region: ""
      }
    };
  },
  methods: {
    reset() {
      this.HisCode = "";
      this.PatientName = "";
      this.PhoneNumber = "";
      this.BlackTime = "";
    },
    async getData() {
      var msgBody = {
        "?xml": { "@version": "1.0", "@encoding": "utf-8" },
        root: {
          HisCode: this.HisCode,
          PatientName: this.PatientName,
          PhoneNumber: this.PhoneNumber,
          BlackTime: this.BlackTime
            ? moment(this.BlackTime).format("YYYY-MM-DD HH:mm:ss")
            : "",
          BlackHospital: ""
        }
      };
      var msgHeader = {
        "?xml": { "@version": "1.0", "@encoding": "utf-8" },
        root: {
          HeaderInfor: {
            sender: "发送方（请求的医院）",
            serviceName:
              this.HisCode ||
              this.PatientName ||
              this.PhoneNumber ||
              this.BlackTime ||
              this.BlackHospital
                ? "searchBlackList"
                : "getBlackList",
            operatorId: "操作者ID",
            operator: "操作者",
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
      this.tableData = res.data.length ? res.data : [];
    }
  },
  created() {
    this.getData();
  },
  components: {
    dataTable
  }
};
</script>

<style lang='scss' scoped>
.search-con {
  padding: 15px;
  margin: 10px;
  .btn-con {
    text-align: center;
  }
}
.table-con {
  margin: 20px 10px;
}
</style>