import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
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
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '主页', icon: 'dashboard', affix: true }
    }]
  },

  {
    path: '/cdn',
    component: Layout,
    children: [
      {
        path: 'site',
        name: 'site',
        component: () => import('@/views/cdn/index'),
        meta: { title: '域名转发', icon: 'form' }
      },
      {
        path: 'add-cdn',
        name: 'addCdn',
        component: () => import('@/views/cdn/AddCdn'),
        meta: { title: '添加转发', icon: 'form' },
        hidden: true
      },
      {
        path: 'edit-cdn/:id',
        name: 'editCdn',
        component: () => import('@/views/cdn/EditCdn'),
        meta: { title: '转发配置', icon: 'form' },
        hidden: true
      }
    ]
  },
  {
    path: '/group',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'group',
        component: () => import('@/views/group/index'),
        meta: { title: '分组管理', icon: 'nested' }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    children: [
      {
        path: 'list',
        name: 'list',
        component: () => import('@/views/user/index'),
        meta: { title: '用户管理', icon: 'example' }
      },
      {
        path: 'account-info',
        name: 'accountInfo',
        component: () => import('@/views/user/AccountInfo'),
        meta: { title: '账号信息', icon: 'tree' },
        hidden: true
      },
      {
        path: 'modify-psd',
        name: 'modifyPsd',
        component: () => import('@/views/user/ModifyPsd'),
        meta: { title: '修改密码', icon: 'tree' },
        hidden: true
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'history', // require service support
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
