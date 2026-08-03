<script setup>
import { computed, ref } from 'vue'
import { useRecipeStore } from '@/stores/recipeStore.js'

const recipeStore = useRecipeStore()

const searchQuery = ref('')
const selectedCategory = ref('All')

const isModalOpen = ref(false)
const editingRecipeId = ref(null)
const errorMessage = ref('')

const categories = [
  'All',
  'Salad',
  'Soup',
  'Sauce',
  'Dessert',
  'Main dish',
  'Other',
]

const recipeCategories = [
  'Salad',
  'Soup',
  'Sauce',
  'Dessert',
  'Main dish',
  'Other',
]

const newRecipe = ref({
  title: '',
  category: '',
  icon: '',
  ingredientsText: '',
  instructions: '',
})

const filteredRecipes = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()

  return recipeStore.recipes.filter((recipe) => {
    const matchesSearch =
      recipe.title.toLowerCase().includes(query) ||
      recipe.category.toLowerCase().includes(query) ||
      recipe.ingredients.some((ingredient) =>
        ingredient.toLowerCase().includes(query),
      )

    const matchesCategory =
      selectedCategory.value === 'All' ||
      recipe.category === selectedCategory.value

    return matchesSearch && matchesCategory
  })
})

function openModal() {
  isModalOpen.value = true
  editingRecipeId.value = null
  errorMessage.value = ''

  newRecipe.value = {
    title: '',
    category: '',
    icon: '',
    ingredientsText: '',
    instructions: '',
  }
}

function closeModal() {
  isModalOpen.value = false
  editingRecipeId.value = null
  errorMessage.value = ''

  newRecipe.value = {
    title: '',
    category: '',
    icon: '',
    ingredientsText: '',
    instructions: '',
  }
}

function saveRecipe() {
  if (
    !newRecipe.value.title.trim() ||
    !newRecipe.value.category ||
    !newRecipe.value.ingredientsText.trim() ||
    !newRecipe.value.instructions.trim()
  ) {
    errorMessage.value =
      'Please complete all required recipe fields.'
    return
  }

  const ingredients = newRecipe.value.ingredientsText
    .split('\n')
    .map((ingredient) => ingredient.trim())
    .filter((ingredient) => ingredient !== '')

  const recipeData = {
    title: newRecipe.value.title.trim(),
    category: newRecipe.value.category,
    icon: newRecipe.value.icon.trim() || '🥗',
    ingredients,
    instructions: newRecipe.value.instructions.trim(),
  }

  if (editingRecipeId.value) {
    recipeStore.updateRecipe(
      editingRecipeId.value,
      recipeData,
    )
  } else {
    recipeStore.addRecipe(recipeData)
  }

  closeModal()
}

function editRecipe(recipe) {
  editingRecipeId.value = recipe.id

  newRecipe.value = {
    title: recipe.title,
    category: recipe.category,
    icon: recipe.icon,
    ingredientsText: recipe.ingredients.join('\n'),
    instructions: recipe.instructions,
  }

  isModalOpen.value = true
  errorMessage.value = ''
}

function deleteRecipe(recipeId) {
  const shouldDelete = window.confirm(
    'Are you sure you want to delete this recipe?',
  )

  if (shouldDelete) {
    recipeStore.deleteRecipe(recipeId)
  }
}

</script>

<template>
    <main class="recipes-page">
  <section class="recipes-header">
    <p class="eyebrow">From garden to table</p>

    <h1>Harvest Recipes</h1>

    <p class="intro">
      Discover simple recipes inspired by fresh garden ingredients.
    </p>

    <div class="recipes-toolbar">
      <label class="search">
        <span>⌕</span>

        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search recipes"
        />
      </label>

      <button
        type="button"
        class="add-button"
        @click="openModal"
      >
        <span>+</span>
        Add recipe
      </button>
    </div>

    <div class="category-filters">
      <button
        v-for="category in categories"
        :key="category"
        type="button"
        class="category-button"
        :class="{ active: selectedCategory === category }"
        @click="selectedCategory = category"
      >
        {{ category }}
      </button>
    </div>
  </section>

    <section class="recipes-grid">
      <article
        v-for="recipe in filteredRecipes"
        :key="recipe.id"
        class="recipe-card"
      >
        <div class="recipe-icon">
          {{ recipe.icon }}
        </div>
        <div class="recipe-content">
            <span class="recipe-category">
                {{ recipe.category }}
            </span>

            <h2>{{ recipe.title }}</h2>

        <div class="recipe-actions">
            <button
                type="button"
                class="edit-button"
                @click="editRecipe(recipe)"
            >
              Edit
            </button>

            <button
            type="button"
            class="delete-button"
            @click="deleteRecipe(recipe.id)"
            >
            Delete
            </button>
        </div>

            <RouterLink
                :to="{
                name: 'recipe-details',
                params: { id: recipe.id },
                }"
                class="details-link"
            >
                View recipe
                <span>→</span>
            </RouterLink>
        </div>
        
      </article>
    </section>

    <p
      v-if="filteredRecipes.length === 0"
      class="empty-message"
    >
      No recipes match your search.
    </p>

    <div
  v-if="isModalOpen"
    class="modal-overlay"
    @click.self="closeModal"
    >
    <section class="recipe-modal">
    <div class="modal-header">
      <div>
        <p class="eyebrow">Recipe form</p>

        <h2>
          {{ editingRecipeId ? 'Edit Recipe' : 'Add New Recipe' }}
        </h2>
      </div>

      <button
        type="button"
        class="close-button"
        aria-label="Close recipe form"
        @click="closeModal"
      >
        ×
      </button>
    </div>

    <form
  class="recipe-form"
  @submit.prevent="saveRecipe"
