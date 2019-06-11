<template>
    <div>
        <div class="mask" v-if="config.config" @click="config.config = false"></div>
        <transition name="animat">
            <div v-if="config.config" class="dislog" >
                <slot name='content'></slot>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'Picker',
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
  animation: fadeInUp .3s;
}
.animat-leave-active {
  animation: fadeOutDown .3s;
}
.animat-leave-to {
//   animation: fadeOutRight .3s;
  opacity: 0;
}
.dislog{position:fixed;bottom:0;z-index:999;.bag1;.m0a;.wp100;left:0;}
.flex1{background:transparent;.b0;.pr;height:100px;.f36;&:first-child:after{.cler;.wh(1,100%);background:@bcor1;right:0;top:0;.pos;}}
</style>
