/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const FinanceRouter = {
  path: '/finance',
  component: Layout,
  name: '财务管理',
  meta: {
    title: '财务管理',
    icon: 'finance'
  },
  children: [
    {
      path: 'account',
      name: '对账单查询',
      component: () => import('@/views/finance/accountStatement'),
      meta: { title: '对账单查询' }
    },
    {
      path: 'accountdetail',
      name: '对账单详情',
      hidden: true,
      component: () => import('@/views/finance/accountStatementDetail'),
      meta: { title: '对账单详情' }
    },
    {
      path: 'sales',
      name: '销项发票',
      component: () => import('@/views/finance/sales'),
      meta: { title: '销项发票' }
    },
    {
      path: 'income',
      name: '进项发票',
      component: () => import('@/views/finance/income'),
      meta: { title: '进项发票' }
    },
    {
      path: 'current',
      name: '往来款查询',
      component: () => import('@/views/finance/currentAccount'),
      meta: { title: '往来款查询' }
    },
    {
      path: 'write',
      name: '核销详情',
      hidden:true,
      component: () => import('@/views/finance/writeOff'),
      meta: { title: '核销详情' }
    }
  ]

}
export default FinanceRouter
