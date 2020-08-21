/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const TrackRouter = {
  path: '/ordertrack',
  component: Layout,
  name: '订单跟进',
  meta: {
    title: '订单追踪',
    icon: 'ordertrack'
  },
    children: [
      {
        path: 'tarck',
        name: '订单追踪',
        component: () => import('@/views/orderTrack/orderTrack'),
        meta: { title: '订单追踪' }
      },
      {
        path: 'ordertrackdetail',
        name: '订单追踪详情',
        component: () => import('@/views/orderTrack/orderTrackDetail'),
        meta: { title: '订单追踪详情' },
        hidden:true,
      }
    ]
  
}
export default TrackRouter
