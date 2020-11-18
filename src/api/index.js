
// 导入工具函数
import {getToken} from '../utils/token'

// 导入请求对象
import instance from '@/utils/request.js'

// 抽取请求方法 获取用户信息
export function getUserInfo(){
    return instance({
        url:"/info",
        method:"get",
        // 设置请求头
        headers:{
            // token这个key
            token:getToken()
        }
    })
}