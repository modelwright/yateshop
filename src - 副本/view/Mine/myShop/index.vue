<template>
    <div class="pos wp100 bag1 pt30">
        <div class="ml40 mr30 tiaofu f24">
            * 请报您的手机号，由前台提取核销
        </div>
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <van-list
                v-model="loading"
                :finished="finished"
                @load="onLoad"
                
                :offset="10"
            >
                <div class="item bor_bb" v-for="item in list" :key="item.id">
                    <div class="vCenter heng">
                        <div class="vCenter">
                            <div class="imgbox" :style='"background:url("+item.icon+");background-size: cover;"'></div>
                            <div class="ml20">
                                <div class="f28 cor3 title textEll">{{item.name}}</div>
                                <div class="f20 cor9 mt20">
                                    <p>x {{item.quantity}}</p>
                                </div>
                            </div>
                        </div>
                        <!-- <div class="cor9 f20">已提取 <span class="f36 cor0">0</span></div> -->
                        
                        <!-- <div v-if="item.distribution == '0' && item.isDelivery == '1'">
                            <div class="cor9 f20 tr mb20" v-if="item.type == '1' || item.type == '2'">已提取 <span class="f36 cor0">{{item.extractNum}}</span></div>
                            <div class="btn f24 jdjz themefont3">申请物流</div>
                            <div class="cor9 f20 tr" style="width:10em;" v-if="item.type == '3' || item.type == '4' || item.type == '5' || item.type == '6'">
                                {{item.description}}
                            </div>
                        </div>
                        <div v-else-if="item.distribution == '2' && item.isDelivery == '1'">
                            <div class="cor9 f20 tr mb20" v-if="item.type == '1' || item.type == '2'">已提取 <span class="f36 cor0">{{item.extractNum}}</span></div>
                            <div class="btn f24 jdjz themefont3">查看物流</div>
                            <div class="cor9 f20 tr" style="width:10em;" v-if="item.type == '3' || item.type == '4' || item.type == '5' || item.type == '6'">
                                {{item.description}}
                            </div>
                        </div> -->
                        <div v-if="item.type=='1'||item.type=='2'">
                            <!-- 商品 -->
                            <div class="cor9 f20 tr mb20" >已提取 <span class="f36 cor0">{{item.extractNum}}</span></div>
                            <div v-if="item.isDelivery == '1'" attr="支持配送">
                                <div v-if="item.distribution == '1'" class="btn f24 jdjz themefont3" @click="gosellog(item)">查看物流</div>
                                <div v-if="item.distribution == '0'" class="btn f24 jdjz themefont3" @click="goaddlog(item)">申请物流</div>
                            </div>
                            <div v-else attr="不支持配送">
                            </div>
                        </div>
                        <div class="cor9 f20 tr" v-else style="width:8em;">
                            <!-- 商品之外的 -->
                            {{item.description}}
                        </div>
                    </div>
                    <div class="mt25 f24 cor6">商品来源：{{item.packageName}} 购买</div>
                </div>
            </van-list>
        </van-pull-refresh>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { goods } from '@/api/user'
import {setLocalStore} from '@/utils/auth'
export default {
    data(){
        return {
            list: [],
            page: 0,
            loading: false, // 是否处于加载状态
            finished: false, // 是否已加载完所有数据
            isLoading: false // 是否处于下拉刷新状态
        }
    },
    computed: {
        ...mapState({
            userData: state => state.user.userData
        })
    },
    created(){
    },
    methods: {
        goaddlog(data){
            this.$router.push({path: "/mine/addlog"})
            setLocalStore(data,"xinxi")
        },
        gosellog(data){
            this.$router.push({path: "/mine/sellog"})
            setLocalStore(data,"xinxi")
        },
        getList(){
            let obj = {sessionid: this.userData.sessionid,page: this.page}
            goods(obj).then(e => {
                this.list = this.list.concat(e.data)
                this.loading = false;
                this.finished = false;
                this.isLoading = false;
                if (e.data.length < 10) {
                    this.finished = true;
                }
            })
        },
        onRefresh() { // 下拉刷新
            this.list = []
            this.page = 1
            this.getList()
        },
        onLoad() { // 上拉加载
            this.page++
            this.getList()
        }
    }
}
</script>

<style lang="less" scoped>
.tiaofu{background:#fdf1e7;color:@cor3;padding:30px;}
.item{.ml(40);.pt(40);.pr(30);.pb(35);}
.imgbox{.wh(110,110);.borR(10px);}
.title{.w(10em);}
.btn{.wh(138,52);.bor(@cor3);}
</style>

