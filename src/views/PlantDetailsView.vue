<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { usePlantStore } from '@/stores/plantStore'

const route = useRoute()
const plantStore = usePlantStore()

const plant = computed(() =>
  plantStore.plants.find(
    (plant) => plant.id === Number(route.params.id),
  ),
)

function formatDate(date) {
  return new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

</script>

<template>
  <main class="plant-details-page">
    <RouterLink
      to="/plants"
      class="back-link"
    >
      ← Back to My Plants
    </RouterLink>

    <section
      v-if="plant"
      class="plant-details-card"
    >
      <div class="plant-details-header">
        <div class="plant-details-icon">
          {{ plant.icon }}
        </div>

        <div>
          <p class="eyebrow">
            Plant details
          </p>

          <h1>{{ plant.name }}</h1>

          <p class="plant-variety">
            {{ plant.variety }}
          </p>
        </div>
      </div>

      <div class="details-list">
        <div class="details-row">
          <span>Category</span>
          <strong>{{ plant.category }}</strong>
        </div>

        <div class="details-row">
          <span>Status</span>

          <span class="status-badge">
          {{ plant.status }}
          </span>
        </div>

        <div class="details-row">
          <span>Planting date</span>
          <strong>{{ formatDate(plant.plantedDate) }}</strong>
        </div>

        <div class="details-row">
          <span>Location</span>
          <strong>{{ plant.location || 'Not specified' }}</strong>
        </div>
      </div>

      <div class="notes-section">
        <span>Notes</span>

        <p>
          {{ plant.notes || 'No notes added.' }}
        </p>
      </div>
    </section>

    <section
      v-else
      class="plant-details-card"
    >
      <h2>Plant not found.</h2>

      <RouterLink to="/plants">
        Return to My Plants
      </RouterLink>
    </section>
  </main>
</template>

<style scoped>
.plant-details-page {
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

.plant-details-card {
  padding: 38px;
  border: 1px solid rgb(82 99 79 / 10%);
  border-radius: 28px;
  background: var(--surface);
  box-shadow: 0 15px 40px rgb(82 99 79 / 8%);
}

.plant-details-header {
  display: flex;
  align-items: center;
  gap: 22px;
  margin-bottom: 34px;
}

.plant-details-icon {
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
  margin: 0;
  color: var(--olive);
  font-family: 'Cormorant Garamond', serif;
  font-size: 3.4rem;
  font-weight: 600;
  line-height: 1;
}

.plant-variety {
  margin: 8px 0 0;
  color: #7f857d;
}

.details-list {
  border-top: 1px solid rgb(82 99 79 / 10%);
}

.details-row {
  display: flex;
  justify-content: space-between;
  gap: 24px;
  padding: 17px 0;
  border-bottom: 1px solid rgb(82 99 79 / 10%);
}

.details-row span,
.notes-section > span {
  color: #92978f;
  font-size: 0.88rem;
}

.details-row strong {
  color: var(--olive);
  text-align: right;
}

.notes-section {
  margin-top: 28px;
}

.notes-section p {
  margin: 10px 0 0;
  padding: 16px;
  border-radius: 15px;
  background: #f5f2eb;
  color: #6f756d;
  line-height: 1.6;
}

@media (max-width: 600px) {
  .plant-details-card {
    padding: 26px 20px;
  }

  .plant-details-header {
    align-items: flex-start;
  }

  .plant-details-icon {
    width: 70px;
    height: 70px;
    font-size: 2.5rem;
  }

  h1 {
    font-size: 2.6rem;
  }

  .details-row {
    align-items: flex-start;
    flex-direction: column;
    gap: 6px;
  }

  .details-row strong {
    text-align: left;
  }
}
.status-badge {
  display: inline-block;
  padding: 6px 12px;
  border-radius: 999px;
  background: #edf2e8;
  color: var(--olive);
  font-size: 0.8rem;
  font-weight: 700;
}
</style>