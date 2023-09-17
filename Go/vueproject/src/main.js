import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import Router from 'vue-router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VModal from 'vue-js-modal'
 
import ShowData from './components/ShowData.vue'
import MainPage from './components/MainPage.vue'

Vue.use(VModal, { dynamic: true, dynamicDefaults: { clickToClose: false } })
Vue.use(Router)
Vue.use(ElementUI)


Vue.config.productionTip = false





const router = new Router({
  routes: [
    { path: '/', component: ShowData },
    { path: '/login', component: MainPage }    
  ]
})



new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
