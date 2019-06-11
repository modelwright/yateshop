<template>
    <div class="hp100">
        <div class="heng hp100">
            <div class="left">
                <div class="zuoitem" v-for="(item,index) in list" :key="item.id" @click="change(index)">{{item.name}}</div>
            </div>
            <div class="right flex1">
                <div class="bag1 hp100" style="overflow: auto;">
                    <div class="henglineleft">
                        <div class="rightItem chuizhi" v-for="item in erji" :key="item.id"><img class="m0a" :src="item.icon"/> {{item.name}}</div>
                    </div>
                </div>
            </div>
        </div>
        <Tabbar />
    </div>
</template>

<script>
// import { mapState } from 'vuex'
import Tabbar from '@c/Tabbar'
import {categories} from '@/api'
export default {
    components: {
        Tabbar
    },
    data(){
        return {
            list: [],
            erji: []
        }
    },
    created(){
        categories().then(e => {
            this.list = e.data,
            this.erji = e.data[0].list
        })
    },
    methods: {
        change(data){
            this.erji = this.list[data].list
        }
    }
}
</script>

<style lang="less" scoped>
.left{.w(206);.pt(12);overflow: auto;}
.zuoitem{background:#fff;color:#333;font-size:28px;display:flex;justify-content: center;align-items: center;height:95px;.mb(2);}
.right{padding:12px 8px 0 10px;}
.rightItem{.w(33.333%);.pt(70);font-size:28px; img{.wh(140,140);.mb(20);}}
</style>
