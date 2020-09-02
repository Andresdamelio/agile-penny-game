<template>
  <div class="container">
    <div class="row">
      <div class="col-12 mb-5">
        <h1 class="instructions-title text-center">¡Bienvenido al juego de las monedas!</h1>
      </div>

      <div class="col-12 col-sm-12 col-md-6">
        <p class="instructions">
          En este juego tu y tus compañeros representan una
          fábrica que procesa monedas de una manera muy sencilla: Dando vuelta monedas.
          Para que tu y tus compañeros puedan ver el efecto de cambiar el tamaño del “lote” de
          monedas y su impacto en el flujo de trabajo, haremos un conjunto de experimentos en
          esta fábrica de monedas.
          Un lote de monedas representa un conjunto de monedas, por ejemplo, un lote de 5
          monedas representa 5 monedas, un lote de 10 monedas representa un lote de a 10 y así
          sucesivamente.
          En la fábrica en cada experimento cambiaremos cada lote a un menor tamaño y veremos
          como impacta en la eficiencia de la operación.
        </p>
      </div>

      <div class="col-12 col-sm-12 col-md-5 offset-md-1 mb-2">
        <div class="card rounded">
          <div class="card-header text-center" v-if="!rounds_generated">Iniciar nueva partida</div>
          <div class="card-header text-center" v-else>
            <h5 class="mb-0">Iteraciones en Penny Game</h5>
            <small>El juego se lleva a cabo en cuatro iteraciones.</small>
          </div>
          <div class="card-body" v-if="!rounds_generated">
            <div class="form-group">
              <label for="numberPlayers">Número de jugadores</label>
              <input
                type="number"
                class="form-control"
                id="numberPlayers"
                min="2"
                max="5"
                v-model.number="numberOfPlayers"
                placeholder="Indique el nro de jugadores"
              />
              <small
                class="form-text text-danger"
                v-if="showRule"
              >El número de jugadores debe ser mayor a 1 y menor o igual que 5</small>
            </div>
            <div class="text-right">
              <button
                class="btn btn-primary rounded create-round"
                @click="generateRounds"
                :disabled="showRule"
              >Generar Rondas</button>
            </div>
          </div>
          <div class="card-body text-center" v-else>
            <p class="card-text" v-for="(round, index) in rounds" :key="round.key">
              <span>Iteración {{index + 1}} - Lote de {{round.coins}} monedas</span>
            </p>
            <button class="btn btn-primary rounded play-game" @click="play">Comenzar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const rounds = [
  { key: 20, coins: 20 },
  { key: 10, coins: 10 },
  { key: 5, coins: 5 },
  { key: 1, coins: 1 }
];

export default {
  name: "Configuration",
  data: () => {
    return {
      numberOfPlayers: 2,
      showRule: false,
      rounds: rounds,
      rounds_generated: false
    };
  },
  methods: {
    validate() {
      if (
        !this.numberOfPlayers ||
        ![2, 3, 4, 5].includes(this.numberOfPlayers)
      ) {
        this.showRule = true;
      } else {
        this.showRule = false;
      }
    },

    generateRounds() {
      this.rounds_generated = true;
      this.$store.dispatch("socket_new_room", this.numberOfPlayers);
    },

    play() {
      this.$store.commit("SET_GAME", {
        rounds: this.rounds,
        players: this.numberOfPlayers,
        coins: 20
      });

      this.$router.push({
        name: "room",
        params: { id: this.$store.getters["getRoomId"] }
      });
    }
  },
  watch: {
    numberOfPlayers: "validate"
  }
};
</script>

<style scoped lang="scss">
.instructions-title {
  color: #e64a19;
  font-size: 28px;
}

.create-round,
.play-game,
.create-round:hover,
.play-game:hover,
.create-round:active,
.play-game:active {
  background-color: #e64a19 !important;
  border-color: #e64a19 !important;
}

.instructions {
  line-height: 1.7;
  text-align: justify;
  color: #606266;
}
.button-bottom {
  position: absolute;
  right: 0;
  position: absolute;
  width: 100%;
}
</style>
