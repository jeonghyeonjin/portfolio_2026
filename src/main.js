import './assets/styles/main.css'

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

// Vue DevTools 비활성화
app.config.devtools = false

app.mount('#app')
