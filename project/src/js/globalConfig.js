import Vue from 'vue';
//导入axios
import axios from 'axios';
Vue.prototype.$http = axios;
//导入mintUI组件
import mintUi from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.use(mintUi);
import '../../lib/mui/css/mui.css';
//导入阿里字体图标
import '../../lib/mui/css/iconfont.css';
//安装图片预览的插件
import VuePreview from 'vue-preview';
Vue.use(VuePreview);