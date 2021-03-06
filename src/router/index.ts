import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'
import Me from "@/views/Me.vue"
import Home from "@/views/Home.vue";
import Legal from "@/views/Legal.vue";

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/me',
    name: 'Me',
    component: Me
  },
  {
    path: '/legal',
    name: 'Legal',
    component: Legal
  }
]

const router = new VueRouter({
  routes
})

export default router
