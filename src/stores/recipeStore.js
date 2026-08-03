import { defineStore } from 'pinia'
import { ref } from 'vue'

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

    function addRecipe(recipe) {
        recipes.value.push({
            id: Date.now(),
            ...recipe,
        })
    }

    function updateRecipe(recipeId, updatedRecipe) {
        const recipeIndex = recipes.value.findIndex(
            (recipe) => recipe.id === recipeId,
        )

        if (recipeIndex !== -1) {
            recipes.value[recipeIndex] = {
                ...recipes.value[recipeIndex],
                ...updatedRecipe,
            }
        }
    }

    function deleteRecipe(recipeId) {
        recipes.value = recipes.value.filter(
            (recipe) => recipe.id !== recipeId,
        )
    }

    return {
        recipes,
        addRecipe,
        updateRecipe,
        deleteRecipe,
    }
})