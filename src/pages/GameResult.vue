<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 justify-content-center">
        <h3 class="text-center">
          Resultados
        </h3>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-sm-4 rounds-results-tables-container">
        <el-table v-for="(roundResult, index) in formattedResults" :key="index"
                  :data="roundResult" class="w-100 mt-2" border>
          <el-table-column :label="'Ronda ' + (index + 1)" class="text-center">
            <el-table-column prop="playerId" label="Jugador"></el-table-column>
            <el-table-column prop="initialWaiting" label="Espera Inicial"></el-table-column>
            <el-table-column prop="roundTotalPlay" label="Demora"></el-table-column>
            <el-table-column prop="deliveryTerm" label="Plazo de Entrega"></el-table-column>
          </el-table-column>
        </el-table>
      </div>
      <div class="col-12 col-sm-4 rounds-results-charts-container">

      </div>
      <div class="col-12 col-sm-4 rounds-results-resume-container">

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GameResult",
  props: ['results'],
  data(){
    return {
      formattedResults: {},
    }
  },
  created() {
    this.formattedResults = this.results.map(round => round.map((player, playerIndex) => {
      /* Initial Waiting in seconds*/
      let initialWaiting = 0;
      if(playerIndex !== 0){
        initialWaiting = player.firstSelectionDone.millis / 1000;
      }
      const lastMovementInSeconds = player.lastMovementDone.millis / 1000;
      player.deliveryTerm = lastMovementInSeconds - initialWaiting;
      player.roundTotalPlay = lastMovementInSeconds;
      player.initialWaiting = initialWaiting;
      return player;
    }));
  }
}
</script>

<style scoped>

</style>
