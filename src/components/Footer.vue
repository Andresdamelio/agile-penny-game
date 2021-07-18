<template>
  <footer class="container-fluid custom-footer fixed-bottom">
    <div class="row">
      <div class="col">
        4A transformaciones de negocios en la
        <span class="text-blue">era digital</span> © Chile 2021. Todos los
        derechos reservados
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
};
</script>

<style scoped lang="scss">
.custom-footer {
  text-align: center;
  padding: 1rem;
  background: #ffffff;
  border-top: 1px solid #17598a;
  font-family: 'Manrope', sans-serif;
  color: #000;
  font-weight: 400;
  .text-blue {
    color: #17598a;
    font-weight: 700;
  }
}
</style>
