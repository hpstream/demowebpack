import Vue from 'vue'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/zh-CN'
// Vue.use(ElementUI, { locale })
// import store from './store'
import App from './App'
import router from './router'
import wbcc from './conponent/base';
// import * as filters from './filters' // 全局filter

// window.Promise = Promise

// Object.keys(filters).forEach(key => {
//   Vue.filter(key, filters[key])
// })
Vue.component('wbCc',wbcc)
// console.log(document.title=222);
// Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
