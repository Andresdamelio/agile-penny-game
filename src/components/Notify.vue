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
    background-color: #baece9;
    color: #00a99d;
  }
}
</style>