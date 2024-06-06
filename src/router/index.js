import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from "@/views/AboutView.vue";
import ListLotsView from '../views/Lots/ListLotsView.vue';
import EnchereView from '../views/EnchereView.vue';
import ManageLotView from '../views/Lots/ManageLotView.vue';
import DashboardView from '../views/DashboardView.vue'; // Import de la nouvelle vue

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/lots',
    name: 'lots',
    component: ListLotsView
  },
  {
    path: '/enchere/:encodedId',
    name: 'enchere',
    component: EnchereView,
    props: true
  },
  {
    path: '/manage-lots',
    name: 'manage-lots',
    component: ManageLotView
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView,
    meta: { requiresAuth: true } // Protection d'accès
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

// Navigation guard pour protéger les routes nécessitant une authentification
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const currentUser = JSON.parse(localStorage.getItem('selectedUser')); // Obtention de l'utilisateur depuis le localStorage
  if (requiresAuth && !currentUser) {
    next('/');
  } else {
    next();
  }
});

export default router;
