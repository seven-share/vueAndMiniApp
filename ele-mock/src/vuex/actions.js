import * as types from './mutation-types.js';


export default {
    initUser({commit}, user) {
        commit(types.INIT_USER, user);
    },
    logout({commit}){
        return new Promise((resolve,reject)=>{
            commit(types.LOGOUT)
            resolve()
        })
    }
};