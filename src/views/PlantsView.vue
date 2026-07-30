<script setup>
import { computed, ref } from 'vue'

const isModalOpen = ref(false)
const errorMessage = ref('')
const searchQuery = ref('')
const showPlantSuggestions = ref(false)
const editingPlantId = ref(null)

const plants = ref([
  {
    id: 1,
    name: 'Tomato',
    variety: 'Cherry Tomato',
    status: 'Growing',
    plantedDate: '2026-05-15',
    icon: '🍅',
  },
  {
    id: 2,
    name: 'Basil',
    variety: 'Sweet Basil',
    status: 'Ready to harvest',
    plantedDate: '2026-05-20',
    icon: '🌿',
  },
  {
    id: 3,
    name: 'Strawberry',
    variety: 'Garden Strawberry',
    status: 'Flowering',
    plantedDate: '2026-04-08',
    icon: '🍓',
  },
])

const newPlant = ref({
  name: '',
  category: '',
  variety: '',
  plantingDate: '',
  location: '',
  notes: '',
})

const plantTypes = [
  { name: 'Tomato', category: 'Vegetable', icon: '🍅' },
  { name: 'Cucumber', category: 'Vegetable', icon: '🥒' },
  { name: 'Zucchini', category: 'Vegetable', icon: '🥒' },
  { name: 'Carrot', category: 'Vegetable', icon: '🥕' },
  { name: 'Potato', category: 'Vegetable', icon: '🥔' },
  { name: 'Pepper', category: 'Vegetable', icon: '🌶️' },
  { name: 'Lettuce', category: 'Vegetable', icon: '🥬' },
  { name: 'Onion', category: 'Vegetable', icon: '🧅' },
  { name: 'Garlic', category: 'Vegetable', icon: '🧄' },
  { name: 'Pumpkin', category: 'Vegetable', icon: '🎃' },
  { name: 'Strawberry', category: 'Fruit', icon: '🍓' },
  { name: 'Blueberry', category: 'Fruit', icon: '🫐' },
  { name: 'Apple', category: 'Fruit', icon: '🍎' },
  { name: 'Pear', category: 'Fruit', icon: '🍐' },
  { name: 'Basil', category: 'Herb', icon: '🌿' },
  { name: 'Parsley', category: 'Herb', icon: '🌿' },
  { name: 'Rose', category: 'Flower', icon: '🌹' },
  { name: 'Sunflower', category: 'Flower', icon: '🌻' },
  { name: 'Other', category: 'Other', icon: '🌱' },
]

const filteredPlantTypes = computed(() => {
  const query = newPlant.value.name.trim().toLowerCase()

  if (!query) {
    return []
  }

  return plantTypes.filter((plant) =>
    plant.name.toLowerCase().startsWith(query),
  )
})

function selectPlant(plant) {
  newPlant.value.name = plant.name
  newPlant.value.category = plant.category
  showPlantSuggestions.value = false
  errorMessage.value = ''
}

function handlePlantInput() {
  newPlant.value.category = ''
  showPlantSuggestions.value =
    newPlant.value.name.trim().length >= 1
}


const filteredPlants = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()

  if (!query) {
    return plants.value
  }

  return plants.value.filter((plant) => {
    return (
      plant.name.toLowerCase().includes(query) ||
      plant.variety.toLowerCase().includes(query) ||
      plant.status.toLowerCase().includes(query)
    )
  })
})

function openModal() {
  isModalOpen.value = true
  errorMessage.value = ''
}

function closeModal() {
  isModalOpen.value = false
  errorMessage.value = ''
  showPlantSuggestions.value = false
  editingPlantId.value = null

  newPlant.value = {
    name: '',
    category: '',
    variety: '',
    plantingDate: '',
    location: '',
    notes: '',
  }
}

function savePlant() {
  const selectedPlant = plantTypes.find(
    (plant) =>
      plant.name.toLowerCase() ===
      newPlant.value.name.trim().toLowerCase(),
  )

  if (!selectedPlant || !newPlant.value.plantingDate) {
    errorMessage.value =
      'Please select a plant from the list and enter the planting date.'
    return
  }

  if (editingPlantId.value) {
    const plantToEdit = plants.value.find(
      (plant) => plant.id === editingPlantId.value,
    )

    if (plantToEdit) {
      plantToEdit.name = selectedPlant.name
      plantToEdit.category = selectedPlant.category
      plantToEdit.variety =
        newPlant.value.variety || selectedPlant.category
      plantToEdit.plantedDate = newPlant.value.plantingDate
      plantToEdit.location = newPlant.value.location
      plantToEdit.notes = newPlant.value.notes
      plantToEdit.icon = selectedPlant.icon
    }
  } else {
    plants.value.push({
      id: Date.now(),
      name: selectedPlant.name,
      category: selectedPlant.category,
      variety: newPlant.value.variety || selectedPlant.category,
      status: 'Growing',
      plantedDate: newPlant.value.plantingDate,
      location: newPlant.value.location,
      notes: newPlant.value.notes,
      icon: selectedPlant.icon,
    })
  }

  closeModal()
}

