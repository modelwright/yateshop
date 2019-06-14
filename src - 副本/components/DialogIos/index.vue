<template>
    <div class="zezao" v-if="config" ref="dialog">
        <div class="dialog">
            <div class="content">是否将本题发布至求解频道</div>
            <slot name="footer"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DialogIos',
    props: ["leftText","rightText","centerText","config"],
    // data(){
    //     return {
    //         config: false
    //     }
    // },
    methods: {
        // confim(){
        //     this.$emit("confim")
        // }
    },
    watch: {
        // config(val) {
        //     if(val){
        //         this.dialogconfig = false
        //         this.$nextTick(() => {
        //             this.$refs.dialog.scrollTop = 0;
        //         });
        //     }else{

        //     }
        // }
    },
    created(){
        // this.dialogconfig = this.config
    }
}
</script>

<style lang="less" scoped>
.zezao{position:fixed;left:0;top:0;background:rgba(0,0,0,0.5);.jdjz;z-index:1000;right:0;bottom:0;}
.dialog{.bag1;.w(265px);}
.dialog .content{height: 94px;.jdjz;.f14;}
.footerbtn{.bor_tt;.vCenter;.pr;}
.footerbtn:after{.pos;content:'';.dk;background:@bcor1;left:50%;top:15px;.wh(1px,15px);}
.footerbtn>div{padding:15px 0;flex:1;.tc;.f14;.pr;line-height: 1em;}
</style>
