// import Country from './countryPrototype'
import axios from "axios";

export default {
  state: {
    countryHistory: null,
    countries: [],
    topCountries: []
  },
  mutations: {
    newCountry(state, payload) {
      state.countries.push(payload);
    },
    newTopCountry(state, payload) {
      state.topCountries = payload;
    },
    setCountryHistory(state, payload) {
      state.countryHistory = payload;
    }
  },
  actions: {
    updateTopCountries({ commit }) {
      commit("clearError");
      commit("setLoading", true);

      axios
        .get("https://corona.lmao.ninja/v2/countries?sort=active")
        .then(response => {
          let data = response.data.slice(0, 5);

          commit("newTopCountry", data);

          commit("setLoading", false);
        });
    },

    async setCountryHistory({ commit }, payload) {
      commit("clearError");
      commit("setLoading", true);

      await axios
        .get(`https://corona.lmao.ninja/v2/historical/${payload}`)
        .then(response => {
          commit("setCountryHistory", response);
          commit("setLoading", false);
        });
    },

    async setCountries({ commit, state }) {
      commit("clearError");
      commit("setLoading", true);

      await axios
        .get("https://corona.lmao.ninja/v2/countries")
        .then(response => {
          let data = response.data;
          state.countries = data;

          commit("setLoading", false);
        });
    }
  },
  getters: {
    getCountries(state) {
      return state.countries;
    },
    countryId(state) {
      return state.countries.length;
    },
    topCountries(state) {
      return state.topCountries;
    },
    getCountryHistory(state) {
      return state.countryHistory;
    }
  }
};
