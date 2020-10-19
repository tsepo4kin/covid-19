import Vue from "vue";
import Vuex from "vuex";
import commonModule from './common'
import countryModule from './country'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    commonModule,
    countryModule
  }
});
