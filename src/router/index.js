import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

Vue.use(Router)
const routes = [{
        path: '/',
        redirect: '/select-store',
    }, {
        path: '/login',
        name: 'login',
        component: () =>
            import ('@/components/login')
    }, {
        path: '/select-store',
        name: 'select-store',
        component: () =>
            import ('@/components/storeSel')
    },{
        path: '/dashboard',
        name: 'dashboard',
        component:()=>
            import ('@/components/dashboard'),
        children: [
            {
                path: '/home',
                name: {
                    en: 'Home',
                    zh: '主页'
                },
                icon: 'el-icon-document',
                component: () =>
                    import('@/components/dashboard/home'),
                show: true
            },
            {
                path: '/order',
                name: {
                    en: 'Orders',
                    zh: '订单'
                },
                icon: 'el-icon-document',
                component: () =>
                    import('@/components/dashboard/orders'),
                show: true
            },
            {
                path: '/products',
                name: {
                    en: 'Products',
                    zh: '商品'
                },
                icon: 'el-icon-goods',
                component: () =>
                    import('@/components/dashboard/products'),
                show: true
            },
            {
                path: '/design',
                name: {
                    en: 'Design',
                    zh: '设计'
                },
                icon: 'el-icon-document',
                component: () =>
                    import('@/components/dashboard/design'),
                show: true
            },
            {
                path: '/money',
                name: {
                    en: 'Money',
                    zh: '资金'
                },
                icon: 'el-icon-document',
                component: () =>
                    import('@/components/dashboard/money'),
                show: true
            },
            {
                path: '/report',
                name: {
                    en: 'Reports',
                    zh: '统计报告'
                },
                icon: 'el-icon-document',
                component: () =>
                    import('@/components/dashboard/reports'),
                show: true
            },
            {
                path: '/customer',
                name: {
                    en: 'Customers',
                    zh: '客户'
                },
                icon: 'el-icon-document',
                component: () =>
                    import('@/components/dashboard/customers'),
                show: true
            },
            {
                path: '/app',
                name: {
                    en: 'Apps',
                    zh: '扩展应用'
                },
                icon: 'el-icon-document',
                component: () =>
                    import('@/components/dashboard/app'),
                show: true
            },
            {
                path: '/setting',
                name: {
                    en: 'Settings',
                    zh: '设置'
                },
                icon: 'el-icon-setting',
                component: () =>
                    import('@/components/dashboard/settings'),
                show: true
            },
            {
                path: '/order/orderDetail',
                component: () =>
                    import('@/components/order/order-detail'),
                show: false
            }
        ],
        hidden: true
    },{
        path: '/verifyBusiness',
        name: 'verifyBusiness',
        redirect: '/verifyBusiness/step1',
        component: () =>
            import ('@/components/verifyBusiness'),
        children: [{
                path: 'step1',
                name: 'step1',
                component: () =>
                    import ('@/components/verifyBusinessOne'),
            },
            {
                path: 'step2',
                name: 'step2',
                component: () =>
                    import ('@/components/verifyBusinessTwo'),
            },
            {
                path: 'step3',
                name: 'step3',
                component: () =>
                    import ('@/components/verifyBusinessThree'),
            }
        ],
    },
    {
        path: '/verifyBusinessOne',
        name: 'verifyBusinessOne',
        component: () =>
            import ('@/components/verifyBusinessOne')
    },
    {
        path: '/verifyBusinessTwo',
        name: 'verifyBusinessTwo',
        component: () =>
            import ('@/components/verifyBusinessTwo')
    },
    {
        path: '/verifyBusinessThree',
        name: 'verifyBusinessThree',
        component: () =>
            import ('@/components/verifyBusinessThree')
    }
]



const router = new Router({
    routes
})



router.beforeEach((to, from, next) => {
    if (localStorage.getItem('token')) {
        if (to.path === '/login') {
            next({ path: '/' })
        } else {
            next();

        }
    } else {
        if (to.path === '/login') {
            next()
        } else {
            next({ path: '/login' })

        }
    }
});


router.afterEach(() => {

})

export {
    router
};