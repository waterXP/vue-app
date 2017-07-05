import * as types from '../mutationTypes'

const state = {
  netbars: [{
    id: -1,
    name: '全部网吧'
  }],
  bills: {},
  billTotal: {}
}

const actions = {
  async getNetbars ({ commit, dispatch }) {
    const d = await dispatch(
      'fetch',
      { action: 'get /api/store/bill/getWangbaDropDownList.json' },
      { root: true }
    )
    if (d && !d.result) {
      commit(types.GET_NETBARS, d.data)
    }
  },
  async getBills ({ commit, dispatch }, params = { keyWords: '', pageNum: 1 }) {
    const d = await dispatch(
      'fetch',
      { action: 'get /api/store/bill/search.json', params },
      { root: true }
    )
    if (d && !d.result) {
      commit(types.GET_BILLS, d.data)
    }
  },
  async getBillTotal ({ commit, dispatch }, params) {
    const d = await dispatch(
      'fetch',
      { action: 'get /api/store/bill/getPaysFenrunNum.json', params },
      { root: true }
    )
    if (d && !d.result) {
      commit(types.GET_BILL_TOTAL, d.data)
    }
  }
}

const mutations = {
  [types.GET_NETBARS] (state, data) {
    if (!data) {
      data = []
    }
    data.unshift({ id: -1, name: '全部网吧' })
    Object.assign(state, { netbars: data })
  },
  [types.GET_BILLS] (state, data) {
    // data = { 'legalColumn': ['id', 'created_at'], 'legalSort': ['desc', 'asc'], 'pageNumber': 1, 'pageSize': 10, 'totalCount': 11, 'pageCount': 2, 'orderBy': ['id'], 'orderType': ['desc'], 'list': [{ 'addPayDateTime': 1499107895000, 'alipayAccount': '18767110733', 'payType': 10, 'payTypeShow': '网费(代付)', 'robotCid': 'aeafa1e1-6063-11e7-b927-00163e1242d4', 'payNum': 30.00, 'fenrunNum': 29.82, 'status': 2, 'isAdd': 1, 'isDistribute': 1, 'statusShow': '分润成功', 'userName': '52c7e91a-812c-48ba-b805-e75700ee5256', 'cardNum': '420682199207043515', 'payCardNum': null, 'mobile': '15988151723', 'orderNo': '201707041051214060020022', 'wangbaName': '杭州市他山网咖', 'payWay': '支付宝', 'payCountNum': null, 'fenrunCountNum': null, 'userId': '20022' }, { 'addPayDateTime': 1499107008000, 'alipayAccount': '15888897941', 'payType': 10, 'payTypeShow': '网费(代付)', 'robotCid': '9e24013f-6061-11e7-b927-00163e1242d4', 'payNum': 5.00, 'fenrunNum': 4.97, 'status': 2, 'isAdd': 1, 'isDistribute': 1, 'statusShow': '分润成功', 'userName': 'd1b18769-9032-4535-a098-047a4e179670', 'cardNum': '500236198609215098', 'payCardNum': null, 'mobile': '15888897941', 'orderNo': '201707041036284640032513', 'wangbaName': '杭州市他山网咖', 'payWay': '支付宝', 'payCountNum': null, 'fenrunCountNum': null, 'userId': '32513' }, { 'addPayDateTime': 1499106616000, 'alipayAccount': '13456893801', 'payType': 8, 'payTypeShow': '水吧', 'robotCid': null, 'payNum': 15.00, 'fenrunNum': 14.91, 'status': 2, 'isAdd': 1, 'isDistribute': 1, 'statusShow': '分润成功', 'userName': '61602a31-0d65-4f70-9ea9-478ef9f972dd', 'cardNum': '', 'payCardNum': '', 'mobile': '13456893801', 'orderNo': '201707041030066960004266', 'wangbaName': '杭州市约悦网咖', 'payWay': '支付宝', 'payCountNum': null, 'fenrunCountNum': null, 'userId': '4266' }, { 'addPayDateTime': 1499106482000, 'alipayAccount': '15353698087', 'payType': 8, 'payTypeShow': '水吧', 'robotCid': null, 'payNum': 5.00, 'fenrunNum': 4.97, 'status': 2, 'isAdd': 1, 'isDistribute': 1, 'statusShow': '分润成功', 'userName': '67d712fd-5aa6-4c79-ba89-cf99631bd1fb', 'cardNum': '', 'payCardNum': '', 'mobile': '15353698087', 'orderNo': '201707041027521050021330', 'wangbaName': '杭州市他山网咖', 'payWay': '支付宝', 'payCountNum': null, 'fenrunCountNum': null, 'userId': '21330' }, { 'addPayDateTime': 1499105755000, 'alipayAccount': '15824127852', 'payType': 8, 'payTypeShow': '水吧', 'robotCid': null, 'payNum': 2.00, 'fenrunNum': 1.99, 'status': 2, 'isAdd': 1, 'isDistribute': 1, 'statusShow': '分润成功', 'userName': 'd41c2aaa-4b5c-4163-99d7-6ed5baa4a1e2', 'cardNum': '', 'payCardNum': '', 'mobile': '15824127852', 'orderNo': '201707041015478500032078', 'wangbaName': '杭州市铭扬网咖', 'payWay': '支付宝', 'payCountNum': null, 'fenrunCountNum': null, 'userId': '32078' }, { 'addPayDateTime': 1499104791000, 'alipayAccount': '15267139671', 'payType': 10, 'payTypeShow': '网费(代付)', 'robotCid': '7480292f-605c-11e7-b927-00163e1242d4', 'payNum': 5.00, 'fenrunNum': 4.97, 'status': 2, 'isAdd': 1, 'isDistribute': 1, 'statusShow': '分润成功', 'userName': 'cee58fb5-7d49-4bfd-9059-9af2b65ab3ef', 'cardNum': '612321199508222611', 'payCardNum': null, 'mobile': '15267139671', 'orderNo': '201707040959356910018512', 'wangbaName': '杭州市他山网咖', 'payWay': '支付宝', 'payCountNum': null, 'fenrunCountNum': null, 'userId': '18512' }, { 'addPayDateTime': 1499102585000, 'alipayAccount': '15967182594', 'payType': 8, 'payTypeShow': '水吧', 'robotCid': null, 'payNum': 4.00, 'fenrunNum': 3.98, 'status': 2, 'isAdd': 1, 'isDistribute': 1, 'statusShow': '分润成功', 'userName': '0a763f45-31c6-4e7c-b273-2a22a9845929', 'cardNum': '', 'payCardNum': '', 'mobile': '15967182594', 'orderNo': '201707040922529050032869', 'wangbaName': '杭州市他山网咖', 'payWay': '支付宝', 'payCountNum': null, 'fenrunCountNum': null, 'userId': '32869' }, { 'addPayDateTime': 1499102001000, 'alipayAccount': '13645716160', 'payType': 10, 'payTypeShow': '网费(代付)', 'robotCid': 'f726ba45-6055-11e7-b927-00163e1242d4', 'payNum': 5.00, 'fenrunNum': 4.97, 'status': 2, 'isAdd': 1, 'isDistribute': 1, 'statusShow': '分润成功', 'userName': '628660ea-f764-48ba-b73f-70edcd796bae', 'cardNum': '532728198608051516', 'payCardNum': null, 'mobile': '13645716160', 'orderNo': '201707040913113970034091', 'wangbaName': '杭州市他山网咖', 'payWay': '支付宝', 'payCountNum': null, 'fenrunCountNum': null, 'userId': '34091' }, { 'addPayDateTime': 1499100222000, 'alipayAccount': '13456726322', 'payType': 10, 'payTypeShow': '网费(代付)', 'robotCid': 'd22091a2-6051-11e7-b927-00163e1242d4', 'payNum': 30.00, 'fenrunNum': 29.82, 'status': 2, 'isAdd': 1, 'isDistribute': 1, 'statusShow': '分润成功', 'userName': 'aa803a96-a066-45ea-887d-27fb96ef1ace', 'cardNum': '510824199407068652', 'payCardNum': null, 'mobile': '13456726322', 'orderNo': '201707040843279660020732', 'wangbaName': '杭州市他山网咖', 'payWay': '支付宝', 'payCountNum': null, 'fenrunCountNum': null, 'userId': '20732' }], 'startRecord': 0 }
    Object.assign(state, { bills: data })
  },
  [types.GET_BILL_TOTAL] (state, data) {
    // data = { 'payNum': 878.00, 'payFenrunNum': 872.74, 'wangfeiNum': 850.00, 'wangfeiFenrunNum': 844.90, 'shuibaNum': 28.00, 'shuibaFenrunNum': 27.84, 'otherNum': 0.00, 'otherFenrunNum': 0.00 }
    Object.assign(state, { billTotal: data })
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
