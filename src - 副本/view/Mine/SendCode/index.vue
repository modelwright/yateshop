<template>
    <div class="pos hp100 wp100 bag1">
        <div class="pl40 pr40">
            <div class="vCenter bor_bb pt30 pb30">
                <img class="icon34 mr30" src="@a/img/png/pic23.png" alt="">
                <input type="text" v-model="mobile" placeholder="输入你的手机号" class="b0 f28 cor6 flex1">
            </div>
            <div class="vCenter bor_bb pt15 pb15">
                <img class="icon34 mr30" src="@a/img/png/pic24.png" alt="">
                <input type="text" v-model="code" placeholder="请输入验证码" class="b0 f28 cor6 flex1">
                <img :src="image" @click="imgcode" class="imgcode" alt="">
            </div>
            <div class="vCenter bor_bb pt30 pb30 pr">
                <img class="icon34 mr30" src="@a/img/png/pic25.png" alt="">
                <input type="text" v-model="mobilecode" placeholder="请输入手机验证码" class="b0 f28 cor6 flex1">
                <div class="sendcode" @click="sendcode">获取验证码</div>
            </div>
        </div>
        <div class="wp80 m0a mt50">
            <van-button 
                type="primary"
                block
                @click="xiayibu"
                >下一步</van-button>
        </div>
    </div>
</template>

<script>
// getVerifyCode
import {captcha,getVerifyCode,verifyMobileCode} from '@/api'
export default {
    data(){
        return {
            image: {},
            key: '',
            mobile: '',
            code: '',
            mobilecode: ''
        }
    },
    created(){
        this.imgcode();
    },
    methods: {
        imgcode(){
            captcha().then(res=>{
                this.image = res.data.image
                this.key = res.data.key
            })
        },
        sendcode(){
            let obj = {
                code: this.code,
                mobile: this.mobile,
                type: 4,
                captcha_key: this.key
            }
            getVerifyCode(obj).then(res=>{
                this.$toast.success(res.message);
            })
        },
        xiayibu(){
            let obj = {
                mobile: this.mobile,
                code: this.mobilecode
            }
            verifyMobileCode(obj).then(res=>{
                this.$router.push({path: '/mine/paypass',query: {code: this.mobilecode}})
            })
        }
    }
}
</script>

<style lang="less" scoped>
.sendcode{font-size:26px;border-left:1px solid #e6e6e6;padding:0 30px;}
.imgcode{height:60px;}
</style>
