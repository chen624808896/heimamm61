import Vue from 'vue'

import VueRouter from 'vue-router'
// 导入页面
import login from '@/views/login'

// 导入路由
// 使用前需要调用
Vue.use(VueRouter);
// 注册路由信息
// 重定向
const routes =[
    {
        path:"/",
        redirect:"/login"
        },
        {
            path:"/login",
            component:login
        }
        
]
// 创建实例 router 然后传routes配置
const router = new VueRouter({
  routes
})
export default router