import http from "./http";
import moment from "moment";
//let base = 'https://www.easy-mock.com/mock/5cbb1b5077d87e22c39d911f/graduate';
let base = "";

export const getList = (tableName, searchWord) => {
  var msgHeader = {
    "?xml": { "@version": "1.0", "@encoding": "utf-8" },
    root: {
      HeaderInfor: {
        sender: "发送方（请求的医院）",
        serviceName: searchWord ? "sysncStudyType" : "fullData",
        operatorId: sessionStorage.user
          ? JSON.parse(sessionStorage.user).id
          : "",
        operator: sessionStorage.user
          ? JSON.parse(sessionStorage.user).name
          : "",
        callOrg: null,
        targetOrg: null,
        event: searchWord ? "searchStudyType" : "searchStudyType",
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
      StudyTypeInfor: {
        conditionValue: searchWord
      }
    }
  };
  searchWord && delete msgBody.root.TableName;
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
        serviceName: "sysncStudyType",
        operatorId: sessionStorage.user
          ? JSON.parse(sessionStorage.user).id
          : "",
        operator: sessionStorage.user
          ? JSON.parse(sessionStorage.user).name
          : "",
        callOrg: null,
        targetOrg: null,
        event: event,
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
      StudyTypeInfor: {
        StuduTypeID: "1002",
        StudyTypeName: "超声",
        DisplayOrder: "1",
        Deleted: "0",
        StudyMethod: "平扫"
      }
    }
  };

  Object.assign(msgBody.root.StudyTypeInfor, modalData);

  delete msgBody.root.StudyTypeInfor.StudyTypeIdentity;

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
