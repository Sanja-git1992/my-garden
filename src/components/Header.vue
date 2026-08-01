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
        <RouterLink to="/">Home</RouterLink>

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
</style>