
export const token = (state) => {
    if(!state.user.token && localStorage.getItem('user')){
        state.user.token=JSON.parse(localStorage.getItem('user')).token
    }
    return state.user.token
}
export const scope=(state)=>{
    if(state.user.scope==1 && localStorage.getItem('user')){
        state.user.scope=JSON.parse(localStorage.getItem('user')).scope
    }
    return state.user.scope
}