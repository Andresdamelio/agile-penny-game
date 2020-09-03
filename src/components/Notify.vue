<template>
  <div
    aria-live="polite"
    aria-atomic="true"
    style="position: relative; min-height: 200px;"
  >
    <div
      :class="notify.show?'toast fade show': 'toast'"
      style="position: absolute; top: 0; right: 0;"
    >
      <div class="toast-header">
        <strong class="mr-auto">{{ notify.title }}</strong>
        <small>Ahora</small>
        <button type="button" class="ml-2 mb-1 close" @click="closeNotify">
          <span aria-hidden="true">x</span>
        </button>
      </div>
      <div class="toast-body">{{ notify.message }}</div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    closeNotify(){
      console.log("Cerra")
    }
  },
  computed: {
    notify(){
      return this.$store.getters["getNotify"];
    }
  },
}
</script>