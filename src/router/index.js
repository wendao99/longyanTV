import Vue from 'vue'
import VueRouter from 'vue-router'
import { isAccountLoggedIn } from '@/utils/auth'


import Layout from '@/views/layout/Layout.vue'
import Login from '@/views/login/Login.vue'
import Video from '@/views/video/Video.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '',
    component: Layout,
    redirect: '/recommend',
    children: [{
      path: '/recommend',
      name: 'recommend',
      component: () => import('@/views/recommend/Recommend'),
      meta: {
        title: '推荐',
        requireAccountLogin: true
      }
    },
    {
      path: 'home',
      name: 'home',
      component: () => import('@/views/home/Home'),
      meta: {
        title: '首页',
        requireAccountLogin: true
      },
    },
    {
      path: 'player',
      name: 'player',
      component: () => import('@/views/home/HomePlay')
    },
    {
      path: 'search',
      name: 'search',
      component: () => import('@/views/header/search/SearchList'),
      meta: { title: '搜索' }
    },
    {
      path: 'dome',
      name: 'dome',
      component: () => import('@/views/Dome'),
      meta: { title: '演示' }
    }
    ]
  },
  {
    path: '/video/:vid',
    name: 'video',
    component: Video,
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
]



const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  //需要登录的逻辑
  if (to.meta.requireAccountLogin) {
    if (isAccountLoggedIn()) {
      next();
    } else {
      next({ path: '/login' });
    }
  } else {
    next()
  }
})

export default router
