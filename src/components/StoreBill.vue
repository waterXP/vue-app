<template lang='pug'>
.store-bill
  Form(rel='billForm', :model='billForm', inline)
    FormInput(prop='keyWords', v-model='billForm.keyWords')
    Form-item(prop='netbar')
      .ivu-input-wrapper.ivu-input-type.ivu-input-group.ivu-input-group-with-prepend
        .ivu-input-group-prepend
          i.ivu-icon.ivu-icon-monitor
        Select.sel-netbar(v-model='billForm.netbar', placeholder='选择网吧')
          Option(v-for='option in netbars', :value='option.id', :key='option.id') {{ option.name }}
    Form-item(prop='state')
      .ivu-input-wrapper.ivu-input-type.ivu-input-group.ivu-input-group-with-prepend
        .ivu-input-group-prepend
          i.ivu-icon.ivu-icon-funnel
        Select.sel-state(v-model='billForm.state', placeholder='选择状态')
          Option(v-for='option in states', :value='option.value', :key='option.value') {{ option.name }}
    FormDatePicker(prop='datetimerange', v-model='billForm.range')
    Form-item
      Button(type='primary', @click='search', :disabled='isBusy', icon='search') 搜索
    Form-item
      a.ivu-btn.ivu-btn-success(:href='exportXls', target='_blank')
        i.ivu-icon.ivu-icon-android-download
        span 导出
    .spin-col(v-if='isBusy')
      Loading
    .tags
      .ivu-tag.ivu-tag-border(v-for='(tag, i) in tags', :key='tag.title', v-if='i > 0', @click='trigger(tag)', :class='tag.show ? "tag-on ivu-tag-blue" : ""')
        i.fa.fa-tag
        span.ivu-tag-text &nbsp;{{ tag.title }}
      Button(icon='tshirt', size='small', @click='showAllTag', type='ghost') 显示全部
      Button(icon='tshirt-outline', size='small', @click='hideAllTag', type='ghost') 隐藏全部
    p.title 账单列表&nbsp;
      Button(size='small', v-if='m.keyWords', @click='setSearch("keyWords", "")') {{ m.keyWords }}&nbsp;
        i.fa.fa-times
      Button(size='small', v-if='m.wangbaId && m.wangbaId > -1 && netbarName', @click='setSearch("wangbaId", -1)') {{ netbarName }}&nbsp;
        i.fa.fa-times
      Button(size='small', v-if='m.status && m.status > -1 && stateName', @click='setSearch("status", -1)') {{ stateName }}&nbsp;
        i.fa.fa-times
      Button(size='small', disabled) {{ m.beginTime }} - {{ m.endTime }}
    Table(:columns='columns', :data='bills.list')
    .page-area
      Pagination(:total='bills.totalCount', :pageChanged='pageChanged', :current='page')
  Card
    p(slot='title') 汇总
    Row
      Col(span='6') 总额：
        span {{ billTotal.payNum | currency }}
      Col(span='6') 网费：
        span {{ billTotal.wangfeiNum | currency }}
      Col(span='6') 水吧：
        span {{ billTotal.shuibaNum | currency }}
      Col(span='6') 其它：
        span {{ billTotal.otherNum | currency }}
    Row
      Col(span='6') 分润：
        span {{ billTotal.payFenrunNum | currency }}
      Col(span='6') 分润：
        span {{ billTotal.wangfeiFenrunNum | currency }}
      Col(span='6') 分润：
        span {{ billTotal.shuibaFenrunNum | currency }}
      Col(span='6') 分润：
        span {{ billTotal.otherFenrunNum | currency }}
</template>

<script>
import { mapState, mapActions } from 'vuex'
import FormInput from './FormInput'
import FormDatePicker from './FormDatePicker'
import Pagination from './Pagination'
import Loading from './Loading'
import { billStates } from '@/enums'

