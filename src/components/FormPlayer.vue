<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title">Ingresar</h2>
            <button type="button" class="close" @click="close" aria-label="close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>Identifíquese para participar en el juego</p>
            <div class="form-group">
              <label for="namePlayer">Nombre</label>
              <input
                id="namePlayer"
                type="text"
                class="form-control"
                v-model="name"
                placeholder="Introduce tu nombre"
              />
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="close">Cancelar</button>
            <button type="button" class="btn btn-primary" @click="joinGame">Entrar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    showModal: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      name: null
    };
  },
  methods: {
    joinGame() {
      this.$store.dispatch("socket_join_room", {
        name: this.name,
        roomId: this.$route.params.id
      });
      this.$emit("update:showModal", false);
    },
    close() {
      this.$emit("update:showModal", false);
    }
  }
};
</script>
<style lang="scss">
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.btn,
.btn:hover,
.btn:active,
.btn:focus {
  border-color: #e64a19 !important;
  box-shadow: none !important;
}

.btn-primary {
  background-color: #e64a19 !important;
}

.btn-secondary,
.close {
  background-color: transparent !important;
  color: #e64a19 !important;
}
</style>