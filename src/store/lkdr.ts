const vuexLkdrModule = {
  namespaced: true,
  state: {
    userProfile: null
  },
  mutations: {
    setUserProfile(state: any, userProfile: any) {
      state.userProfile = userProfile
    }
  }
}

export default vuexLkdrModule
