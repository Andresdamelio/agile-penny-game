<template>
  <div class="container my-5" v-if="isThereRoom && !configurationGame.isFinished">
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

    <h1 class="text-center">Ronda {{ configurationGame.actualRoundIndex + 1}}</h1>

    <p>
      Deben mover lotes de {{ configurationGame.rounds[configurationGame.actualRoundIndex].sizeLot}}
      {{ configurationGame.rounds[configurationGame.actualRoundIndex].sizeLot > 1 ? "monedas" : "moneda"}} hasta haber movido todas las monedas de su lugar
    </p>

    <div class="row no-gutters">
      <div class="col-12 col-sm" v-for="(player, index) in configurationGame.players" :key="index">
        <player-zone
          :id="index"
          :start="index === 0"
          :end="index === configurationGame.players.length - 1"
          :player.sync="player"
          :previousPlayer="index !== 0 ? configurationGame.players[index - 1] : null"
          :totalCoins="configurationGame.coins"
          :roundCoins="configurationGame.rounds[configurationGame.actualRoundIndex].sizeLot"
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
  <div v-else>
    <button @click="viewResults" class="btn btn-primary">Ver resultados</button>
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
      showModal: true,
      currentPlayer: this.$store.getters["getCurrentPlayer"]
    };
  },
  computed: {
    ...mapGetters({
      isThereRoom: "isThereRoom",
      configurationGame: "getGame",
      running: "getTimerRunning",
      restart: "getTimerRestart"
    }),

    isLastRound() {
      return (
        this.configurationGame.actualRoundIndex ===
        this.configurationGame.rounds.length - 1
      );
    }
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

    onPlayerMoveCoins({ movedCoins, playerIndex }) {

      if (movedCoins.length === this.configurationGame.coins) {
        this.$store.dispatch("socket_save_result", {
          time: this.actualTime,
          type: "finish"
        });
      }

      if (
        playerIndex === this.configurationGame.players.length - 1 &&
        movedCoins.length === this.configurationGame.coins
      ) {
        if (this.isLastRound) {
          this.$store.dispatch("socket_end_game");
        }
      }
    },

    viewResults() {
      this.$router.push({
        name: "result",
        params: { id: this.$store.getters["getRoomId"] }
      });
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
  components: {
    PlayerZone,
    Timer,
    FormPlayer
  },
  beforeCreate() {
    this.$store.dispatch("get_room_by_id", this.$route.params.id);
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
