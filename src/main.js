import { createApp } from 'vue'
import App from "./App.vue";
import router from "./router";
import "./assets/styles/index.css";
import { createPinia } from 'pinia'
import {resetStore} from './utilities';

const pinia = createPinia();
pinia.use(resetStore)
createApp(App).use(router).use(pinia).mount('#app')
