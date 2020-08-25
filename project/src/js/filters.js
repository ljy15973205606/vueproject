import Vue from 'vue';
import moment from 'moment';
//定义全局的时间过滤器
Vue.filter('dateFormat',function(dateStr,format = "YYYY-MM-DD HH:mm:ss"){
   return moment(dateStr).format(format);
})
