<template>
  <div style="width: 100%">
    <div class="search-con shadow">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="His号">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="患者姓名">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="formInline.region" placeholder="性别">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input></el-input>
        </el-form-item>

        <div class="btn-con">
          <el-button type="primary" @click="getData">确认</el-button>
          <el-button @click="onSubmit">重置</el-button>
        </div>
      </el-form>
    </div>
    <div class="table-con">
      <dataTable></dataTable>
    </div>
  </div>
</template>

<script>
import dataTable from "./components/dataTable";
export default {
  data() {
    return {
      formInline: {
        region: ""
      }
    };
  },
  methods: {
    async getData() {
      var msgBody = {
        "?xml": { "@version": "1.0", "@encoding": "utf-8" },
        root: {
          HisCode: "21321",
          PatientName: "徐间",
          PhoneNumber: "32123",
          BlackTime: "2019-05-22 21:24:00",
          BlackHospital: "A医院"
        }
      };
      var msgHeader = {
        "?xml": { "@version": "1.0", "@encoding": "utf-8" },
        root: {
          HeaderInfor: {
            sender: "发送方（请求的医院）",
            serviceName: "getBlackList",
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
      // let text = `msgHeader=${JSON.stringify(
      //   msgHeader
      // )}&msgBody=${JSON.stringify(msgBody)}`;
      const res = await this.$http.post(
        "http://120.79.41.96/blackListInterface/blackList.asmx/callInterface",
        patientParams
      );
    }
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