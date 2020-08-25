
import Vue from 'vue';
import App from '../components/App.vue';
//导入路由模块
import VueRouter from 'vue-router';
Vue.use(VueRouter);
import router from './router.js';
import './filters.js';
import './globalConfig.js';

import store from './store.js';
const vm = new Vue({
    el:'#app',
    render: c =>c(App),
    router,
    store
})

