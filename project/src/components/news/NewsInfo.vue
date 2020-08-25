<template>
    <div class="newsinfo-container">
        <h3 class="title">{{newsinfo.title}}</h3>
        <p class="info">
            <span>发表时间：{{newsinfo.add_time |dateFormat}}</span>
            <span>点击次数：{{newsinfo.click}}</span>
        </p>
        <hr>
        <div class="content" v-html="newsinfo.content">
        </div>
        <comment :newsid="id"></comment>
   </div>
</template>

<script>
import comment from '../sub-components/Comment.vue';
export default {
    data() {
        return {
            newsinfo:{}
        }
    },
    created(){
        this.getNewsInfo();
    },
    methods: {
        async getNewsInfo (){
            const {data} = await this.$http.get('http://api.cms.liulongbin.top/api/getnew/'+ this.id);
            if(data.status === 0) this.newsinfo = data.message[0];
        }
    },
    props:['id'],
    components:{
        comment:comment
    }
}
</script>
 
<style lang="less" scoped>
    .newsinfo-container{
        padding: 3px;
        .title{
            color: red;
            text-align: center;
            font-size: 15px;
            padding: 15px 0;
        }
        .info{
            color: skyblue;
            display: flex;
            justify-content: space-between;
        }
    }
</style>