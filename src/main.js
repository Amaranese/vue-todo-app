import Vue from 'vue'
import App from './App.vue'

// Bootstrap 4
import 'bootstrap/dist/css/bootstrap.min.css';

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')