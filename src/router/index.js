import Vue from 'vue'
import Router from 'vue-router'
import Console from '@/components/Console'
import Login from '@/components/Login'
import Hello from '@/components/Hello'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Console',
      component: Console
    }, {
      path: '/login',
      name: 'Login',
      component: Login
    }, {
      path: '/help',
      name: 'Hello',
      component: Hello
    }
  ]
})