>
  <div class="form-row">
    <div class="form-group">
      <label for="recipe-title">Title *</label>

      <input
        id="recipe-title"
        v-model="newRecipe.title"
        type="text"
        placeholder="For example, Tomato Soup"
      />
    </div>

    <div class="form-group">
      <label for="recipe-category">Category *</label>

      <select
        id="recipe-category"
        v-model="newRecipe.category"
      >
        <option value="" disabled>
          Select category
        </option>

        <option
          v-for="category in recipeCategories"
          :key="category"
          :value="category"
        >
          {{ category }}
        </option>
      </select>
    </div>
  </div>

  <div class="form-group">
    <label for="recipe-icon">Icon</label>

    <input
      id="recipe-icon"
      v-model="newRecipe.icon"
      type="text"
      placeholder="For example, 🍅"
    />
  </div>

  <div class="form-group">
    <label for="recipe-ingredients">Ingredients *</label>

    <textarea
      id="recipe-ingredients"
      v-model="newRecipe.ingredientsText"
      rows="6"
      placeholder="Write one ingredient per line..."
    ></textarea>
  </div>

  <div class="form-group">
        <label for="recipe-instructions">
            Preparation *
        </label>

    <textarea
      id="recipe-instructions"
      v-model="newRecipe.instructions"
      rows="5"
      placeholder="Describe how to prepare this recipe..."
    ></textarea>
  </div>

  <p
    v-if="errorMessage"
    class="form-error"
  >
    {{ errorMessage }}
  </p>

  <div class="form-actions">
    <button
      type="button"
      class="cancel-button"
      @click="closeModal"
    >
      Cancel
    </button>

    <button
      type="submit"
      class="save-button"
    >
      {{ editingRecipeId ? 'Update recipe' : 'Save recipe' }}
    </button>
  </div>
</form>

  </section>
</div>

  </main>
</template>

<style scoped>
.recipes-page {
  min-height: 100vh;
  padding: 60px 7%;
  background: var(--background);
}

.recipes-header {
  max-width: 1200px;
  margin: 0 auto 42px;
}

.eyebrow {
  margin-bottom: 10px;
  color: var(--terracotta);
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

h1 {
  margin: 0;
  color: var(--olive);
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(3rem, 6vw, 5rem);
  font-weight: 600;
}

.intro {
  max-width: 600px;
  margin: 14px 0 24px;
  color: #6f756d;
  line-height: 1.7;
}

.search {
  display: flex;
  align-items: center;
  gap: 10px;
  width: min(360px, 100%);
  padding: 12px 16px;
  border: 1px solid rgb(82 99 79 / 15%);
  border-radius: 999px;
  background: var(--surface);
}

.search input {
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  color: var(--olive);
  font-family: inherit;
}

.category-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
}

.category-button {
  padding: 9px 15px;
  border: 1px solid rgb(82 99 79 / 15%);
  border-radius: 999px;
  background: var(--surface);
  color: var(--olive);
  font-family: inherit;
  font-size: 0.85rem;
  font-weight: 700;
  cursor: pointer;
}

.category-button:hover {
  background: #edf2e8;
}

.category-button.active {
  border-color: var(--olive);
  background: var(--olive);
  color: white;
}

.recipes-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 22px;
  max-width: 1200px;
  margin: 0 auto;
}

.recipe-card {
  display: flex;
  gap: 22px;
  padding: 26px;
  border: 1px solid rgb(82 99 79 / 10%);
  border-radius: 26px;
  background: var(--surface);
  box-shadow: 0 12px 30px rgb(82 99 79 / 7%);
}

