<template>
    <div>
        <div class="header" :style="'height:'+ (statusHeight+89)/2 +'px;padding-top:'+statusHeight/2+'px'">
            <div @click="back" class="pos" style="left:12.5px;">
                <img v-if="!leftText" style="width:20px;height:20px;" src="@a/images/png/pic8.png" alt="">
                <div v-else>{{leftText}}</div>
            </div>
            <div class="flex1 tc">
                <div class="tc cor1 f17" v-if="centerText">{{centerText}}</div>
            </div>
            <div class="pos" style="right:12.5px;">
                <img @click="more" v-if="!rightText && mored" style="width:20px;height:20px;" src="@a/images/png/pic9.png" alt="">
                <div @click="rightFun" v-else class="cor1 f14">{{rightText}}</div>
            </div>
        </div>
        <div :style="'height:'+ (statusHeight+89)/2 +'px'"></div>
        <div class="fixedmenu" v-if="config" :style="'top:'+ (statusHeight+89)/1.75 +'px'">
            <div class="f13" v-for="(item,index) in rightMenu" @click="rightMenuFun(index)" :key="index">{{item}}</div>
        </div>
    </div>
</template>

<script>
import appBridge from '@/appBridge'
export default {
    name: 'Header',
    props: ["leftText","rightText","centerText","mored","rightMenu"],
    data(){
        return {
            config: false,
            statusHeight: ''
        }
    },
    created(){
        this.statusHeight = appBridge.getStatusBarHeight()
    },
    methods: {
        back(){
            console.log(this)
            if (this.$route.path == "/index") {
                console.log("到顶了")
                // this.$router.push({path: '/'})
                appBridge.getgoBack()
                window.client.goBack()
                return false
            } else {
                this.$router.go(-1)
            }
        },
        more(){
            this.config = !this.config
        },
        rightFun(){
            this.$emit('rightFun')
        },
        rightMenuFun(index){
            this.$emit('rightMenuFun',index)
        }
    }
}
</script>

<style lang="less" scoped>
.header{height: 89/2px;.vCenter;.heng;.wp100;background: #000;position: fixed;top:0;left: 0;padding: 0 25/2px;z-index: 999;}
</style>

