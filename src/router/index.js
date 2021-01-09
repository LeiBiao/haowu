import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/index/index.vue'


const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter)



const routes = [{
        path: '/',
        name: 'Index',
        component: Index
    },
    {
        path: '/category',
        name: 'category',
        component: () =>
            import ('../views/category/category.vue')
    },
    {
        path: '/cateList/:cid',
        name: 'cateList',
        component: () =>
            import ('../views/category/cateList.vue'),
        props: true
    },

    {
        path: '/detalis/:goods_id',
        name: 'detalis',
        component: () =>
            import ('../views/detalis/index.vue'),
        props: true
    },
    {
        path: '/shopcar',
        name: 'shopCar',
        component: () =>
            import ('../views/shopcar/index.vue'),
    },
    {
        path: '/collect',
        name: 'collect',
        component: () =>
            import ('../views/collection/index.vue'),
    },
    {
        path: '/my',
        name: 'my',
        component: () =>
            import ('../views/myinfo/index.vue'),
    },
    {
        path: '/search',
        name: 'search',
        component: () =>
            import ('../views/search/index.vue'),
    },
    {
        path: '/login',
        name: 'login',
        component: () =>
            import ('../views/login/index.vue'),
    },
    {
        path: '/edit',
        name: 'edit',
        component: () =>
            import ('../views/myinfo/edit'),
    },

    {
        path: '/order',
        name: 'order',
        component: () =>
            import ('../views/order/index.vue'),
    },

]

const router = new VueRouter({
    routes
})



router.beforeEach((to, from, next) => {
    if (to.path == "/login") {
        localStorage.removeItem("user")
    }
    let token = localStorage.getItem("user")
    if (!token && (to.path == "/edit" || to.path == "/collect" || to.path == "/shopcar")) {
        next({
            path: "/login"
        })
    } else {
        next()
    }
})


export default router