<template lang='pug'>
header
  router-link(tag='button', :to='{ path: "/console" }', class='btn')
    i.fa.fa-fw.fa-superpowers
  h5.title 网吧钉钉管理系统
  Dropdown.userinfo(placement='bottom-end', @on-click='dropClick', v-if='userinfo.name')
    i.fa.fa-user
    a(href='javascript:;') &nbsp;{{ userinfo.name }}
      Icon(type='arrow-down-b')
    Dropdown-menu(slot='list')
      Dropdown-item
        router-link(:to='{ path: "/console/personal" }')
          i.fa.fa-id-card-o
          | &nbsp;个人中心
      Dropdown-item(name='logout')
        i.fa.fa-sign-out
        | 退出
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'header-container',
  computed: {
    ...mapState('account', {
      userinfo: state => state.userinfo
    })
  },
  methods: {
    ...mapActions('account', [
      'logout'
    ]),
    dropClick: function (name) {
      if (name) {
        this[name]()
      }
    }
  }
}
</script>

<style lang='scss' scoped>
@import '../css/style.scss';
#header {
  position: fixed;
  z-index: 9999;
  h5 {
    color: $title;
  }
}
button.btn {
  width: $frameTopHeight;
  height: $frameTopHeight;
  background-color: darken($background, 10%);
  border-radius: 0;
  vertical-align: text-bottom;
  &:focus, &:hover, &:active {
    background-color: darken($background, 15%);
    outline: none;
  }
  i {
    font-size: 20px;
    transition: $animate;
  }
  &:hover {
    i {
      transform: rotate(360deg);
    } 
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
  margin-right: 15px;
  max-width: 600px;
  a {
    display: inline-block;
    font-size: 14px;
    color: $content;
    line-height: 14px;
    margin-top: ($frameTopHeight - 14px) / 2;
    &:focus, &:hover, &:active {
      text-decoration: none;
    }
    i {
      margin-left: 5px;
    }
  }
}
.ivu-dropdown-item {
  padding: 5px 15px 5px 5px;
  text-align: right;
  a {
    margin: 0;
    font-size: 12px;
    line-height: 17px;
  }
}
</style>
