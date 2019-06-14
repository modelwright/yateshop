<template>
    <div>
        <div class="dibuh"></div>
        <div class="dibu">
            <div class="cor1 f16 wp50 tc dk" @click="_click1()">{{btn1}}</div>
            <div class="cor1 f16 wp50 tc dk" @click="_click2()">{{btn2}}</div>
            <div class="cor1 f16 wp50 tc dk" @click="_click3()">{{btn3}}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FixFooterBtn',
    props: {
        btn1: {
            type: String
        },
        btn2: {
            type: String
        },
        btn3: {
            type: String
        },
        btn1Fun: {
            type: Function
        },
        btn2Fun: {
            type: Function
        },
        btn3Fun: {
            type: Function
        }
    },
    data(){
        return {
            
        }
    },
    methods: {
        _click1(){
            this.btn1Fun();
        },
        _click2(){
            this.btn2Fun();
        },
        _click3(){
            this.btn3Fun();
        }
    }
}
</script>

<style lang="less" scoped>
.dibuh{height:4.5em;}
.dibu{position:fixed;.wh(100%,4.5em);.bag(@cor1);bottom:0;left:0;z-index:99;.vCenter;.heng;}
.wp50{.pr;}
.wp50:after{.pos;right:0;top:17.5%;.bag(#11d993);height:1em;.cler;.w(1px);}
</style>

