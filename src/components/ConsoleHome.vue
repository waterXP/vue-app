<template lang='pug'>
.console-home
  Collapse(v-model='consoleCollapse', accordion)   
    Panel(name='total') {{ collapseTotalTitle }}
      transition(
        name='title'
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
      )
        span(v-show='consoleCollapse[0] !== "total"') &nbsp;（&nbsp;分润：{{ m.fenrunTotalThisMonth | currency }}
          i.fa(:class='profitClass')
          | &nbsp;交易额：{{ m.moneyThisMonth | currency }}
          i.fa(:class='currencyClass')
          | &nbsp;网吧部署数量：{{ m.ticketFinishedCountThisMonth | currency(0, ' 台') }}
          i.fa(:class='netbarClass')
          | &nbsp;)
      Row(slot='content')
        Col(span='8')
          Card
            h6(slot='title')
              i.fa.fa-sitemap
              | &nbsp;分润（元）
            p 本月分润
              span {{ m.fenrunTotalThisMonth | currency }}
            p 上月分润
              span {{ m.fenrunTotalTheLastMonth | currency }}
            p 累计分润
              span {{ m.fenrunTotalTheAlls | currency }}
        Col(span='8')
          Card
            h6(slot='title')
              i.fa.fa-usd
              | &nbsp;交易额（元）
            p 本月交易额
              span {{ m.moneyThisMonth | currency }}
            p 上月交易额
              span {{ m.moneyLastMonth | currency }}
            p 累计交易额
              span {{ m.moneyAlls | currency }}
        Col(span='8')
          Card
            h6(slot='title')
              i.fa.fa-laptop
              | &nbsp;网吧部署数量（台）
            p 本月网吧部署数量
              span {{ m.ticketFinishedCountThisMonth | currency(0, ' 台') }}
            p 上月网吧部署数量
              span {{ m.ticketFinishedCountLastMonth | currency(0, ' 台') }}
            p 累计网吧部署数量
              span {{ m.ticketFinishedCount | currency(0, ' 台') }}
    Panel.detail(name='detail') 详细信息
      transition(
        name='title'
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
      )
        span(v-show='consoleCollapse[0] === "detail"') &nbsp;
          span(v-for='(b, i) in breads', :key='b.id || -1')
            Button(@click.stop='toBread(b, i)', v-if='breads.length !== i + 1', size='small') {{ b.name }}
            span(v-if='breads.length !== i + 1') &nbsp;/&nbsp;
            span.pathname(v-if='breads.length === i + 1') {{ b.name }}
      div(slot='content')
        Form(rel='detailForm', :model='detailForm', inline)
          FormInput(prop='keyWord', v-model='detailForm.keyWord')
          Form-item
            Button(type='primary', @click='search', :disabled='isBusy', icon='search') 搜索
        .spin-col(span='24', v-if='!detailGot')
          Loading
        ConsoleTable(
          title='代理商列表'
          :tags='tags'
          :data='agents.list'
          :total='agents.totalCount'
          :pageChanged='agentPageChanged'
          :current='agents.pageNumber'
          :getChildren='getAgentsChildren'
          :hiddenIt='!hasData("agents")'
          v-if='agents'
        )
        ConsoleTable(
          title='业务员列表'
          :tags='tags'
          :data='users.list'
          :total='users.totalCount'
          :pageChanged='userPageChanged'
          :current='users.pageNumber'
          :getChildren='getUsersChildren'
          :hiddenIt='!hasData("users")'
          v-if='users'
        )
        ConsoleTable(
          title='网吧列表'
          :tags='tags'
          :data='netbars.list'
          :total='netbars.totalCount'
          :pageChanged='netbarPageChanged'
          :current='netbars.pageNumber'
          :hiddenIt='!hasData("netbars")'
          v-if='netbars'
        )
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Loading from './Loading'
import ConsoleTable from './ConsoleTable'
import FormInput from './FormInput'