function deletePlant(plantId) {
  plants.value = plants.value.filter(
    (plant) => plant.id !== plantId,
  )
}

function editPlant(plant) {
  editingPlantId.value = plant.id

  newPlant.value = {
    name: plant.name,
    category: plant.category || '',
    variety: plant.variety,
    plantingDate: plant.plantedDate,
    location: plant.location || '',
    notes: plant.notes || '',
  }

  isModalOpen.value = true
  errorMessage.value = ''
}

</script>

<template>
  <main class="plants-page">
    <section class="plants-header">
      <div>
        <p class="eyebrow">My garden collection</p>
        <h1>My Plants</h1>
        <p class="intro">
          Keep track of the plants in your garden and follow their growth.
        </p>
      </div>

      <button class="add-button" @click="openModal">
        <span>+</span>
        Add plant
      </button>
    </section>

    <section class="plants-summary">
      <article class="summary-card">
        <span class="summary-number">{{ plants.length }}</span>
        <span class="summary-label">Plants</span>
      </article>

      <article class="summary-card">
        <span class="summary-number">2</span>
        <span class="summary-label">Growing</span>
      </article>

      <article class="summary-card">
        <span class="summary-number">1</span>
        <span class="summary-label">Ready to harvest</span>
      </article>
    </section>

    <section class="plants-section">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Garden overview</p>
          <h2>Your plants</h2>
        </div>

        <label class="search">
          <span>⌕</span>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search plants"
          />
        </label>
      </div>

      <div class="plants-grid">
        <article
          v-for="plant in filteredPlants"
          :key="plant.id"
          class="plant-card"
        >
          <div class="plant-icon">
            {{ plant.icon }}
          </div>

          <div class="plant-card-content">
            <div class="plant-card-top">
              <div>
                <h3>{{ plant.name }}</h3>
                <p>{{ plant.variety }}</p>
              </div>

              <button
                type="button"
                class="delete-button"
                @click="deletePlant(plant.id)"
              >
                Delete
              </button>

              <button
                type="button"
                class="edit-button"
                @click="editPlant(plant)"
              >
                Edit
                
              </button>

            </div>

            <span class="status">
              {{ plant.status }}
            </span>

            <div class="plant-date">
              <span>Planted</span>
              <strong>{{ plant.plantedDate }}</strong>
            </div>

            <div class="plant-location">
              <span>Location</span>
              <strong>{{ plant.location || 'Not specified' }}</strong>
            </div>

            <p
              v-if="plant.notes"
              class="plant-notes"
            >
              {{ plant.notes }}
            </p>

            <button class="details-button">
              View details
              <span>→</span>
            </button>
          </div>
        </article>
      </div>
      <p v-if="filteredPlants.length === 0" class="empty-message">
       No plants match your search.
      </p>
    </section>
    <div
  v-if="isModalOpen"
  class="modal-overlay"
  @click.self="closeModal"
>
  <section class="plant-modal">
    <div class="modal-header">
      <div>
        <p class="eyebrow">New garden entry</p>
        <h2>
        {{ editingPlantId ? 'Edit Plant' : 'Add New Plant' }}
        </h2>
      </div>

      <button
        class="close-button"
        aria-label="Close form"
        @click="closeModal"
      >
        ×
      </button>
    </div>

    <form class="plant-form" @submit.prevent="savePlant">
      <div class="form-group plant-autocomplete">
        <label for="plant-name">Plant *</label>

        <input
         id="plant-name"
        v-model="newPlant.name"
        type="text"
        placeholder="Start typing a plant name..."
        autocomplete="off"
        @input="handlePlantInput"
        @focus="showPlantSuggestions = true"
        />

      <div
        v-if="showPlantSuggestions"
        class="plant-suggestions"
      >
      <button
     v-for="plant in filteredPlantTypes"
     :key="plant.name"
     type="button"
     class="plant-suggestion"
     @click="selectPlant(plant)"
      >
  <span class="plant-icon">{{ plant.icon }}</span>

  <span class="plant-name">{{ plant.name }}</span>
</button>

    <p
      v-if="filteredPlantTypes.length === 0"
      class="no-suggestions"
    >
      No matching plants found.
    </p>
  </div>
