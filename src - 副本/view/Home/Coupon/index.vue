<template>
    <div class="pt20">
        <div class="couponitem dn" v-for="(item,index) in 5" :key="index">
            <img src="@a/img/png/pic22.png" class="wp100" alt="">
            <div class="vbox">
                <div class="vCenter p10">
                    <div class="chuizhi xuxian">
                        <div class="f30 fb mb15">¥ <span class="f70">20</span></div>
                        <div class="f24 cor0">满2500元可用</div>
                    </div>
                    <div class="pl50 flex1">
                        <div class="f24 cor6 mb20">会籍卡、商品购买、私柜租用</div>
                        <div class="f20 cor9 mb15">18623474096已使用</div>
                        <div class="f20 cor3 hengright vCenter">剩余时间：2天 <img class="icon di ml30" src="@a/img/png/pic21.png" alt=""></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="">
            <NoData text="暂无优惠券"/>
        </div>
    </div>
</template>

<script>
import NoData from '@c/NoData'
export default {
    components: {
        NoData
    }
}
</script>

<style lang="less" scoped>
.f70{font-size:70px;}
.chuizhi{.w(220);}
.couponitem{margin:0 35px;background: #fff;box-shadow: 0 0 15px rgba(0,0,0,0.1);.mb(20);.borR(10px);.vbox{padding:20px;}}
.icon{.wh(50,50);}
.xuxian{background: linear-gradient(to bottom, #cccccc, #cccccc 6.5px, transparent 6.5px, transparent); background-size: 2px 13px;background-repeat: repeat-y;background-position: right;}
</style>
