import Vue from 'vue';
import App from './App.vue';

// import vuetify from './plugins/vuetify';
import store from './store/store';

import vuetify from './plugins/vuetify';
// import Vuetify from 'vuetify'

Vue.config.productionTip = false


new Vue({
  el: '#app',
  store,
  vuetify,
  
  render: h =>h(App)
})
