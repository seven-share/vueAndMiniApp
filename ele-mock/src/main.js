import Vue from 'vue'
import App from './App'
import router from './router'
import '../static/normalize.css' /*引入公共样式*/
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './vuex/index.js';


Vue.config.productionTip = false
Vue.use(ElementUI);

import '@/mock/mock.js';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
