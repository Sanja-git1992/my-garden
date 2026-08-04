import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/firebase.js'

export const useAuthStore = defineStore('authStore', () => {
    const user = ref(null)
    const isAuthReady = ref(false)

    const isLoggedIn = computed(() => user.value !== null)

    let authReadyPromise = null

    function initializeAuth() {
        if (authReadyPromise) {
            return authReadyPromise
        }

        authReadyPromise = new Promise((resolve) => {
            onAuthStateChanged(auth, (firebaseUser) => {
                user.value = firebaseUser
                isAuthReady.value = true
                resolve()
            })
        })

        return authReadyPromise
    }

    function waitForAuthReady() {
        return authReadyPromise || initializeAuth()
    }

    function setUser(firebaseUser) {
        user.value = firebaseUser
    }

    function clearUser() {
        user.value = null
    }

    return {
        user,
        isAuthReady,
        isLoggedIn,
        initializeAuth,
        waitForAuthReady,
        setUser,
        clearUser,
    }
})