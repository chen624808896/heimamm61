// 导入请求对象
import instance from '@/utils/request.js'

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