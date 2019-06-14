<template>
    <div class="weibo-media-wraps weibo-media f-media media-b" v-if="images">
        <ul class="m-auto-list">
            <li class="m-auto-box3" v-for="(site,index) in images" :key="index">
                <div class="m-img-box m-imghold-4-3"><img class="f-bg-img" :src="site" alt=""></div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'Imgbox',
    props: ["maxWidth","images"],
    created(){
        console.log(this.maxWidth)
    }
}
</script>

<style>
.media-b{
    margin: 1rem 0 0;
}
.m-auto-list{
    margin: 0 0 0;
    max-width: 100%;
}
.m-auto-list li {
    display: inline-block;
    vertical-align: top;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 25%;
    padding: 0 10px 10px 0;
}
.m-auto-list .m-imghold-4-3{
    padding-bottom: 100%;
    background-color: #e6e6e6;
    height: 0;
    position: relative;
    display: inline-block;
    width: 100%;
}
.f-bg-img{
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 50%;
    position: absolute;
    width: 100%;
    height: 100%;
    vertical-align: top;
    -o-object-fit: cover;
    object-fit: cover;
}
</style>
