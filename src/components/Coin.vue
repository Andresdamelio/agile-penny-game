<template>
  <div
    class="rounded-circle bg-warning coin border border-dark"
    @click="press"
    :class="{ pressed: isPressed, moved: moved }"
    v-if="!moved && received"
  ></div>
</template>

<script>
export default {
  name: "Coin",
  props: ["height", "width", "received", "canBePressed", "moved", "info"],
  data() {
    return {
      isPressed: false
    };
  },
  mounted() {
    /* this.$el.style.width = this.width;
    this.$el.style.height = this.height; */
  },
  methods: {
    press() {
      console.log("pressing")
      if (this.isPressed) {
        this.$emit("deselection");
        this.isPressed = false;
      } else {
        if (!this.canBePressed) {
          return;
        }
        this.$emit("selection");
        this.isPressed = true;
      }
    }
  },
  watch:{
    "$store.state.pennyModule.moveCoin": {
      handler(){
        let coin = this.$store.state.pennyModule.moveCoin;
        if(coin.row === this.info.row && coin.col === this.info.col && coin.playerId === this.info.playerId){
          console.log("COIN", coin, "Info", this.info)
          this.press();
        }
      }
    }
  }
};
</script>

<style scoped lang="scss">
.coin {
  width: 30px;
  height: 30px;
  display: inline-block;
  cursor: pointer;
  transition: transform 0.5s;
}

.pressed {
  transform: rotateY(180deg);
  background-color: $main-color !important;
}
</style>
