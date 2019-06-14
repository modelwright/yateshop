<template>
    <div class="pos wp100 bag1">
        <div class="pingjiabox" :class="index == (res.comments.length - 1) ? '' : 'bor_bb'" v-for="(item,index) in res.comments" :key="index">
            <div class="vCenter heng mb30">
                <div class="vCenter">
                    <div class="tou oh mr25 jdjz"><img class="wp100" :src="item.portrait || '@a/img/jpg/pic2.jpg'" alt=""></div>
                    <div>
                        <p class="f28 mb10">{{item.name}}</p>
                        <div class="vCenter">
                            <van-rate v-model.number="item.score" :size="10" color="#ef7511" readonly/>
                            <span class="themefont3 f20 ml10">{{item.score}}</span>
                        </div>
                    </div>
                </div>
                <div class="f20 cor9">{{item.createAt}}</div>
            </div>
            <div class="f30 cor3 content">
                {{item.content}}
            </div>
            <div class="contentimg heng vCenter pt25" v-if="item.images.length != 0">
                <div class="jdjz oh" @click="componentCall(index)" v-for="(img,index) in item.images" :key="index" :style="'background:url('+img+'); background-size: cover;'">
                    <!-- <img class="wp100" :src="img || '@a/img/jpg/pic2.jpg'" alt=""> -->
                </div>
            </div>
            <van-image-preview
                v-model="show"
                :images="item.images"
                :loop="false"
                :startPosition="imgindex"
            >
            </van-image-preview>
        </div>
    </div>
</template>

<script>
import { commentList } from '@/api'
export default {
    components: {
    },
    data(){
        return {
            res: {},
            imgindex: 0,
            show: false
        }
    },
    created(){
        commentList({productPackageId: this.$route.query.itemId}).then(res=>{
            this.res = res.data
            console.log(res)
        })
    },
    methods: {
        componentCall(data){
            this.imgindex = data;
            console.log(this.imgindex)
            this.show = true;
        }
    }
}
</script>

<style lang="less" scoped>
.bg{background:@cor3;color:#fff;border-top-left-radius: 50px;border-bottom-left-radius: 50px;height:50px;.w(128);}
.tiaofu{background:#fff2e5;.mb(60);}
.width{.w(27);}
.f42{font-size:42px;}
.imgbox{.wh(110,110);}
.biaoqian{padding:5px 7px;}
.mt55{margin-top:55px;}
.tou{.borR(100%);.wh(64,64);}
.content{line-height:50px;}
.pingjiabox{padding:40px 40px 35px;}
.contentimg>div{.wh(212,212);}
.selectbtn{.wh(248,65);border:1px solid #666666;color:#333;}
.posfixed,.posfixedh{height:142px;padding:0 40px;}
.mr70{margin-right:70px;}
.posfixed{position:fixed;bottom:0;right:0;left:0;background:#fff;}
.goumai{.wh(210,80);background:@cor3;font-size:28px;color:#fff;.borR(10px);}
</style>

<style>
.contentbox p{font-size:16px;}
.contentbox img{width:100%;}
</style>