import Vue from 'vue'
import Router from 'vue-router'
import home from '@/views/home'
import login from '@/views/login'
import form from '@/views/nav1/form'
import table from '@/views/nav1/table'
import store from '@/vuex'
import { hasPermission } from '@/utils/permission'

Vue.use(Router)
export const constantRouterMap = [
	{
		path: '/login',
		component: login,
		meta: {}
	},
	{
		path: '/',
		component: home,
		name: '导航1',
		iconCls: 'el-icon-location',//图标样式class
		meta: { scope: 16 },
		children: [
			{
				path: '/form',
				component: form,
				name: '表单',
				meta: { scope: 32 }
			},
			{
				path: '/table',
				component: table,
				name: '列表',
				meta: { scope: 16 }
			}
		]
	},
	{ path: '*', redirect: '/404', meta: {} }
]
const router = new Router({
	routes: constantRouterMap
})
router.beforeEach((to, from, next) => {
	// 首先判断是否需要权限

	if (to.matched.some(r => r.meta.scope)) {
		// 再进一步判断是否有权限
		let permission = true
		// console.log(to)
		// console.log(store.getters.scope)
		to.matched.forEach((r) => {
			if (!hasPermission(r, store.getters.scope)) {
				permission = false
			}
		})
		// console.log(permission)
		if (permission) {
			next()
		} else {
			next({
				path: '/login',
				query: { redirect: to.fullPath }
			})
		}
	} else {
		next()
	}
})

export default router
