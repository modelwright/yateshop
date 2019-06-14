<template>
    <div class="pos hp100 wp100 bag1">
        <div class="pl40 pr40">
            <div class="bor_bb vCenter heng pb35 pt35">
                <div class="vCenter"><div class="imgbox jdjz mr20"><img class="wp100" src="@a/img/jpg/pic2.jpg" alt=""></div><p class="f28 cor3">{{Info.name}}</p></div>
                <div class="f30 cor3">x {{Info.quantity}}</div>
            </div>
        </div>
    </div>
</template>

<script>
import {getLocalStore} from '@/utils/auth'
import {sellog} from '@/api/user'
// import CityChange from '@c/CityChange'
export default {
    name: '查看物流',
    components: {
        // CityChange
    },
    data(){
        return {
            Info: {}
        }
    },
    created(){
        this.Info = getLocalStore("xinxi")
        let obj = {
            id: this.Info.id,
            sessionid: this.$store.state.user.userData.sessionid
        }
        sellog(obj).then(res=>{
            this.Info = res.data
        })
    },
    methods: {
        getCity(data){
            // let obj = {
            //     pid: data || 0
            // }
            // getArea(obj).then(res=>{
            //     if(res.data.length == 0){ 
            //         this.model = false
            //         return false 
            //     }
            //     res.data.map(item=>{
            //         item.value = item.name
            //     })
            //     this.picker.data = res.data
            // })
        }
    }
}
</script>

<style lang="less" scoped>
.imgbox{.wh(110,110);.borR(12px);overflow: hidden;}
</style>
