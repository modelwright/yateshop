<template>
	<div>
        <div class="tabberWarp" >
            <div class="warp">
                <Item :txt='item.txt' :page='item.page' @mollll='getVal' v-for='(item,index) in tabbarDes' :sel='selected' :key="index">
                    <img :src="item.normalImg" slot='normalImg'>
                    <img :src="item.activeImg" slot='activeImg'>
                </Item>
            </div>
        </div>
        <div class="tabberWarph"></div>
    </div>
</template>
<script>
import Item from './Item'
export default {
    components: {
        Item
    },
    props: ['to'],
    data: function(){
        return{
            selected: '/index',
            tabbarDes: [
                {
                    txt: '首页',
                    page: '/index',
                    normalImg: require('@a/img/tab1.png'),
                    activeImg: require('@a/img/tab1-1.png')
                },
                {
                    txt: '分类',
                    page: '/classify',
                    normalImg: require('@a/img/tab2.png'),
                    activeImg: require('@a/img/tab2-1.png')
                },
                {
                    txt: '我的',
                    page: '/mine',
                    normalImg: require('@a/img/tab3.png'),
                    activeImg: require('@a/img/tab3-1.png')
                }
            ]
        }
    },
    methods: {
        getVal: function(res){
            console.log("子组件传过来的",res)
            this.selected = res;
            console.log(this.selected)
        }
    },
    created(){
        this.selected = this.to
    }
}
</script>
<style lang="less">
	.warp{
		width: 100%;
		border-top: 1px solid #eee;
		background: #fff;
		display: flex;
		align-items: center;
		justify-content: space-around;
        font-size: 0;
        height: 100%;
	}
	.warp img{
		width: 40px;
		height: 40px;
	}
	.tabberWarp img{
		margin-top: 10px;
		margin-bottom: 5px;
 
    }
    .tabberWarph{
        height: 98px;
    }
	.tabberWarp{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
        background: #fff;
        height: 98px;
	}
</style>