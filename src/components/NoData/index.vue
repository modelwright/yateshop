<template>
    <div>
        <img class="wp60 m0a" :src="src || require('@a/img/png/pic14.png')" alt="">
        <p class="f30 cor6 tc">{{text}}</p>
    </div>
</template>

<script>
export default {
    props: ['src','text']
}
</script>

<style>

</style>
