<template>
    <div class="f40 dk tc pr">{{text}}</div>
</template>

<script>
export default {
    name: 'Title',
    props: ['text']
}
</script>

<style lang="less" scoped>
.dk{margin:65px 0 40px;}
.dk:after,.dk:before{position:absolute;top:18px;content:'';display:block;background:#e6e6e6;width:30%;height:1px;margin:0;}
.dk:after{right:30px;}
.dk:before{left:30px;}

</style>
