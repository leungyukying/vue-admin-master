import http from "./http";
import moment from "moment";
//let base = 'https://www.easy-mock.com/mock/5cbb1b5077d87e22c39d911f/graduate';
let base = "";

export const getList = (tableName, name, type, date) => {
  var msgHeader = {
    "?xml": { "@version": "1.0", "@encoding": "utf-8" },
    root: {
      HeaderInfor: {
        sender: "发送方（请求的医院）",
        serviceName: name || type || date ? "sysncNumber" : "fullData",
        operatorId: sessionStorage.user
          ? JSON.parse(sessionStorage.user).id
          : "",
        operator: sessionStorage.user
          ? JSON.parse(sessionStorage.user).name
          : "",
        callOrg: null,
        targetOrg: null,
        event: name || type || date ? "searchNumber" : "searchNumber",
        PostTime: moment().format("YYYY-MM-DD HH:mm:ss")
      }
    }
  };

  var msgBody = {
    "?xml": {
      "@version": "1.0",
      "@encoding": "utf-8"
    },
    root: {
      TableName: tableName,
      NumberInfor: {
        AppDate: date ? moment(date).format("YYYY-MM-DD HH:mm:ss") : "",
        StudyType: type,
        StudyHospital: name
      }
    }
  };
  (name || type || date) && delete msgBody.root.TableName;
  var patientParams = {
    msgHeader: JSON.stringify(msgHeader),
    msgBody: JSON.stringify(msgBody)
  };
  return http.post(
    "/sysncData/sysncDictionary.asmx/callInterface",
    patientParams
  );
};

export const addUser = (modalData, event) => {
  var msgHeader = {
    "?xml": { "@version": "1.0", "@encoding": "utf-8" },
    root: {
      HeaderInfor: {
        sender: "发送方（请求的医院）",
        serviceName: "sysncNumber",
        operatorId: sessionStorage.user
          ? JSON.parse(sessionStorage.user).id
          : "",
        operator: sessionStorage.user
          ? JSON.parse(sessionStorage.user).name
          : "",
        callOrg: null,
        targetOrg: null,
        event: event,
        PostTime: moment().format("YYYY-MM-DD")
      }
    }
  };

  var msgBody = {
    "?xml": {
      "@version": "1.0",
      "@encoding": "utf-8"
    },
    root: {
      NumberInfor: {
        StudyHospital: JSON.parse(sessionStorage.user).OrgCode,
        BegTime: "预约检查开始时间",
        EndTime: "预约检查结束",
        TotalNumber: "总号源数",
        AppedNumber: "已预约号源数",
        RemainNumber: "剩余号源数",
        StudyType: "检查类型",
        StudyItem: "检查项目",
        AppDate: moment()
          .add(1, "days")
          .format("YYYY-MM-DD"),
        NumberComment: "号源备注",
        Deleted: "隐藏标志"
      }
    }
  };

  Object.assign(msgBody.root.NumberInfor, modalData);
  msgBody.root.NumberInfor.BegTime = moment(
    msgBody.root.NumberInfor.BegTime
  ).format("HH:mm:ss");
  msgBody.root.NumberInfor.EndTime = moment(
    msgBody.root.NumberInfor.EndTime
  ).format("HH:mm:ss");
  delete msgBody.root.NumberInfor.NumberIdentity;

  var patientParams = {
    msgHeader: JSON.stringify(msgHeader),
    msgBody: JSON.stringify(msgBody)
  };
  return http.post(
    "/sysncData/sysncDictionary.asmx/callInterface",
    patientParams
  );
};

export const login = "/login";
