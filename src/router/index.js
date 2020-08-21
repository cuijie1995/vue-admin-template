import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout'
import orderRouter from './modules/order'
import StockRouter from './modules/stock'
import FinanceRouter from './modules/finance'
import TrackRouter from './modules/ordertrack'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '门户', icon: 'BI' }
    },
    {
      path: 'rate',
      name: 'Rate',
      component: () => import('@/views/dashboard/rate'),
      meta: { title: '汇率' },
      hidden:true
    }
  ]
  },

  {
    path: '/setting',
    component: Layout,
    meta: { title: '设置', icon: 'setting' },
    children: [
      {
        path: 'user',
        name: 'Users',
        component: () => import('@/views/setting/user/user'),
        meta: { title: '用户',  }
      },
      {
        path: 'role',
        name: 'Roles',
        component: () => import('@/views/setting/role/role'),
        meta: { title: '角色' }
      }
    ]
  },
  {
    path: '/base',
    component: Layout,
    meta: {
      title: '基础资料',
      icon: 'base'
    },
    children: [
      {
        path: 'code',
        name: 'Code',
        component: () => import('@/views/base/code/code'),
        meta: { title: '代码表获取' }
      },
      {
        path: '/code-detail',
        name:'codeDetail',
        component: () => import('@/views/base/code/codeDetail'),
        meta: { title: '代码详情表' },
        hidden: true
      },
      {
        path: 'supplier',
        name: 'supplier',
        component: () => import('@/views/base/supplier/supplier'),
        meta: { title: '供应商管理' }
      },
      {
        path: '/createsupplier',
        name:'createSupplier',
        component: () => import('@/views/base/supplier/createSupplier'),
        meta: { title: '添加供应商' },
        hidden: true
      },
      {
        path: '/updatesupplier',
        name:'editSupplier',
        component: () => import('@/views/base/supplier/editSupplier'),
        meta: { title: '修改供应商' },
        hidden: true
      },
      {
        path: 'customer',
        name: 'Customer',
        component: () => import('@/views/base/Customer/customer'),
        meta: { title: '终端客户' }
      },
      {
        path: 'agreement',
        name: 'Agreement',
        component: () => import('@/views/base/agreementdetail/agreementdetail'),
        meta: { title: '协议查看' }
      }
    ]
  },
  
  orderRouter,
  StockRouter,
  FinanceRouter,
  TrackRouter,
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
