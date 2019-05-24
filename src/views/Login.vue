<template>
  <el-form
    :model="ruleForm2"
    :rules="rules2"
    ref="ruleForm2"
    label-position="left"
    label-width="0px"
    class="demo-ruleForm login-container"
  >
    <h3 class="title">用户登录</h3>
    <el-form-item prop="account">
      <span class="input-type">机构</span>
      <el-select v-model="value" placeholder="请选择" style="width: 100%">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item prop="account">
      <span class="input-type">账号</span>
      <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="checkPass">
      <span class="input-type">密码</span>
      <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <!-- <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox> -->
    <el-form-item style="width:100%;">
      <el-button
        type="primary"
        style="width:100%;"
        @click.native.prevent="handleSubmit2"
        :loading="logining"
      >登录</el-button>
      <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
    </el-form-item>
  </el-form>
</template>

<script>
//import NProgress from 'nprogress'
export default {
  data() {
    return {
      logining: false,
      options: [
        {
          value: "1",
          label: "机构1"
        },
        {
          value: "2",
          label: "机构2"
        },
        {
          value: "3",
          label: "机构1"
        }
      ],
      value: "",
      ruleForm2: {
        account: "admin",
        checkPass: "123456"
      },
      rules2: {
        account: [
          { required: true, message: "请输入账号", trigger: "blur" }
          //{ validator: validaePass }
        ],
        checkPass: [
          { required: true, message: "请输入密码", trigger: "blur" }
          //{ validator: validaePass2 }
        ]
      },
      checked: true
    };
  },
  methods: {
    handleReset2() {
      this.$refs.ruleForm2.resetFields();
    },
    async handleSubmit2(ev) {
      var _this = this;
      var msgBody = {
        // '?xml': {
        //   '@version':'1.0',
        //   '@encoding':'utf-8'
        // },
        root: {
          loginAccount: this.ruleForm2.account,
          passWord: this.ruleForm2.checkPass,
          orgName: 'A医院'
        }
        // root: {
        //   loginAccount: '9999',
        //   passWord: '1',
        //   orgName: 'A医院'
        // }
      };
      var loginParams = {
        msgHeader : '{"root":{"HeaderInfor":{"serviceName":"login"}}',
        msgBody : JSON.stringify(msgBody)
      }
      const res = await this.$http.post("/loginInterface/loginAppSys.asmx/callInterface", loginParams);
      if(res.data.root.loginStatus == '登录成功'){
        var resUser = res.data.root;
        var user = {
          id: resUser.UserID,
          username: resUser.UserName,
          password: '123456',
          avatar: 'https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png',
          name: resUser.UserName
        }
        sessionStorage.setItem("user", JSON.stringify(user));

        this.$router.push({ path: "/form" });
      }
      //this.$router.push({ path: "/form" });
      
      // this.$refs.ruleForm2.validate(async valid => {
      //   if (valid) {
      //     debugger;
      //     //_this.$router.replace('/table');
      //     this.logining = true;
      //     //NProgress.start();
      //     // var loginParams = {
      //     //   username: this.ruleForm2.account,
      //     //   password: this.ruleForm2.checkPass
      //     // };
      //     var loginParams = 'msgHeader={"?xml":{"@version":"1.0","@encoding":"utf-8"},"root":{"sender": "发送方（即发送请求的医院）","serviceName":"login","operatorId":"操作者ID（即发送请求的医生id）","operator": "操作者（即发送请求的医生的姓名）","callOrg": "调用机构编码","targetOrg": "目标机构编码","event":"事件"}}&msgBody={"?xml":{"@version":"1.0","@encoding":"utf-8"},"root":{"loginAccount":"9999","passWord":"1","loginTime":"2019-5-2","orgName":"A医院"}}';
      //     const res = await this.$http.post("/loginInterface/loginAppSys.asmx/callInterface", loginParams);
      //     // let { msg, code, user } = res.data;
      //     // sessionStorage.setItem("user", JSON.stringify(user));
      //     //this.$router.push({ path: "/form" });
      //   } else {
      //     console.log("error submit!!");
      //     return false;
      //   }
      // });
    }
  }
};
</script>

<style lang="scss" scoped>
.login-container {
  /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 100px auto 0;
  width: 350px;
  padding: 25px 25px 15px 25px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
  .title {
    margin: 0px auto 20px auto;
    text-align: center;
    color: #505458;
  }
  .remember {
    margin: 0px 0px 35px 0px;
  }
}
.input-type {
  font-size: 14px;
  color: #666;
}
</style>