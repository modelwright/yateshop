import { GET,POST, POSTFORM } from '@/utils/fly'
import { shit, shit1 } from '@/utils/count'

// const login = () => Promise.resolve({
//     name: '333',
//     userToken: '3333333333333'
// })
const logout = () => GET({ url: 'api/logout' })
const getUserInfo = () => GET({ url: '/api/current/user' })
const login = (data) => POSTFORM({ url: shit1 + '/user/login', param: data }) // 登录
const home = (data) => POSTFORM({ url: shit + '/shop/index', param: data }) // 首页
const categories = (data) => POSTFORM({ url: shit + '/shop/categories', param: data }) // 所有分类
const getInfo = (data) => POSTFORM({ url: shit + '/shop/getInfo', param: data })
const mkOrder = (data) => POSTFORM({ url: shit + '/shop/mkOrder', param: data }) // 生成订单
const coupon = (data) => POSTFORM({ url: shit1 + '/user/coupon', param: data }) // 当前用户可用优惠券
const getArea = (data) => POSTFORM({ url: shit1 + '/common/getArea', param: data }) // 获取省市区
const balancePay = (data) => POSTFORM({ url: shit + '/order/balancePay', param: data }) // 余额支付
const uploadTemp = (data) => POST({ url: shit + '/member/uploadTemp', param: data }) // 上传图片到临时目录

export {
    login,
    logout,
    getUserInfo,
    home,
    categories,
    getInfo,
    mkOrder,
    coupon,
    getArea,
    balancePay,
    uploadTemp
}