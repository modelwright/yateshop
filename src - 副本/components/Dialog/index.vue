<template>
    <div>
        <div class="mask" v-if="config.config" @click="config.config = false"></div>
        <transition name="animat">
            <div v-if="config.config" class="dislog" >
                <slot name='content'></slot>
                <div class="bor_tt vCenter">
                    <button class="flex1 cor0" @click="config.config = false">取消</button>
                    <button
                        class="flex1"
                        v-if="config.btnText"
                        slot="actions"
                        :style="'color:' + config.rightcolor"
                        @click="buttonFun">{{config.btnText}}</button>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'Dialog',
    props: ["config",'callBack'],
    methods: {
        buttonFun() {
            if(this.callBack) {
                this.callBack()
            }
        }
    }
}
</script>

<style lang="less" scoped>
.animat-enter-active {
  animation: fadeInDown .3s;
}
.animat-leave-active {
  animation: fadeOutUp .3s;
}
.animat-leave-to {
//   animation: fadeOutRight .3s;
  opacity: 0;
}
.dislog{position:fixed;top:20%;z-index:999;.bag1;.m0a;.wp80;left:10%;.borR(10px);}
.flex1{background:transparent;.b0;.pr;height:100px;.f36;&:first-child:after{.cler;.wh(1,100%);background:@bcor1;right:0;top:0;.pos;}}
</style>
