<template>
	<div class="itemWarp flex_mid" @click='changePage'>
		<span v-show='!bol'>
			<slot name='normalImg'></slot>
		</span>
		<span v-show='bol'>
			<slot name='activeImg'></slot>
		</span>
		<span>{{txt}}</span>
	</div>
</template>
<script>
export default {
    name: 'Item',
    props: {
        txt: {
            type: String
        },
        page: {
            type: String
        },
        sel: {
            type: String
        }
    },
    computed: {
        bol: function(){
            // console.log("触发了")
            // console.log(this.sel,this.page)
            if(this.sel == this.page){
                return true;
            }
            return false;
        }
    },
    methods: {
        changePage: function(){
            // 点击跳转对应的页面
            this.$router.push(this.page);
            this.$emit('mollll',this.page)
        }
    }
}
</script>
<style lang="less">
	.itemWarp{
		flex-grow: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}
	.itemWarp span{
		font-size: 20px;
	}
 
</style>