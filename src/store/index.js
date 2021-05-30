import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    showSignOut : false,
    loggedUser: {}
  },
  mutations: {
    "SET_SIGNOUT_TOGGLE" (state, value) {
      state.showSignOut = value
    },
    "SET_LOGGER_USER" (state, userDetails) {
      state.loggedUser = userDetails
    }
  },
  actions: {
    toggle({commit},payload){
      commit("SET_SIGNOUT_TOGGLE", payload)
    },
    setuser({commit},payload){
      commit("SET_LOGGER_USER", payload)
    }
  },
  modules: {},
});
