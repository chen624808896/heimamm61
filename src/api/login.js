// 导入请求对象
import instance from '@/utils/request.js'


// 接口的调用 通过instance调用即可
export function userLogin(data){
return instance({
    url:"/login",
    method:"post",
    data
})
}
// 生成验证码地址
export function getCodeURL(){
    return process.env.VUE_APP_BASEURL + "/captcha?type=login"
}
// 生成图片上传地址 
export function getUploadURL(){
    return process.env.VUE_APP_BASEURL + "/uploads"
}