<template>
    <div :style="fontstyle">
        <slot></slot>
        <div class='rate' @mouseout="mouseOut">
            <span @mouseover="mouseOver(num)"  v-for='num in len' :key="num">☆</span>
            <span class='hollow' :style="{width:styleObject.width,transition:styleObject.transition}">
                <span @click="onRate(num)" @mouseover="mouseOver(num)" v-for='num in len' :key="num">★</span>
            </span>
        </div> 
    </div>
</template>
<script>
export default {
    name: 'Rate',
    data: function () {
        const themeObj = {
            'black': '#00',
            'white': '#fff',
            'red': '#f5222d',
            'orange': '#fa541c',
            'yellow': '#fadb14',
            'green': '#73d13d',
            'blue': '#40a9ff',
            'purple': '#9254de'
        }
        return {
            styleObject: {},
            styleFont: {
                color: themeObj[this.theme] ? themeObj[this.theme] : this.theme,
                fontSize: this.size ? this.size : ''
            }
        }
    },
    computed: {
        fontstyle(){
            return `color:${this.styleFont.color};font-size:${this.styleFont.fontSize}px`
        },
        len(){
            return parseInt(this.length)
        }
    },
    props: {
        value: {type: [Number, String], default: '0'},
        length: {type: [Number, String], default: '5'},
        animate: {type: [Number, String], default: '1'},
        theme: {type: [String], default: 'yellow'},
        size: {type: [String]},
        readonly: {type: [Boolean], defalut: false}
    },
    methods: {
        setStyle: function () {
            this.styleObject = {
                width: this.value + 'em',
                transition: `width ${this.animate}s`
            }
        },
        mouseOver (i) {
            if (this.readonly) {
                return false
            }
            // console.log(1)
            this.styleObject.width = i + 'em'
        },
        mouseOut () {
            this.styleObject.width = this.value + 'em'
        },
        onRate (i) {
            if (this.readonly) {
                return false
            }
            this.$emit('onRate', i)
        }
    },
    created: function () {
        if (this.animate === '0' || this.animate === 0) {
            this.setStyle()
        } else {
            setTimeout(() => {
                this.setStyle()
            })
        }
    }
}
</script>

<style scoped>
.rate{
    position:relative;
    display: inline-block;
}
.rate > span.hollow {
    position:absolute;
    display: inline-block;
    top:0;
    left:0;
    width:0;
    overflow:hidden;
}
span{margin-right:10px;}
</style>