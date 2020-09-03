<template>
  <div class="container my-5">
    <button class="btn btn-primary timer" @click="stopPlayTimer">
      <timer
        :running="timer.running"
        :currentDate.sync="currentDate"
        :restart="timer.restart"
        v-on:timeChange="onTimeChange"
      ></timer>
    </button>

    <button class="ml-2 btn btn-primary magic-link" @click="copy">Copiar link</button>

    <input type="hidden" :value="$store.state.pennyModule.magigLink" ref="magicLink" />

    <h1 class="text-center">Ronda {{actualRoundIndex + 1}}</h1>

    <p>
      Deben mover lotes de {{this.configurationResult.rounds[actualRoundIndex].sizeLot}}
      {{ configurationResult.rounds[actualRoundIndex].sizeLot > 1 ? "monedas" : "moneda"}} hasta haber movido todas las monedas de su lugar
    </p>

    <div class="row no-gutters" v-show="showPlayerZones">
      <div class="col-12 col-sm" v-for="(player, index) in players" :key="index">
        <player-zone
          :id="index"
          :start="index === 0"
          :end="index === players.length - 1"
          :player="player"
          :previousPlayer="index !== 0 ? players[index - 1] : null"
          :totalCoins="configurationResult.coins"
          :roundCoins="configurationResult.rounds[actualRoundIndex].sizeLot"
          :distribution="distribution"
          :coin-config="coinConfig"
          v-on:playerMoveCoins="onPlayerMoveCoins"
          v-on:firstSelectionDone="onFirstSelectionDone"
        ></player-zone>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PlayerZone from "../components/PlayerZone";
import Timer from "@/components/Timer";
const coinsDistribution = {
  20: {
    rows: 5,
    cols: 4
  },
  60: {
    rows: 10,
    cols: 6
  },
  100: {
    rows: 10,
    cols: 10
  }
};

export default {
  name: "Board",
  data() {
    return {
      currentDate: 0,
      distribution: null,
      players: [],
      actualRoundIndex: 0,
      coinConfig: {
        width: null,
        height: null
      },
      timer: {
        running: false,
        restart: false,
        actualTime: null
      },
      results: []
    };
  },
  computed: {
    ...mapGetters({
      configurationResult: "getGame"
    }),

    isLastRound() {
      return (
        this.actualRoundIndex === this.configurationResult.rounds.length - 1
      );
    },
    showPlayerZones() {
      return this.timer.running;
    }
  },
  components: {
    PlayerZone,
    Timer
  },

  methods: {
    copy() {
      let magicLink = this.$refs.magicLink;
      magicLink.setAttribute("type", "text");
      magicLink.select();
      document.execCommand("copy");
      magicLink.setAttribute("type", "hidden");
    },

    onPlayerMoveCoins(moveData) {
      const playerIndex = moveData.playerIndex;
      const movedCoins = moveData.movedCoins;
      this.players[playerIndex].movedCoins = movedCoins;
      if (movedCoins.length === this.configurationResult.coins) {
        /* Register time for the last movement of coins done by the user*/
        this.results[this.actualRoundIndex][
          playerIndex
        ].lastMovementDone = this.timer.actualTime;
      }
      if (
        playerIndex === this.players.length - 1 &&
        movedCoins.length === this.configurationResult.coins
      ) {
        if (this.isLastRound) {
          this.$emit("endgame", {
            results: this.results
          });
          return;
        }
        for (const player of this.players) {
          player.movedCoins = [];
        }
        this.actualRoundIndex++;
        this.timer.restart = true;
        this.timer.running = false;
      }
    },
    onTimeChange(timeData) {
      this.timer.actualTime = timeData;
    },
    onFirstSelectionDone(playerId) {
      this.results[this.actualRoundIndex].push({
        round: this.actualRoundIndex,
        playerId,
        firstSelectionDone: this.timer.actualTime,
        lastMovementDone: null
      });
    },
    stopPlayTimer() {
      this.timer.restart = false;
      this.timer.running = !this.timer.running;

      if (this.currentDate == 0) {
        this.$store.dispatch("socket_init_round");
      }
    }
  },
  created() {
    for (let i = 0; i < this.configurationResult.players; i++) {
      this.players.push({
        id: i,
        movedCoins: []
      });
    }
    this.distribution = coinsDistribution[this.configurationResult.coins];
    this.coinConfig.width =
      this.configurationResult.players > 4 ? "25px" : "30px";
    this.coinConfig.height =
      this.configurationResult.players > 4 ? "25px" : "30px";
    for (let i = 0; i < this.configurationResult.rounds.length; i++) {
      this.results.push([]);
    }
  }
};
</script>

<style scoped lang="scss">
.btn-primary,
.btn-primary:hover,
.btn-primary:active,
.btn-primary:focus {
  border-color: #e64a19 !important;
  box-shadow: none !important;
}
.timer {
  background-color: #e64a19 !important;
}

.magic-link,
.magic-link:focus,
.magic-link:active {
  background-color: #ffecb3 !important;
  color: #303133 !important;
}
</style>
