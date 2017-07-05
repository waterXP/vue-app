// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from '@/components/App'
import router from './router'
import filters from '@/lib/filters'
import iView from 'iview'
import store from './store'
import 'iview/dist/styles/iview.css'
import '@/css/bootstrap.min.css'
import '@/css/font-awesome.min.css'
import '@/css/animate.css'

Vue.use(iView)
// Vue.use(base)
Vue.config.productionTip = false
Vue.filter(
  'currency', filters.currency
)
Vue.filter(
  'dateFormat', filters.dateFormat
)

/* eslint-disable no-new */
const vue = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

export const alert = vue.alert
