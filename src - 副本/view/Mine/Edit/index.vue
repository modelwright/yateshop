<template>
    <div class="pos hp100 wp100 bag1">
        <div class="pl40 pr40">
            <div class="vCenter heng bor_bb pt30 pb30">
                <p class="f28 cor3">头像</p>
                <van-uploader 
                    :style="`background:url(${content || this.form.portrait}) 0% 0% / cover no-repeat;`"
                    style="width:50px;height:50px;background-size: cover;border-radius:100%;"
                    v-model="heihei"
                    :after-read="afterRead"
                    >
                </van-uploader>
            </div>
            <div class="vCenter heng bor_bb pt30 pb30">
                <p class="f28 cor3">昵称</p>
                <input v-model="form.nickname" type="text" placeholder="输入你的手机号" class="b0 tr f28 cor6">
            </div>
            <div class="vCenter heng bor_bb pt30 pb30">
                <p class="f28 cor3">性别</p>
                <div class="cell__ft f28" @click="show2 = true">
                    <span class="cor9" v-if="form.gender == ''">请选择</span>
                    <span class="cor3" v-else>{{form.genderName}}</span>
                </div>
            </div>
            <div class="vCenter heng bor_bb pt30 pb30">
                <p class="f28 cor3">身高</p>
                <input v-model="form.height" type="text" placeholder="输入你的手机号" class="b0 tr f28 cor6">
            </div>
            <div class="vCenter heng bor_bb pt30 pb30">
                <p class="f28 cor3">体重</p>
                <input v-model="form.weight" type="text" placeholder="输入你的手机号" class="b0 tr f28 cor6">
            </div>
            <div class="vCenter heng bor_bb pt30 pb30">
                <p class="f28 cor3">生日</p>
                <input v-model="form.birthday" type="text" placeholder="输入你的手机号" class="b0 tr f28 cor6" @click="openBirthday">
            </div>
            <!-- <div class="vCenter heng bor_bb pt30 pb30">
                <p class="f28 cor3 flex1">收货地址</p>
                <div class="cell__ft f28 cor9" @click="()=>this.$refs.picker.show()">
                    <template v-if="changeaddress == ''">请选择</template>
                    <template v-else>{{changeaddress}}</template>
                </div>
            </div>
            <div class="vCenter heng bor_bb pt30 pb30">
                <p class="f28 cor3 flex1">详细地址</p>
                <input type="text" v-model="form.address" placeholder="输入你的详细地址" class="b0 tr f28 cor6">
            </div> -->
        </div>
        <div class="wp80 m0a mt50">
            <van-button 
                type="primary"
                :loading = loading
                block
                loading-type="spinner"
                loading-text="加载中..."
                @click="submit"
                >大号按钮</van-button>
        </div>
        <van-popup
            v-model="show2"
            position="bottom"
        >
            <van-picker
                show-toolbar
                :columns="columns"
                value-key="name"
                @confirm="onConfirm"
                @cancel="show2 = false"
                @change="onChange"
            />
        </van-popup>
        <van-popup v-model="endTimePop" position="bottom">
            <van-datetime-picker
                type="date"
                v-model="birthdayFun"
                :min-date="new Date(1900, 1, 1)"
                :max-data="new Date(2030,1,1)"
                @cancel="endTimePop = false"
                @confirm="endTimeConfirm"
                @change="endTimeChange"
                :formatter="formatter"
            />
        </van-popup>
    </div>
</template>

<script>
import { mine,editmine,editportrait } from '@/api/user'
export default {
    data(){
        return {
            show2: false,
            endTimePop: false, // 时间选择器
            loading: false,
            columns: [{
                id: '1',
                name: '男'
            },{
                id: '2',
                name: '女'
            }],
            form: {

            },
            heihei: [],
            birthdayFun: new Date(), // 用来设置开始时间 不做展示用
            content: '' // 用来展示上传之后的图片 不做提交
        }
    },
    created(){
        let obj = {sessionid: this.$store.state.user.userData.sessionid}
        mine(obj).then(e => {
            this.form.portrait = e.data.portrait
            this.form.nickname = e.data.nickname
            this.form.gender = e.data.gender
            this.form.height = e.data.height
            this.form.weight = e.data.weight
            this.form.birthday = e.data.birthday
            console.log(this.birthdayFun)
            this.birthdayFun = new Date(e.data.birthday)
            console.log(this.birthdayFun)
            if(e.data.gender == '1'){
                this.form.genderName = '男'
            }else{
                this.form.genderName = '女'
            }
        })
    },
    methods: {
        onChange(picker, value, index) {
            console.log(value)
            // console.log(`当前值：${value}, 当前索引：${index}`);
        },
        onConfirm(value, index){
            console.log("确定")
            console.log(value,index)
            this.form.gender = value.id
            this.form.genderName = value.name
            this.show2 = false
        },
        endTimeChange(e){
            let obj = e.getValues()
            console.log(obj)
        },
        endTimeConfirm(val){
            var date = new Date(val);
            var y = 1900 + date.getYear();
            var m = "0" + (date.getMonth() + 1);
            var d = "0" + date.getDate();
            console.log( y + "-" + m.substring(m.length - 2, m.length) + "-" + d.substring(d.length - 2,d.length))
            this.form.birthday = y + "-" + m.substring(m.length - 2, m.length) + "-" + d.substring(d.length - 2,d.length)
            this.endTimePop = false
        },
        formatter(type, value) {
            if (type === 'year') {
                return `${value}年`;
            } else if (type === 'month') {
                return `${value}月`
            } else if (type === 'day') {
                return `${value}日`
            }
            return value;
        },
        openBirthday(){
            this.endTimePop = true
            // setValues(values)
        },
        afterRead(file) {
            this.$toast.loading({ mask: true, message: '上传中...' });
            this.content = file.content
            let formData = new FormData()
            formData.append('portrait', file.file)
            formData.append("sessionid", this.$store.state.user.userData.sessionid)
            editportrait(formData).then(ress=>{
                this.$toast.success('提示文案');
            }).catch(err=>{
                console.log(err)
            })
        },
        submit(){
            let obj = {
                sessionid: this.$store.state.user.userData.sessionid
            }
            let news = Object.assign(obj,this.form);
            console.log(news)
            editmine(news).then(res=>{
                this.$toast.success('保存成功');
            })
        }
    }
}
</script>

<style>

</style>
