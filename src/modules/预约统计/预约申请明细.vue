<template>
  <div>
    <div class="left-part-con shadow">
      <leftMenu></leftMenu>
    </div>
    <div class="main-con">
      <div class="search-con shadow">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="预约时间">
            <el-date-picker
              v-model="formInline.value"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>

          <el-form-item label="申请医院">
            <el-select v-model="formInline.region1">
              <el-option v-for="(i,key) in yiyuan" :key="key" :label="i" :value="i"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="检查医院">
            <el-select v-model="formInline.region2">
              <el-option v-for="(i,key) in yiyuan" :key="key" :label="i" :value="i"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="检查类型">
            <el-select v-model="formInline.region3">
              <el-option v-for="(i,key) in leixin" :key="key" :label="i" :value="i"></el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="检查项目">
            <el-select v-model="formInline.region4">
              <el-option v-for="(i,key) in xiangmu" :key="key" :label="i" :value="i"></el-option>
            </el-select>
          </el-form-item>-->

          <div class="btn-con">
            <el-button type="primary" @click="getData">确认</el-button>
            <el-button type="primary">导出数据</el-button>
            <el-button @click="weqwq">重置</el-button>
          </div>
        </el-form>
      </div>

      <div class="detail-con" style="width: calc(100vw - 240px)">
        <!-- <el-radio-group v-model="showType" style="margin-bottom: 15px;">
          <el-radio-button label="表格"></el-radio-button>
          <el-radio-button label="图表"></el-radio-button>
        </el-radio-group>-->
        <dataTable :tableData="tableData"></dataTable>
        <!-- <chart v-if="showType == '图表'"></chart> -->
      </div>
    </div>
  </div>
</template>

<script>
import leftMenu from "./components/left-menu";
import dataTable from "./components/dataTable.2";
import chart from "./components/chart.2";
import { getList } from "../../api/api.4";
import moment from "moment";
export default {
  data() {
    return {
      yiyuan: ["A医院", "C医院", "E医院", "D医院", "F医院", "B医院"],
      leixin: ["肠镜", "彩超", "胃镜"],
      xiangmu: ["颈部平扫", "头部平扫", "胸部透视", "核磁共振"],
      formInline: {
        value: [],
        region1: "",
        region2: "",
        region3: "",
        region4: ""
      },
      showType: "表格",
      tableData: []
    };
  },
  methods: {
    getData() {
      let h = {
        "?xml": {
          "@version": "1.0",
          "@encoding": "utf-8"
        },
        root: {
          HeaderInfor: {
            sender: "发送方（请求的医院）",
            serviceName: "searchAppInfor",
            operatorId: sessionStorage.user
              ? JSON.parse(sessionStorage.user).id
              : "",
            operator: sessionStorage.user
              ? JSON.parse(sessionStorage.user).name
              : "",
            callOrg: "调用机构编码",
            targetOrg: "目标机构编码",
            event: "事件",
            PostTime: "调用时间"
          }
        }
      };

      let b = {
        "?xml": {
          "@version": "1.0",
          "@encoding": "utf-8"
        },
        root: {
          searcahCondition: {
            AppBeginTime: this.formInline.value[0]
              ? moment(this.formInline.value[0]).format("YYYY-MM-DD")
              : "",
            AppEndTime: this.formInline.value[1]
              ? moment(this.formInline.value[1]).format("YYYY-MM-DD")
              : "",
            AppStatus: null,
            PatientName: null,
            PhoneNumber: null,
            PatientId: null,
            APPHospital: this.formInline.region1,
            AppDoctor: null,
            ExcuteHospital: this.formInline.region2,
            StudyType: this.formInline.region3
          }
        }
      };
      var patientParams = {
        msgHeader: JSON.stringify(h),
        msgBody: JSON.stringify(b)
      };

      this.$http
        .post("/AppSearchInfor/searchInfor.asmx/callInterface ", patientParams)
        .then(res => {
          this.tableData = res.data.map(item => {
            let type = ["", "门诊", "住院", "体检"];
            return {
              病人姓名: item.PatientName,
              年龄: item.Age,
              性别: item.Sex,
              HIS号: item.HisCode,
              病人来源: type[item.PatientType],
              检查医院: item.ExcuteHospital,
              检查类型: item.StudyType,
              检查项目: item.StudyItem,
              费用: item.ItemFee,
              预约时间: item.AppTimeSeg,
              申请医院: item.APPHospital,
              申请医生: item.AppDoctor,
              申请时间: item.AppTime
            };
          });
        });
    },
    weqwq() {
      this.formInline = {
        value1: [],
        region1: "",
        region2: "",
        region3: "",
        region4: ""
      };
    }
  },
  created() {
    this.getData();
  },
  components: {
    leftMenu,
    dataTable,
    chart
  }
};
</script>

<style lang='scss' scoped>
.left-part-con {
  position: fixed;
  top: 70px;
  left: 0;
  bottom: 0;
  width: 200px;
}
.main-con {
  margin-left: 200px;
  padding: 10px 10px;
}
.search-con {
  padding: 15px;
  .btn-con {
    text-align: center;
  }
}
.detail-con {
  margin-top: 20px;
}
</style>