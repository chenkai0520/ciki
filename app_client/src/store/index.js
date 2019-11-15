import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: {}
    },
    getters:{
        isLogin: state => {
            if(state.user.id && state.user.name){
                return true;
            }
            return false;
        }
    },
    mutations: {
        initUser(state, data) {
            state.user = data;
        }
    },
    actions: {},
    modules: {}
})