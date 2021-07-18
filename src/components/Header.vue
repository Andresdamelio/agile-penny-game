<template>
  <header
    class="container-fluid custom-header d-flex justify-content-between align-content-center align-items-center flex-column flex-sm-row mb-3"
  >
    <a href="https://www.4agile.cl/" target="_blank" rel="noreferrer noopener">
      <div
        class="d-flex align-content-center justify-content-center align-items-center justify-content-sm-start"
      >
        <img class="icon-header" src="@/assets/img/logo.png" alt="logo 4agile" />
      </div>
    </a>
    <ul class="nav justify-content-center justify-content-sm-start">
      <li class="nav-item">
        <router-link to="/">Inicio</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/rooms">Salas</router-link>
      </li>
    </ul>
  </header>
</template>

<script>
export default {
  name: "Header"
};
</script>

<style scoped lang="scss">
.custom-header {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  background: #fff;
  box-shadow: 0 0.3rem 0.5rem rgba(0, 0, 0, 0.05),
    inset 0 -1px 0 rgba(0, 0, 0, 0.1);
  h1 {
    font-size: 28px;
    font-weight: 400;
    color: #303133;
  }
  li {
    padding: 0 10px;
  }
  a {
    color: #000000;
    font-weight: 700;
    font-family: 'Manrope', sans-serif;
    &:hover, &.router-link-exact-active.router-link-active {
      text-decoration: none;
      color: #17598a;
    }
  }
}

.icon-header {
  max-width: 270px;
  height: auto;
}
</style>
