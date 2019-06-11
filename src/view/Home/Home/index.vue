<template>
    <div class="pos wp100 bag1">
        <img class="wp100" :src="respons.advert.url || '@a/img/jpg/pic1.jpg'" alt="">
        <!-- <div>
            <div class="imgbox"><img class="wp100" src="@a/img/jpg/pic2.jpg" alt=""></div>
            <div class="textEll2 f28 cor3 mb25">暴汗服女套装爆汉服发热裤控重跑步运动...</div>
            <div class="themefont2"><span class="f20">¥</span><span class="f36">229</span><span class="f28">.00</span></div>
        </!--> 
        <div v-for="(item,index) in respons.list" :key="index">
            <Title :text="item.name"/>
            <swiper ref="mySwiper" class="pl30" :options="swiperOption" v-if="item.direct == 1">
                <swiper-slide class="box" v-for="(slide, index) in item.list" :key="index" :data-slide="slide">
                    <div class="imgbox mb20" @click="slideclick(slide)">
                        <img class="wp100 bag1" :src="slide.icon" alt="">
                    </div>
                    <div class="textEll2 f28 cor3 mb25">{{slide.packageName}}</div>
                    <div class="themefont2"><span class="f20">¥</span><span class="f36">{{slide.price}}</span></div>
                </swiper-slide>
            </swiper>
            <div class="hengline p0_30" v-else>
                <Goods v-for="(fade,index) in item.list" :key="index" :to="fade.id" :itemed="fade"/>
            </div>
        </div>
        <Tabbar to="/index"/>
    </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import Title from '@c/Title'
import Goods from '@c/Goods'
import Tabbar from '@c/Tabbar'
import { home } from '@/api'
export default {
    components: {
        Title,
        Goods,
        Tabbar,
        swiper,
        swiperSlide
    },
    data(){
        return {
            swiperOption: {
                slidesPerView: 'auto',
                spaceBetween: 20,
                direction: 'horizontal',
                on: {
                    tap: event=>{
                        console.log(event)
                        console.log(this.$refs.mySwiper)
                        const realIndex = event.realIndex;
                        this.slideclick(realIndex);
                    }
                }
            },
            respons: {
                list: []
            }
        }
    },
    computed: {
        swiper() {
            return this.$refs.mySwiper.swiper
        }
    },
    created(){
        this.home()
    },
    methods: {
        home(){
            home({}).then(res => {
                this.respons = res.data
                console.log(res.data)
                console.log(this.respons)
                console.log('登录成功')
                // cookie.set('userToken', e.userToken)
                // this.$router.push({ path: '/' })
            })
        },
        slideclick(data){
            console.log(data)
            this.$router.push({path: '/detail',query: {itemid: data.packageId}})
        }
    }
}
</script>

<style lang="less" scoped>
.hongzi{color:@cor2;}
.box{.w(300);}
.imgbox{width:300px;height:300px;}
</style>
