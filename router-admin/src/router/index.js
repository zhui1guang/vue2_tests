import Vue from 'vue'
import VueRouter from 'vue-router'
//导入组件
import Login from '@/components/MyLogin.vue'
const Home = () => import('@/components/MyHome.vue')
const User = () => import('@/components/menus/MyUsers.vue')
const Rights = () => import('@/components/menus/MyRights.vue')
const Goods = () => import('@/components/menus/MyGoods.vue')
const Order = () => import('@/components/menus/MyOrders.vue')
const Setting = () => import('@/components/menus/MySettings.vue')
const UserDetail = () => import('@/components/user/MyUserDetail.vue')

Vue.use(VueRouter)

const router = new VueRouter({
  //路由规则
  routes: [
    {
      path: '',
      component: Login
    },
    {
      path: '/home',
      redirect: '/home/user',
      component: Home,
      children: [
        {
          path: 'user',
          component: User
        },
        {
          path: 'auth',
          component: Rights
        },
        {
          path: 'goods',
          component: Goods
        },
        {
          path: 'order',
          component: Order
        },
        {
          path: 'setting',
          component: Setting
        },
        //用户详情页
        {
          path: 'userdetail/:id',
          props: true,
          component: UserDetail
        }

      ]
    }
  ]
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/home') {
    //去token
    const token = localStorage.getItem('token')
    if (token) {
      next()
    } else {
      next('/')
    }
  } else {
    next()
  }
})

export default router

