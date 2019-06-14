
const userData = 'userData'

// 获取
export function GetStorageData(val) {
    return JSON.parse(localStorage.getItem(val))
}
// 修改
export function SetuserData(val) {
    return localStorage.setItem(userData, JSON.stringify(val))
}
// 删除
export function RemoveuserData() {
    return localStorage.removeItem(userData)
}

/**
 * 获取Storage
 */
export const getLocalStore = (name) => {
    return JSON.parse(window.localStorage.getItem(name))
}

/**
 * 存储Storage
 */
export const setLocalStore = (params,name) => {
    window.localStorage.setItem(name, JSON.stringify(params))
}

/**
 * 删除Storage
 */
export const removeStore = params => {
    window.localStorage.removeItem(params)
    window.sessionStorage.removeItem(params)
}