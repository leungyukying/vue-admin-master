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
        serviceName: searchWord ? "sysncUser" : "fullData",
        operatorId: sessionStorage.user
          ? JSON.parse(sessionStorage.user).id
          : "",
        operator: sessionStorage.user
          ? JSON.parse(sessionStorage.user).name
          : "",
        callOrg: null,
        targetOrg: null,
        event: searchWord ? "searchUser" : "searchUser",
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
      TableName: tableName
    }
  };
  console.log(searchWord, "searchWordsearchWordsearchWord");
  if (!searchWord) {
  } else {
    delete msgBody.root.TableName;
    msgBody.root.userInfor = {
      conditionValue: searchWord
    };
  }

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
        serviceName: "sysncUser",
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
      userInfor: {
        UserID: "",
        UserName: "",
        UserPassword: "",
        OrgCode: "",
        OrgName: "",
        UserPhone: "",
        UserMail: "",
        UserPic: "",
        RoleLevel: "1",
        UserLockType: "0",
        BegTime: moment().format("YYYY-MM-DD HH:mm:ss"),
        EndTime: moment()
          .add(1, "year")
          .format("YYYY-MM-DD HH:mm:ss"),
        deleted: "0",
        CreateUserId: sessionStorage.user
          ? JSON.parse(sessionStorage.user).id
          : "",
        CreateUserName: sessionStorage.user
          ? JSON.parse(sessionStorage.user).name
          : "",
        CreateTime: moment().format("YYYY-MM-DD HH:mm:ss"),
        ModifyUserId: "账户信息修改者id",
        ModifyUserName: "账户信息修改者姓名",
        ModifyTime: moment().format("YYYY-MM-DD HH:mm:ss"),
        DisplayOrder: "1"
      }
    }
  };

  Object.assign(msgBody.root.userInfor, modalData);

  delete msgBody.root.userInfor.UserIdentity;

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
