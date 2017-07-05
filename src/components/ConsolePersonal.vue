<template lang='pug'>
.console-personal
  Card
    p(slot='title')
      Icon(type='android-person')
      | &nbsp;用户信息
      Button(size='small', @click='changeShowType', title='显示/隐藏未定义信息'): Icon(:type='showType')
    Row(v-show='userinfo.name || showAll')
      Col(span='8')
        Icon(type='android-person')
        span 用户姓名
      Col(span='14', offset='2'): span {{ userinfo.name }}
    Row(v-show='userinfo.dingId || showAll')
      Col(span='8')
        Icon(type='pin')
        span 钉钉账号
      Col(span='14', offset='2'): span {{ userinfo.dingId }}
    Row(v-show='userinfo.mobile || showAll')
      Col(span='8')
        Icon(type='iphone')
        span 手机号
      Col(span='14', offset='2'): span {{ userinfo.mobile }}
    Row(v-show='roles || showAll')
      Col(span='8')
        Icon(type='android-people')
        span 用户角色
      Col(span='14', offset='2'): span {{ roles }}
    Row(v-show='superiorName || showAll')
      Col(span='8')
        Icon(type='android-contact')
        span 上级负责人
      Col(span='14', offset='2'): span {{ superiorName }}
    Row(v-show='netbarName || showAll')
      Col(span='8')
        Icon(type='android-desktop')
        span 网吧名称
      Col(span='14', offset='2'): span {{ netbarName }}
    Row(v-show='userinfo.code || showAll')
      Col(span='8')
        Icon(type='coffee')
        span 渠道邀请码
      Col(span='14', offset='2'): span {{ userinfo.code }}
</template>

<script>
export default {
  name: 'console-personal',
  data () {
    return {
      showAll: false
    }
  },
  computed: {
    userinfo: function () {
      return this.$store.state.account.userinfo
    },
    netbarName: function () {
      return this.userinfo.bossWangbas ? this.userinfo.bossWangbas.name : ''
    },
    superiorName: function () {
      return this.userinfo.parent ? this.userinfo.parent.name : ''
    },
    roles: function () {
      let arr = this.userinfo.roleSet || []
      return arr.map((v) => v.name).join(', ')
    },
    showType: function () {
      return this.showAll ? 'eye' : 'eye-disabled'
    }
  },
  methods: {
    changeShowType: function () {
      this.showAll = !this.showAll
    }
  }
}
</script>

<style lang='scss' scoped>
@import '../css/style.scss';
.ivu-row {
  line-height: 30px;
  .ivu-icon {
    transition: $animate;
  }
  &:hover {
    background-color: $sel;
    .ivu-icon {
      font-size: 20px;
      transition: $animate;
    }
  }
}
.ivu-card {
  width: 400px;
  margin: 0 auto;
}
p {
  margin-bottom: 0;
}
.ivu-col:first-child {
  text-align: right;
}
span {
  padding: 0 6px;
}
.ivu-btn {
  line-height: 1;
  float: right;
  padding: 2px 7px;
  i {
    transition: $animate;
    font-size: 14px;
  }
  &:hover {
    i {
      transition: $animate;
      transform: rotate(360deg);
    }
  }  
}
</style>
