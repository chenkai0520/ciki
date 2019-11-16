import Vue from 'vue'
import App from './App.vue'
import router from '../../router'
import store from '../../store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/style/index.scss'

// import KUI from './k-ui'
// Vue.use(KUI);
import KTextarea from '@/k-ui/textarea'

import '@/assets/icon/iconfont.js'

import EventHub from '@/components/common/event/eventHub.js'
Vue.prototype.$bus = new EventHub();

Vue.use(KTextarea);

Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
