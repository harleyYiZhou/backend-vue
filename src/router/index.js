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
            import ('@/components/dashboard')
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