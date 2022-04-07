import Vue from 'vue'
import App from './App.vue'
import LxjUi from '../packages'

Vue.config.productionTip = false
Vue.use(LxjUi)

new Vue({
  render: h => h(App)
}).$mount('#app')
