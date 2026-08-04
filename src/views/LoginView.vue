<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/firebase.js'

const router = useRouter()

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const isLoading = ref(false)

async function loginUser() {
  errorMessage.value = ''

  if (!email.value.trim() || !password.value) {
    errorMessage.value = 'Please enter your email and password.'
    return
  }

  try {
    isLoading.value = true

    await signInWithEmailAndPassword(
      auth,
      email.value.trim(),
      password.value,
    )

    router.push('/')
  } catch (error) {
    if (
      error.code === 'auth/invalid-credential' ||
      error.code === 'auth/user-not-found' ||
      error.code === 'auth/wrong-password'
    ) {
      errorMessage.value =
        'The email or password is incorrect.'
    } else if (error.code === 'auth/invalid-email') {
      errorMessage.value =
        'Please enter a valid email address.'
    } else if (error.code === 'auth/too-many-requests') {
      errorMessage.value =
        'Too many failed attempts. Please try again later.'
    } else {
      errorMessage.value =
        'Login failed. Please try again.'
    }
  } finally {
    isLoading.value = false
  }
}
</script>
<template>
  <main class="auth-page">
    <section class="auth-card">
      <p class="eyebrow">Welcome back</p>

      <h1>Login</h1>

      <p class="intro">
        Sign in to access and manage your garden.
      </p>

      <form
        class="auth-form"
        @submit.prevent="loginUser"
      >
        <div class="form-group">
          <label for="login-email">Email</label>

          <input
            id="login-email"
            v-model="email"
            type="email"
            placeholder="Enter your email"
          />
        </div>

        <div class="form-group">
          <label for="login-password">Password</label>

          <input
            id="login-password"
            v-model="password"
            type="password"
            placeholder="Enter your password"
          />
        </div>

        <p
          v-if="errorMessage"
          class="form-error"
        >
          {{ errorMessage }}
        </p>

        <button
          type="submit"
          class="auth-button"
          :disabled="isLoading"
        >
          {{ isLoading ? 'Signing in...' : 'Login' }}
        </button>
      </form>

      <p class="auth-link-text">
        Don't have an account?

        <RouterLink to="/register">
          Register
        </RouterLink>
      </p>
    </section>
  </main>
</template>
<style scoped>
.auth-page {
  min-height: calc(100vh - 84px);
  display: grid;
  place-items: center;
  padding: 50px 20px;
  background: var(--background);
}

.auth-card {
  width: min(500px, 100%);
  padding: 38px;
  border: 1px solid rgb(82 99 79 / 10%);
  border-radius: 28px;
  background: var(--surface);
  box-shadow: 0 18px 45px rgb(82 99 79 / 10%);
}

.eyebrow {
  margin-bottom: 10px;
  color: var(--terracotta);
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

h1 {
  margin: 0;
  color: var(--olive);
  font-family: 'Cormorant Garamond', serif;
  font-size: 3.5rem;
  font-weight: 600;
}

.intro {
  margin: 12px 0 26px;
  color: #6f756d;
  line-height: 1.6;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  color: var(--olive);
  font-size: 0.84rem;
  font-weight: 800;
}

.form-group input {
  width: 100%;
  padding: 13px 15px;
  border: 1px solid rgb(82 99 79 / 18%);
  border-radius: 15px;
  outline: none;
  background: #fffefa;
  color: var(--olive);
  font-family: inherit;
  font-size: 0.94rem;
}

.form-group input:focus {
  border-color: var(--sage);
  box-shadow: 0 0 0 3px rgb(140 165 140 / 15%);
}

.form-error {
  margin: 0;
  padding: 11px 14px;
  border-radius: 12px;
  background: #f7e5df;
  color: #9c5847;
  font-size: 0.85rem;
  font-weight: 700;
}

.auth-button {
  width: 100%;
  padding: 13px 20px;
  border: none;
  border-radius: 999px;
  background: var(--olive);
  color: white;
  font-family: inherit;
  font-size: 0.95rem;
  font-weight: 800;
  cursor: pointer;
}

.auth-button:hover {
  opacity: 0.9;
}

.auth-button:disabled {
  cursor: not-allowed;
  opacity: 0.65;
}

.auth-link-text {
  margin: 22px 0 0;
  color: #6f756d;
  text-align: center;
}

.auth-link-text a {
  color: var(--terracotta);
  font-weight: 800;
  text-decoration: none;
}

.auth-link-text a:hover {
  text-decoration: underline;
}

@media (max-width: 550px) {
  .auth-card {
    padding: 28px 20px;
  }

  h1 {
    font-size: 2.8rem;
  }
}
</style>