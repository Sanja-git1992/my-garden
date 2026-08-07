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

export const useRecipeStore = defineStore('recipeStore', () => {
    const recipes = ref([])

    const isLoading = ref(false)
    const errorMessage = ref('')

    async function loadRecipes() {
        errorMessage.value = ''

        const currentUser = auth.currentUser

        if (!currentUser) {
            errorMessage.value =
                'Recipes cannot be loaded because the user is not logged in.'
            return
        }

        try {
            isLoading.value = true

            const recipesCollection = collection(
                db,
                'users',
                currentUser.uid,
                'recipes',
            )

            const querySnapshot = await getDocs(recipesCollection)

            recipes.value = querySnapshot.docs.map((recipeDocument) => {
                return {
                    id: recipeDocument.id,
                    ...recipeDocument.data(),
                }
            })
        } catch (error) {
            console.error('Error loading recipes:', error)

            errorMessage.value =
                'Recipes could not be loaded from the database.'
        } finally {
            isLoading.value = false
        }
    }

    async function addRecipe(recipe) {
        errorMessage.value = ''

        const currentUser = auth.currentUser

        if (!currentUser) {
            errorMessage.value =
                'Recipe cannot be added because the user is not logged in.'

            return false
        }

        try {
            isLoading.value = true

            const recipesCollection = collection(
                db,
                'users',
                currentUser.uid,
                'recipes',
            )

            const recipeDocument = await addDoc(
                recipesCollection,
                recipe,
            )

            recipes.value.push({
                id: recipeDocument.id,
                ...recipe,
            })

            return true
        } catch (error) {
            console.error('Error adding recipe:', error)

            errorMessage.value =
                'The recipe could not be saved to the database.'

            return false
        } finally {
            isLoading.value = false
        }
    }

    async function updateRecipe(recipeId, updatedRecipe) {
        errorMessage.value = ''

        const currentUser = auth.currentUser

        if (!currentUser) {
            errorMessage.value =
                'Recipe cannot be updated because the user is not logged in.'

            return false
        }

        try {
            isLoading.value = true

            const recipeDocument = doc(
                db,
                'users',
                currentUser.uid,
                'recipes',
                recipeId,
            )

            await updateDoc(
                recipeDocument,
                updatedRecipe,
            )

            const recipeIndex = recipes.value.findIndex(
                (recipe) => recipe.id === recipeId,
            )

            if (recipeIndex !== -1) {
                recipes.value[recipeIndex] = {
                    ...recipes.value[recipeIndex],
                    ...updatedRecipe,
                }
            }

            return true
        } catch (error) {
            console.error('Error updating recipe:', error)

            errorMessage.value =
                'The recipe could not be updated in the database.'

            return false
        } finally {
            isLoading.value = false
        }
    }

    async function deleteRecipe(recipeId) {
        errorMessage.value = ''

        const currentUser = auth.currentUser

        if (!currentUser) {
            errorMessage.value =
                'Recipe cannot be deleted because the user is not logged in.'

            return false
        }

        try {
            isLoading.value = true

            const recipeDocument = doc(
                db,
                'users',
                currentUser.uid,
                'recipes',
                recipeId,
            )

            await deleteDoc(recipeDocument)

            recipes.value = recipes.value.filter(
                (recipe) => recipe.id !== recipeId,
            )

            return true
        } catch (error) {
            console.error('Error deleting recipe:', error)

            errorMessage.value =
                'The recipe could not be deleted.'

            return false
        } finally {
            isLoading.value = false
        }
    }

    return {
        recipes,
        isLoading,
        errorMessage,
        loadRecipes,
        addRecipe,
        updateRecipe,
        deleteRecipe,
    }
})