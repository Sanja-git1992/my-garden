import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PlantsView from '../views/PlantsView.vue'
import PlantDetailsView from '../views/PlantDetailsView.vue'
import EncyclopediaView from '../views/EncyclopediaView.vue'
import JournalView from '../views/JournalView.vue'
import RecipesView from '../views/RecipesView.vue'
import RecipeDetailsView from '../views/RecipeDetailsView.vue'
import RegisterView from '../views/RegisterView.vue'
import LoginView from '../views/LoginView.vue'
import { useAuthStore } from '../stores/authStore.js'

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
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/plants/:id',
      name: 'plant-details',
      component: PlantDetailsView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/encyclopedia',
      name: 'encyclopedia',
      component: EncyclopediaView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/journal',
      name: 'journal',
      component: JournalView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/recipes',
      name: 'recipes',
      component: RecipesView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/recipes/:id',
      name: 'recipe-details',
      component: RecipeDetailsView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
  ],
})

router.beforeEach(async (to) => {
  const authStore = useAuthStore()

  await authStore.waitForAuthReady()

  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    return {
      name: 'login',
    }
  }

  if (
    (to.name === 'login' || to.name === 'register') &&
    authStore.isLoggedIn
  ) {
    return {
      name: 'home',
    }
  }
})

export default router
