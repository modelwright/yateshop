<template>
    <div class="loginbox pos">
        <div class="logo jdjz"><img src="@a/img/png/logo.png" alt=""></div>
        <div class="inputbox jdjz"><img src="@a/img/png/pic6.png" alt=""><input type="text" class="f28" placeholder="手机号"></div>
        <div class="inputbox jdjz"><img src="@a/img/png/pic6.png" alt=""><input type="text" class="f28" placeholder="密码"></div>
        <div class="loginbtn f32 cor1 jdjz" @click="login">登 录</div>
    </div>
</template>

<script>
import {mapActions} from 'vuex'
import { login } from '@/api'
export default {
    created(){
        
    },
    methods: {
        ...mapActions(["setUserData"]),
        login(){
            login({mobile: '15922715201', password: '123456', uuid: '5AB8FF46-463D-4F90-90F2-7BA5A2EA573D'}).then(e => {
                this.setUserData(e.data);
                this.$router.push({ path: "/" });
                console.log(e)
                console.log('登录成功')
            })
        }
    }
}
</script>

<style lang="less" scoped>
.loginbox{padding:0 85px;flex:1;background: #fff;.w(100%);top:0;bottom:0;}
.inputbox{width:100%;height:118px;.pt(20);position:relative;.pl(60);.bor_b(@bcor1);input[type="text"]{width:100%;border:0;}}
.inputbox img{position: absolute;left:0;.wh(34,34);}
.loginbtn{.wh(100%,80);.bag(@cor3);.mt(60);.borR(10px);}
</style>
