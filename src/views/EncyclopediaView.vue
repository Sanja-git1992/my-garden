<script setup>
import { computed, ref } from 'vue'
import { usePlantStore } from '@/stores/plantStore.js'

const plantStore = usePlantStore()
const searchQuery = ref('')
const selectedCategory = ref('All')

const categories = [
  'All',
  'Vegetable',
  'Fruit',
  'Herb',
  'Flower',
  'Other',
]

const filteredPlantTypes = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()

  return plantStore.plantTypes.filter((plant) => {
    const matchesSearch = plant.name
      .toLowerCase()
      .includes(query)

    const matchesCategory =
      selectedCategory.value === 'All' ||
      plant.category === selectedCategory.value

    return matchesSearch && matchesCategory
  })
})
</script>

<template>
  <main class="encyclopedia-page">
    <section class="encyclopedia-header">
      <p class="eyebrow">Garden knowledge</p>
      <h1>Plant Encyclopedia</h1>

      <p class="intro">
        Explore plants and discover their basic categories.
      </p>

      <label class="search">
        <span>⌕</span>

        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search encyclopedia"
        />
      </label>

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

    <section class="plants-grid">
      <article
        v-for="plant in filteredPlantTypes"
        :key="plant.name"
        class="plant-card"
      >
        <div class="plant-icon">
          {{ plant.icon }}
        </div>

        <h2>{{ plant.name }}</h2>

        <span class="plant-category">
            {{ plant.category }}
        </span>

        <p class="plant-description">
            {{ plant.description }}
        </p>
      </article>
    </section>

    <p
      v-if="filteredPlantTypes.length === 0"
      class="empty-message"
    >
      No plants found.
    </p>
  </main>
</template>

<style scoped>
.encyclopedia-page {
  min-height: 100vh;
  padding: 60px 7%;
  background: var(--background);
}

.encyclopedia-header {
  max-width: 1200px;
  margin: 0 auto 40px;
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
  margin: 14px 0 24px;
  color: #6f756d;
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

.plants-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.plant-card {
  padding: 26px;
  border: 1px solid rgb(82 99 79 / 10%);
  border-radius: 24px;
  background: var(--surface);
  text-align: center;
  box-shadow: 0 12px 30px rgb(82 99 79 / 7%);
  height: 100%;
}

.plant-icon {
  margin-bottom: 14px;
  font-size: 3.2rem;
}

.plant-card h2 {
  margin: 0 0 10px;
  color: var(--olive);
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.8rem;
}

.plant-category {
  display: inline-block;
  padding: 6px 11px;
  border-radius: 999px;
  background: #edf2e8;
  color: var(--olive);
  font-size: 0.78rem;
  font-weight: 700;
}

.empty-message {
  margin-top: 35px;
  color: #8a8f87;
  text-align: center;
}

@media (max-width: 900px) {
  .plants-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 550px) {
  .encyclopedia-page {
    padding: 42px 20px;
  }

  .plants-grid {
    grid-template-columns: 1fr;
  }
}

.plant-description {
  margin: 16px 0 0;
  color: #747a72;
  font-size: 0.88rem;
  line-height: 1.55;
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

</style>