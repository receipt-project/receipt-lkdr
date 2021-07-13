import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Heatmap from '@/views/Heatmap.vue'
import Me from "@/views/Me.vue"

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/heatmap',
    name: 'Heatmap',
    component: Heatmap
  },
  {
    path: '/me',
    name: 'Me',
    component: Me
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
