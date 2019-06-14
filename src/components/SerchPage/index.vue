<template>
    <div class="pos hp100 wp100">
        <form action="/" class="mb10">
            <van-search
                v-model="value"
                placeholder="请输入搜索关键词"
                @search="onSearch"
                autofocus="autofocus"
            />
        </form>
        <div class="history bag1 pb10">
            <div class="heng vCenter">
                <div class="f26 cor9">历史搜索</div>
                <div class="delhist"><img class="wp100" src="@a/img/png/pic20.png" alt=""></div>
            </div>
            <div class="pt20 pb20">
                <van-button type="danger" round size="small" style="background:#f6f6f6;border-color:#f6f6f6;color:#333;">手机</van-button>
                <van-button type="danger" round size="small" style="background:#f6f6f6;border-color:#f6f6f6;color:#333;">手机</van-button>
                <van-button type="danger" round size="small" style="background:#f6f6f6;border-color:#f6f6f6;color:#333;">手机</van-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            value: ''
        }
    },
    methods: {
        onSearch(){
            this.$router.push({path: '/classify/shoplist',query: {keyword: this.value}})
        }
    },
    created(){

    }
}
</script>

<style lang="less" scoped>
.history{padding:20px 25px 5px;}
.delhist{width:27px;}
</style>
