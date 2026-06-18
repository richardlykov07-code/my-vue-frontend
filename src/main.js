import { createApp } from 'vue'
import axios from 'axios';
import router from './router.js'
import PrimeVue from 'primevue/config';
import App from './App.vue'
import store from './state.js';
import ConfirmationService from 'primevue/confirmationservice';
import Tooltip from 'primevue/tooltip';

// Оставляем только те стили, которые гарантированно есть в v4
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

const myApp = createApp(App);

window.axios = axios;

myApp.use(store)
myApp.use(PrimeVue);
myApp.use(router)
myApp.use(ConfirmationService);
myApp.directive('tooltip', Tooltip);

myApp.mount('#app');