<template>
    <div>
      <!--   <h3>哈哈哈~~~~</h3>
        <router-link to="/login">登录</router-link>
        <router-link to="/register">注册</router-link>
         <router-view> </router-view> -->
      <login ></login>
      <hr>
      <p>nisho </p>
      <register></register>
       <mt-button type="primary" icon="back" size="normal" @click="show"></mt-button>
      <span class="iconfont icon-icon-test"></span>
      <button type="button" class="mui-btn mui-btn-danger">
					红色
				</button>
    </div>
</template>

<script>
import login from './account/login.vue';
import register from './account/register.vue';
import {Toast} from 'mint-ui';
import '../css/iconfont.css';
import '../../lib/mui/css/mui.min.css'


export default {
    data(){
         return{
             
         };
    },
    methods:{
      show(){
        Toast({
          message:'你好',
          position:'top',
          duration:-1,
          iconClass:'iconfont icon-icon-test redeye'
        });
      }
      
        

    },
    components:{
        login,
        register
    }


};
</script>


<style scoped>
  h3{
      color:blue;
    }
  
</style>>
  