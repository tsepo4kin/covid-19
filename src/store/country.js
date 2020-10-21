// import Country from './countryPrototype'
import axios from 'axios'

export default {
  state: {
    currCountry: null,
    countries: [],
    topCountries: []
  },
  mutations: {
    newCountry (state, payload) {
      state.countries.push(payload)
    },
    setNewCurrCountry (state, payload) {
      state.currCountry = state.countries.find(e => e.country === payload)
    },
    newTopCountry (state, payload) {
      state.topCountries = payload
    }
  },
  actions: {
    setNewCurrCountry ({ commit }, payload) {
      commit('setNewCurrCountry', payload)
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
    getCurrCountry(state) {
      return state.currCountry
    },
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