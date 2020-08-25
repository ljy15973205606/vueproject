<template>
    <div>
      <h4>发表评论:</h4>
      <hr>
      <textarea placeholder="请输入要bb的内容(最多120个字)" maxlength="120" v-model="msg"></textarea>
      <mt-button type="primary" size="large" @click="postMsg" >发表评论</mt-button>

      <div class="cmt-list">
          <div class="cmt-item" v-for="(item,i) in cmtlist" :key="i">
              <div class="cmt-item-title">第{{i + 1}}楼&nbsp;用户：{{item.user_name}}&nbsp;发表时间:{{item.add_time |dateFormat}}</div>
              <div class="cmt-item-body">{{item.content}}</div>
          </div>
      </div>
    
      <mt-button type="danger" size="large" plain @click="loadMore">加载更多</mt-button>
    </div> 
</template>
  <script>
  import {Toast} from 'mint-ui';
  export default {
      data() {
          return {
              page:1,
              cmtlist:[],
              msg:''
          }
      },
      created(){
          this.getCommentByPage();
      },
      methods: {
          async getCommentByPage(){
            const {data} = await this.$http.get('http://api.cms.liulongbin.top/api/getcomments/' + this.newsid + "?pageindex=" + this.page);
              if(data.status === 0) this.cmtlist = this.cmtlist.concat(data.message);
          },
          loadMore(){
              this.page++;
              this.getCommentByPage();
          },
         async postMsg(){
           if(this.msg.trim().length <=0) {Toast('请输入评论内容');}
           else{const {data} = await this.$http.post('http://api.cms.liulongbin.top/api/postcomment/' + this.newsid,
           {
               content:this.msg.trim()
           });
             this.cmtlist.unshift({
                 user_name:'匿名用户',
                 add_time:new Date(),
                 content:this.msg.trim()
             });
             this.msg = '';}
          }
      },
      props:['newsid']
  }
  </script>
  <style lang="less" scoped>
     textarea{
         font-size: 14px;
         margin: 0;
     }
     .cmt-list{
         margin-top: 4px;
         .cmt-item{
             line-height: 20px;
             .cmt-item-title{
                   font-size: 14px;
                   background-color: gray;
             }
             .cmt-item-body{
                   font-size: 12px;
                   text-indent: 2em;
             }
         }
     }
  </style>
 