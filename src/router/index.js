import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

Vue.use(Router)
const routes = [{
        path: '/',
        redirect: '/storeSel',
    }, {
        path: '/login',
        name: 'login',
        component: () =>
            import ('@/components/login')
    }, {
        path: '/storeSel',
        name: 'storeSel',
        component: () =>
            import ('@/components/storeSel')
    }, {
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
    if (store.getters.token) {
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