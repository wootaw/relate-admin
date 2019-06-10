import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout'
import Workspace from '@/layout/components/workspace'

Vue.use(Router)

const router = new Router({
  routes: [{
    path: '/',
    name: 'home',
    redirect: '/dashboard',
    component: Layout,
    children: [{
      path: 'dashboard',
      name: 'dashboard',
      meta: { title: '首页' }
    }, {
      path: 'customers',
      name: 'customers',
      component: Workspace,
      meta: { title: '客户', latest: null },
      children: [{
        path: 'leads',
        name: 'leads',
        component: () => import('@/views/customers/Leads')
      }, {
        path: 'signeds',
        name: 'signeds',
        component: () => import('@/views/customers/Signeds')
      }, {
        path: 'openeds',
        name: 'openeds',
        component: () => import('@/views/customers/Openeds')
      }]
    }, {
      path: 'accounts',
      name: 'accounts',
      meta: { title: '媒体账号' }
    }, {
      path: 'settings',
      name: 'settings',
      component: Workspace,
      meta: { title: '设置', latest: null },
      children: [{
        path: 'departments',
        name: 'departments',
        meta: { title: '部门' },
        component: () => import('@/views/settings/Departments/index.vue'),
        children: [{
          path: 'add',
          name: 'departments-add',
          meta: { title: '新增' },
          component: () => import('@/views/settings/Departments/Add.vue')
        }]
      }, {
        path: 'roles',
        name: 'roles',
        meta: { title: '角色' },
        component: () => import('@/views/customers/Signeds')
      }, {
        path: 'users',
        name: 'users',
        meta: { title: '用户' },
        component: () => import('@/views/customers/Openeds')
      }]
    }, {
      path: 'leads1',
      name: 'leads1',
      components: {
        // default: () => import('@/components/Customers/Leads')
        // wrapper: () => import('@/components/Navpane/Customers')
      }
    }]
  }]
})

router.beforeEach((to, from, next) => {
  if (to.meta.latest === undefined) {
    if (to.matched[1].meta.latest !== undefined) {
      to.matched[1].meta.latest = to.path
    }
    next()
  } else {
    if (to.meta.latest) {
      next(to.meta.latest)
    } else {
      let n = { 'customers': 'leads', 'settings': 'departments' }[to.path.substr(1)]
      next({ name: n })
    }
  }
})

export default router