<template>
  <div
    class="rounded-circle bg-warning coin border"
    @click="press"
    :class="{ pressed: isPressed, moved: moved,  'click-disabled': !isCurrentPlayer || !running}"
    v-if="!moved && received"
  ></div>
</template>

<script>

import { mapGetters } from "vuex";

export default {
  name: "Coin",
  props: ["received", "canBePressed", "moved", "info"],
  data() {
    return {
      isPressed: false
    };
  },
  computed: {
    ...mapGetters({
      running: "getTimerRunning",
    }),
    isCurrentPlayer() {
      return this.info.player.id === this.$store.state.pennyModule.currentPlayer;
    }
  },
  methods: {
    press() {
      if (this.isPressed) {
        this.$emit("deselection");
        this.isPressed = false;
        return;
      } else {
        if (!this.canBePressed) {
          if (this.info.player.selectedCoins.some(coin => coin.row === this.info.row && coin.col === this.info.col)) {
            this.$emit("selection");
            this.isPressed = true;
          }
          return;
        }
        this.$emit("selection");
        this.isPressed = true;
      }
    }
  },
  watch: {
    "$store.state.pennyModule.moveCoin": {
      handler() {
        let coin = this.$store.state.pennyModule.moveCoin;
        if (
          coin.row === this.info.row &&
          coin.col === this.info.col &&
          coin.playerId === this.info.player.id
        ) {
          this.press();
        }
      }
    }
  }
};
</script>

<style scoped lang="scss">
.coin {
  width: 33px;
  height: 33px;
  display: inline-block;
  cursor: pointer;
  border-color: #f44336 !important;
  transition: transform 0.5s;
  &:not(.pressed) {
    background-image: url("../assets/img/dcoin.svg");
    background-size: cover;
  }
}

.pressed {
  transform: rotateY(180deg);
  background-image: url("../assets/img/coin.svg");
  background-size: cover;
  background-color: #FF5722 !important;
}

.click-disabled {
  pointer-events: none;
}
</style>
