<template>
  <header
    class="container-fluid custom-header d-flex justify-content-between align-content-center align-items-center flex-column flex-sm-row mb-3"
  >
    <router-link to="/">
    <div class="d-flex align-content-center justify-content-center align-items-center justify-content-sm-start">
      <img class="icon-header" src="@/assets/img/logo.png" alt="image coin" />
      <h1 class="m-0">Juego de las monedas</h1>
    </div>
    </router-link>
    <ul class="nav justify-content-center justify-content-sm-start">
      <li class="nav-item"><router-link to="/">Inicio</router-link></li>
      <li class="nav-item"><router-link to="/rooms">Salas</router-link></li>
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
  a{
    color: #333;
    font-weight: 400;
    &:hover {
      text-decoration: none;
      color: #00A99D;
    }
  }
    
}
.icon-header {
  width: 50px;
  margin-right: 0.5rem;
}
</style>
