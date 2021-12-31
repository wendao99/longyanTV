import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/base.css'
//import 'default-passive-events' //添加事件管理者'passive'，来阻止'touchstart'事件，让页面更加流畅。 解决chrome下的warning问题 已卸载

Vue.config.productionTip = false

import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
