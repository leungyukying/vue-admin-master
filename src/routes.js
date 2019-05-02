import Login from "./views/Login.vue";
import NotFound from "./views/404.vue";
import Home from "./views/Home.vue";
import Main from "./views/Main.vue";
import Table from "./views/nav1/Table.vue";
import Form from "./views/nav1/Form.vue";
import AppointmentSearch from "./views/nav1/appointment-search.vue";
import Page4 from "./views/nav2/Page4.vue";
import Page5 from "./views/nav2/Page5.vue";
import Page6 from "./views/nav3/Page6.vue";
import echarts from "./views/charts/echarts.vue";
import 预约统计 from "./modules/预约统计/预约统计";
import 黑名单 from "./modules/黑名单/黑名单";

let routes = [
  {
    path: "/",
    redirect: "/login",
    hidden: true
  },
  {
    path: "/login",
    component: Login,
    name: "",
    hidden: true
  },
  {
    path: "/404",
    component: NotFound,
    name: "",
    hidden: true
  },
  //{ path: '/main', component: Main },
  {
    path: "/form",
    component: Home,
    redirect: "/form",
    name: "信息登记",
    children: [{ path: "/form", component: Form, name: "信息登记" }]
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
    path: "/yytj",
    component: Home,
    name: "预约统计",
    children: [{ path: "/yytj", component: 预约统计, name: "预约查询" }]
  },
  {
    path: "/hmd",
    component: Home,
    name: "黑名单",
    children: [{ path: "/hmd", component: 黑名单, name: "hmd" }]
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
