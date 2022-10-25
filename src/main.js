import Vue from 'vue'
import Index from './pages/Index.vue'
import './assets/main.css'

new Vue({
	render: h => h(Index),
}).$mount('#app')
