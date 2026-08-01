import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useJournalStore = defineStore('journalStore', () => {
    const journalEntries = ref([
        {
            id: 1,
            title: 'Tomatoes are growing well',
            date: '2026-08-01',
            text: 'Today I noticed the first flowers on my tomato plants.',
        },
        {
            id: 2,
            title: 'Basil harvest',
            date: '2026-07-28',
            text: 'I harvested fresh basil leaves for lunch.',
        },
    ])

    function addEntry(entry) {
        journalEntries.value.push({
            id: Date.now(),
            ...entry,
        })
    }

    function updateEntry(entryId, updatedEntry) {
        const entryIndex = journalEntries.value.findIndex(
            (entry) => entry.id === entryId,
        )

        if (entryIndex !== -1) {
            journalEntries.value[entryIndex] = {
                ...journalEntries.value[entryIndex],
                ...updatedEntry,
            }
        }
    }

    function deleteEntry(entryId) {
        journalEntries.value = journalEntries.value.filter(
            (entry) => entry.id !== entryId,
        )
    }

    return {
        journalEntries,
        addEntry,
        updateEntry,
        deleteEntry,
    }
})