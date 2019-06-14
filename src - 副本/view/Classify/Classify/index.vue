<template>
    <div class="hp100 yem">
        <div class="heng hp100 yemmian">
            <router-link class="bag1 serchbox heng vCenter wp100" to="/serch">
                <input type="text" class="f28 wp100 lh10" style="padding-top:0.4em;" placeholder="输入关键字搜索商品">
                <div><img src="@a/img/png/pic19.png" alt=""></div>
            </router-link>
            <div class="left">
                <div class="zuoitem" :class="changeMenu == index ? 'actived' : ''" v-for="(item,index) in list" :key="item.id" @click="change(index)">{{item.name}}</div>
            </div>
            <div class="right flex1">
                <div class="bag1 hp100" style="overflow: auto;">
                    <div class="henglineleft">
                        <router-link :to="'/classify/shoplist?itemId='+item.id+''" class="rightItem chuizhi" v-for="item in erji" :key="item.id"><img class="m0a" :src="item.icon"/> {{item.name}}</router-link>
                    </div>
                </div>
            </div>
        </div>
        <Tabbar to="/classify"/>
    </div>
</template>

<script>
// import { mapState } from 'vuex'
import {categories} from '@/api'
import Tabbar from '@c/Tabbar'
export default {
    components: {
        Tabbar
    },
    data(){
        return {
            list: [],
            erji: [],
            changeMenu: 0
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
            this.changeMenu = data
        }
    }
}
</script>

<style lang="less" scoped>
.yem{.pb(98);}
.left{.w(206);.pt(12);overflow: auto;}
.zuoitem{background:#fff;color:#333;font-size:28px;display:flex;justify-content: center;align-items: center;height:95px;.mb(2);}
.zuoitem.actived{background:#f1f2f3;color:#ef7511;}
.right{padding:12px 8px 0 10px;}
.rightItem{.w(33.333%);.pt(70);font-size:28px; img{.wh(140,140);.mb(20);}}
.yemmian{.pt(90);}
.serchbox{height:90px;position: absolute;top:0;left: 0;padding:0 30px; input{border:0;} img{.w(30px);}}
</style>
