<template>
  <div class="header-container">
    <a
      href="https://www.jobleads.com"
      target="”_blank”"
      aria-label="Link to jobleads website"
    >
      <img
        src="../assets/logos/jobleads-logo.webp"
        data-src="../assets/logos/jobleads-logo.webp"
        class="jl-logo"
        alt="jobleads logo"
    /></a>
    <a
      href="https://www.jobleads.com/discover-premium"
      class="btn premium"
      aria-label="Link to jobleads premium membership website"
      >Go Premium</a
    >
  </div>
</template>

<style scoped lang="scss">
@use "../styles/utilities/_variables.scss" as variables;

.header-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.125rem 2.5rem;
  margin-bottom: 1rem;

  @media (min-width: variables.$breakpoint-sm) {
    flex-direction: row;
    margin-bottom: 3rem;
  }
}

.jl-logo {
  height: 32.9px;
  width: 158px;
}

.btn.premium {
  align-items: center;
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
  text-decoration-line: none;

  @media (min-width: variables.$breakpoint-sm) {
    margin-top: 0;
  }
}
</style>
