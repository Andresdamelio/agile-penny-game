<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title">{{title}}</h2>
            <button type="button" class="close" @click="close" aria-label="close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>{{message}}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="close">{{buttonText}}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title:{
      type: String,
      default: 'Título',
    },
    message:{
      type: String,
      default: 'Mensaje',
    },
    buttonText:{
      type: String,
      default: 'Botón',
    },
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
    close() {
      this.$emit("update:showModal", false);
      this.$router.push({name: "home"});
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