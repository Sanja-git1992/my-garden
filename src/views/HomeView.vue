<template>
  <main class="home-page">
    <section class="hero-section">
      <div class="hero-background hero-background-one"></div>
      <div class="hero-background hero-background-two"></div>

      <div class="hero-container">
        <div class="hero-content">
          <p class="eyebrow">WELCOME TO MY GARDEN</p>

          <h1>
            Your garden.
            <span>Your story.</span>
          </h1>

          <p class="hero-description">
            Keep your plants, garden notes, seasonal progress and favourite
            harvest recipes together in one beautiful place.
          </p>

          <div class="hero-actions">
            <RouterLink
              to="/plants"
              class="primary-button"
            >
              Explore your garden
              <span aria-hidden="true">→</span>
            </RouterLink>

            <RouterLink
              to="/journal"
              class="secondary-button"
            >
              Open journal
            </RouterLink>
          </div>
        </div> 

        <div class="hero-visual">
          <div class="photo-decoration photo-decoration-top"></div>
          <div class="photo-decoration photo-decoration-bottom"></div>

          <div class="photo-frame">
            <div class="photo-top">
              <span class="photo-label">SUMMER HARVEST</span>
              <span class="photo-year">2026</span>
            </div>

            <img
              src="/images/garden-hero.jpg"
              alt="Person holding a basket filled with fresh fruits and vegetables"
            />

            <div class="photo-caption">
              <p>Freshly picked, carefully remembered.</p>
              <span>My Garden Journal</span>
            </div>
          </div>

          <div class="floating-card floating-card-weather">
            <span class="floating-icon">☀</span>

            <div>
              <strong>Perfect garden day</strong>
              <p>Take a moment to check your plants.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="quick-access-section">
      <div class="section-heading">
        <div>
          <p class="section-label">YOUR GARDEN SPACE</p>
          <h2>Everything you need, naturally organized.</h2>
        </div>

        <p class="section-description">
          Simple tools designed to help you enjoy every part of your gardening
          journey.
        </p>
      </div>

      <div class="quick-access-grid">
        <RouterLink to="/plants" class="access-card plants-card">
          <div class="card-top">
            <span class="card-number">01</span>
            <span class="card-arrow">↗</span>
          </div>

          <div class="card-icon">🌱</div>

          <h3>My Plants</h3>

          <p>
            Add plants, save useful information and follow their progress.
          </p>

          <span class="text-button">
            View plants
          </span>
        </RouterLink>

        <RouterLink
          to="/encyclopedia"
          class="access-card encyclopedia-card"
        >
          <div class="card-top">
            <span class="card-number">02</span>
            <span class="card-arrow">↗</span>
          </div>

          <div class="card-icon">📖</div>

          <h3>Plant Encyclopedia</h3>

          <p>
              Discover useful information about plants and their basic growing needs.
          </p>

          <span class="text-button">
            Explore plants
          </span>
        </RouterLink>

        <RouterLink
          to="/journal"
          class="access-card journal-card"
        >
          <div class="card-top">
            <span class="card-number">03</span>
            <span class="card-arrow">↗</span>
          </div>

          <div class="card-icon">✎</div>

            <h3>Garden Journal</h3>

            <p>
              Record observations, memories and important seasonal moments.
            </p>

            <span class="text-button">
              Open journal
            </span>
        </RouterLink>

        <RouterLink
          to="/recipes"
          class="access-card recipes-card"
>
          <div class="card-top">
            <span class="card-number">04</span>
            <span class="card-arrow">↗</span>
          </div>

          <div class="card-icon">🍅</div>

          <h3>Harvest Recipes</h3>

          <p>
            Keep your favourite recipes inspired by home-grown ingredients.
          </p>

          <span class="text-button">
            Browse recipes
          </span>
        </RouterLink>
        
      </div>
    </section>
  </main>
</template>

<script setup>
</script>

<style scoped>
.home-page {
  min-height: 100vh;
  overflow: hidden;
  background:
    linear-gradient(
      180deg,
      var(--background) 0%,
      #f5eee4 50%,
      #f8f4ec 100%
    );
}

/* HERO */

.hero-section {
  position: relative;
  padding: 85px 32px 110px;
}

.hero-container {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(380px, 0.85fr);
  align-items: center;
  gap: 90px;
  width: min(1200px, 100%);
  margin: 0 auto;
}

.hero-background {
  position: absolute;
  border-radius: 50%;
  filter: blur(2px);
  pointer-events: none;
}

.hero-background-one {
  top: 60px;
  left: -130px;
  width: 330px;
  height: 330px;
  background-color: rgba(191, 206, 184, 0.3);
}