const getClass = function (a, b) {
  return a < b ? 'error fa-arrow-down' : a > b ? 'success fa-arrow-up' : 'warning fa-minus-circle'
}

export default {
  name: 'console-home',
  components: { Loading, ConsoleTable, FormInput },
  created: function () {
    this.getTotalProfit()
  },
  data () {
    return {
      detailForm: {
        keyWord: ''
      },
      breads: [{
        name: '详情首页',
        v: 'fir',
        keyWord: '',
        agentPageNum: 1
      }],
      currentPage: 1,
      loadingAgents: false,
      loadingUsers: false,
      loadingNetbars: false,
      detailGot: false,
      firstGot: false,
      consoleCollapse: ['total']
    }
  },
  computed: {
    ...mapState('profit', {
      m: state => state.total,
      agents: state => state.agents,
      users: state => state.users,
      netbars: state => state.netbars
    }),
    isBusy: function () {
      return this.loadingAgents || this.loadingUsers || this.loadingNetbars && !this.detailGot
    },
    profitClass: function () {
      return getClass(this.m.fenrunTotalThisMonth, this.m.fenrunTotalTheLastMonth)
    },
    currencyClass: function () {
      return getClass(this.m.moneyThisMonth, this.m.moneyLastMonth)
    },
    netbarClass: function () {
      return getClass(this.m.ticketFinishedCountThisMonth, this.m.ticketFinishedCountLastMonth)
    },
    collapseTotalTitle: function () {
      switch (this.consoleCollapse[0]) {
        case 'total':
          return '全部概况'
        case 'detail':
          if (!this.firstGot) {
            this.detailGot = false
            this.getDetailProfit()
            .then(() => {
              this.detailGot = true
              this.firstGot = true
            })
          }
      }
      return '本月概况'
    },
    tags: function () {
      return [{
        value: this.breads[this.breads.length - 1].keyWord,
        remove: this.cleanKeyword
      }]
    }
  },
  methods: {
    ...mapActions({
      alert: 'alert',
      getTotalProfit: 'profit/getTotalProfit',
      getDetailProfit: 'profit/getDetailProfit',
      updateAgents: 'profit/updateAgents',
      updateUsers: 'profit/updateUsers'
    }),
    agentPageChanged: function (page) {
      if (!this.loadingAgents) {
        this.loadingAgents = true
        const len = this.breads.length
        const last = this.breads[len - 1]
        let params = {
          keyWord: last.keyWord,
          pageNum: page,
          v: 'fir'
        }
        if (len === 1) {
          this.getDetailProfit(params)
          .then(() => {
            this.loadingAgents = false
          })
        } else {
          params.v = 'sec'
          params.id = last.id
          this.updateAgents(params)
          .then(() => {
            this.detailForm.keyWord = last.keyWord
            this.loadingAgents = false
          })
        }
      }
    },
    userPageChanged: function (page) {
      if (!this.loadingUsers) {
        const last = this.breads[this.breads.length - 1]
        this.loadingUsers = true
        this.updateUsers({
          keyWord: last.keyWord,
          pageNum: page,
          v: 'sec',
          id: last.id
        }).then(() => {
          this.detailForm.keyWord = last.keyWord
          this.loadingUsers = false
        })
      }
    },
    netbarPageChanged: function (page) {
      if (!this.loadingNetbars) {
        const last = this.breads[this.breads.length - 1]
        this.loadingNetbars = true
        this.getDetailProfit({
          keyWord: last.keyWord,
          pageNum: page,
          v: 'thi',
          id: last.id
        }).then(() => {
          this.detailForm.keyWord = last.keyWord
          this.loadingNetbars = false
        })
      }
    },
    toBread: function (b, i) {
      if (this.detailGot) {
        this.detailGot = false
        let params = {
          v: b.v,
          keyWord: b.keyWord
        }
        if (b.id) {
          params.id = b.id
        }
        if (b.agentPageNum === b.userPageNum || !b.userPageNum) {
          params.pageNum = b.agentPageNum
          this.getDetailProfit(params)
          .then(() => {
            this.breads = this.breads.slice(0, i + 1)
            this.detailForm.keyWord = b.keyWord
            this.detailGot = true
          })
        } else if (b.userPageNum) {
          Promise.all([
            this.updateAgents(Object.assign({
              pageNum: b.agentPageNum
            }, params)),
            this.updateUsers(Object.assign({
              pageNum: b.userPageNum
            }, params))
          ])
          .then(() => {
            this.breads = this.breads.slice(0, i + 1)
            this.detailForm.keyWord = b.keyWord
            this.detailGot = true
          })
        }
      }
    },
    getAgentsChildren: function (id, name, page = 1) {
      if (this.detailGot) {
        this.detailGot = false
        if (!id) {
          this.alert('未找到对应信息')
        }
        const len = this.breads.length
        const last = this.breads[len - 1]
        last.agentPageNum = this.agents.pageNumber
        if (len > 1) {
          last.userPageNum = this.users.pageNumber
        }
        this.getDetailProfit({
          pageNum: page,
          v: 'sec',
          id: id
        }).then(() => {
          this.breads.push({
            name: name,
            id: id,
            agentPageNum: 1,
            userPageNum: 1,
            keyWord: '',
            v: 'sec'
          })
          this.detailForm.keyWord = ''
          this.detailGot = true
        })
      }
    },
    getUsersChildren: function (id, name, page = 1) {
      if (this.detailGot) {
        this.detailGot = false
        if (!id) {
          this.alert('未找到对应信息')
        }
        this.breads[this.breads.length - 1].userPageNum = this.agents.pageNumber
        this.getDetailProfit({
          pageNum: page,
          v: 'thi',
          id: id
        }).then(() => {
          this.breads.push({
            name: name,
            id: id,
            pageNum: 1,
            keyWord: '',
            v: 'thi'
          })
          this.detailForm.keyWord = ''
          this.detailGot = true
        })
      }
    },
    hasData: function (name) {
      return this.detailGot &&
        this[name] && this[name].list
    },
    search: function () {
      if (this.detailGot) {
        this.detailGot = false
        let last = this.breads[this.breads.length - 1]
        let params = {
          pageNum: 1,
          v: last.v,
          keyWord: this.detailForm.keyWord
        }
        if (last.id) {
          params.id = last.id
        }
        this.getDetailProfit(params)
        .then(() => {
          last.pageNum = 1
          last.keyWord = this.detailForm.keyWord
          this.detailGot = true
        })
      }
    },
    cleanKeyword: function () {
      if (this.detailGot) {
        this.detailGot = false
        let last = this.breads[this.breads.length - 1]
        let params = {
          pageNum: 1,
          v: last.v,
          keyWord: ''
        }
        if (last.id) {
          params.id = last.id
        }
        this.getDetailProfit(params)
        .then(() => {
          last.pageNum = 1
          last.keyWord = ''
          this.detailGot = true
          this.detailForm.keyWord = ''
        })
      }
    }
  }
}
</script>

<style lang='scss'>
@import '../css/style.scss';

.console-home {
  margin-bottom: 50px;  
  position: relative;
  .spin-col {
    top: 150px;
    left: 0;
    width: 100%;
    height: 100px;
    position: absolute;
    .ivu-spin-fix {
      background-color: transparent;
    }
  }
  .ivu-collapse-header {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  }
  .ivu-col {
    min-width: 300px;
    padding: 5px;
    h6 {
      margin: 0;
    }
  }
  table {
    width: 100%;
  }
  .ivu-card-body {
    span {
      float: right;
      color: $primary;
    }
  }
  .detail .ivu-collapse-content {
    min-height: 200px;
  }
  .pathname {
    padding: 2px 7px;
  }
}
</style>
