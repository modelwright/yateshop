<template>
    <div class="bag1  hp100">
        <div v-if="requery && Info.status=='4'" class="themebg3 jdjz f30 cor1">您的退款平台审核中</div>
        <div class="p0_40">
            <div class="itembox bor_bb">
                <div class="vCenter heng">
                    <div class="f26 cor3">订单号：{{Info.code}}</div>
                </div>
                <div class="mt40 heng">
                    <div class="">
                        <div class="imgbox fl" :style='"background:url("+Info.icon+");background-size: cover;"'></div>
                        <div class="ml20 fl">
                            <div class="f24 cor3 textEll2" style="width:14em;">{{Info.name}}</div>
                            <div class="f22 cor9 mt20">×1</div>
                        </div>
                        <h6></h6>
                    </div>
                </div>
                <div class="heng vCenter mt40">
                    <div class="f30 cor3">退款金额</div>
                    <div class="f24 themefont3 fb">￥<span class="f30 fb">{{Info.amount}}</span></div>
                </div>
            </div>
            <div>
                <div class="f30 cor3 mb30 pb5 mt40">退款原因</div>
                <div class="f26 cor6 bor_bb pb30" v-if="requery">购买错误，退款重购</div>
                <textarea class="texts" v-else placeholder="请填写您的退款原因" v-model="reason"></textarea>
            </div>
            <div class="fixedbox p0_30 vCenter heng">
                <div class="btnbox wp50">联系平台</div>
                <div class="btnbox wp50" @click="candel" v-if="Info.status=='4'">撤销申请</div>
                <div class="btnbox wp50" @click="submit" v-else>提交申请</div>
            </div>
        </div>
    </div>
</template>

<script>
import {getLocalStore} from '@/utils/auth'
import {refund,selrefund,candelrefund} from '@api/user'
export default {
    components: {
        
    },
    data(){
        return {
            Info: {},
            requery: false,
            reason: ''
        }
    },
    created(){
        this.Info = getLocalStore("xinxi")
        if(this.$route.query.select){
            this.requery = true
            let obj = {
                sessionid: this.$store.state.user.userData.sessionid,
                orderId: this.Info.id
            }
            selrefund(obj).then(res=>{
                console.log(res);
            })
        }
        // select
        // removeStore("xinxi")
    },
    methods: {
        submit(){
            if(this.reason != ''){
                let obj = {
                    orderId: this.Info.id,
                    reason: this.reason,
                    sessionid: this.$store.state.user.userData.sessionid
                }
                refund(obj).then(res=>{
                    console.log(res)
                    this.$toast.success('申请成功');
                })
            }else{
                this.$toast.fail('申请原因必填');
            }
        },
        candel(){
            let obj = {
                orderId: this.Info.id,
                sessionid: this.$store.state.user.userData.sessionid
            }
            candelrefund(obj).then(res=>{
                console.log(res);
            })
        }
    }
}
</script>

<style lang="less" scoped>
.itembox{background:#fff;padding:30px 0 40px;}
.imgbox{.wh(118,118);.borR(5px);overflow: hidden;}
.btnbox{margin:0 10px;.lh(80,80);.bag(@cor3);.borR(10px);text-align:center;font-size:26px;color:#fff;}
.themebg3{height:140px;}
</style>
