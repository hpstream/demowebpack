import Vue from 'vue'
import Router from 'vue-router'

// const _import = require('./_import_' + process.env.NODE_ENV)
import  Home  from '../view/home'
import  Card  from '../view/card'
import DEMp from '../doc/1.md';
// console.log(Home);
// console.log(DEMp);
Vue.use(Router)
export const constantRouterMap = [
    { path: '/', name:'dd',component:Home},
    { path: '/home',name:'dd333', component: DEMp}
  ]


  const Router1 = new Router({
    //mode: 'history', //后端支持可开
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
  })

  Router1.beforeEach((to,from,next)=>{
    // do something
    // console.log(to)
    // console.log(from);
    next()
})

  export default Router1;