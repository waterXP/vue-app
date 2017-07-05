import * as types from '../mutationTypes'

const state = {
  loginForm: {
    name: '13754312333',
    password: '111111',
    verifyText: ''
  },
  userinfo: {},
  loginStatus: 0,
  verifySrc: ''
}

const actions = {
  async login ({ commit, rootState, dispatch }, userinfo) {
    const d = await dispatch(
      'fetch',
      { action: 'post /api/home/processLogin.do', params: userinfo },
      { root: true }
    )
    if (d) {
      if (!d.result) {
        dispatch('getUserinfo')
      } else {
        if (d.errmsg === '验证码输入有误') {
          commit(types.VERIFY_ERROR)
        }
      }
    }
  },
  async getVerifyImg ({ commit, dispatch }) {
    const d = await dispatch(
      'fetch',
      { action: 'getblob /api/home/verpic.do' },
      { root: true }
    )
    const verifySrc = window.URL.createObjectURL(d)
    commit(types.GET_VERIFY_IMG, { verifySrc })
  },
  async logout ({ commit, dispatch }) {
    await dispatch(
      'fetch',
      { action: 'get /api/home/logoutman.do' },
      { root: true }
    )
    commit(types.LOGOUT)
  },
  async getUserinfo ({ commit, dispatch }) {
    const d = await dispatch(
      'fetch',
      { action: 'get /api/home/hqh.json' },
      { root: true }
    )
    if (d && !d.result) {
      commit(types.GET_USER_INFO, d.data)
    }
  }
}

const mutations = {
  [types.LOGOUT] (state) {
    Object.assign(state, {
      loginForm: {
        name: '',
        password: '',
        verifyText: ''
      },
      userinfo: {
        name: ''
      },
      loginStatus: 1
    })
  },
  [types.GET_VERIFY_IMG] (state, { verifySrc }) {
    Object.assign(state, { verifySrc })
  },
  [types.VERIFY_ERROR] (state) {
    Object.assign(state.loginForm, { verifyText: '' })
  },
  [types.GET_USER_INFO] (state, data) {
    Object.assign(state,
      { loginStatus: 2 },
      { userinfo: data }
    )
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
