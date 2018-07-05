import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    articles: [],
    loginStatus: false,
    article: ''
  },
  mutations: {
    pushArticles: (state, payload) => {
      state.articles = payload
    },
    changeStatus: (state, payload) => {
      state.loginStatus = payload
    },
    logout: (state, payload) => {
      state.loginStatus = payload
    },
    article: (state, payload) => {
      state.article = payload
    }
  },
  actions: {
    getArticles: function (context) {
      axios.get('http://localhost:3000/articles/list')
      .then(response => {
        context.commit('pushArticles', response.data.response)
      })
      .catch(err => {
        console.log(err)
      })
    },
    checkStatus: function (context) {
      let status = localStorage.getItem('status')
      if(status) {context.commit('changeStatus', status)}
    },
    logoutStatus: function (context, payload) {
      context.commit('logout', payload)
    },
    article: function (context, payload) {
      context.commit('article', payload)
    }
  }
})
