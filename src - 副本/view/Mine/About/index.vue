<template>
    <div v-html="res" class="contentbox">
        
    </div>
</template>

<script>
import {aboutUs} from '@/api'
export default {
    data(){
        return {
            res: {}
        }
    },
    created(){
        aboutUs().then(res=>{
            this.res = res.data
        })
    }
}
</script>

<style>

</style>
