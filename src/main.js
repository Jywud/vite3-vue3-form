import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.less'
import 'element-plus/es/components/message/style/css'

// import DYForm from './index.js'
const app = createApp(App)

app.use(createPinia())
app.use(router)
// app.use(DYForm)

app.mount('#app')
