<script setup>
import { ref } from 'vue'
import { useJournalStore } from '@/stores/journalStore.js'

const journalStore = useJournalStore()

const isModalOpen = ref(false)
const editingEntryId = ref(null)
const errorMessage = ref('')

const newEntry = ref({
  title: '',
  date: '',
  text: '',
})

function openModal() {
  isModalOpen.value = true
  errorMessage.value = ''
}

function closeModal() {
  isModalOpen.value = false
  editingEntryId.value = null
  errorMessage.value = ''

  newEntry.value = {
    title: '',
    date: '',
    text: '',
  }
}

function saveEntry() {
  if (
    !newEntry.value.title.trim() ||
    !newEntry.value.date ||
    !newEntry.value.text.trim()
  ) {
    errorMessage.value =
      'Please enter the title, date and journal text.'
    return
  }

  if (editingEntryId.value) {
    journalStore.updateEntry(editingEntryId.value, {
      title: newEntry.value.title,
      date: newEntry.value.date,
      text: newEntry.value.text,
    })
  } else {
    journalStore.addEntry({
      title: newEntry.value.title,
      date: newEntry.value.date,
      text: newEntry.value.text,
    })
  }

  closeModal()
}

function editEntry(entry) {
  editingEntryId.value = entry.id

  newEntry.value = {
    title: entry.title,
    date: entry.date,
    text: entry.text,
  }

  isModalOpen.value = true
  errorMessage.value = ''
}

function deleteEntry(entryId) {
  journalStore.deleteEntry(entryId)
}

function formatDate(date) {
  return new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
</script>

<template>
  <main class="journal-page">
    <section class="journal-header">
      <div>
        <p class="eyebrow">Garden memories</p>
        <h1>Garden Journal</h1>

        <p class="intro">
          Save notes about your garden and follow its changes over time.
        </p>
      </div>

      <button
        type="button"
        class="add-button"
        @click="openModal"
      >
        <span>+</span>
        Add entry
      </button>
    </section>

    <section class="journal-grid">
      <article
        v-for="entry in journalStore.journalEntries"
        :key="entry.id"
        class="journal-card"
      >
        <div class="journal-card-header">
          <div>
            <p class="journal-date">
              {{ formatDate(entry.date) }}
            </p>

            <h2>{{ entry.title }}</h2>
          </div>

          <div class="journal-actions">
            <button
              type="button"
              class="edit-button"
              @click="editEntry(entry)"
            >
              Edit
            </button>

            <button
              type="button"
              class="delete-button"
              @click="deleteEntry(entry.id)"
            >
              Delete
            </button>
          </div>
        </div>

        <p class="journal-text">
          {{ entry.text }}
        </p>
      </article>
    </section>

    <p
      v-if="journalStore.journalEntries.length === 0"
      class="empty-message"
    >
      Your journal is empty.
    </p>

    <div
      v-if="isModalOpen"
      class="modal-overlay"
      @click.self="closeModal"
    >
      <section class="journal-modal">
        <div class="modal-header">
          <div>
            <p class="eyebrow">Garden entry</p>

            <h2>
              {{ editingEntryId ? 'Edit Entry' : 'Add New Entry' }}
            </h2>
          </div>

          <button
            type="button"
            class="close-button"
            aria-label="Close form"
            @click="closeModal"
          >
            ×
          </button>
        </div>

        <form
          class="journal-form"
          @submit.prevent="saveEntry"
        >
          <div class="form-group">
            <label for="entry-title">Title *</label>

            <input
              id="entry-title"
              v-model="newEntry.title"
              type="text"
              placeholder="For example, First tomato flowers"
            />
          </div>

          <div class="form-group">
            <label for="entry-date">Date *</label>

            <input
              id="entry-date"
              v-model="newEntry.date"
              type="date"
            />
          </div>

          <div class="form-group">
            <label for="entry-text">Journal text *</label>

            <textarea
              id="entry-text"
              v-model="newEntry.text"
              rows="6"
              placeholder="Write your garden note..."
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
              {{ editingEntryId ? 'Update entry' : 'Save entry' }}
            </button>
          </div>
        </form>
      </section>
    </div>
  </main>
</template>

<style scoped>
.journal-page {
  min-height: 100vh;
  padding: 60px 7%;
  background: var(--background);
}

.journal-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 30px;
  max-width: 1100px;
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

.journal-header h1 {
  margin: 0;
  color: var(--olive);
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(3rem, 6vw, 5rem);
  font-weight: 600;
}

.intro {
  max-width: 580px;
  margin-top: 16px;
  color: #6f756d;
  line-height: 1.7;
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

.journal-grid {
  display: grid;
  gap: 20px;
  max-width: 1100px;
  margin: 0 auto;
}

.journal-card {
  padding: 28px;
  border: 1px solid rgb(82 99 79 / 10%);
  border-radius: 24px;
  background: var(--surface);
  box-shadow: 0 12px 30px rgb(82 99 79 / 7%);
}

.journal-card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
}

.journal-date {
  margin: 0 0 6px;
  color: var(--terracotta);
  font-size: 0.8rem;
  font-weight: 700;
}

.journal-card h2 {
  margin: 0;
  color: var(--olive);
  font-family: 'Cormorant Garamond', serif;
  font-size: 2rem;
  font-weight: 600;
}

.journal-actions {
  display: flex;
  gap: 8px;
}

.edit-button,
.delete-button {
  padding: 7px 11px;
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

.journal-text {
  margin: 20px 0 0;
  color: #6f756d;
  line-height: 1.7;
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

.journal-modal {
  width: min(620px, 100%);
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
  place-items: center;
  border: none;
  border-radius: 50%;
  background: #f1ede5;
  color: var(--olive);
  font-size: 1.5rem;
  cursor: pointer;
}

.journal-form {
  display: flex;
  flex-direction: column;
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

@media (max-width: 700px) {
  .journal-page {
    padding: 42px 20px;
  }

  .journal-header,
  .journal-card-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .add-button {
    width: 100%;
    justify-content: center;
  }

  .journal-actions {
    width: 100%;
  }

  .edit-button,
  .delete-button {
    flex: 1;
  }
}
</style>