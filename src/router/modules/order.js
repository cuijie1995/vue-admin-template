/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const orderRouter = {
  path: '/order',
  component: Layout,
  name: 'Order',
  meta: {
    title: '订单管理',
    icon: 'order'
  },
  children: [
    {
      path: 'importorder',
      name: 'Importorder',
      component: () => import('@/views/order/importOrder'),
      meta: { title: '进口订单' }
    },

    {
      path: 'exportorder',
      name: 'Exportorder',
      component: () => import('@/views/order/exportOrder'),
      meta: { title: '出口订单' }
    },
    {
      path: 'localorder',
      name: 'Localorder',
      component: () => import('@/views/order/localOrder'),
      meta: { title: '境内订单' }
    },
    {
      path: 'hongkongorder',
      name: 'HongKongorder',
      component: () => import('@/views/order/HongKongOrder'),
      meta: { title: '香港订单' }
    },
    {
      path: 'Orderlist',
      name: 'orderlist',
      component: () => import('@/views/order/orderlist'),
      meta: { title: '订单列表' }
    },
    {
      path: 'see',
      name: '订单详情',
      hidden: true,
      component: () => import('@/views/order/see'),
      meta: { title: '订单详情' }
    },

  ]

}
export default orderRouter
