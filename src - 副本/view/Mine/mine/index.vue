<template>
    <div class="bag1 hp100">
        <div class="vCenter heng pl40 pr40 pt30">
            <div>
                <div class="f50 mb20">{{user.nickname}}</div>
                <div class="f24 cor9">已经在亚特{{user.login_day}}天</div>
            </div>
            <div class="touxiang jdjz oh" @click="goEdit" :style="`background:url(${user.portrait || '@a/img/jpg/pic2.jpg'}) 0% 0% / cover no-repeat;`">
            </div>
        </div>
        <div class="pl40 pr40">
            <router-link to="/mine/myOrder" class="itembox bor_bb heng vCenter">
                <p class="f30 cor3">订单</p>
                <img src="@a/img/png/pic8.png" alt="">
            </router-link>
            <router-link to="/mine/myShop" class="itembox bor_bb heng vCenter">
                <p class="f30 cor3">商品</p>
                <img src="@a/img/png/pic9.png" alt="">
            </router-link>
            <a class="itembox bor_bb heng vCenter" :href="'tel:' + user.customer_tel">
                <p class="f30 cor3">客服</p>
                <img src="@a/img/png/pic10.png" alt="">
            </a>
            <router-link to="/mine/feedback" class="itembox bor_bb heng vCenter">
                <p class="f30 cor3">反馈</p>
                <img src="@a/img/png/pic11.png" alt="">
            </router-link>
            <router-link to="/mine/sendcode" class="itembox bor_bb heng vCenter">
                <p class="f30 cor3">支付密码</p>
                <img src="@a/img/png/pic11.png" alt="">
            </router-link>
            <!-- <div class="itembox bor_bb heng vCenter">
                <p class="f30 cor3">推广</p>
                <img src="@a/img/png/pic12.png" alt="">
            </div> -->
            <router-link to="/mine/aboutUs" class="itembox bor_bb heng vCenter">
                <p class="f30 cor3">关于</p>
                <img src="@a/img/png/pic13.png" alt="">
            </router-link>
        </div>
        <Tabbar to="/mine"/>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import Tabbar from '@c/Tabbar'
import { mine } from '@/api/user'
export default {
    components: {
        Tabbar
    },
    data(){
        return {
            user: ''
        }
    },
    computed: {
        ...mapState({
            userData: state => state.user.userData
        })
    },
    created(){
        let obj = {sessionid: this.userData.sessionid}
        mine(obj).then(e => {
            this.user = e.data
        })
    },
    methods: {
        goEdit(){
            this.$router.push({path: '/mine/edit'})
        }
    }
}
</script>

<style lang="less" scoped>
.f50{font-size:50px;}
.touxiang{.wh(150,150);.borR(100%);}
.itembox{height:105px; img{.wh(40,40);}}
</style>
