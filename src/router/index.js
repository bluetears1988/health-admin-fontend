import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'

import add from '../page/reports/manual/add.vue'
import pack1 from '../page/reports/manual/pack1.vue'
import pack2 from '../page/reports/manual/pack2.vue'
import reportlist from '../page/reports/reportlist.vue'

import newcard from '../page/cards/newcard.vue'
import neworganize from '../page/organizes/neworganize.vue'
import organizelist from '../page/organizes/organizelist.vue'
import commentlist from '../page/organizes/commentlist.vue'

import cardlist from '../page/cards/cardlist.vue'
import classifylist from '../page/cards/classifylist.vue'
import setClassify from '../page/cards/setClassify.vue'
import cardsOrganizelist from '../page/cards/cardsOrganizelist.vue'
import cardsOranList from '../page/cards/cardsOranList.vue'

import otherInfo from '../page/cards/otherInfo.vue'
import city from '../page/cities/city.vue'
import citylist from '../page/cities/citylist.vue'
import addFeature from '../page/cards/addFeature.vue'
import addProject from '../page/cards/addProject.vue'
import featurelist from '../page/cards/featurelist.vue'
import projectlist from '../page/cards/projectlist.vue'
import orderlist from '../page/orders/orderlist.vue'

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
    			path: '/pack1',
    			component:pack1,
    		},{
    			path: '/pack2',
    			component:pack2
    		},{
    			path: '/page/:pack_id',
    			component:pack2
    		}
    	]
    },{
      path: '/reports/reportlist',
      component:reportlist,
    },{
      path: '/cards/newcard',
      component:newcard,
    },{
      path: '/cards/cardlist',
      component:cardlist,
    },{
      path: '/cards/classifylist',
      component:classifylist,
    },{
      path: '/cards/setClassify',
      component:setClassify,
    },{
      path: '/cards/otherInfo',
      component:otherInfo,
    },{
      path: '/organizes/neworganize',
      component:neworganize,
    },{
      path: '/organizes/organizelist',
      component:organizelist,
    },,{
      path: '/organizes/commentlist',
      component:commentlist,
    },{
      path: '/cardsOrganizelist',
      component:cardsOrganizelist,
    },{
      path: '/cardsOranList',
      component:cardsOranList,
    },{
      path: '/city',
      component:city,
    },{
      path: '/citylist',
      component:citylist,
    },{
      path: '/cards/addFeature',
      component:addFeature,
    },{
      path: '/cards/addProject',
      component:addProject,
    },{
      path: '/cards/featurelist',
      component:featurelist,
    },{
      path: '/cards/projectlist',
      component:projectlist,
    },{
      path: '/orders/orderlist',
      component:orderlist,
    }
  ]
})
