// import Country from './countryPrototype'
import axios from 'axios'

export default {
  state: {
    countries: [],
    topCountries: []
  },
  mutations: {
    newCountry (state, payload) {
      state.countries.push(payload)
    },
    newCountryName (state, payload) {
      state.currCountryName = payload
    },
    newTopCountry (state, payload) {
      state.topCountries = payload
    }
  },
  actions: {
    newCountryName ({ commit }, payload) {
      commit('newCountryName', payload)
    },


    updateTopCountries ({ commit }) {
      commit('clearError')
      commit('setLoading', true)

      axios
        .get('https://corona.lmao.ninja/v2/countries?sort=active')
        .then((response) => {
          let data = response.data.slice(0, 5)

          commit('newTopCountry', data)

          commit('setLoading', false)
        })
    },

    setCountries({commit, state}) {
      commit('clearError')
      commit('setLoading', true)

      axios
        .get('https://corona.lmao.ninja/v2/countries')
        .then((response) => {
          let data = response.data
          state.countries = data

          commit('setLoading', false)
        })

    }
  },
  getters: {
    getCountries (state) {
      return state.countries
    },
    countryId (state) {
      return state.countries.length
    },
    topCountries (state) {
      return state.topCountries
    }
  }
}