import * as types from '../mutationTypes'

const state = {
  total: {},
  agents: {},
  users: {},
  netbars: {}
}

const actions = {
  async getTotalProfit ({ commit, dispatch }) {
    const d = await dispatch(
      'fetch',
      { action: 'get /api/pays/fenrunTotal.json' },
      { root: true }
    )
    if (d && !d.result) {
      commit(types.GET_TOTAL_PROFIT, { data: d.data })
    }
  },
  async getDetailProfit ({ commit, dispatch }, params = { pageNum: 1, v: 'fir' }) {
    const d = await dispatch(
      'fetch',
      { action: 'get /api/pays/fenrunTotalDetail.json', params },
      { root: true }
    )
    if (d && !d.result) {
      commit(types.GET_DETAIL_PROFIT, { data: d.data })
    }
  },
  async updateAgents ({ commit, dispatch }, params) {
    const d = await dispatch(
      'fetch',
      { action: 'get /api/pays/fenrunTotalDetail.json', params },
      { root: true }
    )
    if (d && !d.result) {
      commit(types.UPDATE_AGENTS, { data: d.data })
    }
  },
  async updateUsers ({ commit, dispatch }, params) {
    const d = await dispatch(
      'fetch',
      { action: 'get /api/pays/fenrunTotalDetail.json', params },
      { root: true }
    )
    if (d && !d.result) {
      commit(types.UPDATE_USERS, { data: d.data })
    }
  }
}

const mutations = {
  [types.GET_TOTAL_PROFIT] (state, { data }) {
    Object.assign(state, { total: data })
  },
  [types.GET_DETAIL_PROFIT] (state, { data }) {
    let obj = {
      agents: data.agentPager,
      users: data.userPager,
      netbars: data.wangbaPager
    }
    Object.assign(state, obj)
  },
  [types.UPDATE_AGENTS] (state, { data }) {
    let obj = {
      agents: data.agentPager
    }
    Object.assign(state, obj)
  },
  [types.UPDATE_USERS] (state, { data }) {
    let obj = {
      users: data.userPager
    }
    Object.assign(state, obj)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
