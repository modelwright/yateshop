<template>
    <div class="pos wp100 bag1">
        <div class="pl40">
            <div class="f34 cor3 mb40 pt50">商品信息</div>
            <div class="heng vCenter pr30 bor_bb pb30">
                <div class="f28 cor3">{{Info.name}}</div>
                <div class="f20 themefont2">¥<span class="f36 fb ml10">{{Info.price}}</span></div>
            </div>
            <div class="bor_bb vCenter heng pt30 pb30 pr30" v-for="item in Info.list" :key="item.id">
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
        <div class="pl40 pr40">
            <div class="f34 cor3 pt50">优惠信息</div>
            <div class="heng vCenter pb35 pt35">
                <div class="f28 cor6">优惠券</div>
                <div class="cell__ft f28 cor9" @click="goCoupon">暂无优惠券</div>
            </div>
        </div>
        <div class="fixedboxh"></div>
        <div class="fixedbox heng vCenter">
            <div>
                <div class="f22 cor3 mb10" style="display:flex;align-items:flex-end;">总计<div class="themefont2 ml10">¥<span class="f36 fb ml10">{{Info.price}}</span></div></div>
                <div class="f20 cor9">已优惠0元</div>
            </div>
            <div class="btns jdjz themebg3 cor1 b0 f28" @click="submit">立即支付</div>
        </div>
        <van-popup v-model="show" position="bottom">
            <PayPass v-on:Back="model"/>
        </van-popup>
    </div>
</template>

<script>
import {getLocalStore} from '@/utils/auth'
import {coupon,mkOrder,balancePay} from '@/api'
import PayPass from '@c/PayPass'
export default {
    components: {
        PayPass
    },
    data(){
        return {
            Info: {},
            show: false,
            order: {}
        }
    },
    created(){
        this.Info = getLocalStore("xinxi")
        console.log(this.Info);
        let obj = {
            sessionid: this.$store.state.user.userData.sessionid,
            use_type: 6,
            store_id: 8,
            amount: this.Info.price,
            product_id: this.Info.id
        }
        coupon(obj).then(res=>{
            console.log(res)
        })
    },
    methods: {
        submit(){
            let obj = {
                sessionid: this.$store.state.user.userData.sessionid,
                // couponId: this.,
                id: this.Info.id
            }
            mkOrder(obj).then(res=>{
                this.$toast('下单成功');
                this.show = true
                this.order = res.data
            })
        },
        goCoupon(){
            this.$router.push('/coupon')
        },
        model(data){
            console.log("modelzhixing")
            console.log(data)
            let obj = {
                sessionid: this.$store.state.user.userData.sessionid,
                orderId: this.order.orderId,
                payPassword: data
            }
            balancePay(obj).then(res=>{
                this.$toast('支付成功');
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
.list{padding:5px 30px;}
.itembox{background:#fff;padding:30px 25px 35px 30px;margin:25px 0; }
.imgbox{.wh(118,118);.borR(5px);overflow: hidden;}
.deage{border:1px solid @cor3;color:@cor3;padding:5px;.borR(5px);}
.themebg3{.wh(221,50);.borR(6px);}
.heightbtn{height:50px;padding:0 22px;line-height:50px;.ml(20);.borR(4px);}
.fixedboxh{height:142px;}
.fixedbox{height:100px;.pl(40);.pr(40);background:#fff;}
.btns{.wh(210,70);font-size:28px;}
</style>

