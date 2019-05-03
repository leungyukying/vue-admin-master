import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import Admin from './views/nav1/admin.vue'
import Form from './views/nav1/Form.vue'
import AppointmentSearch from './views/nav1/appointment-search.vue'
import DeptAdmin from './views/admin/base/dept-admin.vue'
import LeftNav from './components/nav/LeftNav.vue'
import BodyAdmin from './views/admin/base/body-admin.vue'
import echarts from './views/charts/echarts.vue'

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    //{ path: '/main', component: Main },
    {
        path: '/',
        component: Home,
        redirect: '/form',
        name: '信息登记',
        children: [
            { path: '/form', component: Form, name: '信息登记' }
        ]

    },
    {
        path: '/appointmentSearch',
        component: Home,
        name: '预约查询',
        children: [
            { path: '/appointmentSearch', component: AppointmentSearch, name: '预约查询' }
        ]
    },
    {
        path: '/admin',
        component: Home,
        redirect: '/admin/adminList',
        name: '后台管理',
        children: [
            { 
                path: '/admin/adminList',
                redirect: '/admin/adminList/deptAdmin',
                component: LeftNav, 
                children: [
                    { path: '/admin/adminList/deptAdmin', component: DeptAdmin },
                    { path: '/admin/adminList/bodyAdmin', component: BodyAdmin }
                  ]
            }
        ]
    },
    {
        path: '/',
        component: Home,
        hidden: true
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;