</div>

      <div class="form-row">
        <div class="form-group">
            <label for="plant-category">Category</label>

            <input
            id="plant-category"
            v-model="newPlant.category"
            type="text"
            placeholder="Selected automatically"
            readonly
            />
        </div>

        <div class="form-group">
          <label for="plant-variety">Variety</label>
          <input
            id="plant-variety"
            v-model="newPlant.variety"
            type="text"
            placeholder="For example, Cherry"
          />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="plant-date">Planting date *</label>
          <input
            id="plant-date"
            v-model="newPlant.plantingDate"
            type="date"
          />
        </div>

        <div class="form-group">
          <label for="plant-location">Location</label>
          <select
            id="plant-location"
            v-model="newPlant.location"
          >
            <option value="">Select location</option>
            <option value="Raised bed 1">Raised bed 1</option>
            <option value="Raised bed 2">Raised bed 2</option>
            <option value="Greenhouse">Greenhouse</option>
            <option value="Flower bed">Flower bed</option>
            <option value="Pot">Pot</option>
          </select>
        </div>
      </div>

      <div class="form-group">
        <label for="plant-notes">Notes</label>
        <textarea
          id="plant-notes"
          v-model="newPlant.notes"
          rows="4"
          placeholder="Add useful information about this plant..."
        ></textarea>
      </div>

      <p v-if="errorMessage" class="form-error">
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

        <button type="submit" class="save-button">
          {{ editingPlantId ? 'Update plant' : 'Save plant' }}
        </button>
      </div>
    </form>
  </section>
</div>
  </main>
</template>

<style scoped>
.plants-page {
  min-height: 100vh;
  padding: 64px 7%;
  background: var(--background);
}

.plants-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 32px;
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

.plants-header h1,
.section-heading h2 {
  color: var(--olive);
  font-family: 'Cormorant Garamond', serif;
}

.plants-header h1 {
  margin: 0;
  font-size: clamp(3rem, 6vw, 5.4rem);
  font-weight: 600;
  line-height: 0.95;
}

.intro {
  max-width: 580px;
  margin-top: 18px;
  color: #6f756d;
  font-size: 1rem;
  line-height: 1.7;
}

.add-button {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  padding: 14px 22px;
  border: none;
  border-radius: 999px;
  background: var(--olive);
  color: white;
  font-family: inherit;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.add-button span {
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 1;
}

.add-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 24px rgb(82 99 79 / 20%);
}

.plants-summary {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
  max-width: 1200px;
  margin: 0 auto 56px;
}

.summary-card {
  display: flex;
  flex-direction: column;
  min-height: 140px;
  padding: 28px;
  border: 1px solid rgb(82 99 79 / 8%);
  border-radius: 28px;
  background: var(--surface);
  box-shadow: 0 12px 35px rgb(82 99 79 / 6%);
}

.summary-card:nth-child(2) {
  background: #eef2e8;
}

.summary-card:nth-child(3) {
  background: #f4e7dc;
}

.summary-number {
  color: var(--olive);
  font-family: 'Cormorant Garamond', serif;
  font-size: 3rem;
  font-weight: 600;
  line-height: 1;
}

.summary-label {
  margin-top: auto;
  color: #6f756d;
  font-size: 0.9rem;
  font-weight: 700;
}

.plants-section {
  max-width: 1200px;
  margin: 0 auto;
}

.section-heading {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 24px;
}

.section-heading h2 {
  margin: 0;
  font-size: 2.8rem;
  font-weight: 600;
}

.search {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 240px;
  padding: 12px 16px;
  border: 1px solid rgb(82 99 79 / 12%);
  border-radius: 999px;
  background: var(--surface);
}

.search span {
  color: var(--sage);
  font-size: 1.2rem;
}

.search input {
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  color: var(--olive);
  font-family: inherit;
}

.search input::placeholder {
  color: #a0a59d;
}

.plants-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
}

.plant-card {
  overflow: hidden;
  border: 1px solid rgb(82 99 79 / 8%);
  border-radius: 30px;
  background: var(--surface);
  box-shadow: 0 15px 45px rgb(82 99 79 / 7%);
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;
}

.plant-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 50px rgb(82 99 79 / 12%);
}

.plant-icon {
  display: grid;
  min-height: 185px;
  place-items: center;
  background: linear-gradient(145deg, #edf1e7, #f7eee5);
  font-size: 4.4rem;
}

.plant-card-content {
  padding: 24px;
}

.plant-card-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.plant-card h3 {
  margin: 0;
  color: var(--olive);
  font-family: 'Cormorant Garamond', serif;
  font-size: 2rem;
  font-weight: 600;
}

.plant-card-top p {
  margin-top: 4px;
  color: #8a8f87;
  font-size: 0.88rem;
}

.menu-button {
  border: none;
  background: transparent;
  color: var(--sage);
  font-size: 1.2rem;
  cursor: pointer;
}

.status {
  display: inline-block;
  margin-top: 20px;
  padding: 7px 12px;
  border-radius: 999px;
  background: #edf2e8;
  color: var(--olive);
  font-size: 0.76rem;
  font-weight: 800;
}

.plant-date {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-top: 24px;
  padding-top: 18px;
  border-top: 1px solid rgb(82 99 79 / 10%);
  font-size: 0.84rem;
}

.plant-date span {
  color: #999e96;
}

.plant-date strong {
  color: var(--olive);
  font-weight: 700;
}

.details-button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 22px;
  padding: 0;
  border: none;
  background: transparent;
  color: var(--terracotta);
  font-family: inherit;
  font-size: 0.88rem;
  font-weight: 800;
  cursor: pointer;
}

