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
        meta: { title: '线索' },
        component: () => import('@/views/customers/leads/index.vue'),
        children: [{
          path: 'add',
          name: 'leads-add',
          meta: { title: '新增', pane: 'lead-form' },
        }, {
          path: ':id/edit',
          name: 'leads-edit',
          meta: { title: '编辑', pane: 'lead-form' },
        }]
      }, {
        path: 'signeds',
        name: 'signeds',
        meta: { title: '签单客户' },
        component: () => import('@/views/customers/signeds/index.vue'),
        children: [{
          path: ':id',
          name: 'signeds-detail',
          meta: { title: '详情' },
          children: [{
            path: 'owners',
            name: 'signeds-owners',
            meta: { title: '商务负责人' },
          }, {
            path: 'contacts',
            name: 'signeds-contacts',
            meta: { title: '联系人' },
          }, {
            path: 'accounts',
            name: 'signeds-accounts',
            meta: { title: '媒体账号' },
          }, {
            path: 'contracts',
            name: 'signeds-contracts',
            meta: { title: '合同' },
          }, {
            path: 'imprest',
            name: 'signeds-imprest',
            meta: { title: '备款' },
          }, {
            path: 'chargeds',
            name: 'signeds-chargeds',
            meta: { title: '充值' },
          }, {
            path: 'consumeds',
            name: 'signeds-consumeds',
            meta: { title: '消耗' },
          }, {
            path: 'invoices',
            name: 'signeds-invoices',
            meta: { title: '发票' },
          }]
        }]
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
      path: 'finance',
      name: 'finance',
      meta: { title: '财务' }
    }, {
      path: 'settings',
      name: 'settings',
      component: Workspace,
      meta: { title: '设置', latest: null },
      children: [{
        path: 'departments',
        name: 'departments',
        meta: { title: '部门' },
        component: () => import('@/views/settings/departments/index.vue'),
        children: [{
          path: 'add',
          name: 'departments-add',
          meta: { title: '新增', pane: 'department-form' },
        }, {
          path: ':id/edit',
          name: 'departments-edit',
          meta: { title: '编辑', pane: 'department-form' },
        }]
      }, {
        path: 'roles',
        name: 'roles',
        meta: { title: '角色' },
        component: () => import('@/views/settings/roles/index.vue'),
        children: [{
          path: 'add',
          name: 'roles-add',
          meta: { title: '新增', pane: 'role-form' },
        }, {
          path: ':id/edit',
          name: 'roles-edit',
          meta: { title: '编辑', pane: 'role-form' },
        }]
      }, {
        path: 'users',
        name: 'users',
        meta: { title: '员工' },
        component: () => import('@/views/settings/users/index.vue'),
        children: [{
          path: 'add',
          name: 'users-add',
          meta: { title: '新增', pane: 'user-form' }
        }, {
          path: ':id/edit',
          name: 'users-edit',
          meta: { title: '编辑', pane: 'user-form' },
        }]
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