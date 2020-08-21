/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const StockRouter = {
  path: '/inventory',
  component: Layout,
    children: [
      {
        path: 'stock',
        name: '库存管理',
        component: () => import('@/views/stock/stock'),
        meta: { title: '库存管理', icon: 'stock'}
      },
     
    //   {
    //     path: '1',
    //     name: '1',
    //     component: () => import('@/views/BI/1'),
    //     meta: { title: '1' }
    //   },
    //   {
    //     path: 'localorder',
    //     name: 'Localorder',
    //     component: () => import('@/views/order/localOrder'),
    //     meta: { title: '境内订单' }
    //   },
    //   {
    //     path: 'hongkongorder',
    //     name: 'HongKongorder',
    //     component: () => import('@/views/order/HongKongOrder'),
    //     meta: { title: '香港订单' }
    //   },
    //   {
    //     path: 'Orderlist',
    //     name: 'orderlist',
    //     component: () => import('@/views/order/orderlist'),
    //     meta: { title: '订单列表' }
    //   },
    //   {
    //     path: '2',
    //     name: '2',
    //     component: () => import('@/views/order/2'),
    //     meta: { title: '2' }
    //   },
    ]
  
}
export default StockRouter
