import Vue from 'vue'
import App from './App.vue'
import VueKonva from 'vue-konva';
import VueRouter from 'vue-router'
import routes from "./routes"
import '@/css/tailwindcss.css';

Vue.config.productionTip = false

Vue.use(VueKonva);
Vue.use(VueRouter)



const router = new VueRouter({
  mode: 'history',
  routes: routes,
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

