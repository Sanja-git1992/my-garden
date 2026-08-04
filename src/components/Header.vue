<script setup>
import { useRouter } from 'vue-router'
import { signOut } from 'firebase/auth'
import { auth } from '@/firebase.js'
import { useAuthStore } from '@/stores/authStore.js'

const router = useRouter()
const authStore = useAuthStore()

async function logoutUser() {
  try {
    await signOut(auth)

    authStore.clearUser()

    router.push('/login')
  } catch (error) {
    console.error('Logout failed:', error)
  }
}
</script>
<template>
  <header class="header">
    <div class="header-container">
      <RouterLink
        to="/"
        class="logo"
      >
        🌱 My Garden
      </RouterLink>

      <nav class="navigation">
  <RouterLink to="/">
    Home
  </RouterLink>

  <template v-if="authStore.isLoggedIn">
    <RouterLink to="/plants">
      My Plants
    </RouterLink>

    <RouterLink to="/encyclopedia">
      Encyclopedia
    </RouterLink>

    <RouterLink to="/recipes">
      Recipes
    </RouterLink>

    <RouterLink to="/journal">
      Journal
    </RouterLink>

    <button
      type="button"
      class="logout-button"
      @click="logoutUser"
    >
      Logout
    </button>
  </template>

  <template v-else>
    <RouterLink to="/login">
      Login
    </RouterLink>

    <RouterLink to="/register">
      Register
    </RouterLink>
  </template>
</nav>
    </div>
  </header>
</template>

<script setup>
</script>

<style scoped>
.header {
  background: #2e7d32;
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 18px 30px;

  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  color: white;
  text-decoration: none;
  font-size: 2rem;
  font-weight: bold;
}

.navigation {
  display: flex;
  gap: 28px;
}

.navigation a {
  color: white;
  text-decoration: none;
  font-weight: 600;
}

.navigation a:hover {
  text-decoration: underline;
}

.navigation a.router-link-active {
  font-weight: bold;
  border-bottom: 2px solid white;
}

.logout-button {
  padding: 0;
  border: none;
  background: transparent;
  color: white;
  font-family: inherit;
  font-size: inherit;
  font-weight: 600;
  cursor: pointer;
}

.logout-button:hover {
  text-decoration: underline;
}
</style>