<template>
    <div class="pos hp100 wp100 bag1">
        <div class="pl40 pr40">
            <div class="vCenter heng bor_bb pt30 pb30">
                <p class="f28 cor3">收货人</p>
                <input v-model="form.contact" type="text" placeholder="输入你的姓名" class="b0 tr f28 cor6">
            </div>
            <div class="vCenter heng bor_bb pt30 pb30">
                <p class="f28 cor3">联系电话</p>
                <input v-model="form.contactMobile" type="text" placeholder="输入你的手机号" class="b0 tr f28 cor6">
            </div>
            <div class="vCenter heng bor_bb pt30 pb30">
                <p class="f28 cor3 flex1">收货地址</p>
                <div class="cell__ft f28 cor9" @click="()=>this.$refs.picker.show()">
                    <template v-if="changeaddress == ''">请选择</template>
                    <template v-else>{{changeaddress}}</template>
                </div>
            </div>
            <div class="vCenter heng bor_bb pt30 pb30">
                <p class="f28 cor3 flex1">详细地址</p>
                <input type="text" v-model="form.address" placeholder="输入你的详细地址" class="b0 tr f28 cor6">
            </div>
        </div>
        <div class="pl40 pr40 mt70">
            <div class="f34 cor3">邮寄商品</div>
            <div class="bor_bb vCenter heng pb35 pt35">
                <div class="vCenter"><div class="imgbox mr20" :style='"background:url("+Info.icon+");background-size: cover;"'></div><p class="f28 cor3">{{Info.name}}</p></div>
                <div class="f30 cor3">x {{Info.quantity}}</div>
            </div>
            <div class="kbtn" style="margin-top:2em;" @click="submit">提交物流申请</div>
        </div>
        <!-- <CityChange /> -->
        <awesome-picker
            ref="picker"
            :data="picker.data"
            @cancel="handlePickerCancel"
            @confirm="handlePickerConfirm">
        </awesome-picker>
    </div>
</template>

<script>
import {getLocalStore} from '@/utils/auth'
import {getArea} from '@/api'
import {addlog} from '@/api/user'
// import CityChange from '@c/CityChange'
export default {
    name: '申请物流',
    components: {
        // CityChange
    },
    data(){
        return {
            Info: {},
            picker: {
                data: []
            },
            model: true,
            citychange: [],
            changeaddress: '',
            form: {
                contact: '',
                contactMobile: '',
                address: '',
                provinceId: '',
                cityId: '',
                countyId: '',
                sessionid: this.$store.state.user.userData.sessionid
            }
        }
    },
    created(){
        this.Info = getLocalStore("xinxi")
        console.log(this.Info)
        this.getCity()
        // removeStore("xinxi")
        // let obj = {
        //     orderId: this.Info.id,
        //     sessionid: this.userData.sessionid
        // }
        // orderinfo(obj).then(res=>{
        //     this.res = res.data
        //     console.log(res);
        // })
    },
    methods: {
        getCity(data){
            let obj = {
                pid: data || 0
            }
            getArea(obj).then(res=>{
                if(res.data.length == 0){ 
                    this.model = false
                    return false 
                }
                res.data.map(item=>{
                    item.value = item.name
                })
                this.picker.data = res.data
            })
        },
        handlePickerCancel(){

        },
        handlePickerConfirm(e){
            this.getCity(this.picker.data[e[0].index].id)
            this.changeaddress += this.picker.data[e[0].index].name
            this.citychange.push(this.picker.data[e[0].index].id)
            if(this.model){
                setTimeout(()=>{
                    this.$refs.picker.show()
                },300)
            }
            // console.log(e)
            // console.log(this.picker.data[e[0].index].id)
            // console.log(this.picker.data[e[0].index]);
        },
        submit(){
            this.form.provinceId = this.citychange[0]
            this.form.cityId = this.citychange[1]
            this.form.countyId = this.citychange[2]
            this.form.id = this.Info.id
            addlog(this.form).then(res=>{
                console.log(res)
                this.$toast.success(res.message);
            })
        }
    }
}
</script>

<style lang="less" scoped>
.imgbox{.wh(110,110);.borR(12px);overflow: hidden;}
</style>
