import Vue from 'vue'
import Vuex from 'vuex'
import vuexLkdrModule from "@/store/lkdr";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    lkdr: vuexLkdrModule
  }
})
