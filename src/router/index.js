import Vue from 'vue'
// 路由分离

import VueRouter from 'vue-router'
// 导入页面
import login from '@/views/login'
import index from '@/views/index'

// 嵌套路由组件
import chart from '../views/index/chart'
import user from '../views/index/user'
import question from '../views/index/question'
import company from '../views/index/company'
import subject from '../views/index/subject'
// 导入进度条
import NProgress from 'nprogress'
// 样式只需要导入， 不需要赋值
import 'nprogress/nprogress.css'

// 导入进度条的样式

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
          // 重新定向
          redirect:"/index/chart",
          component:index,
          // 嵌套路由
          children:[
            {path:"chart",component:chart},
            {path:"user",component:user},
            {path:"question",component:question},
            {path:"company",component:company},
            {path:"subject",component:subject}
          ]
      }            
]
// 创建实例 router 然后传routes配置
const router = new VueRouter({
  routes
})
// 注册导航守卫 前置
router.beforeEach((to,from,next)=>{
  NProgress.start()
  // 必须执行next
  next()
})
// 注册导航守卫 后置
router.afterEach(()=>{
  // 关闭导航
  NProgress.done()
  // document.title= to.meta.title
})
// 暴露出去
export default router