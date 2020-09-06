<template>
  <div class="container my-5" v-if="isThereRoom">
    <button class="btn btn-primary timer" @click="stopPlayTimer">
      <timer
        :running.sync="running"
        :restart.sync="restart"
        :currentDate.sync="currentDate"
        @timeChange="onTimeChange"
      ></timer>
    </button>

    <button class="ml-2 btn btn-primary magic-link" @click="copy">Copiar link</button>

    <input type="hidden" :value="$store.state.pennyModule.magigLink" ref="magicLink" />

    <h1 class="text-center">Ronda {{actualRoundIndex + 1}}</h1>

    <p>
      Deben mover lotes de {{this.configurationResult.rounds[actualRoundIndex].sizeLot}}
      {{ configurationResult.rounds[actualRoundIndex].sizeLot > 1 ? "monedas" : "moneda"}} hasta haber movido todas las monedas de su lugar
    </p>

    <div class="row no-gutters">
      <div
        class="col-12 col-sm"
        v-for="(player, index) in configurationResult.players"
        :key="index"
      >
        <player-zone
          :id="index"
          :start="index === 0"
          :end="index === configurationResult.players.length - 1"
          :player.sync="player"
          :previousPlayer="index !== 0 ? configurationResult.players[index - 1] : null"
          :totalCoins="configurationResult.coins"
          :roundCoins="configurationResult.rounds[actualRoundIndex].sizeLot"
          :distribution="distribution"
          @playerMoveCoins="onPlayerMoveCoins"
          @firstSelectionDone="onFirstSelectionDone"
        ></player-zone>
      </div>
    </div>
    <div v-if="showModal && !currentPlayer">
      <transition name="modal">
        <form-player :showModal.sync="showModal"></form-player>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PlayerZone from "../components/PlayerZone";
import Timer from "@/components/Timer";
import FormPlayer from "@/components/FormPlayer";

export default {
  name: "Board",
  data() {
    return {
      currentDate: 0,
      distribution: { rows: 5, cols: 4 },
      players: [],
      actualRoundIndex: 0,
      actualTime: null,
      results: [],
      showModal: true,
      currentPlayer: this.$store.getters["getCurrentPlayer"]
    };
  },
  computed: {
    ...mapGetters({
      isThereRoom: "isThereRoom",
      configurationResult: "getGame",
      running: "getTimerRunning",
      restart: "getTimerRestart"
    }),

    isLastRound() {
      return (
        this.actualRoundIndex === this.configurationResult.rounds.length - 1
      );
    }
  },
  components: {
    PlayerZone,
    Timer,
    FormPlayer
  },

  methods: {
    copy() {
      let magicLink = this.$refs.magicLink;
      magicLink.setAttribute("type", "text");
      magicLink.select();
      document.execCommand("copy");
      magicLink.setAttribute("type", "hidden");

      this.$store.commit("SOCKET_SHOW_NOTIFY", {
        notify: {
          show: true,
          title: "Enlace copiado",
          message: "El enlace se ha copiado con éxito"
        }
      });
    },

    onPlayerMoveCoins(moveData) {
      const playerIndex = moveData.playerIndex;
      const movedCoins = moveData.movedCoins;

      //this.players[playerIndex].movedCoins = movedCoins;

      if (movedCoins.length === this.configurationResult.coins) {
        /* Register time for the last movement of coins done by the user*/
        this.results[this.actualRoundIndex][
          playerIndex
        ].lastMovementDone = this.actualTime;
      }

      if (
        playerIndex === this.players.length - 1 &&
        movedCoins.length === this.configurationResult.coins
      ) {
        if (this.isLastRound) {
          this.$emit("endgame", { results: this.results });
          return;
        }

        /* for (const player of this.players) {
          player.movedCoins = [];
        } */

        this.actualRoundIndex++;
        /* this.timer.restart = true;
        this.timer.running = false; */
      }
    },
    onTimeChange(timeData) {
      this.actualTime = timeData;
    },
    onFirstSelectionDone(playerId) {
      /* this.results[this.actualRoundIndex].push({
        round: this.actualRoundIndex,
        playerId,
        firstSelectionDone: this.actualTime,
        lastMovementDone: null
      }); */
      console.log(playerId);
      return true;
    },

    stopPlayTimer() {

      this.$store.dispatch("socket_start_counter");

      if (this.currentDate == 0) {
        this.$store.dispatch("socket_init_round");
      }
    }
  },
  beforeCreate() {
    this.$store.dispatch("get_room_by_id", this.$route.params.id);
  },
  created() {
    for (let i = 0; i < this.configurationResult.players; i++) {
      this.players.push({
        id: i,
        movedCoins: []
      });
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
