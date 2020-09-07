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

    <h1 class="text-center">Ronda {{ configurationResult.actualRoundIndex + 1}}</h1>

    <p>
      Deben mover lotes de {{ configurationResult.rounds[configurationResult.actualRoundIndex].sizeLot}}
      {{ configurationResult.rounds[configurationResult.actualRoundIndex].sizeLot > 1 ? "monedas" : "moneda"}} hasta haber movido todas las monedas de su lugar
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
          :roundCoins="configurationResult.rounds[configurationResult.actualRoundIndex].sizeLot"
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
        this.configurationResult.actualRoundIndex ===
        this.configurationResult.rounds.length - 1
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

    onPlayerMoveCoins({ movedCoins, selectedCoins, playerIndex }) {

      let coins = [...movedCoins, ...selectedCoins];

      if (coins.length === this.configurationResult.coins) {
        this.$store.dispatch("socket_save_result", {
          time: this.actualTime,
          type: "finish"
        });
      }

      if (
        playerIndex === this.configurationResult.players.length - 1 &&
        coins.length === this.configurationResult.coins
      ) {
        if (this.isLastRound) {
          this.$emit("endgame", { results: this.results });
          return;
        }
      }
    },

    onTimeChange(timeData) {
      this.actualTime = timeData;
    },

    onFirstSelectionDone() {
      this.$store.dispatch("socket_save_result", {
        time: this.actualTime,
        type: "init"
      });
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
