// 导入axios
import axios from 'axios'
// 导入工具函数
import { getToken, removeToken } from './token'

// 不是实例中需要用到组件就可以使用 "element-ui"随用随导
import { Message } from 'element-ui' // 弹出警告
// 导入路由
import router from '../router'

// 创建instance
const instance = axios.create({
  baseURL: process.env.VUE_APP_BASEURL,
  // 跨域携带
  withCredentials: true
})
// 请求拦截器
// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    // 在发送请求前做些什么
    // 拦截添加token
    config.headers.token = getToken()

    return config
  },
  function (error) {
    // Do something with request error
    // 在请求错误之后做什么
    return Promise.reject(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 在接收响应做些什么，例如跳转到登录页
    if (response.data.code === 200) {
      return response
    } else if (response.data.code === 206) {
      // 弹出警告
      Message.error('请重新登录')
      // 删除token
      removeToken()
      // 返回登录页
      router.push('/login')
      return Promise.reject('error')
    } else {
      // 都不是就直接对应错误值
      Message.error(response.data.message)
      return Promise.reject('error')
    }
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

export default instance
