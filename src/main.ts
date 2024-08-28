import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { APP_INITIAL } from './plugins/initial'

const app = createApp(App)

APP_INITIAL(app)

app.mount('#app')
