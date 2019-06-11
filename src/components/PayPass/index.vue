<template>
    <div class="pay-tool">
        <div class="pay-tool-title border-bottom">
            <span class="icon icon-back" @click="backHandle"></span><strong>请输入交易密码</strong>
        </div>
        <div class="pay-tool-content">
            <div class="pay-tool-inputs">
                <div class="item" v-for="(i,index) in items" :key="index"><span class="icon_dot" v-if="password[i]"></span></div>
            </div>
            <div class="pay-tool-link"><router-link class="link" to="/getP">忘记密码？</router-link></div>
        </div>
        <div class="pay-tool-keyboard">
            <ul>
                <li @click="keyUpHandle($event)" v-for="(val,index) in keys" :key="index">
                {{ val }}
                </li>
                <li class="del" @click="delHandle"><span class="icon-del"> x </span></li>
            </ul>
        </div>
    </div>
</template>

<script>
const keys = () => [1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0]
// let sendFlag = true // 防止重复发送密码
export default {
    data () {
        return {
            items: [0, 1, 2, 3, 4, 5],
            keys: keys(),
            password: []
        }
    },
    methods: {
        backHandle () {
            this.clearPasswordHandle() // 返回时清除password
            this.$emit('backFnc') // 返回上级
        },
        keyUpHandle (e) {
            let text = e.currentTarget.innerText
            let len = this.password.length
            if (!text || len >= 6) return
            this.password.push(text)
            this.ajaxData()
        },
        delHandle () {
            if (this.password.length <= 0) return false
            this.password.shift()
        },
        ajaxData () {
            if (this.password.length >= 6) {
                console.log(parseInt(this.password.join(' ').replace(/\s/g, '')))
                this.$emit("Back",parseInt(this.password.join(' ').replace(/\s/g, '')))
            }
            return false
        },
        clearPasswordHandle: function () {
            this.password = []
        }
    }
}
</script>

<style lang="less" scoped>
.pay-tool {
    position: relative;
    height: 600px;
    background-color: #fff;
    overflow: hidden;
    &-title {
        width: 100%;
        height: 80px;
        padding: 0 0.8rem;
        line-height: 80px;
        text-align: center;
        overflow: hidden;
        .icon {
        float: left;
        // margin-top: 0.72222222rem;
        }
        strong {
        font-size: 32px;
        }
    }
    &-content {
        .pay-tool-inputs {
        width: 500px;
        height: 71px;
        margin: 0 auto 0;
        border: 1px solid #b9b9b9;
        border-radius: 0.26666666rem;
        display: flex;
        .item {
            width: 16.66666666%;
            height: 70px;
            line-height: 70px;
            border-right: 1px solid #b9b9b9;
            text-align: center;
            &:last-child {
            border-right: none;
            }
            .icon_dot {
            display: inline-block;
            width: 0.51111111rem;
            height: 0.51111111rem;
            background: url("../../assets/img/png/pic16.png") no-repeat;
            background-size: cover;
            }
        }
        }
        .pay-tool-link {
        // padding: 0.53333333rem 0.8rem 0;
        height: 50px;
        line-height: 50px;
        text-align: right;
        font-size: 24px;
        .link {
            color: #3c8cfb;
        }
        }
    }
    .pay-tool-keyboard {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        ul {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        li {
            width: 33.3333%;
            height: 100px;
            line-height: 100px;
            text-align: center;
            border-right: 1px solid #aeaeae;
            border-bottom: 1px solid #aeaeae;
            font-size: 36px;
            font-weight: bold;
            &:nth-child(1), &:nth-child(2), &:nth-child(3) {
            border-top: 1px solid #eee;
            }
            &:nth-child(3), &:nth-child(6), &:nth-child(9), &:nth-child(12) {
            border-right: none;
            }
            &:nth-child(10), &:nth-child(11), &:nth-child(12) {
            border-bottom: none;
            }
            &:nth-child(10), &:nth-child(12), &:active {
            background-color: #d1d4dd;
            }
            &:nth-child(12):active {
            background-color: #fff;
            }
        }
        }
    }
}
</style>