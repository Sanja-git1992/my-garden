import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PlantsView from '../views/PlantsView.vue'
import PlantDetailsView from '../views/PlantDetailsView.vue'
import EncyclopediaView from '../views/EncyclopediaView.vue'
import JournalView from '../views/JournalView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/plants',
      name: 'plants',
      component: PlantsView,
    },
    {
      path: '/plants/:id',
      name: 'plant-details',
      component: PlantDetailsView,
    },
    {
      path: '/encyclopedia',
      name: 'encyclopedia',
      component: EncyclopediaView,
    },
    {
      path: '/journal',
      name: 'journal',
      component: JournalView,
    },
  ],
})

export default router
