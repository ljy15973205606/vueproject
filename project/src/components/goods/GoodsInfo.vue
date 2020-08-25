<template>
    <div class="goodsinfo-container">
       <transition 
         @before-enter="beforeEnter"
         @enter="enter"
         @after-enter="afterEnter"
        >
            <div class="ball" v-show="flag"></div>
       </transition>
       <!-- 轮播图区域 -->
       <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<swiper :lunbotu="lunbotu" :imgname="'src'" :isfull="false"></swiper>
					</div>
				</div>
			</div>
       <!-- 商品购买区域 -->
       <div class="mui-card">
				<div class="mui-card-header">{{goodsinfo.title}}</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p class="price">
                          市场价：
                          <span style="margin-right:10px;"><del>￥{{goodsinfo.market_price}}</del></span>
                          销售价: 
                          <span style="font-size:16px; color:red ;font-weight:bold;">￥{{goodsinfo.sell_price}}</span>
                      </p>
                      <p>

                      购买数量：
                      <nobox style="display:inline;" :max="goodsinfo.stock_quantity" @func="getCount"></nobox>
                    <!--   <nobox style="display:inline;" :max="60"></nobox> -->
                      </p>
                      <div>
                          <mt-button type="primary" size="small">立即购买</mt-button>
                          <mt-button type="danger" size="small" @click="addToCart" >加入购物车</mt-button>
                      </div>
					</div>
				</div>
			</div>
       <!-- 商品详情区域 -->
       <div class="mui-card">
				<div class="mui-card-header">商品参数</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
					  <p>商品货号：{{goodsinfo.goods_no}}</p>
					  <p>库存情况：{{goodsinfo.stock_quantity}}</p>
					  <p>上架时间：{{goodsinfo.add_time |dateFormat}}</p>
					</div>
				</div>
				<div class="mui-card-footer btnarea">
                    <mt-button type="primary" size="large" plain @click="getGoodsDesc()">图文介绍</mt-button>
                    <mt-button type="danger" size="large" plain @click="getGoodsComment()">商品评论</mt-button>
                </div>
			</div>
    </div>
</template>
<script>
import swiper from '../sub-components/Swiper.vue';
import nobox from '../sub-components/goodsinfo_nobox.vue';
import {mapState,mapMutations} from 'vuex';
export default {
    data() {
        return {
            lunbotu:[],
            goodsinfo:{},
            flag:false,
            selectedCount:1
        }
    },
    created() {
        this.getlunbotu();
        this.getGoodsInfoById();
    },
    methods: {
        async getlunbotu(){
            const {data} = await this.$http.get('http://api.cms.liulongbin.top/api/getthumimages/' + this.id);
               if(data.status === 0) this.lunbotu = data.message;
        },
       
        async getGoodsInfoById (){
            const {data} = await this.$http.get('http://api.cms.liulongbin.top/api/goods/getinfo/' + this.id);
            if(data.status === 0) this.goodsinfo = data.message[0];
        },
       
        getGoodsDesc (){
            this.$router.push('/home/goodsdesc/'+ this.goodsinfo.id);
        },
        getGoodsComment(){
              this.$router.push('/home/goodscomment/' + this.goodsinfo.id);
        },
       
        addToCart(){
            this.flag= !this.flag;
            this.addToShopCart({
                id:this.id,
                count:this.selectedCount,
                selected:true,
                price:this.goodsinfo.sell_price
            });
        },
          ...mapMutations(['addToShopCart']),
       beforeEnter(el){
           el.style.transform = 'translate(0,0)';
       },
       enter(el,done){
           el.offsetWidth;
           const ballPos =  el.getBoundingClientRect();
           const badgePos = document.getElementById('badge').getBoundingClientRect();
           const left = badgePos.left - ballPos.left;
           const top = badgePos.top - ballPos.top;
           el.style.transform = 'translate('+left+'px,'+top+'px)';
           el.style.transition = 'all 0.4s cubic-bezier(.57,-0.45,1,.6)';
           done();
       },
        
       afterEnter(el){
           this.flag= !this.flag;
       },
       getCount(c){
           this.selectedCount = c;
       }, 
    },
    props:['id'],
    components:{
        swiper,
        nobox
    }
}
</script>
<style lang="less" scoped>
   .goodsinfo-container{
       background-color: #eee;
       overflow: hidden;
   }
   .btnarea{
       flex-direction: column;
       button + button{
           margin-top: 15px;
       }
   }
   .ball{
       width: 10px;
       height: 10px;
       background-color: red;
       border-radius: 50%;
       position: absolute;
       z-index: 99;
       left:155px;
       top: 375px;
     
}
   
</style>