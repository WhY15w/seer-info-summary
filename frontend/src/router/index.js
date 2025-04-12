import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(
    process.env.NODE_ENV === 'production' ? '/seerinfo/' : '/',
  ),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/plugin',
      name: 'plugin',
      component: () => import('../views/Details/PlugenCenter.vue'),
    },
    {
      path: '/cj',
      name: 'cj',
      component: () => import('../views/Details/Cj.vue'),
    },
    {
      path: '/lxy',
      name: 'lxy',
      component: () => import('../views/Details/Lxy.vue'),
    },
    {
      path: '/bilibili',
      name: 'bilibili',
      component: () => import('../views/Details/Bilibili.vue'),
    },
    // 登录 注册 找回
    {
      path: '/auth/login',
      name: 'login',
      component: () => import('../views/Auth/Login.vue'),
    },
    {
      path: '/auth/register',
      name: 'register',
      component: () => import('../views/Auth/Register.vue'),
    },
    {
      path: '/auth/recover',
      name: 'recover',
      component: () => import('../views/Auth/Recover.vue'),
    },
    // 用户中心
    {
      path: '/user/center',
      name: 'center',
      component: () => import('../views/User/Center.vue'),
    },
    // 匹配所有其他路径, 404NotFound页面
    {
      path: '/:pathMatch(.*)*',
      component: () => import('@/views/404.vue'),
    },
  ],
})

export default router