.recipe-icon {
  display: grid;
  width: 86px;
  height: 86px;
  flex-shrink: 0;
  place-items: center;
  border-radius: 22px;
  background: #edf2e8;
  font-size: 3rem;
}

.recipe-content {
  display: flex;
  flex: 1;
  flex-direction: column;
}

.recipe-category {
  align-self: flex-start;
  padding: 6px 11px;
  border-radius: 999px;
  background: #f4e7dc;
  color: var(--terracotta);
  font-size: 0.76rem;
  font-weight: 700;
}

.recipe-card h2 {
  margin: 14px 0 8px;
  color: var(--olive);
  font-family: 'Cormorant Garamond', serif;
  font-size: 2rem;
  font-weight: 600;
}

.recipe-description {
  margin: 0;
  color: #6f756d;
  line-height: 1.6;
}

.details-link {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: auto;
  padding: 20px 0 0;
  border: none;
  background: transparent;
  color: var(--terracotta);
  font-family: inherit;
  font-size: 0.88rem;
  font-weight: 800;
  text-decoration: none;
  cursor: pointer;
}

.details-link:hover {
  text-decoration: underline;
}

.empty-message {
  margin-top: 40px;
  color: #8a8f87;
  text-align: center;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: grid;
  place-items: center;
  padding: 24px;
  background: rgb(35 43 34 / 55%);
  backdrop-filter: blur(5px);
}

.recipe-modal {
  width: min(700px, 100%);
  max-height: 90vh;
  overflow-y: auto;
  padding: 34px;
  border-radius: 28px;
  background: var(--surface);
  box-shadow: 0 30px 80px rgb(25 35 25 / 30%);
}

.modal-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 26px;
}

.modal-header h2 {
  margin: 0;
  color: var(--olive);
  font-family: 'Cormorant Garamond', serif;
  font-size: 2.5rem;
  font-weight: 600;
}

.close-button {
  display: grid;
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  place-items: center;
  border: none;
  border-radius: 50%;
  background: #f1ede5;
  color: var(--olive);
  font-size: 1.5rem;
  cursor: pointer;
}

.modal-placeholder {
  margin: 0;
  padding: 20px;
  border-radius: 16px;
  background: #f5f2eb;
  color: #6f756d;
}

.recipe-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  color: var(--olive);
  font-size: 0.84rem;
  font-weight: 800;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 13px 15px;
  border: 1px solid rgb(82 99 79 / 18%);
  border-radius: 15px;
  outline: none;
  background: #fffefa;
  color: var(--olive);
  font-family: inherit;
  font-size: 0.94rem;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  border-color: var(--sage);
  box-shadow: 0 0 0 3px rgb(140 165 140 / 15%);
}

.form-group textarea {
  resize: vertical;
}

.form-error {
  margin: 0;
  padding: 11px 14px;
  border-radius: 12px;
  background: #f7e5df;
  color: #9c5847;
  font-size: 0.85rem;
  font-weight: 700;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.cancel-button,
.save-button {
  padding: 13px 21px;
  border-radius: 999px;
  font-family: inherit;
  font-weight: 800;
  cursor: pointer;
}

.cancel-button {
  border: 1px solid rgb(82 99 79 / 18%);
  background: transparent;
  color: var(--olive);
}

.save-button {
  border: none;
  background: var(--olive);
  color: white;
}

@media (max-width: 850px) {
  .recipes-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 550px) {
  .recipes-page {
    padding: 42px 20px;
  }

  .recipes-toolbar {
    flex-direction: column;
    align-items: stretch;
  }

  .search,
  .add-button {
    width: 100%;
  }

  .add-button {
    justify-content: center;
  }

  .recipe-card {
    align-items: flex-start;
    flex-direction: column;
  }

  .form-row {
  grid-template-columns: 1fr;
}

.form-actions {
  flex-direction: column-reverse;
}

.cancel-button,
.save-button {
  width: 100%;
}
}

.recipes-toolbar {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  margin: 28px 0 20px;
}

.add-button {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 22px;
  border: none;
  border-radius: 999px;
  background: var(--olive);
  color: white;
  font-family: inherit;
  font-weight: 700;
  cursor: pointer;
}

.add-button:hover {
  opacity: 0.9;
}

.recipe-actions {
  display: flex;
  gap: 8px;
  margin-top: 14px;
}

.edit-button,
.delete-button {
  padding: 7px 12px;
  border: none;
  border-radius: 999px;
  font-family: inherit;
  font-size: 0.76rem;
  font-weight: 700;
  cursor: pointer;
}

.edit-button {
  background: #edf2e8;
  color: var(--olive);
}

.delete-button {
  background: #f7e5df;
  color: #9c5847;
}

.edit-button:hover,
.delete-button:hover {
  opacity: 0.85;
}

</style>