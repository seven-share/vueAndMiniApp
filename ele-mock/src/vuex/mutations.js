import * as types from './mutation-types.js';


export default{
    [types.INIT_USER](state,user){
        state.user.token=user.token
        state.user.scope=user.scope
        localStorage.setItem('user',JSON.stringify({'token':user.token,'scope':user.scope}))
    },
    [types.LOGOUT](state){
        state.user.token=null
        state.user.scope=1
        // state.routers=null
        // state.addRouters=null
        localStorage.removeItem('user');
    }
}