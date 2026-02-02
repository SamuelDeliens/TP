import {createPinia} from "pinia";

import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router.ts'
import { useAuthStore } from '@/stores/auth.store';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);

const authStore = useAuthStore();
authStore.init();

app
    .use(router)
    .mount('#app');