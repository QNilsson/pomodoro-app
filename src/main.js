import Vue from 'vue';
import App from './App.vue';
// import vuetify from './plugins/vuetify';
import store from './store/store';
// import Vuetify from 'vuetify'

Vue.config.productionTip = false


new Vue({
  el: '#app',
  store,
  render: h =>h(App)
})
