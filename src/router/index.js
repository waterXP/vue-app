import Vue from 'vue'
import Router from 'vue-router'
import ConsoleHome from '@/components/ConsoleHome'
import ConsolePersonal from '@/components/ConsolePersonal'
import ProxyAgents from '@/components/ProxyAgents'
import ProxyProfits from '@/components/ProxyProfits'
import ProxySecAgents from '@/components/ProxySecAgents'
import ProxySecProfits from '@/components/ProxySecProfits'
import NetbarInfo from '@/components/NetbarInfo'
import NetbarDeploy from '@/components/NetbarDeploy'
import SettingsRole from '@/components/SettingsRole'
import SettingsUser from '@/components/SettingsUser'
import SettingsAuthority from '@/components/SettingsAuthority'
import StoreBill from '@/components/StoreBill'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/console/home'
    }, {
      path: '/console/home',
      name: 'ConsoleHome',
      component: ConsoleHome
    }, {
      path: '/console/personal',
      name: 'ConsolePersonal',
      component: ConsolePersonal
    }, {
      path: '/proxy/agents',
      name: 'ProxyAgents',
      component: ProxyAgents
    }, {
      path: '/proxy/profits',
      name: 'ProxyProfits',
      component: ProxyProfits
    }, {
      path: '/proxy/sec-agents',
      name: 'ProxySecAgents',
      component: ProxySecAgents
    }, {
      path: '/proxy/sec-profits',
      name: 'ProxySecProfits',
      component: ProxySecProfits
    }, {
      path: '/netbar/info',
      name: 'NetbarInfo',
      component: NetbarInfo
    }, {
      path: '/netbar/deploy',
      name: 'NetbarDeploy',
      component: NetbarDeploy
    }, {
      path: '/settings/role',
      name: 'SettingsRole',
      component: SettingsRole
    }, {
      path: '/settings/user',
      name: 'SettingsUser',
      component: SettingsUser
    }, {
      path: '/settings/authority',
      name: 'SettingsAuthority',
      component: SettingsAuthority
    }, {
      path: '/store/bill',
      name: 'StoreBill',
      component: StoreBill
    }, {
      path: '*',
      redirect: '/console/home'
    }
  ]
})
