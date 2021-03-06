import Login from "./views/Login.vue";
import NotFound from "./views/404.vue";
import Home from "./views/Home.vue";
import Main from "./views/Main.vue";
import Admin from "./views/nav1/admin.vue";
import Form from "./views/nav1/Form.vue";
import AppointmentSearch from "./views/nav1/appointment-search.vue";
import DeptAdmin from "./views/admin/base/dept-admin.vue";
import LeftNav from "./components/nav/LeftNav.vue";
import BodyAdmin from "./views/admin/base/body-admin.vue";
import echarts from "./views/charts/echarts.vue";
import DictionaryAdmin from "./views/admin/base/dictionary-admin.vue";
import typeAdmin from "./views/admin/base/type-admin";
import 预约接收统计 from "./modules/预约统计/预约接收统计";
import 预约申请明细 from "./modules/预约统计/预约申请明细";
import 预约申请统计 from "./modules/预约统计/预约申请统计";
// import 预约统计 from "./modules/预约统计/预约统计";
import 黑名单 from "./modules/黑名单/黑名单";
import 号源管理 from "./modules/号源管理/号源管理";
import 院内号源接口管理 from "./modules/接口维护管理/院内号源接口管理";
import 黑名单管理 from "./modules/系统参数管理/黑名单管理";
import 角色类型管理 from "./modules/基础字典管理/角色类型管理";
import 系统用户管理 from "./modules/基础字典管理/系统用户管理";

let routes = [
  // {
  //   path: "/login",
  //   component: Login,
  //   name: "",
  //   hidden: true
  // },
  {
    path: "/",
    redirect: "/login",
    component: Login,
    name: "用户登录",
    children: [{ path: "/login", component: Login, name: "用户登录" }],
    hidden: true
  },
  {
    path: "/404",
    component: NotFound,
    name: "",
    hidden: true
  },
  { path: '/main', component: Main },
  // {
  //   path: "/",
  //   component: Home,
  //   redirect: "/form",
  //   name: "信息登记",
  //   children: [{ path: "/form", component: Form, name: "信息登记" }]
  // },
  // {
  //   path: "/",
  //   component: Home,
  //   redirect: "/login",
  //   component: Login,
  //   name: "用户登录",
  //   children: [{ path: "/login", component: Login, name: "用户登录" }]
  // },
  {
    path: "/form",
    component: Home,
    redirect: "/form",
    name: "信息登记",
    children: [{ path: "/form", component: Form, name: "信息登记" }]
  },
  {
    path: "/hmd",
    component: Home,
    name: "黑名单",
    children: [{ path: "/hmd", component: 黑名单, name: "hmd" }]
  },
  {
    path: "/yyjstj",
    component: Home,
    name: "预约统计",
    children: [
      { path: "/yyjstj", component: 预约接收统计, name: "预约接收统计" },
      { path: "/yysqmx", component: 预约申请明细, name: "预约申请明细" },
      { path: "/yysqtj", component: 预约申请统计, name: "预约申请统计" }
    ]
  },
  {
    path: "/appointmentSearch",
    component: Home,
    name: "预约查询",
    children: [
      {
        path: "/appointmentSearch",
        component: AppointmentSearch,
        name: "预约查询"
      }
    ]
  },
  {
    path: "/appointmentSearch",
    component: Home,
    name: "预约查询",
    children: [
      {
        path: "/appointmentSearch",
        component: AppointmentSearch,
        name: "预约查询"
      }
    ]
  },
  {
    path: "/admin",
    component: Home,
    redirect: "/admin/adminList",
    name: "后台管理",
    children: [
      {
        path: "/admin/adminList",
        redirect: "/admin/adminList/deptAdmin",
        component: LeftNav,
        children: [
          { path: "/admin/adminList/deptAdmin", component: DeptAdmin },
          { path: "/admin/adminList/bodyAdmin", component: BodyAdmin },
          {
            path: "/admin/adminList/dictionaryAdmin",
            component: DictionaryAdmin
          },
          {
            path: "/admin/adminList/typeAdmin",
            component: typeAdmin
          },
          { path: "/admin/adminList/hygl", component: 号源管理 },
          { path: "/admin/adminList/ynhyjkgl", component: 院内号源接口管理 },
          { path: "/admin/adminList/hmdgl", component: 黑名单管理 },
          { path: "/admin/adminList/jslxgl", component: 角色类型管理 },
          { path: "/admin/adminList/xtyhgl", component: 系统用户管理 }
        ]
      }
    ]
  },
  {
    path: "/",
    component: Home,
    hidden: true
  },
  {
    path: "*",
    hidden: true,
    redirect: { path: "/404" }
  }
];

export default routes;
