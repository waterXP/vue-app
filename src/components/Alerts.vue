<template lang='pug'>
#alerts
  Alert(
    v-for='alert in alerts'
    :type='alert.type'
    show-icon
    key='$index'
    closable
  ) {{ alert.msg }}
</template>

<script>
export default {
  name: 'alerts',
  props: ['alerts']
}
</script>

<style lang='scss' scoped>
@import '../css/style.scss';

#alerts {
  position: fixed;
  width: 300px;
  margin: 0 auto;
  top: 30px;
  left: 0;
  right: 0;
  z-index: 10000;
  .ivu-alert {
    margin-bottom: 5px;
  }
}
</style>
