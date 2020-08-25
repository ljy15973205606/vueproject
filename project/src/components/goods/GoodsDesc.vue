<template>
    <div class="goodsdesc-container">
        <h3 class="title">{{goodsdesc.title}}</h3>
        <hr>
        <div class="content" v-html="goodsdesc.content"></div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            goodsdesc:{}
        }
    },
    created(){
        this.getGoodsDesc();
    },
    methods: {
        async getGoodsDesc(){
           const {data} = await this.$http.get('http://api.cms.liulongbin.top/api/goods/getdesc/' + this.id);
           if(data.status === 0) this.goodsdesc = data.message[0];
        }
    },
    props:['id']
}
</script>
<style lang="less" >
.goodsdesc-container{
      .title{
      font-size: 16px;
      margin: 10px 0;
      color: skyblue;
      text-align: center;
  }
  .content{
      img{
          width: 100%;
      }
  }
}
</style>