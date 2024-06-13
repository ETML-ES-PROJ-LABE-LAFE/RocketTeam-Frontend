// src/main.js

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store'; // Importer le store

const app = createApp(App);

app.use(router);
app.use(store); // Utiliser le store

app.mount('#app');
