import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "@/router.ts";
import {createPinia} from "pinia";
import {useAuthStore} from "@/stores/auth.store.ts";

const app = createApp(App)
const pinia = createPinia();

app.use(pinia);

const authStore = useAuthStore();
authStore.init();

app
    .use(router)
    .mount('#app');
