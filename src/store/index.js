import Vue from 'vue'
import Vuex from 'vuex'
import account from './modules/account'
import profit from './modules/profit'
import store from './modules/store'
import * as types from './mutationTypes'
import { fetchData } from '@/lib/api'

Vue.use(Vuex)

const state = {
  alerts: []
}

const actions = {
  async fetch ({ commit, dispatch }, payload) {
    try {
      let r = (await fetchData(payload)).data
      if (r) {
        if (r.result === 1) {
          if (r.errmsg === '登录用户为空!') {
            commit(types.CLEAN_USERINFO)
            return
          } else {
            dispatch(
              'addAlert',
              { type: 'error', msg: r.errmsg || r.msg }
            )
          }
        }
        return r
      }
    } catch (e) {
      commit(types.FETCH_FALSE, e)
    }
  },
  alert ({ dispatch }, data) {
    dispatch('addAlert', {
      type: 'error',
      msg: data
    })
  },
  addAlert ({ commit }, data) {
    commit(types.ADD_ALERT, data)
    setTimeout(function () {
      commit(types.REMOVE_ALERT)
    }, 1500)
  }
}

const mutations = {
  [types.ADD_ALERT] (state, payload) {
    let params = { msg: payload.msg }
    if (payload.type) {
      params.type = payload.type
    }
    state.alerts.push(params)
  },
  [types.REMOVE_ALERT] (state, payload) {
    if (state.alerts.length > 0) {
      state.alerts.pop()
    }
  },
  [types.CLEAN_USERINFO] (state) {
    Object.assign(state.account, {
      loginForm: {
        name: '',
        password: '',
        verifyText: ''
      },
      loginStatus: 1
    })
    return {}
  },
  [types.FETCH_FALSE] (state, payload) {
    console.log(payload)
  }
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  modules: {
    account,
    profit,
    store
  }
})
