<template>
    <div class="imgUploader">
        <div class="file-list">
            <section
                v-for="(file, index) in imgStore" :key="index"
                class="file-item draggable-item"
                :style="'background: no-repeat center center;background-size: cover;background-image:url('+file.src+');'+childstyle"
            >
                <div class="file-remove" @click="remove(index)">
                    <span class="f16">+</span>
                </div>
                <span class="flie-loading" v-if="imgStatus==='uploading'">上传中...</span>
                <span class="flie-finished" v-if="imgStatus==='finished'">已上传</span>
                <input type="hidden" :value="model">
            </section>
            <section class="file-item" v-if="imgStore.length < maxLength" :style="childstyle">
                <div class="add">
                    <div class="jdjz" style="flex-direction:column">
                        <!-- <mu-icon value="add" size=36 color='#b3b3b3'></mu-icon> -->
                        <p class="f12" style="color:#b3b3b3;">+添加图片</p>
                    </div>
                    <input type="file" accept="image/*"
                        @change="selectImgs" ref="file"
                    >
                </div>
            </section>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { uploadTemp } from '@/api'
export default {
    props: ['url','maxLength',"model","indexes","childstyle"],
    data () {
        return {
            files: [], // 文件缓存
            index: 0, // 序列号
            imgStore: [],
            imgStatus: 'ready' // ready selected uploading finished
        }
    },
    computed: {
        ...mapState({
            userData: state => state.user.userData
        })
    },
    methods: {
        // 选择图片
        selectImgs () {
            let fileList = this.$refs.file.files
            for (let i = 0, len = fileList.length; i < len; i++) {
                let item = {
                    key: this.index++,
                    name: fileList[i].name,
                    size: fileList[i].size,
                    file: fileList[i]
                }
                // 将图片文件转成BASE64格式
                let reader = new FileReader()
                reader.onload = (e) => {
                    this.$set(item, 'src', e.target.result)
                }
                reader.readAsDataURL(fileList[i])
                this.imgStore.push(item)
            }
            console.log(this.imgStore)
            this.submit()
        },
        // 上传图片
        submit () {
            console.log(this.imgStore)
            let formData = new FormData()
            this.imgStore.forEach((item, index) => {
                item.name = 'imgFiles[' + index + ']'
                formData.append('file', item.file)
            })
            console.log(formData)
            formData.append("sessionid", this.userData.sessionid)
            uploadTemp(formData).then(ress=>{
                if(this.model instanceof Array){
                    this.model.push(ress.data.img)
                }else{
                    // this.model = ress.data.name
                    console.log(this.indexes)
                    this.indexes != undefined ? this.$emit("uploadEven",{icon: ress.data.img,index: this.indexes}) : this.$emit("uploadEven",ress.data.img)
                }
                this.files = [] // 清空文件缓存
                this.index = 0 // 初始化序列号
                this.imgStatus = 'finished' // 更新文件上传状态
            }).catch(err=>{
                console.log(err)
            })
        },
        // 移除图片
        remove (index) {
            console.log(this,index)
            this.imgStore.splice(index, 1)
        },
        // 清空图片
        empty () {
            this.files.splice(0, this.files.length)
            this.$store.commit('set_img_upload_cache', this.files) // 更新存储文件缓存
            this.$store.commit('set_img_paths', [])
        }
    },
    beforeCreate () {
        this.imgStatus = 'ready';
    },
    destroyed () {
        this.$store.commit('set_img_upload_cache', [])
        this.$store.commit('set_img_paths', [])
    },
    watch: {
        imgStatus () {
            if (this.imgStatus === 'uploading') {
                this.submit()
            }
        },
        imgStore () {
            if (this.imgStore.length <= 0) {
                this.imgStatus = 'ready' // 更新文件上传状态
            }
        }
    },
    mounted() {
        if(this.model.length != 0){
            this.model.map(item=>{
                let obj = {
                    src: item
                }
                this.imgStore.push(obj)
            })
        }
    }
}
</script>

<style lang="less" scoped>
.imgUploader  {
//   margin: 1em 0 20px;
  .file-list {
    // padding: 10px 0px;
    &::after {
      content: '';
      display: block;
      clear: both;
      visibility: hidden;
      line-height: 0;
      height: 0;
      font-size: 0;
    }
    .file-item {
        float: left;
        position: relative;
        width: 136px;
        height: 136px;
        margin-right: 10px;
        text-align: center;
        
      .file-remove {
        position: absolute;
        right: 0;
        top: 0;
        width: 28px;
        height: 28px;
        cursor: pointer;
        border-radius: 0 0 0 10px;
        background: rgba(0, 0, 0, 0.8);
        z-index: 22;
        span{
            display: block;
            color:#fff;
            .tr3dXz(45deg);
            font-size: 20px;
            position: relative;
            top: -3px;left: 1px;
        }
      }
      .flie-loading,.flie-finished {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgba(0,0,0,0.3);
      }

      &:hover .file-remove {
        display: inline;
      }
      .file-name {
        margin: 0;
        height: 40px;
        word-break: break-all;
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
    .file-item:last-child{
        margin-right: 0;
    }
  }
  .add {
    width: 100%;
    height: 100%;
    float: left;
    border: solid 1px #e5e5e5;
    position: relative;
    .fa {
      font-size: 1.4em;
      color: #7DD2D9;
    }
    input{
        cursor: pointer;
        position: absolute;
        top: 0;left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        z-index: 999;
    }
    div{
        position: absolute;
        top: 0;left: 0;
        width: 100%;
        height: 100%;
        z-index: 99;
    }
  }
  .uploadBtn {
    position: relative;
    .empty {
      position: absolute;
      right: 0;
      bottom: 0;
      background-color: @cor3;
      color: #fff;
      padding: .2em 1em;
    }
  }
}
input[type="file"] {
  position: absolute;
  left: 0;
  top: 0;
  width: 80px;
  height: 80px;
  border: 1px solid #000;
  opacity: 0;
}
</style>