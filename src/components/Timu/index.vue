<template>
    <div :class="'vCenter mt10 mb10 ' + answer">
        <div class="title mr10">{{per}}</div>
        <div class="f15 corhui">{{item.content}}</div>
    </div>
</template>

<script>
export default {
    name: 'Timu',
    props: {
        num: {
            type: Number
        },
        item: {
            type: Object
        },
        your: {
            type: String
        },
        yes: {
            type: String
        }
    },
    data(){
        return {
            per: '',
            answer: ''
        }
    },
    created(){
        switch(this.num){
            case 0:
                this.per = 'A';
                break;
            case 1:
                this.per = 'B';
                break;
            case 2:
                this.per = 'C';
                break;
            case 3:
                this.per = 'D';
                break;
            case 4:
                this.per = 'E';
                break;
            default:
                console.log(this.num);
                break;
        }
        if( this.yes == this.item.code){
            this.answer = 'correct'
        }else if(this.your == this.item.code && this.yes != this.your){
            this.answer = 'error'
        }else if(this.yes == this.your && this.yes == this.item.code){
            this.answer = 'correct'
        }
    },
    computed: {
        
    }
}
</script>

<style lang="less" scoped>
.title{.wh(35px,35px);border:2px solid @hui;.cor(@hui);.f15;.jdjz;.borR(100%);}
.error .title{border:2px solid @cor2;.cor1;background:@cor2;}
.error .corhui{color:@cor2;}
.correct .title{border:2px solid @cor1;.cor1;background:@cor1;}
.correct .corhui{color:@cor1;}
</style>
