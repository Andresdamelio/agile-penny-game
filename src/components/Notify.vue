<template>
  <div aria-live="polite" aria-atomic="true" style="min-height: 200px;">
    <div :class="notify.show ? 'toast fade show': 'toast'" id="toast">
      <div class="toast-header">
        <strong class="mr-auto">{{ notify.title }}</strong>
      </div>
      <div class="toast-body">{{ notify.message }}</div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    notify() {
      return this.$store.getters["getNotify"];
    }
  }
};
</script>

<style lang="scss">
#toast {
  position: absolute;
  bottom: 65px;
  right: 10px;

  .toast-header {
    background-color: #17598a;
    color: #fff;
    font-family: 'Manrope', sans-serif;
    font-weight: 600;
  }

  .toast-body {
    color: #000;
    font-family: 'Manrope', sans-serif;
    font-weight: 400;
  }
}
</style>