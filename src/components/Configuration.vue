<template>
  <div class="container">
    <div class="row">
      <div class="col-12 mb-5">
        <h1 class="instructions-title text-center">
          ¡Bienvenido al juego de las monedas!
        </h1>
      </div>

      <div class="col-12 col-sm-12 col-md-6">
        <p class="instructions">
          En este juego tu y tus compañeros representan una fábrica que procesa
          monedas de una manera muy sencilla: Dando vuelta las monedas. Haremos
          un conjunto de experimentos en esta fábrica de monedas, para que tu y
          tus compañeros puedan ver el efecto de cambiar el tamaño del “lote” de
          monedas y su impacto en el flujo de trabajo. Un lote de monedas
          representa un conjunto de monedas, por ejemplo, un lote de 5 monedas
          representa 5 monedas, un lote de 10 monedas representa un lote de a 10
          y así sucesivamente. En cada experimento reduciremos el tamaño del
          lote, y veremos como impacta en la eficiencia de la operación.
        </p>
      </div>

      <div class="col-12 col-sm-12 col-md-5 offset-md-1 mb-2">
        <div class="card rounded">
          <div class="card-header text-center" v-if="!roundsGenerated">
            Iniciar nueva partida
          </div>
          <div class="card-header text-center" v-else>
            <h5 class="mb-0">Iteraciones en Penny Game</h5>
            <small>El juego se lleva a cabo en cuatro iteraciones.</small>
          </div>
          <div class="card-body" v-if="!roundsGenerated">
            <div class="form-group">
              <label for="namePlayer">Nombre</label>
              <input
                id="namePlayer"
                type="text"
                class="form-control"
                v-model="name"
                placeholder="Introduce tu nombre"
              />
              <small class="form-text text-danger" v-if="showRule.name"
                >El campo nombre es requerido</small
              >
            </div>
            <div>
              <p>
                Esta partida consta de 5 (cinco) participantes, si creas una
                partida, serás el primer jugador.
              </p>
            </div>
            <div class="text-right">
              <button
                class="btn btn-primary rounded create-round"
                @click="generateRounds"
                :disabled="showRule.send || load"
              >
                <span
                  class="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                  v-if="load"
                ></span>
                {{ !load ? 'Generar Rondas' : 'Generando' }}
              </button>
            </div>
          </div>
          <div class="card-body text-center" v-else>
            <p
              class="card-text"
              v-for="(round, index) in rounds"
              :key="round.key"
            >
              <span
                >Iteración {{ index + 1 }} - Lote de
                {{ round.coins }} monedas</span
              >
            </p>
            <button class="btn btn-primary rounded play-game" @click="play">
              Comenzar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

const rounds = [
  { key: 20, coins: 20 },
  { key: 10, coins: 10 },
  { key: 5, coins: 5 },
  { key: 1, coins: 1 }
];

export default {
  name: 'Configuration',
  data: () => {
    return {
      numberOfPlayers: 5,
      name: '',
      showRule: {
        number: false,
        name: false,
        send: true
      },
      load: false,
      rounds: rounds
    };
  },
  computed: {
    ...mapGetters({
      roundsGenerated: 'roundsGenerated'
    })
  },
  methods: {
    validate() {
      if (
        !this.numberOfPlayers ||
        ![2, 3, 4, 5].includes(this.numberOfPlayers) ||
        !this.name
      ) {
        this.showRule.send = true;
      } else {
        this.showRule.send = false;
      }

      if (
        !this.numberOfPlayers ||
        ![2, 3, 4, 5].includes(this.numberOfPlayers)
      ) {
        this.showRule.number = true;
      } else {
        this.showRule.number = false;
      }

      if (!this.name) {
        this.showRule.name = true;
      } else {
        this.showRule.name = false;
      }
    },

    generateRounds() {
      this.load = true;

      this.$store.dispatch('socket_new_room', {
        name: this.name,
        players: this.numberOfPlayers
      });
    },

    play() {
      this.$router.push({
        name: 'room',
        params: { id: this.$store.getters['getRoomId'] }
      });
    }
  },
  watch: {
    numberOfPlayers: 'validate',
    name: 'validate'
  },
  beforeCreate() {
    this.$store.commit('SOCKET_STOP_COUNTER');
    this.$store.commit('SOCKET_WITH_COMPUTER', false);
    this.$store.commit('ROUNDS_GENERATE', false);
  }
};
</script>

<style scoped lang="scss">
.instructions-title {
  color: #17598a;
  font-size: 30px;
  font-family: 'Manrope', sans-serif;
  font-weight: 800;
}

.btn-primary,
.btn-primary:hover,
.btn-primary:active,
.btn-primary:focus {
  background-color: #17598a !important;
  border-color: #17598a !important;
  box-shadow: none !important;
  font-family: 'Manrope', sans-serif;
  opacity: 1;
  cursor: pointer;
  color: #fff;
  font-weight: 600;
}

.instructions {
  line-height: 1.7;
  text-align: justify;
  color: #212529;
  font-family: 'Manrope', sans-serif;
}
.button-bottom {
  position: absolute;
  right: 0;
  position: absolute;
  width: 100%;
}

.card-header {
  background-color: rgba(23, 89, 138, 1);
  color: #fff;
  font-family: 'Manrope', sans-serif;
  font-weight: 600;
}

.card-body {
  color: #000;
  font-family: 'Manrope', sans-serif;
  font-weight: 500;
}
</style>
