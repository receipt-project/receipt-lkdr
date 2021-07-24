import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

require("@/plugins/vue-apexcharts")
require("@/plugins/dayjs")
require("@/plugins/vue2-datepicker")
require("@/plugins/vue-calendar-heatmap")

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
