import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import VueCalendarHeatmap from 'vue-calendar-heatmap'
import VueApexCharts from 'vue-apexcharts'
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import weekYear from "dayjs/plugin/weekYear";
import weekOfYear from "dayjs/plugin/weekOfYear"; // dependent on weekOfYear plugin

import 'vue2-datepicker/index.css';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import DatePicker from 'vue2-datepicker';

dayjs.extend(weekday)
dayjs.extend(weekOfYear)
dayjs.extend(weekYear)

Vue.use(VueCalendarHeatmap)
Vue.use(VueApexCharts)
Vue.use(DatePicker)

Vue.component('apexchart', VueApexCharts)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
