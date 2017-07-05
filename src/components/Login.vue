<template lang='pug'>
#Login
  Card
    Form(ref='loginForm', :model='loginForm', :rules='rules')
      Form-item(prop='name')
        Input(v-model='loginForm.name', placeholder='用户名', size="large")
          Icon(type='ios-person-outline', slot='prepend')
      Form-item(prop='password')
        Input(v-model='loginForm.password', placeholder='密码', size="large")
          Icon(type='ios-locked-outline', slot='prepend')
      Form-item(prop='verifyText')
        Input(v-model='loginForm.verifyText', placeholder='验证码', size="large")
          Icon(type='ios-information-outline', slot='prepend')
          Tooltip(slot='append', placement='top')
            img.sm(:src='verifySrc', @click='getVerifyImg')
            div(slot='content')
              img(:src='verifySrc')
      Form-item
        Button(type='primary', @click='userLogin', :disabled='valid', size="large") 登录
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'login',
  data () {
    return {
      rules: {
        name: [{
          requird: true,
          message: '请输入用户名',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }],
        verifyText: [{
          required: true,
          message: '请输入验证码',
          trigger: 'blur'
        }, {
          type: 'string',
          min: 4,
          max: 4,
          message: '验证码长度为4位',
          trigger: 'blur'
        }]
      }
    }
  },
  created: function () {
    this.getVerifyImg()
  },
  methods: {
    ...mapActions('account', ['login', 'getVerifyImg']),
    userLogin: function () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.login({
            name: this.loginForm.name,
            password: this.loginForm.password,
            verifyText: this.loginForm.verifyText
          })
        }
      })
    }
  },
  computed: {
    ...mapState('account', {
      verifySrc: state => state.verifySrc,
      loginForm: state => state.loginForm
    }),
    valid: function () {
      if (this.loginForm.name && this.loginForm.password && this.loginForm.verifyText) {
        return false
      }
      return true
    }
  }
}
</script>

<style lang='scss'>
@import '../css/style.scss';

#Login {
  .ivu-card {
    width: 300px;
    margin: 30px auto;
  }
  .ivu-form-item {
    margin-bottom: 24px;
    button {
      float: right;
      padding: 6px 15px;
    }
    &:last-child {
      margin-bottom: 0;
    }
    &:nth-last-child(2) {
      div.ivu-input-group-append {
        padding: 0;
      }
    }
    img.sm {
      height: 34px;
      min-width: 68px;
    }
    img {
      height: 90px;
    }
  }
  position: absolute;
  top: $frameTopHeight;
  right: $frameTopHeight;
  bottom: 0;
  left: $frameSideWidthShrink;
  width: auto;
  padding: $panelPadding;
  transition: $animate;
}
</style>
