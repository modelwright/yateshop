<template>
    <div>
        <router-view></router-view>
        <van-tabbar v-model="active" @change="change" active-color="#000" inactive-color="#999">
            <van-tabbar-item to="/home" replace>
                <span>首页</span>
                <img
                    slot="icon"
                    slot-scope="props"
                    :src="props.active ? icon1.active : icon1.normal"
                    >
            </van-tabbar-item>
            <van-tabbar-item to="/classity" replace>
                <span>分类</span>
                <img
                    slot="icon"
                    slot-scope="props"
                    :src="props.active ? icon2.active : icon2.normal"
                    >
            </van-tabbar-item>
            <van-tabbar-item to="/mine" replace>
                <span>我的</span>
                <img
                    slot="icon"
                    slot-scope="props"
                    :src="props.active ? icon3.active : icon3.normal"
                    >
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
export default {
    data() {
        return {
            active: 0,
            icon1: {
                normal: require('@a/img/tab1.png'),
                active: require('@a/img/tab1-1.png')
            },
            icon2: {
                normal: require('@a/img/tab2.png'),
                active: require('@a/img/tab2-1.png')
            },
            icon3: {
                normal: require('@a/img/tab3.png'),
                active: require('@a/img/tab3-1.png')
            }
        }
    },
    methods: {
        change(e){
            console.log(e)
        }
    },
    created(){
        if(this.$route.path == '/mine'){
            this.active = 2
        }else if(this.$route.path == '/classity'){
            this.active = 1
        }else if(this.$route.path == '/home'){
            this.active = 0
        }
    }
}
</script>

<style>

</style>
