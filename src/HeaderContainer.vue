<template lang='pug'>
header
  router-link(tag='button', :to='{ path: "/console" }', class='btn')
    i.fa.fa-fw.fa-superpowers
  h5.title 网吧钉钉管理系统
  .userinfo
</template>

<script>
export default {
  name: 'header-container'
}
</script>

<style lang='scss' scoped>
@import './style.scss';
button.btn {
  width: $frameTopHeight;
  height: $frameTopHeight;
  background-color: darken($backColor, 10%);
  border-radius: 0;
  vertical-align: text-bottom;
  &:focus, &:hover, &:active {
    background-color: darken($backColor, 15%);
    outline: none;
  }
  i {
    font-size: 20px;
  }
}
.title {
  display: inline-block;
  margin-left: 30px;
  vertical-align: text-bottom;
  line-height: $frameTopHeight;
}
.userinfo {
  position: fixed;
  top: 0;
  right: 0;
  height: $frameTopHeight;
  width: 300px;
  max-width: 600px;
}
</style>
