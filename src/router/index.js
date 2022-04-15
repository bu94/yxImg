/*
 * @Descripttion: 
 * @version: 
 * @Author: LiuYang
 * @Date: 2022-02-10 06:57:08
 * @LastEditors: LiuYang
 * @LastEditTime: 2022-04-16 00:40:38
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import index from '../views/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/index',
    name: 'index',
    component: index
  },
]

const router = new VueRouter({
  routes
})

export default router
