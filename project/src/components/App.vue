<template>
    <div class="div-container">
        <mt-header fixed title="Vue项目">
            <span slot="left">
               <mt-button icon="back" @click="back()" v-show="flag">
                   返回
               </mt-button>
            </span>
        </mt-header>
 
    <transition>
	   <router-view></router-view>
	</transition>






        <nav class="mui-bar mui-bar-tab">
			<router-link class="my-tab-item " to="/home">
				<span class="mui-icon iconfont icon-weibiaoti-"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="my-tab-item" to="/member">
				<span class="mui-icon  iconfont icon-mine"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="my-tab-item" to="/shopcar">
				<span class="mui-icon iconfont icon-cart"><span 
                 class="mui-badge" id="badge">{{totalCount}}</span></span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="my-tab-item" to="search">
				<span class="mui-icon iconfont icon-magnifiersearch"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>
    </div>
</template>
<script>
import mui from'../../lib/mui/js/mui.js';
import {mapGetters} from 'vuex';
export default {
    data() {
        return {
            flag:true
        }
    },
    created() {
        if(this.$route.path === '/home'){
                  this.flag = false;
              }else{
                  this.flag = true;
              }
    },
    methods: {
        back(){
            this.$router.go('-1');
        }
    },
    watch: {
        '$route.path':function(newval,oldval){
              if(newval === '/home'){
                  this.flag = false;
              }else{
                  this.flag = true;
              }
        }
    },
    computed:{
        ...mapGetters(['totalCount'])
    }
}
</script>
<style scoped>
  .div-container{
      padding-top: 40px;
	  padding-bottom: 50px;
	  overflow: hidden;
  }

  .v-enter{
	  opacity: 0;
	  transform: translateX(100%);
  }
  .v-leave-to{
	  opacity: 0;
	  transform: translateX(-100%);
	  position: absolute;
  }
  .v-enter-active,
  .v-leave-active{
	  transition: all 0.4s ease;
  }
  .mint-header.is-fixed{
	  z-index: 99;
  }
  .mui-bar-tab .my-tab-item.mui-active {
    color: #007aff;
}
.mui-bar-tab .my-tab-item {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
}
.mui-bar-tab .my-tab-item .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
}
.mui-bar-tab .my-tab-item .mui-icon ~ .mui-tab-label {
    font-size: 11px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>