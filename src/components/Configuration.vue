<template>
  <div class="container">
    <div class="row">
      <div class="col-12" v-show="loading">Cargando...</div>
      <div class="col-12" v-show="!loading">
        <h1 class="instructions-title text-center">¡Bienvenido al juego de de las monedas!</h1>
      </div>
      <div class="col-6" v-show="!loading">
        <p class="instructions">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tristique, turpis id ultricies condimentum, turpis nisl laoreet est, non ultricies ipsum magna sed turpis. Ut augue felis, laoreet non massa at, ullamcorper congue diam. Nam laoreet sagittis feugiat. Vestibulum vitae elit facilisis, suscipit nunc at, hendrerit lorem. Nullam nec porttitor quam, ut viverra nisi. Pellentesque viverra enim nisl, eget ornare libero tempus eu. Integer blandit varius neque laoreet ullamcorper. Sed maximus magna at tellus imperdiet cursus. Integer varius, nisi lobortis finibus efficitur, nisi orci volutpat odio, sed luctus augue ante at tortor. Cras tempor auctor tortor vitae iaculis.
          Aenean sit amet euismod enim. Ut finibus imperdiet magna vel placerat. Vivamus ut eros mi. Cras sollicitudin ultricies ligula. Sed quis nulla id ipsum vestibulum commodo. Donec id nulla quis nisi mollis suscipit sit amet porttitor turpis. Vestibulum cursus scelerisque sem sit amet vehicula. Nam sodales in nisl ac elementum. Nunc euismod sodales libero, et faucibus neque sagittis nec. Maecenas mattis ornare nisi quis cursus. Nulla facilisi. Nam eu tincidunt leo. Mauris ultricies arcu ex, et lacinia tortor pellentesque in. Vestibulum sed mollis sem, sit amet viverra eros. Nunc congue lacus libero.
          Sed dictum eleifend arcu, sed faucibus ligula pellentesque nec. Praesent euismod pharetra lacus a porttitor. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam erat volutpat. Aliquam in iaculis magna. Nullam egestas erat ac interdum aliquet. Nullam vitae fermentum diam, eleifend blandit nunc. Vestibulum rutrum tempus lorem quis lacinia. Integer consequat ante a dolor pellentesque, quis sollicitudin dui accumsan. Mauris pellentesque lacus ut ex vestibulum, sit amet laoreet nibh scelerisque. Cras non tortor eget lacus tincidunt pellentesque ac ornare felis. Donec quis lectus ullamcorper, tempus lectus quis, sollicitudin tortor. Fusce nec sem aliquam, venenatis elit at, fermentum ipsum. Nullam id mi sed ipsum gravida consequat.
          Duis mauris risus, efficitur at tortor sit amet, blandit vulputate nisl. Quisque vel diam a nisi rhoncus vehicula ut sed leo. Pellentesque pellentesque dignissim posuere. Praesent a magna euismod, feugiat mauris dictum, tincidunt augue. Mauris tempus felis eget tincidunt euismod. Aliquam massa nibh, tristique et nibh eu, congue hendrerit purus. Nunc sodales lobortis blandit. Aenean nec arcu eget lacus interdum lacinia feugiat non arcu. Nam ut neque libero. Nunc ac ligula vel magna elementum elementum a cursus ipsum. Nam imperdiet a metus sit amet tempus. Phasellus sed lorem scelerisque, scelerisque nulla non, commodo nisl. Suspendisse est dolor, dignissim at viverra sed, vestibulum ac neque. Nulla et purus dapibus, mollis elit vel, sagittis ex. Morbi sit amet dignissim ante.
          Ut et egestas diam. Donec tempor lacinia convallis. Suspendisse sed nisl maximus, volutpat massa non, posuere velit. Sed fermentum aliquet justo, nec sodales nunc viverra quis. In ullamcorper mauris velit, quis ornare nunc commodo eu. Duis volutpat libero quis lobortis cursus. Donec porta sem et est convallis consequat. Vestibulum tempor ligula et mauris sollicitudin, nec lobortis metus luctus. Phasellus accumsan metus eget eros blandit, quis porta lectus convallis. Donec ultrices quis tellus id pharetra. Etiam nec sapien sit amet sem feugiat iaculis. Aliquam vulputate iaculis tempus.
          Vivamus et libero urna. Quisque vitae nulla ut quam pretium tincidunt. Curabitur elementum porttitor quam vitae molestie. Sed ut dolor scelerisque, accumsan arcu non, varius lectus. Pellentesque dignissim turpis et lacus tempus, sit amet feugiat lacus sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla condimentum metus neque, vitae iaculis sapien fermentum et. Etiam ultrices lobortis turpis sed blandit. Nunc vel consectetur sem, at tincidunt magna.
        </p>
      </div>
      <div class="col-5 offset-1 text-center" v-if="!loading">
        <el-card class="box-card">
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
              <el-form-item>
                <el-button type="primary" @click="generateRounds">Generar Rondas</el-button>
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

<style scoped>
</style>
