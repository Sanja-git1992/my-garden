import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    updateDoc,
} from 'firebase/firestore'
import { auth, db } from '@/firebase.js'

export const useJournalStore = defineStore('journalStore', () => {
    const journalEntries = ref([])

    const isLoading = ref(false)
    const errorMessage = ref('')

    async function loadEntries() {
        errorMessage.value = ''

        const currentUser = auth.currentUser

        if (!currentUser) {
            errorMessage.value =
                'Journal entries cannot be loaded because the user is not logged in.'
            return
        }

        try {
            isLoading.value = true

            const journalCollection = collection(
                db,
                'users',
                currentUser.uid,
                'journal',
            )

            const querySnapshot = await getDocs(journalCollection)

            journalEntries.value = querySnapshot.docs.map((entryDocument) => {
                return {
                    id: entryDocument.id,
                    ...entryDocument.data(),
                }
            })
        } catch (error) {
            console.error('Error loading journal entries:', error)

            errorMessage.value =
                'Journal entries could not be loaded from the database.'
        } finally {
            isLoading.value = false
        }
    }

    async function addEntry(entry) {
        errorMessage.value = ''

        const currentUser = auth.currentUser

        if (!currentUser) {
            errorMessage.value =
                'Journal entry cannot be added because the user is not logged in.'

            return false
        }

        try {
            isLoading.value = true

            const journalCollection = collection(
                db,
                'users',
                currentUser.uid,
                'journal',
            )

            const entryDocument = await addDoc(
                journalCollection,
                entry,
            )

            journalEntries.value.push({
                id: entryDocument.id,
                ...entry,
            })

            return true
        } catch (error) {
            console.error('Error adding journal entry:', error)

            errorMessage.value =
                'The journal entry could not be saved to the database.'

            return false
        } finally {
            isLoading.value = false
        }
    }

    async function updateEntry(entryId, updatedEntry) {
        errorMessage.value = ''

        const currentUser = auth.currentUser

        if (!currentUser) {
            errorMessage.value =
                'Journal entry cannot be updated because the user is not logged in.'

            return false
        }

        try {
            isLoading.value = true

            const entryDocument = doc(
                db,
                'users',
                currentUser.uid,
                'journal',
                entryId,
            )

            await updateDoc(
                entryDocument,
                updatedEntry,
            )

            const entryIndex = journalEntries.value.findIndex(
                (entry) => entry.id === entryId,
            )

            if (entryIndex !== -1) {
                journalEntries.value[entryIndex] = {
                    ...journalEntries.value[entryIndex],
                    ...updatedEntry,
                }
            }

            return true
        } catch (error) {
            console.error('Error updating journal entry:', error)

            errorMessage.value =
                'The journal entry could not be updated in the database.'

            return false
        } finally {
            isLoading.value = false
        }
    }

    async function deleteEntry(entryId) {
        errorMessage.value = ''

        const currentUser = auth.currentUser

        if (!currentUser) {
            errorMessage.value =
                'Journal entry cannot be deleted because the user is not logged in.'

            return false
        }

        try {
            isLoading.value = true

            const entryDocument = doc(
                db,
                'users',
                currentUser.uid,
                'journal',
                entryId,
            )

            await deleteDoc(entryDocument)

            journalEntries.value = journalEntries.value.filter(
                (entry) => entry.id !== entryId,
            )

            return true
        } catch (error) {
            console.error('Error deleting journal entry:', error)

            errorMessage.value =
                'The journal entry could not be deleted.'

            return false
        } finally {
            isLoading.value = false
        }
    }

    return {
        journalEntries,
        isLoading,
        errorMessage,
        loadEntries,
        addEntry,
        updateEntry,
        deleteEntry,
    }
})