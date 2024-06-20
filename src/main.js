import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store'; // Importer le store

const app = createApp(App);

// Méthode globale pour afficher les erreurs
app.config.globalProperties.$showError = (message) => {
    alert(message); // Vous pouvez remplacer ceci par une bibliothèque de notifications si vous préférez
};

app.use(router);
app.use(store); // Utiliser le store

app.mount('#app');
