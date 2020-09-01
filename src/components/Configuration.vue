<template>
  <div class="container">
    <div class="row">
      <div class="col-12" v-show="loading">Cargando...</div>
      <div class="col-12 mb-4" v-show="!loading">
        <h1 class="instructions-title text-center">¡Bienvenido al juego de las monedas!</h1>
      </div>
      <div class="col-6" v-show="!loading">
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
      <div class="col-5 offset-1 text-center" v-if="!loading">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>Iniciar nueva partida</span>
          </div>
          <div v-if="!rounds_generated">
            <el-form :model="form" ref="form" :rules="rules">
              <el-form-item prop="number_of_players" label="Número de jugadores">
                <el-input-number
                  v-model="form.number_of_players"
                  controls-position="right"
                  :min="min_number_of_players"
                  :max="max_number_of_players"
                ></el-input-number>
              </el-form-item>
              <el-form-item prop="total_number_of_coins" label="Número total de monedas">
                <el-input-number
                  v-model="form.total_number_of_coins"
                  controls-position="right"
                  :min="min_number_of_coins"
                ></el-input-number>
              </el-form-item>
              <el-form-item class="button-bottom">
                <el-button type="primary" round @click="generateRounds">Generar Rondas</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div v-else>
            <h5>{{rounds.length}} Rondas</h5>
            <p class="card-text" v-for="(round, index) in rounds" :key="round.key">
              <span
                v-if="round.number_of_coins > 1"
              >Lotes de {{round.number_of_coins}} monedas en la ronda {{index + 1}}</span>
              <span v-else>Lotes de {{round.number_of_coins}} moneda en la ronda {{index + 1}}</span>
            </p>
            <el-button type="primary" @click="play">Jugar</el-button>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Configuration",
  data: () => {
    return {
      loading: false,
      rounds_generated: false,
      max_number_of_players: 5,
      min_number_of_players: 2,
      min_number_of_coins: 20,
      rounds: [],
      form: {
        number_of_players: 1,
        total_number_of_coins: 20
      },
      rules: {
        number_of_players: [
          {
            required: true,
            message: "Debes ingresar el número de jugadores",
            trigger: ["change", "blur"]
          },
          {
            type: "integer",
            min: 1,
            max: 5,
            message:
              "El número de jugadores debe ser mayor a 1 y menor o igual que 5",
            trigger: ["change", "blur"]
          }
        ]
      }
    };
  },
  methods: {
    removeRound(round) {
      const roundIndex = this.rounds.indexOf(round);
      if (roundIndex !== -1) {
        this.rounds.splice(roundIndex, 1);
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    generateRounds() {
      this.loading = true;
      this.rounds_generated = false;
      this.rounds = [];
      this.rounds.push({
        key: this.form.total_number_of_coins,
        number_of_coins: this.form.total_number_of_coins
      });
      let i = 2;
      let quotient = Math.floor(this.form.total_number_of_coins / i);
      let remainder = Math.floor(this.form.total_number_of_coins % i);
      while (quotient > 1) {
        quotient = Math.floor(this.form.total_number_of_coins / i);
        remainder = Math.floor(this.form.total_number_of_coins % i);
        if (remainder === 0) {
          this.rounds.push({
            key: quotient,
            number_of_coins: quotient
          });
        }
        i = i + 2;
      }
      this.rounds_generated = true;
      this.loading = false;
    },
    play() {
      this.$emit("play", {
        rounds: this.rounds,
        number_of_players: this.form.number_of_players,
        total_number_of_coins: this.form.total_number_of_coins
      });
    }
  }
};
</script>

<style scoped lang="scss">
.instructions-title {
  color: #e64a19;
  font-size: 28px;
}
.instructions {
  line-height: 1.7;
  text-align: justify;
  color: #606266;
}
.button-bottom{
    position: absolute;
    right: 0;
    position: absolute;
    width: 100%;
}
</style>
