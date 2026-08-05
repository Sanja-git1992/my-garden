<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useRecipeStore } from '@/stores/recipeStore.js'

const route = useRoute()
const recipeStore = useRecipeStore()

onMounted(() => {
  recipeStore.loadRecipes()
})

const recipe = computed(() =>
  recipeStore.recipes.find(
    (recipe) => String(recipe.id) === String(route.params.id),
  ),
)
</script>

<template>
  <main class="recipe-details-page">
    <RouterLink
      to="/recipes"
      class="back-link"
    >
      ← Back to recipes
    </RouterLink>

    <section
      v-if="recipe"
      class="recipe-details-card"
    >
      <div class="recipe-details-header">
        <div class="recipe-icon">
          {{ recipe.icon }}
        </div>

        <div>
          <p class="eyebrow">Harvest recipe</p>

          <h1>{{ recipe.title }}</h1>

          <span class="recipe-category">
            {{ recipe.category }}
          </span>
        </div>
      </div>

      <section class="recipe-section">
        <h2>Ingredients</h2>

        <ul class="ingredients-list">
          <li
            v-for="ingredient in recipe.ingredients"
            :key="ingredient"
          >
            {{ ingredient }}
          </li>
        </ul>
      </section>

      <section class="recipe-section">
        <h2>Preparation</h2>

        <p class="preparation-text">
          {{ recipe.instructions }}
        </p>
      </section>
    </section>

    <section
      v-else
      class="recipe-details-card"
    >
      <h2>Recipe not found.</h2>

      <RouterLink to="/recipes">
        Return to recipes
      </RouterLink>
    </section>
  </main>
</template>

<style scoped>
.recipe-details-page {
  max-width: 900px;
  min-height: calc(100vh - 84px);
  margin: 0 auto;
  padding: 55px 24px;
}

.back-link {
  display: inline-block;
  margin-bottom: 24px;
  color: var(--olive);
  font-size: 0.9rem;
  font-weight: 700;
  text-decoration: none;
}

.back-link:hover {
  text-decoration: underline;
}

.recipe-details-card {
  padding: 38px;
  border: 1px solid rgb(82 99 79 / 10%);
  border-radius: 28px;
  background: var(--surface);
  box-shadow: 0 15px 40px rgb(82 99 79 / 8%);
}

.recipe-details-header {
  display: flex;
  align-items: center;
  gap: 22px;
  margin-bottom: 34px;
}

.recipe-icon {
  display: grid;
  width: 90px;
  height: 90px;
  flex-shrink: 0;
  place-items: center;
  border-radius: 24px;
  background: #edf2e8;
  font-size: 3.2rem;
}

.eyebrow {
  margin: 0 0 6px;
  color: var(--terracotta);
  font-size: 0.74rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

h1 {
  margin: 0 0 12px;
  color: var(--olive);
  font-family: 'Cormorant Garamond', serif;
  font-size: 3.2rem;
  font-weight: 600;
  line-height: 1;
}

.recipe-category {
  display: inline-block;
  padding: 6px 11px;
  border-radius: 999px;
  background: #f4e7dc;
  color: var(--terracotta);
  font-size: 0.78rem;
  font-weight: 700;
}

.recipe-section {
  margin-top: 30px;
  padding-top: 24px;
  border-top: 1px solid rgb(82 99 79 / 10%);
}

.recipe-section h2 {
  margin: 0 0 16px;
  color: var(--olive);
  font-family: 'Cormorant Garamond', serif;
  font-size: 2rem;
  font-weight: 600;
}

.ingredients-list {
  margin: 0;
  padding-left: 22px;
  color: #6f756d;
  line-height: 1.8;
}

.preparation-text {
  margin: 0;
  padding: 18px;
  border-radius: 15px;
  background: #f5f2eb;
  color: #6f756d;
  line-height: 1.7;
}

@media (max-width: 600px) {
  .recipe-details-card {
    padding: 26px 20px;
  }

  .recipe-details-header {
    align-items: flex-start;
  }

  .recipe-icon {
    width: 70px;
    height: 70px;
    font-size: 2.5rem;
  }

  h1 {
    font-size: 2.5rem;
  }
}
</style>