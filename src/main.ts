import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from '@/plugins/vuetify'

require("@/plugins/vue-apexcharts")
require("@/plugins/dayjs")
require("@/plugins/vue2-datepicker")
require("@/plugins/vue-calendar-heatmap")

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
