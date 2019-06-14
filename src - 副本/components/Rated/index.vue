<template>
    <div class="star" :class="starType">
        <span class="star-item" :class="itemClass" v-for="(itemClass,index) in itemClasses" :key="index"></span>
    </div>
</template>
<script type="text/ecmascript-6">
const LENGTH = 5;
const CLS_ON = "on";
const CLS_OFF = "off";
const CLS_HALF = "half";
export default {
    props: {
        size: {
            type: Number
        },
        score: {
            type: Number
        }
    },
    computed: {
        starType(){
            return "star-" + this.size;
        },
        itemClasses(){
            // 计算属性
            let result = [];
            let score = Math.floor(this.score * 2) / 2;
            let hasDecimal = score % 1 !== 0; // 是否有效数
            let integer = Math.floor(score); // 取整
            for (var i = 0; i < integer; i++) {
                result.push(CLS_ON);
            }
            if (hasDecimal) {
                result.push(CLS_HALF);
            }
            while(result.length < LENGTH){
                result.push(CLS_OFF);
            }
            return result;
        }
    }
};
</script>
<style lang="less" scoped>
    .star{
        font-size:0;
        .star-item{
            display:inline-block;
            background-repeat:no-repeat;
        }
        &.star-48{
            .star-item{
                width:20px;
                height:20px;
                background-size:20px 20px;
                margin-right:22px;
                &:last-child{
                    margin-right:0;
                }
                &.on{
                    background-image:url(../../assets/img/png/pic15.png);
                }
                &.half{
                    background-image:url('../../assets/img/png/pic15.png')
                }
                &.off{
                    background-image:url('../../assets/img/png/pic15.png')
                }
            }
        }
        // &.star-36{
        //     .star-item{
        //         width:15px;
        //         height:15px;
        //         margin-right:6px;
        //         background-size:15px 15px;
        //         &:last-child{
        //             margin-right:0
        //         }
        //         &.on{
        //             background-image:url('star36_on')
        //         }
        //         &.half{
        //             background-image:url('star36_half')
        //         }
        //         &.off{
        //             background-image:url('star36_off')
        //         }
        //     }
        // }
        // &.star-24{
        //     .star-item{
        //         width:10px;
        //         height:10px;
        //         margin-right:3px;
        //         background-size:10px 10px;
        //         &:last-child{
        //             margin-right:0;
        //         }
        //         &.on{
        //             background-image:url('star24_on');
        //         }
        //         &.half{
        //             background-image:url('star24_half');
        //         }
        //         &.off{
        //             background-image:url('star24_off');
        //         }
        //     }
        // }
    }
</style>