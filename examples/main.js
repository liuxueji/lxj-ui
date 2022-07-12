import Vue from 'vue'
import App from './App.vue'
import LxjUi from '../packages'
import router from './router'

Vue.config.productionTip = false
Vue.use(LxjUi)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
