<template>
    <div>
       <div class="goods-list">
           <router-link :to="'/home/goodsinfo/' + item.id" class="goods-item" v-for="item in goodslist" :key="item.id">
               <img :src="item.img_url" alt="">
               <h1 class="title">{{item.title}}</h1>
               <div class="info">
                   <p class="price">
                       <span class="new">￥{{item.sell_price}}</span>
                       <span class="old">￥{{item.market_price}}</span>
                   </p>
                   <p class="sell">
                       <span>热卖中</span>
                       <span>剩{{item.stock_quantity}}件</span>
                   </p>
               </div>
           </router-link>
           <mt-button type="danger" size="large" style="margin-top:20px" @click="getMore()">加载更多</mt-button>
       </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
           page:1 ,
           goodslist:[],
           isloaded:false
        }
    },
    created() {
        this.getGoodsListByPage();
    },
    methods: {
        async getGoodsListByPage(){
             const {data} = await this.$http.get('http://api.cms.liulongbin.top/api/getgoods?pageindex=' + this.page);
             if(data.status === 0){
                 if(data.message.length <= 0){
                     this.isloaded = true;
                 }
                    return this.goodslist = this.goodslist.concat(data.message);
             }
        },
        getMore(){
            if(this.isloaded)return;
            this.page++;
            this.getGoodsListByPage();
        }
    },
}
</script>
<style lang="less" scoped>
   .goods-list{
       display: flex;
       flex-wrap: wrap;
       justify-content: space-between;
       padding: 7px;
       padding-top: 0;
   .goods-item{
       width: 49%;
       border:1px solid #ccc;
       margin-top: 7px;
       box-shadow: 0 0 7px #ccc;
       padding: 2px;
       display: flex;
       flex-direction: column;
       justify-content: space-between;
       img{
           width: 100%;
       }
       .title{
           font-size: 14px;
       }
       .info{
           background-color: #eee;
            overflow: hidden;
            p{
                margin: 3px;
            }
            .price{
                .new{
                  font-size: 16px;
                  color: red;
                  font-weight: bold;
                  margin-right: 15px;
                }
                .old{
                   font-size: 12px;
                   text-decoration: line-through;
                }
            }
            .sell{
                display: flex;
                justify-content: space-between;
                font-size: 13px;
            }
       }
   }
   }
</style>