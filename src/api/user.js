
import { POSTFORM } from '@/utils/fly'
import { shit1,shit } from '@/utils/count'

const mine = (data) => POSTFORM({ url: shit1 + '/user/info', param: data })
const goods = (data) => POSTFORM({ url: shit + '/order/getProductListByPage', param: data })
const orderlist = (data) => POSTFORM({ url: shit + '/order/getListByPage', param: data })
const orderinfo = (data) => POSTFORM({ url: shit + '/order/getInfoByOrderId', param: data })
const addlog = (data) => POSTFORM({ url: shit + '/order/submitProductLogisticsById', param: data })
const sellog = (data) => POSTFORM({ url: shit + '/order/getProductInfoById', param: data })
const refund = (data) => POSTFORM({ url: shit + '/order/refundByOrderId', param: data }) // 申请退款
const candelrefund = (data) => POSTFORM({ url: shit + '/order/candelRefundByOrderId', param: data }) // 撤销申请退款
const selrefund = (data) => POSTFORM({ url: shit + '/order/getRefundInfoByOrderId', param: data }) // 退款详情
const delorder = (data) => POSTFORM({ url: shit + '/order/delete', param: data }) // 删除订单
const comment = (data) => POSTFORM({ url: shit + '/order/appraiseByOrderId', param: data }) // 评价订单

export {
    mine,
    goods,
    orderlist,
    orderinfo,
    addlog,
    sellog,
    refund,
    selrefund,
    delorder,
    candelrefund,
    comment
}