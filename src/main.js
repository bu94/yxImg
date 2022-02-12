/*
 * @Descripttion: 
 * @version: 
 * @Author: LiuYang
 * @Date: 2022-02-10 06:57:08
 * @LastEditors: LiuYang
 * @LastEditTime: 2022-02-12 00:12:57
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import less from 'less'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false
import * as echarts from "echarts";
Vue.prototype.$echarts = echarts


Vue.use(less)
Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
