import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        //购物车

        goods: [],

        //收藏夹
        CollectList: [],
        //登录状态(token)
        user: JSON.parse(window.localStorage.getItem("user")),
        //页面缓存
        cachePage: ['categroy'],
        //订单列表
        orderList: JSON.parse(window.localStorage.getItem("order")) || [],

    },
    mutations: {

        // 购物车商品
        setGoods(state, payloda) {
            state.goods.push(payloda)
        },
        //收藏夹商品
        setCollect(state, payload) {
            if (state.CollectList.indexOf(payload) == -1) {
                state.CollectList.push(payload)

            } else {
                state.CollectList.splice(state.CollectList.indexOf(payload), 1)
            }
        },


        //登录
        setUser(state, payload) {
            state.user = payload
                // 将token持久化
            window.localStorage.setItem('user', JSON.stringify(state.user))
        },
        //订单
        setOrder(state, payload) {
            state.orderList.push(payload)
        }

    },
    getters: {
        collectLen(state) {
            return state.CollectList.length
        }
    },

    actions: {

    },
    modules: {}
})