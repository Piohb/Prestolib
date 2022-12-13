import { createApp } from 'vue'
import App from '@/App.vue'
import Router from './router'
import Store from './store'
import Axios from 'axios'
import VueAxios from 'vue-axios'
import './assets/style.css'

const app = createApp(App)
    .use(Router)
    .use(Store)

app
    .use(VueAxios, Axios)
    .provide('axios', app.config.globalProperties.axios)
    .mount('#app')