@media (max-width: 900px) {
  .plants-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 700px) {
  .plants-page {
    padding: 42px 20px;
  }

  .plants-header,
  .section-heading {
    align-items: flex-start;
    flex-direction: column;
  }

  .plants-summary,
  .plants-grid {
    grid-template-columns: 1fr;
  }

  .add-button,
  .search {
    width: 100%;
  }

  .add-button {
    justify-content: center;
  }
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

.plant-modal {
  width: min(680px, 100%);
  max-height: 90vh;
  overflow-y: auto;
  padding: 34px;
  border-radius: 32px;
  background: var(--surface);
  box-shadow: 0 30px 80px rgb(25 35 25 / 30%);
}

.modal-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 28px;
}

.modal-header h2 {
  margin: 0;
  color: var(--olive);
  font-family: 'Cormorant Garamond', serif;
  font-size: 2.8rem;
  font-weight: 600;
}

.close-button {
  display: grid;
  width: 42px;
  height: 42px;
  flex-shrink: 0;
  place-items: center;
  border: none;
  border-radius: 50%;
  background: #f1ede5;
  color: var(--olive);
  font-size: 1.7rem;
  cursor: pointer;
}

.plant-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
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
  margin-top: 6px;
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

@media (max-width: 600px) {
  .plant-modal {
    padding: 25px 20px;
    border-radius: 25px;
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
.empty-message {
  margin: 40px 0;
  color: #8a8f87;
  font-size: 1rem;
  text-align: center;
}

.plant-autocomplete {
  position: relative;
}

.plant-suggestions {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  right: 0;
  z-index: 50;

  max-height: 220px;
  overflow-y: auto;

  border: 1px solid rgb(82 99 79 / 15%);
  border-radius: 15px;

  background: #fffefa;
  box-shadow: 0 15px 35px rgb(35 43 34 / 15%);
}

.plant-suggestions {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  right: 0;
  z-index: 100;

  max-height: 150px;
  overflow-y: auto;

  padding: 6px;
  border: 1px solid rgb(82 99 79 / 15%);
  border-radius: 15px;
  background: #fffefa;
  box-shadow: 0 12px 28px rgb(35 43 34 / 15%);
}

.plant-suggestion {
  display: flex;
  align-items: center;
  gap: 10px;

  width: 100%;
  padding: 8px 10px;

  border: none;
  border-radius: 10px;
  background: transparent;

  color: var(--olive);
  font-family: inherit;
  font-size: 0.9rem;
  text-align: left;
  cursor: pointer;
}

.plant-suggestion:hover {
  background: #edf2e8;
}

.plant-icon {
  width: 28px;
  font-size: 1.3rem;
  text-align: center;
}

.plant-suggestion .plant-icon {
  display: inline;
  width: 24px;
  min-height: auto;
  background: none;
  font-size: 1.1rem;
}

.plant-name {
  font-weight: 600;
}

.no-suggestions {
  padding: 14px;
  color: #8a8f87;
  text-align: center;
}

.delete-button {
  padding: 7px 11px;
  border: none;
  border-radius: 999px;
  background: #f7e5df;
  color: #9c5847;
  font-family: inherit;
  font-size: 0.76rem;
  font-weight: 700;
  cursor: pointer;
}

.delete-button:hover {
  background: #efd3ca;
}

.edit-button {
  padding: 7px 11px;
  border: none;
  border-radius: 999px;
  background: #edf2e8;
  color: var(--olive);
  font-family: inherit;
  font-size: 0.76rem;
  font-weight: 700;
  cursor: pointer;
}

.edit-button:hover {
  background: #dde7d7;
}

.plant-location {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-top: 12px;
  font-size: 0.84rem;
}

.plant-location span {
  color: #999e96;
}

.plant-location strong {
  color: var(--olive);
  font-weight: 700;
}

.plant-notes {
  margin-top: 16px;
  padding: 12px 14px;
  border-radius: 14px;
  background: #f5f2eb;
  color: #6f756d;
  font-size: 0.84rem;
  line-height: 1.5;
}

</style>