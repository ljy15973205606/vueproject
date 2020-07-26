<template>
    <div>
      <!--   <h3>哈哈哈~~~~</h3>
        <router-link to="/login">登录</router-link>
        <router-link to="/register">注册</router-link>
         <router-view> </router-view> -->
      <login ></login>
      <hr>
      <register></register>
       
    </div>
</template>

<script>
import login from './account/login.vue';
import register from './account/register.vue';
export default {
    data(){
         return{
             
         };
    },
    methods:{
      
        

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
  