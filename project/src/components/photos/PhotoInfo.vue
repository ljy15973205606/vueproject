<template>
    <div class="div-container">
        <h3 class="title">{{photoinfo.title}}</h3>
        <p class="info">
            <span>发表时间：{{photoinfo.add_time |dateFormat}}</span>
            <span>点击次数：{{photoinfo.click}}</span>
        </p>
        <hr>

       <div >
           <vue-preview :slides="photolist" @close="handleClose" id="thumb-img-list"></vue-preview>
       </div>




        <div id="content" v-html="photoinfo.content"></div>
        <comment :newsid="id"></comment>
    </div>
</template>
<script>
import comment from '../sub-components/Comment.vue';
export default {
    data() {
        return {
            photoinfo:{},
            photolist:[]
        }
    },
    methods: {
        async getPhotoInfo(){
            const {data} = await this.$http.get('http://api.cms.liulongbin.top/api/getimageinfo/'+ this.id);
            if(data.status === 0) return this.photoinfo = data.message[0];
        },
        async getThumbImg(){
            const {data} = await this.$http.get('http://api.cms.liulongbin.top/api/getthumimages/' + this.id);
            if(data.status === 0) {
                data.message.forEach(item =>{
                    item.w = 600;
                    item.h = 400;
                     item.msrc = item.src;
                });
                this.photolist = data.message;
            }
        },
        handleClose () {
       /*  console.log('close event') */
      }
    },
    created() {
        this.getPhotoInfo();
        this.getThumbImg();
    },
    props:['id'],
    components:{
        comment
    }
}
</script>
<style lang="less" scoped>
    .div-container{
        padding: 3px;
    }
    .title{
        font-size: 14px;
        color: skyblue;
        margin: 15px 0;
        text-align: center;
    }
    .info{
        font-size: 13px;
        display: flex;
        justify-content: space-between;
    }
    .content{
        font-size: 13px;
        line-height: 30px;
    }
    #thumb-img-list{
        /deep/ .my-gallery {
    display: flex;
    flex-wrap: wrap;
    figure {
      width: 30%;
      margin: 5px;
      img {
        width: 100%;
        box-shadow: 0 0 7px gray;
      }
    }
  }
    }
</style>