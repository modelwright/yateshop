<template>
    <div class="pos wp100 bag1">
        <div class="ml40 mr30 bor_bb pb70 pt30">
            <template v-if="res.status == '1'">
                <div class="f36 cor6">{{res.statusName}}</div>
                <div class="vCenter heng mt20">
                    <div class="f24 themefont2">￥<span class="f60 fb">{{res.totalAmount}}</span></div>
                    <div class="themebg3 f26 cor1 jdjz" @click="()=> this.show = true">立即付款</div>
                </div>
            </template>
            <div class="heng vCenter" v-if="res.status == '2'">
                <div class="f36 cor6">{{res.statusName}}</div>
                <div class="vCenter">
                    <div class="f26 cor6 jdjz bor mr20" @click="goRefund(res)" v-if="res.isAlowRefund != 0">申请退款</div>
                    <div class="themebg3 f26 cor1 jdjz" @click="goComment(res)">立即评价</div>
                </div>
            </div>
            <div class="heng vCenter" v-if="res.status == '3'">
                <div class="f36 cor6">{{res.statusName}}</div>
                <div class="vCenter">
                    <div class="f26 cor6 jdjz bor" @click="orderDel(res)">删除订单</div>
                </div>
            </div>
            <div class="heng vCenter" v-if="res.status == '4'">
                <div class="f36 cor6">{{res.statusName}}</div>
                <div class="vCenter">
                    <div class="f26 cor6 jdjz bor" @click="goRefund(res,'select')">退款详情</div>
                </div>
            </div>
        </div>
        <div class="pl40">
            <div class="f34 cor3 mt70 mb40">商品信息</div>
            <div class="heng vCenter pr30 bor_bb pb30">
                <div class="f28 cor3">{{res.name}}</div>
                <div class="f20">¥<span class="f36">{{res.totalAmount}}</span><span class="f28">.00</span></div>
            </div>
            <div class="bor_bb vCenter heng pt30 pb30 pr30" v-for="item in res.items" :key="item.id">
                <div class="vCenter">
                    <div class="imgbox oh mr20"><img class="wp100" :src="item.icon || '@a/img/jpg/pic2.jpg'" alt=""></div>
                    <div>
                        <p class="f28 cor3">{{item.name}}</p>
                        <p class="deage mt10 di" v-if="item.isDelivery == '0'">不支持物流配送</p>
                    </div>
                </div>
                <div class="cor9 f20">{{item.desc}}</div>
            </div>
        </div>
        <div class="pl40 pr20 pb80">
            <div class="f34 cor3 mt70 pb30 bor_bb">订单信息</div>
            <div class="pr10">
                <div class="heng line">
                    <div class="f28 cor9">订单编号</div>
                    <div class="f28 cor3">{{res.code}}</div>
                </div>
                <div class="heng line">
                    <div class="f28 cor9">下单时间</div>
                    <div class="f28 cor3">{{res.addtime}}</div>
                </div>
                <div class="heng line">
                    <div class="f28 cor9">商品总额</div>
                    <div class="f28 cor3">￥{{res.totalAmount}}</div>
                </div>
                <div class="heng line">
                    <div class="f28 cor9">优惠券</div>
                    <div class="f28 cor3">-￥{{res.discount}}</div>
                </div>
                <div class="f28 tr pt10 themefont2">
                    <template v-if="res.status == '1'">待付金额</template><template v-else>实付金额</template>￥<span class="f48">{{res.amount}}</span>
                </div>
            </div>
        </div>
        <van-popup v-model="show" position="bottom">
            <PayPass v-on:Back="model"/>
        </van-popup>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import {setLocalStore} from '@/utils/auth'
import {orderinfo,delorder} from '@/api/user'
import {balancePay} from '@/api'
import PayPass from '@c/PayPass'
export default {
    components: {
        PayPass
    },
    data(){
        return {
            // Info: {},
            res: {},
            show: false
        }
    },
    computed: {
        ...mapState({
            userData: state => state.user.userData
        })
    },
    created(){
        // this.Info = getLocalStore("xinxi")
        // removeStore("xinxi")
        let obj = {
            orderId: this.$route.query.itemid,
            sessionid: this.userData.sessionid
        }
        orderinfo(obj).then(res=>{
            this.res = res.data
            console.log(res);
        })
    },
    methods: {
        goComment(data){
            this.$router.push({path: "/mine/comment"})
            setLocalStore(data,"xinxi")
        },
        goRefund(data,select){
            this.$router.push({path: "/mine/refund",query: select ? {select: select} : ''})
            setLocalStore(data,"xinxi")
        },
        orderDel(data){
            let obj = {
                orderId: data.id,
                sessionid: this.userData.sessionid
            }
            delorder(obj).then(res=>{
                console.log(res)
                this.$toast.success('删除成功');
                this.$router.go(-1)
            })
        },
        model(data){
            console.log("modelzhixing")
            console.log(data)
            let obj = {
                sessionid: this.$store.state.user.userData.sessionid,
                orderId: this.res.id,
                payPassword: data
            }
            balancePay(obj).then(res=>{
                this.$toast.success('支付成功');
                setTimeout(()=>{
                    this.$router.push({path: "/mine/detail",query: {itemid: this.order.orderId}})
                },500)
                console.log(res)
            })
        }
    }
}
</script>

<style lang="less" scoped>
body{background:#fff;}
.f60{font-size:60px;}
.pb70{.pb(70);}
.jdjz{height:50px;.borR(5px);padding:0 24px;}
.mt70{.mt(70);}
.imgbox{.wh(110,110);.borR(12px);}
.deage{border:1px solid @cor3;color:@cor3;padding:5px;.borR(5px);}
.line{margin:26px 0;}
.f48{font-size:48px;}
.bor_bb{border-bottom:1px solid #f3f3f3;}
.pb80{.pb(80);}
</style>
