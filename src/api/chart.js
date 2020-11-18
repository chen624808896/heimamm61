
// 导入工具函数
import {getToken} from '../utils/token'

// 导入请求对象
import instance from '@/utils/request.js'

// 顶部刷题数据接口
export function getTitleData(){
    return instance({
        url:"./data/title",
        method:"post",
        headers:{
            token:getToken()
        }
    })
}
// 获取企业题目数据接口
export function getCompanyQuestionData(){
    return instance({
        url:"./data/statistics",
        method:"post",
        headers:{
            token:getToken()
        }
    })
}