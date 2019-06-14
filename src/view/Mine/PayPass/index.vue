<template>
    <div class="pos hp100 wp100 bag1">
        <div class="pl40 pr40">
            <div class="vCenter bor_bb pt30 pb30">
                <img class="icon34 mr30" src="@a/img/png/pic26.png" alt="">
                <input type="text" v-model="password" placeholder="请输入密码" class="b0 f28 cor6 flex1">
            </div>
            <div class="vCenter bor_bb pt30 pb30">
                <img class="icon34 mr30" src="@a/img/png/pic26.png" alt="">
                <input type="text" v-model="password_ed" placeholder="请确认密码" class="b0 f28 cor6 flex1">
            </div>
        </div>
        <div class="wp80 m0a mt50">
            <van-button 
                type="primary"
                :loading = loading
                block
                loading-type="spinner"
                loading-text="加载中..."
                @click="submit"
                >提交</van-button>
        </div>
    </div>
</template>

<script>
import {setPassword} from '@/api'
export default {
    data(){
        return {
            loading: false,
            password: '',
            password_ed: ''
        }
    },
    created(){
        console.log(this.$route.query.code)
    },
    methods: {
        submit(){
            this.loading = true
            let obj = {
                password: this.password,
                code: this.$route.query.code,
                sessionid: this.$store.state.user.userData.sessionid
            }
            setPassword(obj).then(res=>{
                this.loading = false
                console.log(res)
            })
        }
    }
}
</script>

<style>

</style>
