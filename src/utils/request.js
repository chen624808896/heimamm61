// 导入axios
import axios from "axios"
import {getToken} from './token'

// 创建instance
const instance = axios.create({
    baseURL:process.env.VUE_APP_BASEURL,
    // 跨域携带
    withCredentials:true
})
// 拦截器
// Add a request interceptor
instance.interceptors.request.use(
    function (config) {
    // Do something before request is sent
    // 在发送请求前做些什么
    // 拦截添加token
    config.headers.token = getToken()

    return config;
  }, function (error) {
    // Do something with request error
    // 在请求错误之后做什么
    return Promise.reject(error);
  });


// 暴露出去
export default instance