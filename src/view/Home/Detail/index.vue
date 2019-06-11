<template>
    <div class="pos wp100 bag1">
        <!-- <div><img :src='res.icon || "@a/img/jpg/pic3.jpg"' class="wp100" alt=""></div> -->
        <swiper ref="mySwiper" :options="swiperOption">
            <swiper-slide class="box" v-for="(slide, index) in res.images" :key="index" :data-slide="slide">
                <div class="" @click="slideclick(slide)">
                    <img class="wp100 bag1" :src="slide" alt="">
                </div>
            </swiper-slide>
        </swiper>
        <div class="bor_bb ml40" style="margin-top:55px;">
            <div class="vCenter heng mb30 f42">{{res.name}} <div class="bg f22 jdjz" v-if="res.buy_limit != '0'">限购 {{res.buy_limit}}</div></div>
            <div class="vCenter mb20">
                <div class="themefont2 mr20"><span class="f20 fb">¥</span><span class="f36 fb">{{res.price}}</span><!--<span class="f28">.00</span>--></div>
                <div class="f24 cor6"><span class="mr20">月销：{{res.monthlySalesVolume}}</span>库存：{{res.stockNumber}}</div>
            </div>
            <div class="tiaofu pt10 pb10 di pr20">
                <div class="vCenter themefont3 f24 ml30 fl" v-if="res.onStore == 1"><img class="width mr10" src="@a/img/png/pic1.png" alt=""> 支持到店取货</div>
                <div class="vCenter themefont3 f24 ml30 fl" v-if="res.ship == 1"><img class="width mr10" src="@a/img/png/pic1.png" alt=""> 支持送货上门</div>
                <div class="vCenter themefont3 f24 ml30 fl" v-if="res.quality == 1"><img class="width mr10" src="@a/img/png/pic1.png" alt=""> 正品保证</div>
                <h6></h6>
            </div>
        </div>
        <div class="ml40">
            <div class="vCenter f34 cor3 mt55 mb15">商品清单</div>
            <div class="bor_bb vCenter pt25 pb30 heng pr30" v-for="item in res.list" :key="item.id">
                <div class="heng">
                    <div class="imgbox mr20"><img class="wp100" :src='item.icon||"@a/img/jpg/pic2.jpg"' alt=""></div>
                    <div>
                        <p class="f28 cor3">{{item.name}}</p>
                        <div class="mt10" v-if="item.isDelivery == '0'"><b class="bor themefont3 biaoqian di f16">不支持物流配送</b></div>
                        <div class="f20 cor9 mt15">x{{item.desc}}</div>
                    </div>
                </div>
                <div class="tr">
                    <span class="f20 cor9">原价</span>
                    <div class="themefont2">
                        <span class="f20 fb">¥</span>
                        <span class="f36 fb">{{item.price}}</span>
                        <!-- <span class="f28">.00</span> -->
                    </div>
                </div>
            </div>
        </div>
        <div class="ml40 mr40" v-if="res.comments.length != 0">
            <div class="f34 mt55">用户评价 <span class="f22">{{res.totalComment}}条</span></div>
            <div class="pingjiabox" :class="index == (res.comments.length - 1) ? '' : 'bor_bb'" v-for="(item,index) in res.comments" :key="index">
                <div class="vCenter heng mb30">
                    <div class="vCenter">
                        <div class="tou oh mr25"><img src="@a/img/jpg/pic2.jpg" alt=""></div>
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
                    <div class="jdjz oh" v-for="(img,index) in item.images" :key="index" :style="'background:url('+img+'); background-size: cover;'">
                        <!-- <img class="wp100" :src="img || '@a/img/jpg/pic2.jpg'" alt=""> -->
                    </div>
                </div>
            </div>
            <div class="jdjz selectbtn f26 m0a">查看全部评价</div>
        </div>
        <div class="ml40 mr40 pt25">
            <div class="f34 mt55 mb30">商品详情</div>
            <div class="contentbox" v-html="res.description">
                <img class="wp100" src="@a/img/jpg/pic3.jpg" alt="">
            </div>
        </div>
        <div class="posfixedh"></div>
        <div class="vCenter heng posfixed">
            <div class="vCenter">
                <a :href="'tel:' + res.contactTel" class="f22 cor3 mr70"><img class="icon40 mb10" src="@a/img/png/pic4.png" alt="">客服</a>
                <div class="f22 cor3"><img class="icon40 mb10" src="@a/img/png/pic5.png" alt="">分享</div>
            </div>
            <div class="goumai jdjz" @click="shop">立即购买</div>
        </div>
    </div>
</template>

<script>
import { getInfo } from '@/api'
import {setLocalStore} from '@/utils/auth'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
    components: {
        swiper,
        swiperSlide
    },
    data(){
        return {
            res: {},
            swiperOption: {
                autoplay: true,
                spaceBetween: 20,
                autoHeight: true,
                loop: true
            }
        }
    },
    created(){
        getInfo({id: this.$route.query.itemid}).then(res=>{
            this.res = res.data
            console.log(res)
        })
    },
    methods: {
        shop(){
            this.$router.push({path: "/preview"})
            setLocalStore(this.res,"xinxi")
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
.pingjiabox{padding:40px 0 35px;}
.contentimg>div{.wh(212,212);}
.selectbtn{.wh(248,65);border:1px solid #666666;color:#333;}
.posfixed,.posfixedh{height:142px;padding:0 40px;}
.mr70{margin-right:70px;}
.posfixed{position:fixed;bottom:0;right:0;left:0;background:#fff;}
.goumai{.wh(210,80);background:@cor3;font-size:28px;color:#fff;.borR(10px);}
</style>

<style>
.contentbox img{width:100%;}
</style>