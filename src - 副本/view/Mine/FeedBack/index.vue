<template>
    <div>
        <van-field
            v-model="content"
            type="textarea"
            placeholder="请输入反馈内容"
        />
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
    </div>
</template>

<script>
import {feedback} from '@/api/user'
export default {
    data(){
        return {
            content: '',
            loading: false
        }
    },
    methods: {
        submit(){
            this.loading = true
            let obj = {
                content: this.content,
                sessionid: this.$store.state.user.userData.sessionid
            }
            feedback(obj).then(res=>{
                this.loading = false
                this.$toast("反馈成功");
            }).catch(err=>{
                console.log(err)
                console.log("哈哈")
                this.loading = false
            })
        }
    }
}
</script>

<style>

</style>
