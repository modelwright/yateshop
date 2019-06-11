<template>
    <div class="saixuan vCenter jdjz">
        <!-- <div class="jdjz actived">全部</div> -->
        <div v-for="item in list" :key="item.num" :class="{actived:actived == item.num}" class="jdjz" @click="slect(item.num)">{{item.text}}</div>
    </div>
</template>

<script>
export default {
    props: {
        list: {type: [Array]},
        actived: {type: [Number],default: 0}
    },
    methods: {
        slect(data){
            this.$emit("componentEven",data)
            // _this.$emit("componentEven",rs.address, e.point.lng, e.point.lat)
        }
    }
}
</script>

<style lang="less" scoped>
.saixuan{background:#fff;height:90px;.bor_b(@bcor1);.jdjz{font-size:26px;color:#666;text-align: center;flex:1;height:100%;}}
.saixuan .actived{position:relative;color:@cor3;}
.actived:after{.wh(2em,3px);.bag(@cor3);content:'';display:block;position: absolute;bottom:0;left:50%;.ml(-1em);}
</style>

