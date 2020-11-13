// 提取key值
const TOKENKEY = 'mmtoken'
// 保存
export function setToken(token) {
     window.localStorage.setItem(TOKENKEY,token)
}


// 获取
export function getToken() {
    return window.localStorage.getItem(TOKENKEY)
}
// 删除
export function removeToken() {
    window.localStorage.removeItem(TOKENKEY)
}
