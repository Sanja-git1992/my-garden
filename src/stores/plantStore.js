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

    const plantTypes = [
        {
            name: 'Tomato',
            category: 'Vegetable',
            icon: '🍅',
            description:
                'A sun-loving plant that needs regular watering and support as it grows.',
        },
        {
            name: 'Cucumber',
            category: 'Vegetable',
            icon: '🥒',
            description:
                'A fast-growing climbing plant that prefers warm soil and plenty of water.',
        },
        {
            name: 'Zucchini',
            category: 'Vegetable',
            icon: '🥒',
            description:
                'A productive summer vegetable that needs space, sunlight and regular watering.',
        },
        {
            name: 'Carrot',
            category: 'Vegetable',
            icon: '🥕',
            description:
                'A root vegetable that grows best in loose soil without large stones.',
        },
        {
            name: 'Potato',
            category: 'Vegetable',
            icon: '🥔',
            description:
                'A practical garden crop that develops underground and prefers loose, fertile soil.',
        },
        {
            name: 'Pepper',
            category: 'Vegetable',
            icon: '🌶️',
            description:
                'A warm-season plant that grows best in a sunny and sheltered location.',
        },
        {
            name: 'Lettuce',
            category: 'Vegetable',
            icon: '🥬',
            description:
                'A quick-growing leafy vegetable that prefers cooler weather and moist soil.',
        },
        {
            name: 'Onion',
            category: 'Vegetable',
            icon: '🧅',
            description:
                'An easy-to-grow vegetable that prefers sunny conditions and well-drained soil.',
        },
        {
            name: 'Garlic',
            category: 'Vegetable',
            icon: '🧄',
            description:
                'A low-maintenance crop commonly planted in autumn and harvested in summer.',
        },
        {
            name: 'Pumpkin',
            category: 'Vegetable',
            icon: '🎃',
            description:
                'A spreading plant that needs plenty of space, sunlight and nutrient-rich soil.',
        },
        {
            name: 'Strawberry',
            category: 'Fruit',
            icon: '🍓',
            description:
                'A compact fruit plant that prefers sunny beds and evenly moist soil.',
        },
        {
            name: 'Blueberry',
            category: 'Fruit',
            icon: '🫐',
            description:
                'A fruit shrub that requires acidic soil and consistent moisture.',
        },
        {
            name: 'Apple',
            category: 'Fruit',
            icon: '🍎',
            description:
                'A fruit tree that needs a sunny position and regular seasonal care.',
        },
        {
            name: 'Pear',
            category: 'Fruit',
            icon: '🍐',
            description:
                'A long-living fruit tree that grows best in a warm and sunny position.',
        },
        {
            name: 'Basil',
            category: 'Herb',
            icon: '🌿',
            description:
                'An aromatic herb that enjoys warmth, sunlight and regular harvesting.',
        },
        {
            name: 'Parsley',
            category: 'Herb',
            icon: '🌿',
            description:
                'A useful culinary herb that grows in sunny or partially shaded locations.',
        },
        {
            name: 'Rose',
            category: 'Flower',
            icon: '🌹',
            description:
                'A decorative flowering plant that needs sunlight, pruning and good air circulation.',
        },
        {
            name: 'Sunflower',
            category: 'Flower',
            icon: '🌻',
            description:
                'A tall annual flower that follows the sun and attracts pollinating insects.',
        },
        {
            name: 'Other',
            category: 'Other',
            icon: '🌱',
            description:
                'Use this option for a plant that is not yet included in the encyclopedia.',
        },
    ]

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
        plantTypes,
        addPlant,
        updatePlant,
        deletePlant,
    }
})