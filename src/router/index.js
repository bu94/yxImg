/*
 * @Descripttion: 
 * @version: 
 * @Author: LiuYang
 * @Date: 2022-02-10 06:57:08
 * @LastEditors: LiuYang
 * @LastEditTime: 2022-02-10 06:59:02
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
]

const router = new VueRouter({
  routes
})

export default router
