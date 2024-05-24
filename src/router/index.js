import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from "@/views/AboutView.vue";
import ListLotsView from '../views/Lots/ListLotsView.vue';
import EnchereView from '../views/EnchereView.vue'; // Import du composant renommé
import ManageLotView from '../views/Lots/ManageLotView.vue'; // Import de la nouvelle vue de gestion des lots

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView  // Assurez-vous que cette ligne est correcte
  },
  {
    path: '/lots',
    name: 'lots',
    component: ListLotsView
  },
  {
    path: '/enchere/:id',
    name: 'enchere',
    component: EnchereView, // Mise à jour du nom du composant
    props: true
  },
  {
    path: '/manage-lots',
    name: 'manage-lots',
    component: ManageLotView // Nouvelle route pour la gestion des lots
  }

];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
