import './assets/tailwind.css'
import axios from 'axios'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";



const app = createApp(App)
app.use(Toast)
app.use(router, axios)

app.mount('#app')
