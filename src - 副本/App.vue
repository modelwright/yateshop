<template>
    <div>
        <van-nav-bar
            title="标题"
            left-text="返回"
            right-text="按钮"
            left-arrow
            @click-left="onClickLeft"
            @click-right="onClickRight"
        />
        <router-view></router-view>
    </div>
</template>

<script>
export default {
}
</script>
