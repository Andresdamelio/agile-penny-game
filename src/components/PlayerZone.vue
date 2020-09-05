<template>
  <div class="player-zone border border-dark p-5" :class="{
        'border-right-0': start,
    }">
    <pre>{{ player }}</pre>
    <div v-if="canPlay">
      <div v-for="rowsIndex in distribution.rows" :key="rowsIndex">
        <coin
          v-for="colsIndex in distribution.cols"
          :class="{ 'ml-2': colsIndex !== 1}"
          :ref="`coin${rowsIndex}${colsIndex}`"
          :info="{col: colsIndex, row: rowsIndex, playerId: player.id}"
          :key="colsIndex"
          height="30px"
          width="30px"
          :received="receivedFromPreviousPlayer(rowsIndex, colsIndex)"
          :moved="isMoved(rowsIndex, colsIndex)"
          :canBePressed="canPressMoreCoins"
          @selection="onCoinSelection(rowsIndex, colsIndex)"
          @deselection="onCoinDeselection(rowsIndex, colsIndex)"
        ></coin>
      </div>
    </div>
    <div v-else>
      <p>Esperando Monedas...</p>
    </div>
    <p class="text-center">Jugador {{id}}</p>
    <el-button type="primary" v-if="canPlay && !canPressMoreCoins" @click="moveCoins">Mover lote</el-button>
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
        this.$emit("firstSelectionDone", this.player.id);
      }

      /* const alreadySelected = this.player.selectedCoins.some(
        coin => coin.row === rowsIndex && coin.col === colsIndex
      );

      if (alreadySelected) {
        return;
      } */

      this.$store.dispatch("socket_move_coin", {
        coordinateX: rowsIndex,
        coordinateY: colsIndex,
        type: "select"
      });

    },

    onCoinDeselection(rowsIndex, colsIndex) {
      /* const selected = this.player.selectedCoins.findIndex(
        coin => coin.row === rowsIndex && coin.col === colsIndex
      );

      if (!selected) {
        return;
      } */

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

    moveCoins() {

      this.$store.dispatch("socket_move_coins");

      this.movedCoins = this.movedCoins.concat(this.player.selectedCoins);
      this.$emit("playerMoveCoins", {
        movedCoins: this.movedCoins,
        playerIndex: this.id
      });

      if (this.player.movedCoins.length === this.totalCoins) {
        this.movedCoins = [];
        this.firstSelectionDone = false;
      }
      /* this.selectedCoins = []; */
    },

    receivedFromPreviousPlayer(rowsIndex, colsIndex) {
      if (this.previousPlayer === null) {
        return true;
      }
      return this.previousPlayer.movedCoins.some(
        coin => coin.row === rowsIndex && coin.col === colsIndex
      );
    }
  },
};
</script>

<style scoped lang="scss">
.player-zone {
  width: 100%;
  height: 100%;
}
</style>
