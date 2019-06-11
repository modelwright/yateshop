<template>
    <router-link :to="'/detail?itemid=' + itemed.packageId" class="wp50 mb50">
        <div class="imgbox2 mb20"><img class="wp100" :src="itemed.icon || '@a/img/jpg/pic2.jpg'" alt=""></div>
        <div class="textEll2 f28 cor3 mb25">{{itemed.packageName}}</div>
        <div class="themefont2"><span class="f20">¥</span><span class="f36">{{itemed.price}}</span></div>
    </router-link>
</template>

<script>
export default {
    props: ["itemed"]
}
</script>

<style lang="less" scoped>
.wp50{width:334px;}
.imgbox2{width:334px;height:334px;}
.textEll2{line-height:37px;}
</style>
