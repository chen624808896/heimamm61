import Vue from 'vue'
// 路由分离

import VueRouter from 'vue-router'
// 导入页面
import login from '@/views/login'
import index from '@/views/index/index.vue'

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
        },
        {
          path:"/index",
          component:index
      }            
]
// 创建实例 router 然后传routes配置
const router = new VueRouter({
  routes
})
// 暴露出去
export default router