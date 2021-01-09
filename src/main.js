import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import qs from "qs";
Vue.prototype.$qs = qs;
Vue.config.productionTip = false

// 引入vant
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

//引入axios
import axios from 'axios'
axios.defaults.baseURL = 'https://api-hmugo-web.itheima.net/api/public/v1'
Vue.prototype.axios = axios;

// postcss  rem适配
import 'amfe-flexible'


//引入公共样式
import "./styles/comment.css"
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')