import Vue from 'vue'
import Router from 'vue-router'

import index from '@/components/index'
import blocks from '@/components/block/blocks'
import block from '@/components/block/block'
import peers from '@/components/peers'
import generators from '@/components/generators'
import account from '@/components/account'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/blocks',
      name: 'blocks',
      component: blocks
    },
      {
          path: '/block/:height',
          name: 'block',
          component: block
      },
    {
      path: '/peers',
      name: 'peers',
      component: peers
    },
      {
          path: '/generators',
          name: 'generators',
          component: generators
      }
      ,
      {
          path: '/account/:account',
          name: 'account',
          component: account
      }
  ]
})
