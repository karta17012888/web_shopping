import Vue from 'vue'

import onlyapp from "./app.vue";    


import VueRouter from 'vue-router';
Vue.use(VueRouter);    
import { routes } from "./routes.js";


import Vuex from 'vuex';
Vue.use(Vuex);    
import store from "./store/store"     




let cdom = document.createElement( "div" ) ;
cdom.id = "cdom_at_dom" ;
document.body.appendChild( cdom );


const router = new VueRouter( {

  routes,
  mode: "history"

  
} );

router.beforeEach(function (to, from, next) { 

  console.log( "router.beforeEach :: to =" , to )

  if( to.name != 'login' ){  /*next({ name: 'login' })*/  }

  next(); 
}); 




new Vue( {

  el: "#cdom_at_dom",
  
  router,                             // 路由器
  
  render: h => h( onlyapp ),          // 渲染 vue

  store   // 產生實例 vuex
} );
