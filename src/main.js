import { createApp } from 'vue'
import './style.css'
import router from './router.js'
import App from './App.vue'
import Vuex from 'vuex'

createApp(App).use(Vuex).use(router).mount('#app')
