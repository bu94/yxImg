/*
 * @Descripttion: 
 * @version: 
 * @Author: LiuYang
 * @Date: 2022-02-10 06:57:08
 * @LastEditors: LiuYang
 * @LastEditTime: 2022-02-16 21:46:56
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
import vcolorpicker from 'vcolorpicker'
Vue.use(vcolorpicker)

Vue.use(less)
Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
