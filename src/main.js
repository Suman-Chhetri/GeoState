import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import jQuery from 'jquery';
import 'popper.js';
import 'bootstrap';

window.$ = window.jQuery = jQuery;

createApp(App).use(store).use(router).mount('#app')
