<template>
    <div class="shopcarcontainer">
        <div class="mui-card" v-for="item in goodslist" :key="item.id">
				<div class="mui-card-content">
					<div class="mui-card-content-inner goods-item">
						<mt-switch v-model=" getIdSelectedObj[item.id]" @change="changeSelect(item.id,
                        getIdSelectedObj[item.id])"></mt-switch>
                        <img :src="item.thumb_path" alt="">
                        <div class="info">
                            <h1>{{item.title}}</h1>
                            <div class="goodsinfo">
                                <span class="price">￥{{item.sell_price}}</span>
                                <nobox :initCount="getGoodsCount[item.id]" :id="item.id"></nobox>
                                <a href="#" @click.prevent="del(item.id)">删除</a>
                            </div>
                        </div>
					</div>
				</div>
        </div>
        <!-- 商品结算区域 -->
        <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner flex">
						<div class="left">
                            <p>总结(不含运费)</p>
                            <p>已勾选商品<span class="danger">{{getSelectedCount}}</span>件,总价<span class="danger">￥{{ getSelectedPrice}}</span></p>
                        </div>
                        <mt-button type="danger">去结算</mt-button>
					</div>
				</div>
			</div>
            
    </div>
</template>
<script>
import nobox from '../sub-components/shopcar_nobox.vue';
import {mapGetters,mapMutations} from 'vuex';
export default {
    data() {
        return {
            goodslist:[]
        }
    },
    created() {
        this.getGoodsList();
    },
    methods: {
        ...mapMutations(['delFromCart','changeSelectedState']),
        async getGoodsList(){
            if(this.idStr <=0) return;
            const {data} = await this.$http.get('http://api.cms.liulongbin.top/api/goods/getshopcarlist/' + this.idStr);
            if(data.status === 0) this.goodslist = data.message;
        },
        del(id){
          this.goodslist.some((item,i)=>{
              if(item.id == id){
                  this.goodslist.splice(i,1);
                  return true;
              }
          });
          this.delFromCart(id);
        },
        changeSelect(id,select){
            this.changeSelectedState({id:id,selected:select});
        }
    },
    components:{
        nobox
    },
    computed:{
        ...mapGetters(['idStr','getGoodsCount','getIdSelectedObj','getSelectedCount','getSelectedPrice'])
    }
}
</script>
<style  lang="less" scoped>
    .shopcarcontainer{
        background-color: #eee;
        overflow: hidden;
        .goods-item{
           display: flex;
           img{
               width: 60px;
               height: 60px;
           }
           h1{
               font-size: 14px;
           }
           .info{
               display: flex;
               flex-direction: column;
               justify-content: space-between;
               .goodsinfo{
                   display: flex;
                   justify-content: space-between;
                   align-items: center;
                   .price{
                       color: red;
                       font-weight: bold;
                       font-size: 16px;
                   }
               }
           }
        }
        .danger{
            color: red;
                       font-weight: bold;
                       font-size: 16px;
        }
        .flex{
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }
</style>