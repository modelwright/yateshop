<template>
    <div>
        <Saixuan :list="saixuan" :actived="actived" v-on:componentEven="componentEvenCall"/>
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <van-list
                v-model="loading"
                :finished="finished"
                @load="onLoad"
                
                :offset="10"
            >
                <div class="itembox" v-for="item in list" :key="item.id">
                    <div class="vCenter heng">
                        <div class="f26 cor3">订单号：{{item.code}}</div>
                        <div class="themefont3 f26">{{item.statusName}}</div>
                    </div>
                    <div class="mt40 heng" @click="goDetail(item)">
                        <div class="">
                            <div class="imgbox fl" :style='"background:url("+item.icon+");background-size: cover;"'></div>
                            <div class="ml20 fl">
                                <div class="f24 cor3 textEll2" style="width:14em;">{{item.name}}</div>
                                <div class="f22 cor9 mt20">×1</div>
                            </div>
                            <h6></h6>
                        </div>
                        <div class="f20 cor6">￥<span class="f28 cor3">{{item.amount}}</span></div>
                    </div>
                    <div class="mt30 pt5 vCenter heng">
                        <div class="f24 cor3">{{item.description}}</div>
                        <div class="themebg3 f26 cor1 jdjz" v-if="item.status == '1'" @click="goDetail(item)">去支付</div>
                        <div class="vCenter" v-if="item.status == '2'">
                            <div class="heightbtn bor f26 cor6" v-if="item.isAlowRefund != 0" @click="goRefund(item)">申请退款</div>
                            <div class="heightbtn bor f26 cor6" @click="goComment(item)">去评价</div>
                        </div>
                        <div class="vCenter" v-if="item.status == '3'">
                            <div class="heightbtn bor f26 cor6" @click="orderDel(item)">删除订单</div>
                        </div>
                        <div class="vCenter" v-if="item.status == '4'">
                            <div class="heightbtn bor f26 cor6" @click="goRefund(item,'select')">退款详情</div>
                        </div>
                        <div class="vCenter" v-if="item.status == '5'">
                            <div class="heightbtn bor f26 cor6" @click="goRefund(item,'select')">退款详情</div>
                            <div class="heightbtn bor f26 cor6" @click="orderDel(item)">删除订单</div>
                        </div>
                    </div>
                </div>
                <div class="" v-if="list.length == 0">
                    <NoData text="暂无订单消息"/>
                </div>
            </van-list>
        </van-pull-refresh>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import Saixuan from '@c/Saixuan'
import NoData from '@c/NoData'
import {orderlist,delorder} from '@/api/user'
import {setLocalStore} from '@/utils/auth'
export default {
    components: {
        Saixuan,
        NoData
    },
    data(){
        return {
            actived: 0,
            page: 1,
            list: [],
            loading: false, // 是否处于加载状态
            finished: false, // 是否已加载完所有数据
            isLoading: false, // 是否处于下拉刷新状态
            saixuan: [{
                text: '全部',
                num: 0
            },{
                text: '待支付',
                num: 1
            },{
                text: '待评价',
                num: 2
            },{
                text: '已完成',
                num: 3
            },{
                text: '退款中',
                num: 4
            },{
                text: '已退款',
                num: 5
            }]
        }
    },
    computed: {
        ...mapState({
            userData: state => state.user.userData
        })
    },
    created(){
        // this.order(this.actived, 1)
    },
    methods: {
        componentEvenCall(data){
            this.actived = data
            this.list = []
            this.order(data,1)
        },
        order(data,kaishi){
            orderlist({sessionid: this.userData.sessionid,page: kaishi || this.page,status: data || this.actived}).then(res=>{
                console.log(res);
                this.list = this.list.concat(res.data)
                this.loading = false;
                this.finished = false;
                this.isLoading = false;
                this.page++
                console.log(this.list)
                if (res.data.length <= 10) {
                    this.finished = true;
                }
            })
        },
        goComment(data){
            this.$router.push({path: "/mine/comment"})
            setLocalStore(data,"xinxi")
            // this.$router.push({ path: "/UserInfo", query: { uid: uid } });
        },
        goRefund(data,select){
            this.$router.push({path: "/mine/refund",query: select ? {select: select} : ''})
            setLocalStore(data,"xinxi")
        },
        goDetail(data){
            this.$router.push({path: "/mine/detail",query: {itemid: data.id}})
            setLocalStore(data,"xinxi")
        },
        orderDel(data){
            let obj = {
                orderId: data.id,
                sessionid: this.userData.sessionid
            }
            delorder(obj).then(res=>{
                this.order()
                this.$toast.success('删除成功');
            })
        },
        onRefresh() { // 下拉刷新
            this.list = []
            this.order(this.actived,1)
        },
        onLoad() { // 上拉加载
            this.order(this.actived)
        }
    }
}
</script>

<style lang="less" scoped>
.list{padding:5px 30px;}
.itembox{background:#fff;padding:30px 25px 35px 30px;margin:25px 0; }
.imgbox{.wh(118,118);.borR(5px);overflow: hidden;}
.themebg3{height:50px;.borR(6px);padding:0 20px;}
.heightbtn{height:50px;padding:0 22px;line-height:50px;.ml(20);.borR(4px);}
</style>