.hero-background-two {
  right: -110px;
  bottom: 10px;
  width: 420px;
  height: 420px;
  background-color: rgba(230, 189, 162, 0.24);
}

.hero-content {
  max-width: 650px;
}

.eyebrow,
.section-label {
  color: var(--terracotta);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.22em;
}

.eyebrow {
  margin-bottom: 24px;
}

h1 {
  margin-bottom: 28px;
  color: var(--olive);
  font-size: clamp(4rem, 7vw, 6.7rem);
  font-weight: 600;
  letter-spacing: -0.055em;
  line-height: 0.84;
}

h1 span {
  display: block;
  margin-top: 12px;
  color: var(--terracotta);
  font-style: italic;
  font-weight: 500;
}

.hero-description {
  max-width: 590px;
  margin-bottom: 34px;
  color: var(--text-light);
  font-size: 1.08rem;
  line-height: 1.8;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-bottom: 55px;
}

button {
  border: none;
  font-family: inherit;
  cursor: pointer;
}

.primary-button,
.secondary-button {
  min-height: 52px;
  padding: 0 25px;
  border-radius: 999px;
  font-size: 0.92rem;
  font-weight: 700;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    background-color 0.2s ease;
}

.primary-button {
  display: inline-flex;
  align-items: center;
  gap: 15px;
  background-color: var(--olive);
  color: var(--surface);
  box-shadow: 0 10px 25px rgba(82, 99, 79, 0.2);
}

.primary-button span {
  font-size: 1.15rem;
}

.secondary-button {
  border: 1px solid rgba(82, 99, 79, 0.25);
  background-color: rgba(255, 253, 248, 0.4);
  color: var(--olive);
  backdrop-filter: blur(8px);
}

.primary-button:hover,
.secondary-button:hover {
  transform: translateY(-3px);
}

.primary-button:hover {
  box-shadow: 0 14px 30px rgba(82, 99, 79, 0.27);
}

.secondary-button:hover {
  background-color: var(--surface);
}

/* HERO IMAGE */

.hero-visual {
  position: relative;
  justify-self: end;
  width: min(480px, 100%);
}

.photo-frame {
  position: relative;
  z-index: 2;
  padding: 17px;
  background-color: rgba(255, 253, 248, 0.93);
  border: 1px solid rgba(210, 195, 175, 0.75);
  border-radius: 32px 32px 72px 32px;
  box-shadow:
    0 30px 70px rgba(72, 69, 58, 0.15),
    0 8px 18px rgba(72, 69, 58, 0.07);
  transform: rotate(1.3deg);
}

.photo-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 8px 13px;
}

.photo-label,
.photo-year {
  color: var(--text-light);
  font-size: 0.64rem;
  font-weight: 700;
  letter-spacing: 0.18em;
}

.photo-frame img {
  display: block;
  width: 100%;
  height: 505px;
  object-fit: cover;
  object-position: center;
  border-radius: 22px 22px 55px 22px;
}

.photo-caption {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 20px;
  padding: 18px 8px 5px;
}

.photo-caption p {
  max-width: 260px;
  color: var(--olive);
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.35rem;
  font-style: italic;
  font-weight: 600;
  line-height: 1.15;
}

.photo-caption span {
  color: var(--text-light);
  font-size: 0.67rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-align: right;
}

.photo-decoration {
  position: absolute;
  border-radius: 50%;
}

.photo-decoration-top {
  top: -40px;
  right: -45px;
  width: 145px;
  height: 145px;
  background-color: #d8e2cf;
}

.photo-decoration-bottom {
  bottom: -55px;
  left: -55px;
  width: 175px;
  height: 175px;
  background-color: #efd8c6;
}

.floating-card {
  position: absolute;
  z-index: 3;
  display: flex;
  align-items: center;
  gap: 13px;
  padding: 15px 17px;
  border: 1px solid rgba(208, 193, 172, 0.7);
  border-radius: 18px;
  box-shadow: 0 16px 35px rgba(75, 70, 58, 0.12);
  backdrop-filter: blur(14px);
}

.floating-card-weather {
  left: -75px;
  bottom: 105px;
  width: 245px;
  background-color: rgba(246, 222, 201, 0.94);
  transform: rotate(-2deg);
}

.floating-icon {
  display: grid;
  place-items: center;
  flex: 0 0 42px;
  height: 42px;
  background-color: rgba(255, 253, 248, 0.7);
  border-radius: 50%;
  color: #c58a51;
  font-size: 1.25rem;
}

.floating-card strong {
  display: block;
  margin-bottom: 3px;
  color: var(--olive);
  font-size: 0.78rem;
}

