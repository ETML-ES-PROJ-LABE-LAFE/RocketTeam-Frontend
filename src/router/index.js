import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ListLotsView from '../views/Lots/ListLotsView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/lots',
    name: 'lots',
    component: ListLotsView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
