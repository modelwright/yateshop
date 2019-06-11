<template>
    <div class="jdjz oh" :style="'width:'+ size/2 +'px;height:'+size/2+'px'">
        <img :src="src" alt="">
    </div>
</template>

<script>
export default {
    name: 'UserHead',
    props: ["size","src"],
    computed: {
        
    }
}
</script>

<style lang="less" scoped>
div{.borR(100%);.bag0;}
</style>
