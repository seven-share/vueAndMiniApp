import axios from 'axios'
import store from '@/vuex/index'

axios.defaults.timeout = 5000;
axios.defaults.baseURL = '';


axios.interceptors.request.use(
    config => {
        if (true) {
            config.headers.Authorization = `token ${store.getters.token}`
        }
        return config
    },
    err => {
        return Promise.reject(err)
    },
)
export default axios