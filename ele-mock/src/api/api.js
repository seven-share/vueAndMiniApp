import axios from './index';


export const requestLogin=function(params){
    return axios.post('/login',params)
}
// export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };

export const getUserByPage=function(page){
    return axios.post('/getUserByPage',page)
}

export const removeUser=function(uid){
    return axios.post('/removeUser',uid)
}
export const editUser=function(user){
    return axios.post('/editUser',user)
}
export const batchRemoveUser=function(ids){
    return axios.post('/batchRemoveUser',ids)
}
export const addUser=function(user){
    return axios.post('/addUser',user)
}