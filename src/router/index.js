import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'

import add from '../page/reports/manual/add.vue'
import pack1 from '../page/reports/manual/pack1.vue'
import pack2 from '../page/reports/manual/pack2.vue'

import newcard from '../page/cards/newcard.vue'
import neworganize from '../page/organizes/neworganize.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },{
    	path: '/reports/manual/add',
    	component:add,
    	children:[{
    			path: 'pack1',
    			component:pack1,
    		},{
    			path: 'pack2',
    			component:pack2
    		},{
    			path: 'page/:pack_id',
    			component:pack2
    		}
    	]
    },{
      path: '/cards/newcard',
      component:newcard,
    },{
      path: '/organizes/neworganize',
      component:neworganize,
    }
  ]
})
