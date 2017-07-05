<template lang='pug'>
transition(
  name='tables'
  enter-active-class="animated fadeIn"
  leave-active-class="animated fadeOut"
)
  .ConsoleTable(v-if='!hiddenIt')
    p {{ title }}&nbsp;
      Button(size='small', v-for='(tag, i) in tags', @click='tag.remove', v-if='tag.value', :key='i') {{ tag.value }}&nbsp;
        i.fa.fa-times
    table
      thead
        tr.no-bottom-border
          th(rowspan='2') 名称
          th(colspan='3') 分润
          th(colspan='3') 交易额
          th(colspan='3') 部署量
        tr.no-top-border
          th 本月
          th 上月
          th 累计
          th 本月
          th 上月
          th 累计
          th 本月
          th 上月
          th 累计
      tbody
        tr(v-for='d in data', :key='d.id')
          td(v-if='getChildren'): a(@click='getChildren(d.auwId, d.name)') {{ d.name }}
          td(v-if='!getChildren') {{ d.name }}
          td {{ d.fenrunThisMonth | currency }}
          td {{ d.fenrunLastMonth | currency }}
          td {{ d.fenrunAll | currency }}
          td {{ d.moneyThisMonth | currency }}
          td {{ d.moneyLastMonth | currency }}
          td {{ d.moneyAll | currency }}
          td {{ d.finishedThisMonth | currency(0, '台') }}
          td {{ d.finishedLastMonth | currency(0, '台') }}
          td {{ d.finishedAll | currency(0, '台') }}
    Pagination(:total='total', :pageChanged='pageChanged', :current='current')
</template>

<script>
import Pagination from './Pagination'

export default {
  name: 'console-table',
  components: { Pagination },
  props: ['data', 'total', 'pageChanged', 'current', 'getChildren', 'title', 'tags', 'hiddenIt']
}
</script>

<style lang='scss' scoped>
.ConsoleTable {
  clear: both;
}
a {
  text-decoration: none;
}
table, tr {
  border: 1px solid #e9eaec;
}
th, td {
  padding-left: 18px;
  padding-right: 18px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  word-break: break-all;
  box-sizing: border-box;
  font-size: 12px;
}
th {
  height: 40px;
  background-color: #f8f8f9;
}
td {
  height: 48px;
}
tr:hover {
  background-color: #ebf7ff;
}
.no-bottom-border {
  border-bottom-width: 0;
}
.no-top-border {
  border-top-width: 0;
}
</style>
