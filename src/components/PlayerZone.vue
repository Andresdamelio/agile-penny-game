<template>
  <div class="card h-100">
    <div class="card-header">
      <strong>{{ player.name }}</strong>
      - Jugador #{{id+1}}
    </div>
    <div class="card-body">
      <div v-if="canPlay">
        <div v-for="rowsIndex in distribution.rows" :key="rowsIndex">
          <coin
            v-for="colsIndex in distribution.cols"
            :class="{ 'ml-2': colsIndex !== 1}"
            :ref="`coin${rowsIndex}${colsIndex}`"
            :info="{col: colsIndex, row: rowsIndex, player: player}"
            :key="colsIndex"
            :received="receivedFromPreviousPlayer(rowsIndex, colsIndex)"
            :moved="isMoved(rowsIndex, colsIndex)"
            :canBePressed="canPressMoreCoins"
            @selection="onCoinSelection(rowsIndex, colsIndex)"
            @deselection="onCoinDeselection(rowsIndex, colsIndex)"
          ></coin>
        </div>
      </div>
      <div v-else>
        <div class="text-center mt-5">
          <div class="spinner-border text-warning" role="status">
          </div>
          <p>
            Esperando monedas...
          </p>
        </div>
      </div>
      <div class="mt-3">
        <button
          class="btn btn-primary"
          type="primary"
          v-if="canPlay && !canPressMoreCoins && player.id === $store.state.pennyModule.currentPlayer"
          @click="moveCoins"
        >Mover lote</button>
      </div>
    </div>
  </div>
</template>

<script>
import Coin from "./Coin";
export default {
  name: "PlayerZone",
  components: {
    Coin
  },
  props: [
    "id",
    "start",
    "end",
    "distribution",
    "player",
    "previousPlayer",
    "totalCoins",
    "roundCoins"
  ],
  data() {
    return {
      movedCoins: [],
      firstSelectionDone: false
    };
  },
  computed: {
    canPressMoreCoins() {
      return this.player.selectedCoins.length < this.roundCoins;
    },
    canPlay() {
      const firstPlayerNotMovedAll =
        this.start && this.player.movedCoins.length < this.totalCoins;
      const notFirstPlayerNotMovedAll =
        this.previousPlayer !== null &&
        this.previousPlayer.movedCoins.length &&
        this.player.movedCoins.length < this.totalCoins;
      return firstPlayerNotMovedAll || notFirstPlayerNotMovedAll;
    }
  },
  methods: {
    onCoinSelection(rowsIndex, colsIndex) {
      if (!this.player.selectedCoins.length && !this.firstSelectionDone) {
        this.firstSelectionDone = true;
        this.$emit("firstSelectionDone");
      }

      const alreadySelected = this.player.selectedCoins.some(
        coin => coin.row === rowsIndex && coin.col === colsIndex
      );

      if (alreadySelected) {
        return;
      }

      this.$store.dispatch("socket_move_coin", {
        coordinateX: rowsIndex,
        coordinateY: colsIndex,
        type: "select"
      });
    },

    onCoinDeselection(rowsIndex, colsIndex) {
      const selected = this.player.selectedCoins.some(
        coin => coin.row === rowsIndex && coin.col === colsIndex
      );

      if (!selected) {
        return;
      }

      this.$store.dispatch("socket_move_coin", {
        coordinateX: rowsIndex,
        coordinateY: colsIndex,
        type: "deselect"
      });
    },

    isMoved(rowsIndex, colsIndex) {
      return this.player.movedCoins.some(
        coin => coin.row === rowsIndex && coin.col === colsIndex
      );
    },

    async moveCoins() {
      await this.$store.dispatch("socket_move_coins");

      this.$emit("playerMoveCoins", {
        playerIndex: this.id,
        selectedCoins: this.player.selectedCoins,
        movedCoins: this.player.movedCoins,
      });

      if (this.player.movedCoins.length === this.totalCoins) {
        this.firstSelectionDone = false;
      }
    },

    receivedFromPreviousPlayer(rowsIndex, colsIndex) {
      if (this.previousPlayer === null) {
        return true;
      }
      return this.previousPlayer.movedCoins.some(
        coin => coin.row === rowsIndex && coin.col === colsIndex
      );
    }
  }
};
</script>

<style scoped lang="scss">
.player-zone {
  width: 100%;
  height: 100%;
}
</style>