.floating-card p {
  color: var(--text-light);
  font-size: 0.68rem;
  line-height: 1.4;
}

/* QUICK ACCESS */

.quick-access-section {
  width: min(1200px, calc(100% - 64px));
  margin: 0 auto 100px;
  padding: 75px;
  background-color: rgba(255, 253, 248, 0.74);
  border: 1px solid rgba(216, 203, 184, 0.72);
  border-radius: 42px;
  box-shadow: 0 25px 60px rgba(73, 68, 57, 0.08);
  backdrop-filter: blur(12px);
}

.section-heading {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(280px, 0.65fr);
  gap: 60px;
  align-items: end;
  margin-bottom: 50px;
}

.section-label {
  margin-bottom: 13px;
}

.section-heading h2 {
  max-width: 650px;
  color: var(--olive);
  font-size: clamp(2.6rem, 4.5vw, 4.1rem);
  font-weight: 600;
  letter-spacing: -0.035em;
  line-height: 0.98;
}

.section-description {
  color: var(--text-light);
  font-size: 0.95rem;
  line-height: 1.75;
}

.quick-access-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 20px;
}

.access-card {
  position: relative;
  min-height: 340px;
  padding: 28px;
  overflow: hidden;
  border: 1px solid rgba(204, 190, 170, 0.65);
  border-radius: 28px;
  text-decoration: none;
  color: inherit;
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;
}

.access-card:hover {
  transform: translateY(-7px);
  box-shadow: 0 20px 38px rgba(71, 68, 58, 0.1);
}

.plants-card {
  background-color: #dde7d7;
}

.encyclopedia-card {
  background-color: #e2e7dc;
}

.journal-card {
  background-color: #f1ddce;
}

.recipes-card {
  background-color: #eee7cb;
}

.card-top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 48px;
}

.card-number,
.card-arrow {
  color: rgba(63, 71, 60, 0.65);
  font-size: 0.75rem;
  font-weight: 700;
}

.card-arrow {
  display: grid;
  place-items: center;
  width: 35px;
  height: 35px;
  border: 1px solid rgba(63, 71, 60, 0.2);
  border-radius: 50%;
  font-size: 1rem;
}

.card-icon {
  display: grid;
  place-items: center;
  width: 58px;
  height: 58px;
  margin-bottom: 25px;
  background-color: rgba(255, 253, 248, 0.65);
  border-radius: 18px;
  color: var(--olive);
  font-size: 1.45rem;
}

.access-card h3 {
  margin-bottom: 13px;
  color: var(--olive);
  font-size: 2rem;
  font-weight: 600;
}

.access-card > p {
  max-width: 280px;
  margin-bottom: 26px;
  color: var(--text-light);
  font-size: 0.85rem;
  line-height: 1.65;
}

.text-button {
  position: absolute;
  bottom: 27px;
  left: 28px;
  padding: 0;
  background: transparent;
  color: var(--olive);
  font-size: 0.8rem;
  font-weight: 800;
  text-decoration: underline;
  text-decoration-color: rgba(82, 99, 79, 0.35);
  text-underline-offset: 5px;
}

/* RESPONSIVE */

@media (max-width: 1100px) {
  .hero-container {
    grid-template-columns: 1fr;
    gap: 80px;
  }

  .hero-content {
    max-width: 760px;
  }

  .hero-visual {
    justify-self: center;
  }
}

@media (max-width: 850px) {

  .section-heading {
    grid-template-columns: 1fr;
    gap: 25px;
  }

  .quick-access-grid {
    grid-template-columns: 1fr;
  }

  .access-card {
    min-height: 300px;
  }

  .quick-access-section {
    padding: 50px 35px;
  }
}

@media (max-width: 620px) {
  .hero-section {
    padding: 55px 20px 85px;
  }

  h1 {
    font-size: 4rem;
  }

  .hero-actions {
    flex-direction: column;
  }

  .primary-button,
  .secondary-button {
    width: 100%;
    justify-content: center;
  }

  .photo-frame img {
    height: 410px;
  }

  .floating-card {
    position: relative;
    inset: auto;
    width: calc(100% - 25px);
    margin: -18px auto 0;
    transform: none;
  }

  .quick-access-section {
    width: calc(100% - 32px);
    margin-bottom: 65px;
    padding: 42px 22px;
    border-radius: 30px;
  }

  .section-heading h2 {
    font-size: 2.7rem;
  }

  .photo-caption {
    align-items: flex-start;
    flex-direction: column;
  }

  .photo-caption span {
    text-align: left;
  }
}

.primary-button,
.secondary-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
}

</style>