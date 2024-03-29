// eslint-disable-next-line
import { UserLayout, BasicLayout } from '@/layouts'
import { bxAnaalyse } from '@/core/icons'

const RouteView = {
  name: 'RouteView',
  render: h => h('router-view'),
}

export const asyncRouterMap = [
  {
    path: '/',
    name: 'BasicLayout',
    component: BasicLayout,
    meta: {
      title: '首页',
      permission: ['dashboard'],
      keepAlive: true,
    },
    redirect: '/dashboard',
    children: [
      // dashboard
      {
        path: '/dashboard',
        name: 'dashboard',
        component: RouteView,
        meta: {
          title: '平台预览',
          icon: bxAnaalyse,
          permission: ['dashboard'],
        },
        redirect: '/dashboard/dashboard1',
        children: [
          {
            path: '/dashboard/dashboard1',
            name: 'Dashboard1',
            component: () => import('@/views/dashboard/dashboard1'),
            meta: { title: 'dashboard1', permission: ['dashboard1'] },
          },
          {
            path: '/dashboard/dashboard2',
            name: 'Dashboard2',
            component: () => import('@/views/dashboard/dashboard2'),
            meta: { title: 'dashboard2', permission: ['dashboard2'] },
          },
          {
            path: '/dashboard/dashboard3',
            name: 'Dashboard3',
            component: () => import('@/views/dashboard/dashboard3'),
            meta: { title: 'dashboard3', permission: ['dashboard3'] },
          },
        ],
      },
      // demo
      {
        path: '/demo',
        name: 'KeepAliveDemo',
        component: () => import('@/views/demo/Index'),
        meta: {
          title: '组件示例',
          icon: 'desktop',
          permission: ['demo'],
          keepAlive: true,
        },
      },
      // Exception
      {
        path: '/exception',
        name: 'exception',
        component: RouteView,
        redirect: '/exception/403',
        meta: {
          title: '异常页',
          icon: 'warning',
          permission: ['exception'],
        },
        children: [
          {
            path: '/exception/403',
            name: 'Exception403',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/403'),
            meta: {
              title: '403',
              permission: ['exception'],
            },
          },
          {
            path: '/exception/404',
            name: 'Exception404',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404'),
            meta: {
              title: '404',
              permission: ['exception'],
            },
          },
          {
            path: '/exception/500',
            name: 'Exception500',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/500'),
            meta: {
              title: '500',
              permission: ['exception'],
            },
          },
        ],
      },
    ],
  },
  {
    path: '*',
    redirect: '/',
    hidden: true,
  },
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404'),
  },
  {
    path: '/user',
    component: UserLayout,
    redirect: '/login',
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login'),
      },
    ],
  },
]