export default {
  name: 'store-bill',
  components: { FormInput, FormDatePicker, Pagination, Loading },
  created: function () {
    this.getNetbars()
    this.getTotal()
    this.getList()
  },
  data () {
    const now = +new Date()
    const tomorrow = now + 86400000
    return {
      billForm: {
        keyWords: '',
        range: [
          now,
          tomorrow
        ],
        netbar: -1,
        state: -1
      },
      m: {
        keyWords: '',
        beginTime: this.$options.filters
          .dateFormat(now, 'yyyy-MM-dd hh:mm:ss'),
        endTime: this.$options.filters
          .dateFormat(tomorrow, 'yyyy-MM-dd hh:mm:ss')
      },
      page: 1,
      isBusy: false,
      states: billStates,
      tags: [
        {
          title: '时间',
          key: 'datetime',
          width: 133,
          fixed: 'left',
          render: (h, params) => {
            return h('span', this.$options.filters.dateFormat(params.row.addPayDateTime))
          },
          show: true
        }, {
          title: '付款账号',
          key: 'alipayAccount',
          width: 110,
          show: true
        }, {
          title: '类型',
          key: 'payTypeShow',
          width: 91,
          show: true
        }, {
          title: '付款金额',
          key: 'payNum',
          width: 110,
          render: (h, params) => {
            return h('span', this.$options.filters.currency(params.row.payNum))
          },
          show: true
        }, {
          title: '分润金额',
          key: 'fenrunNum',
          width: 110,
          render: (h, params) => {
            return h('span', this.$options.filters.currency(params.row.fenrunNum))
          },
          show: true
        }, {
          title: '状态',
          key: 'statusShow',
          width: 84,
          show: true
        }, {
          title: '用户姓名',
          key: 'userName',
          width: 105,
          show: true
        }, {
          title: '身份证号码',
          key: 'cardNum',
          width: 157,
          show: true
        }, {
          title: '手机号码',
          key: 'mobile',
          width: 110,
          show: true
        }, {
          title: '订单号',
          key: 'orderNo',
          width: 197,
          show: true
        }, {
          title: '网吧名',
          key: 'wangbaName',
          width: 130,
          show: true
        }, {
          title: '付款方式',
          key: 'payWay',
          width: 90,
          show: true
        }
      ]
    }
  },
  computed: {
    ...mapState('store', {
      netbars: state => state.netbars,
      bills: state => state.bills,
      billTotal: state => state.billTotal
    }),
    columns: function () {
      return this.tags.filter((v) => v.show)
    },
    exportXls: function () {
      let xls = '/api/store/bill/exportExcel.json?'
      for (let v in this.m) {
        if (this.m[v] !== undefined) {
          xls += `${v}=${this.m[v]}&`
        }
      }
      return xls
    },
    netbarName: function () {
      const target = this.netbars.find((v) => v.id === this.m.wangbaId)
      return target ? target.name : ''
    },
    stateName: function () {
      const target = this.states.find((v) => v.value === this.m.status)
      return target ? target.name : ''
    }
  },
  methods: {
    ...mapActions({
      alert: 'alert',
      getNetbars: 'store/getNetbars',
      getBills: 'store/getBills',
      getBillTotal: 'store/getBillTotal'
    }),
    trigger: function (tag) {
      tag.show = !tag.show
    },
    showAllTag: function () {
      this.tags.forEach((v) => (v.show = true))
    },
    hideAllTag: function () {
      this.tags.forEach((v, i) => {
        if (i > 0) {
          v.show = false
        }
      })
    },
    updateM: function () {
      const dateFormat = this.$options.filters.dateFormat
      const range = this.billForm.range
      const fmt = 'yyyy-MM-dd hh:mm:ss'
      const billForm = this.billForm
      this.m = {
        keyWords: this.billForm.keyWords,
        beginTime: dateFormat(range[0], fmt),
        endTime: dateFormat(range[1], fmt),
        status: billForm.state > -1 ? billForm.state : undefined,
        wangbaId: billForm.netbar > -1 ? billForm.netbar : undefined
      }
    },
    setSearch: function (target, value) {
      this.billForm[target] = value
      this.search()
    },
    getTotal: function () {
      this.getBillTotal(this.m)
    },
    getList: function (pageNum = 1) {
      if (!this.isBusy) {
        this.isBusy = true
        this.getBills(Object.assign(
          { pageNum }, this.m
        ))
        .then(() => {
          this.isBusy = false
          this.page = pageNum
        })
      }
    },
    search: function () {
      this.updateM()
      this.getTotal()
      this.getList()
    },
    pageChanged: function (pageNum) {
      this.getList(pageNum)
    },
    getXsl: function () {
      console.log('export')
    }
  }
}
</script>

<style lang='scss'>
@import '../css/style.scss';

.store-bill {
  p {
    margin-bottom: 0;
  }
  .ivu-table-tbody {
    transition: $animate;
  }
  .ivu-card {
    clear: both;
    margin: 60px 0 20px;
  }
  .ivu-row:last-child {
    color: $error;
  }
  .ivu-col {
    padding: 0 2px;
  }
  .ivu-table-wrapper {
    display: inline-block;
    max-width: 100%;
    clear: both;
  }
  .ivu-select {
    float: left;
  }
  .sel-state, .sel-netbar {
    width: 125px;
  }
  .ivu-tag + .ivu-btn {
    margin-right: 4px;
  }
  a:focus {
    outline-offset: 0;
    color: #fff;
    text-decoration: none;
  }
  .tags, .title {
    margin-bottom: 10px;
    button + button {
      margin-left: 4px;
    }
  }
  .ivu-table-tip table {
    margin: 0 auto;
    width: auto;
  }
}
</style>

