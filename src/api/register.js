import axios from "axios"
// 创建instance
const instance = axios.create({
    baseURL:process.env.VUE_APP_BASEURL,
    //  跨域携带cookie
    withCredentials:true
})
// 抽取获取短信验证码的接口
export function getPhoneCode(data){
  return  instance({
        url:"/sendsms",
        method:"post",
        data
    })
}
// 管理路由
export function getRegisterCodeURL(){
    return process.env.VUE_APP_BASEURL +`/captcha?type=kkk&${Date.now()}`
}
export function getUploadURL(){
    return process.env.VUE_APP_BASEURL +`/uploads`
}