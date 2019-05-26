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
              v-model="formInline.value1"
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
          <el-form-item label="检查项目">
            <el-select v-model="formInline.region4">
              <el-option v-for="(i,key) in xiangmu" :key="key" :label="i" :value="i"></el-option>
            </el-select>
          </el-form-item>

          <div class="btn-con">
            <el-button type="primary" @click="uploadsa">确认</el-button>
            <el-button type="primary">导出数据</el-button>
            <el-button @click="weqwq()">重置</el-button>
          </div>
        </el-form>
      </div>

      <div class="detail-con" style="width: calc(100vw - 240px)">
        <el-radio-group v-model="showType" @change="weqwewq" style="margin-bottom: 15px;">
          <el-radio-button label="表格"></el-radio-button>
          <el-radio-button label="图表"></el-radio-button>
        </el-radio-group>

        <span v-if="showType == '表格'">
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="检查医院" label="检查医院" width="180"></el-table-column>
            <el-table-column prop="预约检查人数" label="预约检查人数" width="180"></el-table-column>
            <el-table-column prop="完成检查人数" label="完成检查人数"></el-table-column>
            <el-table-column prop="预约检查量" label="预约检查量"></el-table-column>
            <el-table-column prop="完成检查量" label="完成检查量"></el-table-column>
            <el-table-column prop="完成检查量总费用" label="完成检查量总费用"></el-table-column>
          </el-table>
        </span>

        <span v-if="showType == '图表'">
          <div>
            <v-chart :forceFit="true" :height="cxasda.height" :data="cxasda.data" :padding="[100]">
              <v-coord type="rect" direction="LT"/>
              <v-tooltip/>
              <v-legend/>
              <v-axis data-key="value" position="right"/>
              <v-axis data-key="label" :label="cxasda.label"/>
              <v-bar position="label*value" color="type" :adjust="cxasda.adjust"/>
            </v-chart>
          </div>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import leftMenu from "./components/left-menu";
const DataSet = require("@antv/data-set");
import moment from "moment";
export default {
  data() {
    return {
      cxasda: {},
      tableData: [
        {
          检查医院: "",
          预约检查人数: "",
          完成检查人数: "",
          预约检查量: "",
          完成检查量: "",
          完成检查量总费用: ""
        }
      ],
      yiyuan: ["A医院", "C医院", "E医院", "D医院", "F医院", "B医院"],
      leixin: ["肠镜", "彩超", "胃镜"],
      xiangmu: ["颈部平扫", "头部平扫", "胸部透视", "核磁共振"],
      formInline: {
        value1: [],
        region1: "",
        region2: "",
        region3: "",
        region4: ""
      },
      showType: "表格"
    };
  },
  methods: {
    weqwewq(val) {
      console.log(val);
      if (val == "图表") {
        const dv = new DataSet.View().source(this.tableData);
        dv.transform({
          type: "fold",
          fields: [
            "预约检查人数",
            "完成检查人数",
            "预约检查量",
            "完成检查量",
            "完成检查量总费用"
          ],
          key: "type",
          value: "value"
        });
        const data = dv.rows;

        const label = { offset: 12 };
        const adjust = [{ type: "dodge", marginRatio: 1 / 32 }];

        this.cxasda = {
          data,
          height: 400,
          label: label,
          adjust: adjust
        };
      }
    },
    dateFormatToString(date) {
      date = new Date(date);
      var year = date.getFullYear();
      var month = (date.getMonth() + 1).toString();
      var day = date.getDate().toString();
      if (month.length == 1) {
        month = "0" + month;
      }
      if (day.length == 1) {
        day = "0" + day;
      }
      var dateTime = year + "-" + month + "-" + day;
      return dateTime;
    },
    async uploadsa() {
      var msgBody = {
        root: {
          CountInfor: {
            BeginDate: this.formInline.value1[0]
              ? moment(this.formInline.value1[0]).format("YYYY-MM-DD")
              : "",
            EndDate: this.formInline.value1[1]
              ? moment(this.formInline.value1[1]).format("YYYY-MM-DD")
              : "",
            StudyHospital: this.formInline.region2,
            studyType: this.formInline.region3,
            StudyItem: this.formInline.region4
          }
        }
      };
      var xdsrw = [];
      var patientParams = {
        msgHeader:
          '{"root":{"HeaderInfor":{"serviceName":"AppInCount","sender":"' +
          this.formInline.region1 +
          '","event":"countPatientIn"}}}',
        msgBody: JSON.stringify(msgBody)
      };
      var xsd = await this.$http.post(
        "/AppCountInterface/AppCount.asmx/callInterface",
        patientParams
      );

      xdsrw[0] = xsd.data[0].count;
      var patientParams = {
        msgHeader:
          '{"root":{"HeaderInfor":{"serviceName":"AppInCount","sender":"' +
          this.formInline.region1 +
          '","event":"countCheckedIn"}}}',
        msgBody: JSON.stringify(msgBody)
      };
      var xsd = await this.$http.post(
        "/AppCountInterface/AppCount.asmx/callInterface",
        patientParams
      );

      xdsrw[1] = xsd.data[0].count;
      var patientParams = {
        msgHeader:
          '{"root":{"HeaderInfor":{"serviceName":"AppInCount","sender":"' +
          this.formInline.region1 +
          '","event":"countOrderIn"}}}',
        msgBody: JSON.stringify(msgBody)
      };
      var xsd = await this.$http.post(
        "/AppCountInterface/AppCount.asmx/callInterface",
        patientParams
      );

      xdsrw[2] = xsd.data[0].count;
      var patientParams = {
        msgHeader:
          '{"root":{"HeaderInfor":{"serviceName":"AppInCount","sender":"' +
          this.formInline.region1 +
          '","event":"countCheckedOrderIn"}}}',
        msgBody: JSON.stringify(msgBody)
      };
      var xsd = await this.$http.post(
        "/AppCountInterface/AppCount.asmx/callInterface",
        patientParams
      );

      xdsrw[3] = xsd.data[0].count;
      var patientParams = {
        msgHeader:
          '{"root":{"HeaderInfor":{"serviceName":"AppInCount","sender":"' +
          this.formInline.region1 +
          '","event":"countFeeIn"}}}',
        msgBody: JSON.stringify(msgBody)
      };
      var xsd = await this.$http.post(
        "/AppCountInterface/AppCount.asmx/callInterface",
        patientParams
      );
      console.log(xsd);
      xdsrw[4] = xsd.data == "" ? 0 : xsd.data[0].count;

      this.tableData = [
        {
          检查医院: this.formInline.region2,
          预约检查人数: xdsrw[0],
          完成检查人数: xdsrw[1],
          预约检查量: xdsrw[2],
          完成检查量: xdsrw[3],
          完成检查量总费用: xdsrw[4]
        }
      ];
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
  components: {
    leftMenu
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