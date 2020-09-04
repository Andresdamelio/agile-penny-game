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
          :can-be-pressed="canPressMoreCoins"
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
      /* selectedCoins: [], */
      movedCoins: [],
      firstSelectionDone: false
    };
  },
  computed: {
    canPressMoreCoins() {
      return this.player.selectedCoins.length < this.roundCoins;
    },
    canPlay() {
      /* const firstPlayerNotMovedAll =
        this.start && this.player.movedCoins.length < this.totalCoins;
      const notFirstPlayerNotMovedAll =
        this.previousPlayer !== null &&
        this.previousPlayer.movedCoins.length &&
        this.player.movedCoins.length < this.totalCoins;
      return firstPlayerNotMovedAll || notFirstPlayerNotMovedAll;
 */
      return true;
    }
  },
  methods: {
    onCoinSelection(rowsIndex, colsIndex) {
      if (!this.player.selectedCoins.length && !this.firstSelectionDone) {
        this.firstSelectionDone = true;
        this.$emit("firstSelectionDone", this.player.id);
      }

      const alreadySelected = this.player.selectedCoins.some(
        coin => coin.row === rowsIndex && coin.col === colsIndex
      );

      if (alreadySelected) {
        return;
      }

      /* this.selectedCoins.push({
        col: colsIndex,
        row: rowsIndex
      }); */

      this.$store.dispatch("socket_select_coin", {
        coordinateX: rowsIndex,
        coordinateY: colsIndex
      });

      /* this.$refs.coin[0].press(); */
    },

    onCoinDeselection(rowsIndex, colsIndex) {
      const index = this.player.selectedCoins.findIndex(
        coin => coin.row === rowsIndex && coin.col === colsIndex
      );

      console.log(index)

     /*  this.selectedCoins.splice(index, 1); */

      this.$store.dispatch("socket_deselect_coin", {
        coordinateX: rowsIndex,
        coordinateY: colsIndex
      });
    },
    moveCoins() {
      this.movedCoins = this.movedCoins.concat(this.player.selectedCoins);
      this.$emit("playerMoveCoins", {
        movedCoins: this.movedCoins,
        playerIndex: this.id
      });
      if (this.movedCoins.length === this.totalCoins) {
        this.movedCoins = [];
        this.firstSelectionDone = false;
      }
      /* this.selectedCoins = []; */
    },
    isMoved(rowsIndex, colsIndex) {
      return this.movedCoins.some(
        coin => coin.row === rowsIndex && coin.col === colsIndex
      );
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
  watch: {
    "player" :{
      handler(){
        console.log(`Moneda movida ${this.player.selectedCoins[this.player.selectedCoins.length-1]}`)
      }
    }
  },
  mounted() {
    console.log("player", this.player);
  }
};
</script>

<style scoped lang="scss">
.player-zone {
  width: 100%;
  height: 100%;
}
</style>
