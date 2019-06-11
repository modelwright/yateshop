<template>
    <div>
        <div class="itembox">
            <div class="vCenter heng">
                <div class="f26 cor3">订单号：{{Info.code}}</div>
            </div>
            <div class="mt40 heng">
                <div class="vCenter">
                    <!-- <div class="imgbox fl"><img src="@a/img/jpg/pic2.jpg" alt=""></div> -->
                    <div class="imgbox fl" :style='"background:url("+Info.icon+");background-size: cover;"'></div>
                    <div class="ml20 fl">
                        <div class="f24 cor3 textEll2" style="width:14em;">{{Info.name}}</div>
                        <div class="f22 cor9 mt20">×1</div>
                    </div>
                    <h6></h6>
                </div>
                <div class="f20 cor6">￥<span class="f28 cor3">{{Info.amount}}</span></div>
            </div>
        </div>
        <div class="itembox">
            <div class="yuan pr mt40 mb65 chuizhi">
                <div class="mb30 f36 cor3">请为本次消费做出评价</div>
                <van-rate v-model.number="fenshu" :size="40" color="#ef7511"/>
            </div>
            <div class="mt65 mb40">
                <textarea class="texts" placeholder="说点什么吧，您的评论能帮助其他用户选购哟~" v-model="content"></textarea>
            </div>
            <Upload :maxLength="20" :model="imgbox"></Upload>
            <p class="f24 mt30" style="color:#b2b2b2">晒晒您的图片吧，最多可传5张</p>
        </div>
        <div class="fixedboxh"></div>
        <div class="fixedbox p0_30 vCenter heng">
            <div class="btnbox wp100" @click="submit">提交评价</div>
        </div>
    </div>
</template>

<script>
import {getLocalStore} from '@/utils/auth'
import Upload from '@c/Upload'
import {comment} from '@/api/user'
export default {
    name: 'Comment',
    components: {
        Upload
    },
    data(){
        return {
            Info: {},
            imgbox: [],
            fenshu: 5,
            content: ''
        }
    },
    created(){
        this.Info = getLocalStore("xinxi")
        // removeStore("xinxi")
    },
    methods: {
        submit(){
            let obj = {
                sessionid: this.$store.state.user.userData.sessionid,
                orderId: this.Info.id,
                score: this.fenshu,
                content: this.content
            }
            comment(obj).then(res=>{
                this.$toast.success('评论成功');
                this.$router.go(-1)
            })
        }
    }
}
</script>

<style lang="less" scoped>
.itembox{background:#fff;padding:30px 25px 35px 30px;margin:25px 30px; }
.imgbox{.wh(118,118);.borR(5px);overflow: hidden;}
.yuan{background-image: linear-gradient(to right, #e6e6e6 0%, #e6e6e6 50%, transparent 50%);background-size: 20px 1px;background-repeat: repeat-x;background-position: bottom;}
.yuan:after,.yuan:before{content:'';display:block;.wh(30,30);.borR(100%);.bag(#f5f5f5);position:absolute;left:-45px;bottom:-12.5px;}
.yuan:after{left:auto;right:-40px;}
.mt65{.mt(65);}
.mb65{.pb(65);}
.btnbox{margin:0 10px;.lh(80,80);.bag(@cor3);.borR(10px);text-align:center;font-size:26px;color:#fff;}
</style>
