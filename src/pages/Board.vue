<template>
  <div class="container my-5" v-if="isThereRoom && configurationGame">
    <game-result v-if="configurationGame.actualRoundIndex > 3" />
    <template v-else>
      <button
        v-if="configurationGame.players.length === configurationGame.size"
        class="btn btn-primary timer"
        @click="stopPlayTimer"
        :disabled="currentPlayer != configurationGame.players[0].id"
      >
        <timer
          :running.sync="running"
          :restart.sync="restart"
          :currentDate.sync="currentDate"
          @timeChange="onTimeChange"
        ></timer>
      </button>
      <button
        class="ml-2 btn btn-primary"
        v-if="!running && currentPlayer == configurationGame.players[0].id && !computer && configurationGame.actualRoundIndex == 0"
        @click="createAutoPlayers"
      >Invitar {{ configurationGame.size - configurationGame.players.length }} bots</button>

      <button
        class="ml-2 btn btn-primary magic-link"
        @click="copy"
        v-if="!running && configurationGame.actualRoundIndex == 0"
      >Copiar link</button>

      <input type="hidden" :value="$store.state.pennyModule.magigLink" ref="magicLink" />

      <h1 class="text-center">Ronda {{ configurationGame.actualRoundIndex + 1}}</h1>

      <p>
        Deben mover lotes de {{ configurationGame.rounds[configurationGame.actualRoundIndex].sizeLot}} {{ configurationGame.rounds[configurationGame.actualRoundIndex].sizeLot > 1 ? "monedas" : "moneda"}} hasta haber movido todas las monedas de su lugar, cuando termines tu trabajo presiona el botón <span class="btn-primary btn-sm">Mover Lote</span> Luego observa al resto trabajar.
      </p>

      <div class="row no-gutters">
        <div
          class="col-12 col-sm"
          v-for="(player, index) in configurationGame.players"
          :key="index"
        >
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
      <div v-if="showModal">
        <template v-if="!currentPlayer">
          <transition name="modal">
            <form-player
              v-if="configurationGame.players.length < configurationGame.size"
              :showModal.sync="showModal"
            ></form-player>
          </transition>
          <transition name="modal">
            <modal-message
              v-if="configurationGame.players.length >= configurationGame.size"
              title="Sala llena"
              :showModal.sync="showModal"
            >
              <template slot="content">
                <p>Esta sala se encuentra llena, para jugar ingrese a otra sala, o cree una nueva</p>
              </template>
              <template slot="actions">
                <router-link class="btn btn-primary" to="/">Volver al incio</router-link>
              </template>
            </modal-message>
          </transition>
        </template>
        <template v-else>
          <transition name="modal">
            <modal-message title="Bienvenido" :showModal.sync="showModal">
              <template slot="content">
                <p>
                  Para comenzar el juego deben haber {{ configurationGame.size }} participantes en la sala, como administrador de la fábrica puedes invitar a {{ configurationGame.size - 1 }} amigos para que se unan a esta partida, copiando el enlace en el botón
                  <br/>  <span class="magic-link btn-sm">Copiar link</span> o en su lugar, puedes jugar con bots.
                </p>
                <p>
                  Si tienes menos de {{ configurationGame.size - 1 }} amigos disponibles para jugar en este momento, también puedes invitarlos a la sala, e invitar los bots (jugadores virtuales automáticos) que sean necesarios para completar los cinco participantes.
                </p>
              </template>
              <template slot="actions">
                <button @click="showModal = false" class="btn btn-primary">Ok</button>
              </template>
            </modal-message>
          </transition>
        </template>
      </div>
      <div
        v-if="configurationGame.showModalRound && configurationGame.actualRoundIndex > 0 && configurationGame.actualRoundIndex < 4"
      >
        <transition name="modal" v-if="currentPlayer == configurationGame.players[0].id">
          <modal-message title="Ronda terminada">
            <template slot="content">
              <p>
                Ha finalizado la ronda {{ configurationGame.actualRoundIndex }}, para iniciar con la ronda {{ configurationGame.actualRoundIndex + 1 }} presiona el botón
                <span
                  class="btn-primary btn-sm"
                >Comenzar</span>
              </p>
            </template>
            <template slot="actions">
              <button @click="$store.commit('CLOSE_MODAL_ROUNDS')" class="btn btn-primary">Ok</button>
            </template>
          </modal-message>
        </transition>
        <transition name="modal" v-else="">
          <modal-message title="Ronda terminada">
            <template slot="content">
              <p>
                Ha finalizado la ronda {{ configurationGame.actualRoundIndex }}, está por comenzar la ronda {{ configurationGame.actualRoundIndex + 1 }}, en esta se deben mover lotes de {{configurationGame.rounds[configurationGame.actualRoundIndex].sizeLot}} monedas.
              </p>
            </template>
            <template slot="actions">
              <button @click="$store.commit('CLOSE_MODAL_ROUNDS')" class="btn btn-primary">Ok</button>
            </template>
          </modal-message>
        </transition>
      </div>
    </template>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PlayerZone from "../components/PlayerZone";
import Timer from "@/components/Timer";
import FormPlayer from "@/components/FormPlayer";
import ModalMessage from "@/components/Modal";
import GameResult from "./GameResult";

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
      restart: "getTimerRestart",
      computer: "gameWithComputer"
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
          type: "finish",
          id: playerIndex
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

    onFirstSelectionDone(id) {
      this.$store.dispatch("socket_save_result", {
        time: this.actualTime,
        type: "init",
        id: id
      });
    },

    stopPlayTimer() {
      this.$store.dispatch("socket_start_counter");

      if (this.currentDate == 0) {
        this.actualTime = 0;
        this.$store.dispatch("socket_init_round");
      }
    },

    createAutoPlayers() {
      this.$store.dispatch("socket_create_auto_players");
    }
  },
  components: {
    PlayerZone,
    Timer,
    FormPlayer,
    GameResult,
    ModalMessage
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
  border-color: #00a99d !important;
  box-shadow: none !important;
}
.timer {
  background-color: #00a99d !important;
}

.magic-link,
.magic-link:focus,
.magic-link:active,
.magic-link:hover {
  background-color: #baece9 !important;
  color: #303133 !important;
}
</style>
