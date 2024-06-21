import { createStore } from 'vuex'

import persistedstate from 'vuex-persistedstate';

const store = createStore({
    state() {
        return {
            user: {
                user_id: ''
            }
        }
    },
    mutations: {
        user(state, data){
            state.user = data;
        }
    },
    getters: {
        getUser: ()=>{
            return this.state.user;
        }
    },
    plugins: [
        persistedstate({
            paths: ['user']
        })
    ]
});

export default store;