import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './../store/index'
import { sync } from 'vuex-router-sync'
import routes from './routes'
import axios from 'axios'
import VueAxios from 'vue-axios'
import auth from '@websanova/vue-auth'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })
  sync(store(), Router)
  Vue.router = Router
  Vue.use(VueAxios, axios)
  Vue.axios.defaults.baseURL = 'http://localhost:8000/api/'
  // Vue.axios.defaults.baseURL = 'https://api.okaprendeingles.com.bo/api'
  Vue.use(auth, {
    auth: require('@websanova/vue-auth/drivers/auth/bearer.js'),
    http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
    router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
    authRedirect: '/',
    registerData: {
      url: 'auth/register',
      method: 'POST',
      redirect: '/login'
    },
    loginData: {
      url: 'auth/login',
      method: 'POST',
      redirect: '/',
      fetchUser: false
    },
    logoutData: {
      url: 'auth/logout',
      method: 'POST',
      redirect: '/',
      makeRequest: true
    },
    fetchData: {
      url: 'auth/user',
      method: 'GET',
      enabled: true
    },
    refreshData: {
      url: 'auth/refresh',
      method: 'GET',
      enabled: true,
      interval: 30
    }
  })
  return Router
}
