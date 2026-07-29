<script setup>
import Header from './components/Header.vue'
</script>

<template>
  <Header />

  <main>
    <router-view />
  </main>
</template>

<style scoped>
main {
  min-height: 70vh;
}
</style>
