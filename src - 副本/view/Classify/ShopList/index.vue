<template>
    <div class="pos bag1 wp100">
        <router-link class="bag1 serchbox heng vCenter wp100 bor_bb" to="/serch">
            <input type="text" v-model="serchcontent" class="f28 wp100 lh10" style="padding-top:0.4em;" placeholder="输入关键字搜索商品">
            <div><img src="@a/img/png/pic19.png" alt=""></div>
        </router-link>
        <van-list
            class="pl20 pr20"
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            :error.sync="error"
            error-text="请求失败，点击重新加载"
            @load="onLoad"
            >
            <div v-for="(item,index) in list" :key="index" class="vCenter pt20 pb20 bor_bb">
                <div class="imgbox oh mr25" :style="`background:url(${item.icon || '@a/img/jpg/pic2.jpg'}) 0% 0% / cover no-repeat;`"></div>
                <div class="flex1">
                    <div class="f28 cor3 mb10 textEll2">{{item.name}}</div>
                    <div class="vCenter">
                        <div class="f22 cor9 mr20">月销：{{item.monthlySalesVolume}}</div>
                        <div class="f22 cor9">库存：{{item.stockNumber}}</div>
                    </div>
                    <div class="f20 themefont2 mt20">¥ <span class="f30">{{item.price}}</span></div>
                </div>
            </div>
        </van-list>
    </div>
</template>

<script>
import {goodslist} from '@/api'
export default {
    data() {
        return {
            list: [],
            loading: false,
            finished: false,
            error: false,
            page: 1,
            serchcontent: ''
        };
    },
    methods: {
        onLoad() {
            let obj = {
                type: '1',
                page: this.page
            }
            if(this.$route.query.keyword){
                obj.keyword = this.$route.query.keyword
            }else{
                obj.categoryId = this.$route.query.itemId
            }
            goodslist(obj).then(res=>{
                this.list = res.data
                this.loading = false;
                if(res.data.length < 10){
                    this.finished = true;
                }else{
                    ++this.page
                }
            }).catch(()=>{
                this.error = true;
            })
        }
    },
    created(){
    }
}
</script>

<style lang="less" scoped>
.imgbox{.wh(150,150);.bor(#e6e6e6);}
.textEll2{line-height:40px;height:80px;}
.serchbox{height:90px;padding:0 30px; input{border:0;} img{.w(30px);}}
</style>
