import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
console.log(router);

// 导入饿了吗相关内容
import ElementUI from 'element-ui'
import "element-ui/lib/theme-chalk/index.css"
// 注册
Vue.use(ElementUI)

// 导入全局过滤器
import './filters'
// 导入自己的样式
import "@/assets/base.css"
Vue.config.productionTip = false
// 挂载组件
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')