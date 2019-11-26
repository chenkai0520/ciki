import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// //没有指定webpackChunkName,每个组件打包成一个js文件
// const test1 = ()=>import('@/components/test1.vue') 
// const test2 = ()=>import('@/components/test2.vue')

// //指定了相同的webpackChunkName，会合并打包成y一个js文件
// const test3 = ()=>import(/* webpackChunkName:'grounpTest' */ '@/components/test3.vue') 
// const test4 = ()=>import(/* webpackChunkName:'grounpTest' */ '@/components/test4.vue')

const routes = [{
        path: '/editor',
        name: 'editor',
        component: () => import(/* webpackChunkName: "editor" */'@/views/editor.vue'),
        meta: { 
            requiresAuth: true
        }
    },{
        path: '/new',
        name: 'new',
        component: () => import(/* webpackChunkName: "editor" */'@/views/editor.vue'),
        meta: { 
            requiresAuth: true
        }
    },
    {
        path: '/about',
        name: 'about',
        component: () => import( /* webpackChunkName: "about" */ '@/views/About.vue'),
        meta: { 
            guest: true
        }
    },{
        path: '*',
        redirect: '/about',
        meta: { 
            guest: true
        }
    },
]

const router = new VueRouter({
    routes
})
router.beforeEach((to, from, next) => {
    if(to.matched.some(record => { return record.meta && record.meta.requiresAuth})) {

        if (localStorage.getItem('jwt') == null) {
            next({
                path: '/login',
                params: { nextUrl: to.fullPath }
            });
        }else{
            next();
        }

    }else{
        next();
    }

});
export default router