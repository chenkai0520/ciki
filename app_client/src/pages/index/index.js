import Vue from 'vue'
import App from './App.vue'
import router from '../../router'
import store from '../../store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import EventHub from '@/event/eventHub.js'

import '@/assets/icon/iconfont.js'
import 'highlight.js/styles/github.css';
import '@/assets/style/index.scss'



Vue.prototype.$bus = new EventHub();
Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
