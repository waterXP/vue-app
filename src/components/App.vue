<template lang='pug'>
#app
  Alerts(:alerts='alerts')
  HeaderContainer#header
  #container
    Sidebar#sidebar(v-if='loginStatus === 2')
    #content(v-if='loginStatus === 2')
      Breadcrumb
        Breadcrumb-item(v-for='name in getBread', key='name') {{ name }}
      router-view
    Login(v-if='loginStatus === 1')
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Alerts from './Alerts'
import Sidebar from './Sidebar'
import Login from './Login'
import HeaderContainer from './HeaderContainer'
import menu from '@/enums/sidebar'

export default {
  name: 'app',
  components: { Alerts, Sidebar, HeaderContainer, Login },
  methods: {
    ...mapActions('account', ['getUserinfo']),
    addAlert: function (msg, type) {
      let that = this
      this.alerts.push({
        msg: msg,
        type: type
      })
      setTimeout(function () {
        if (that.alerts.length > 0) {
          that.alerts.pop()
        }
      }, 1500)
    },
    openNotice: function () {
      this.$Notice.open({
        title: `欢迎回来, ${this.userinfo.name || ''}`,
        desc: `<p>有需要可以随时联系我们，祝您工作愉快。</p>`
      })
    }
  },
  created: function () {
    this.$Notice.config({
      top: 50,
      duration: 10
    })
    this.getUserinfo()
    setTimeout(() => this.openNotice(), 2000)
  },
  computed: {
    ...mapState({
      loginStatus: state => state.account.loginStatus,
      userinfo: state => state.account.userinfo,
      alerts: state => state.alerts
    }),
    getBread: function () {
      let path = []
      path[1] = this.$route.path
      path[0] = '/' + path[1].split('/')[1]
      for (let items of menu) {
        if (path[0] === items[0].href) {
          path[0] = items[0].title
          for (let item of items) {
            if (path[1] === item.href) {
              path[1] = item.title
            }
          }
          break
        }
      }
      return path
    }
  }
}
</script>

<style lang='scss'>
@import '../css/style.scss';

#app {
  font-family: $fontFamily;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $content;
}
#header {
  top: 0;
  left: 0;
  width: 100%;
  height: $frameTopHeight;
  background-color: $background;
}
#sidebar {
  position: fixed;
  top: $frameTopHeight;
  bottom: 0;
  width: 100%;
  overflow: hidden;
  left: 0;
}
#content {
  position: absolute;
  top: $frameTopHeight;
  right: 0;
  bottom: 0;
  left: $frameSideWidthShrink;
  width: auto;
  padding: $panelPadding;
  transition: $animate;
  z-index: -1;
}
.expand + #content {
  left: $frameSideWidth;
  transition: $animate;
}
.ivu-breadcrumb {
  margin-bottom: 15px;
}
.ivu-notice-desc p {
  margin-bottom: 0;
}
</style>
