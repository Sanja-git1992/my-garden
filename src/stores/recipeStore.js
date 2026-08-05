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
    const recipes = ref([
        {
            id: 1,
            title: 'Fresh Tomato Salad',
            category: 'Salad',
            icon: '🍅',
            ingredients: [
                '4 tomatoes',
                'Fresh basil leaves',
                '2 tablespoons olive oil',
                'Salt',
                'Pepper',
            ],
            instructions:
                'Slice the tomatoes, add fresh basil and season with olive oil, salt and pepper.',
        },
        {
            id: 2,
            title: 'Creamy Zucchini Soup',
            category: 'Soup',
            icon: '🥒',
            ingredients: [
                '2 zucchini',
                '1 onion',
                '1 potato',
                '500 ml vegetable stock',
                'Salt',
                'Pepper',
            ],
            instructions:
                'Cook the vegetables in the stock until soft, then blend until smooth and season to taste.',
        },
        {
            id: 3,
            title: 'Basil Pesto',
            category: 'Sauce',
            icon: '🌿',
            ingredients: [
                'Fresh basil leaves',
                '2 tablespoons olive oil',
                '1 garlic clove',
                'Grated cheese',
                'Salt',
            ],
            instructions:
                'Blend all ingredients until they form a smooth sauce.',
        },
        {
            id: 4,
            title: 'Strawberry Dessert',
            category: 'Dessert',
            icon: '🍓',
            ingredients: [
                '250 g strawberries',
                '200 g yoghurt',
                '1 tablespoon honey',
            ],
            instructions:
                'Slice the strawberries and serve them with yoghurt and honey.',
        },
    ])

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

            if (!querySnapshot.empty) {
                recipes.value = querySnapshot.docs.map((recipeDocument) => {
                    return {
                        id: recipeDocument.id,
                        ...recipeDocument.data(),
                    }
                })
            }
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