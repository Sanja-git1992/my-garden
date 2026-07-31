import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePlantStore = defineStore('plantStore', () => {
    const plants = ref([
        {
            id: 1,
            name: 'Tomato',
            category: 'Vegetable',
            variety: 'Cherry Tomato',
            status: 'Growing',
            plantedDate: '2026-05-15',
            location: '',
            notes: '',
            icon: '🍅',
        },
        {
            id: 2,
            name: 'Basil',
            category: 'Herb',
            variety: 'Sweet Basil',
            status: 'Ready to harvest',
            plantedDate: '2026-05-20',
            location: '',
            notes: '',
            icon: '🌿',
        },
        {
            id: 3,
            name: 'Strawberry',
            category: 'Fruit',
            variety: 'Garden Strawberry',
            status: 'Flowering',
            plantedDate: '2026-04-08',
            location: '',
            notes: '',
            icon: '🍓',
        },
    ])

    function addPlant(plant) {
        plants.value.push({
            id: Date.now(),
            ...plant,
        })
    }

    function updatePlant(plantId, updatedPlant) {
        const plantIndex = plants.value.findIndex(
            (plant) => plant.id === plantId,
        )

        if (plantIndex !== -1) {
            plants.value[plantIndex] = {
                ...plants.value[plantIndex],
                ...updatedPlant,
            }
        }
    }

    function deletePlant(plantId) {
        plants.value = plants.value.filter(
            (plant) => plant.id !== plantId,
        )
    }

    return {
        plants,
        addPlant,
        updatePlant,
        deletePlant,
    }
})