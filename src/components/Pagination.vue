<template lang='pug'>
Page(
  :total='total'
  show-total
  show-elevator
  @on-change='pageChanged'
  :current='current'
)
</template>

<script>

export default {
  name: 'pagination',
  props: ['total', 'pageChanged', 'current']
}
</script>

<style lang='scss'>
.ivu-page {
  float: right;
  margin-top: 10px;
}
</style>
