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

export const usePlantStore = defineStore('plantStore', () => {

    const plants = ref([])

    const isLoading = ref(false)
    const errorMessage = ref('')

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

    async function loadPlants() {
        errorMessage.value = ''

        const currentUser = auth.currentUser

        if (!currentUser) {
            errorMessage.value =
                'Plants cannot be loaded because the user is not logged in.'
            return
        }

        try {
            isLoading.value = true

            const plantsCollection = collection(
                db,
                'users',
                currentUser.uid,
                'plants',
            )

            const querySnapshot = await getDocs(plantsCollection)

            if (!querySnapshot.empty) {
                plants.value = querySnapshot.docs.map((plantDocument) => {
                    return {
                        id: plantDocument.id,
                        ...plantDocument.data(),
                    }
                })
            }
        } catch (error) {
            console.error('Error loading plants:', error)

            errorMessage.value =
                'Plants could not be loaded from the database.'
        } finally {
            isLoading.value = false
        }
    }

    async function addPlant(plant) {
        errorMessage.value = ''

        const currentUser = auth.currentUser

        if (!currentUser) {
            errorMessage.value =
                'Plant cannot be added because the user is not logged in.'

            return false
        }

        try {
            isLoading.value = true

            const plantsCollection = collection(
                db,
                'users',
                currentUser.uid,
                'plants',
            )

            const plantDocument = await addDoc(
                plantsCollection,
                plant,
            )

            plants.value.push({
                id: plantDocument.id,
                ...plant,
            })

            return true
        } catch (error) {
            console.error('Error adding plant:', error)

            errorMessage.value =
                'The plant could not be saved to the database.'

            return false
        } finally {
            isLoading.value = false
        }
    }

    async function updatePlant(plantId, updatedPlant) {
        errorMessage.value = ''

        const currentUser = auth.currentUser

        if (!currentUser) {
            errorMessage.value =
                'Plant cannot be updated because the user is not logged in.'

            return false
        }

        try {
            isLoading.value = true

            const plantDocument = doc(
                db,
                'users',
                currentUser.uid,
                'plants',
                plantId,
            )

            await updateDoc(
                plantDocument,
                updatedPlant,
            )

            const plantIndex = plants.value.findIndex(
                (plant) => plant.id === plantId,
            )

            if (plantIndex !== -1) {
                plants.value[plantIndex] = {
                    ...plants.value[plantIndex],
                    ...updatedPlant,
                }
            }

            return true
        } catch (error) {
            console.error('Error updating plant:', error)

            errorMessage.value =
                'The plant could not be updated in the database.'

            return false
        } finally {
            isLoading.value = false
        }
    }

    async function deletePlant(plantId) {
        errorMessage.value = ''

        const currentUser = auth.currentUser

        if (!currentUser) {
            errorMessage.value =
                'Plant cannot be deleted because the user is not logged in.'

            return false
        }

        try {
            isLoading.value = true

            const plantDocument = doc(
                db,
                'users',
                currentUser.uid,
                'plants',
                plantId,
            )

            await deleteDoc(plantDocument)

            plants.value = plants.value.filter(
                (plant) => plant.id !== plantId,
            )

            return true
        } catch (error) {
            console.error('Error deleting plant:', error)

            errorMessage.value =
                'The plant could not be deleted.'

            return false
        } finally {
            isLoading.value = false
        }
    }

    return {
        plants,
        plantTypes,
        isLoading,
        errorMessage,
        loadPlants,
        addPlant,
        updatePlant,
        deletePlant,
    }
})