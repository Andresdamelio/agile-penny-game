<template>
    <div class="container my-5">
      <el-button type="primary" @click="stopPlayTimer">
        <timer :running="timer.running" :restart="timer.restart"  v-on:timeChange="onTimeChange"></timer>
      </el-button>
        <h1 class="text-center">
            Ronda {{actualRoundIndex + 1}}
        </h1>
        <p v-if="configurationResult.rounds[actualRoundIndex].number_of_coins > 1">
            Deben moves lotes de {{this.configurationResult.rounds[actualRoundIndex].number_of_coins}}
            monedas hasta haber movido todas las monedas de su lugar
        </p>
        <p v-else>
            Deben mover lotes de {{this.configurationResult.rounds[actualRoundIndex].number_of_coins}}
            moneda hasta haber movido todas las monedas de su lugar
        </p>
        <div class="row no-gutters" v-show="showPlayerZones">
            <div class="col-12 col-sm" v-for="(player, index) in players"
                 :key="index">
                <player-zone :id="index" :start="index === 0" :end="index === players.length - 1"
                             :player="player" :previousPlayer="index !== 0 ? players[index - 1] : null"
                             :totalCoins="configurationResult.total_number_of_coins"
                             :roundCoins="configurationResult.rounds[actualRoundIndex].number_of_coins"
                             :distribution="distribution"
                             :coin-config="coinConfig"
                             v-on:playerMoveCoins="onPlayerMoveCoins"
                              v-on:firstSelectionDone="onFirstSelectionDone">
                </player-zone>
            </div>
        </div>
    </div>
</template>

<script>
    import PlayerZone from "../components/PlayerZone";
    import Timer from "@/components/Timer";
    const coinsDistribution = {
        20: {
            rows: 5,
            cols: 4,
        },
        60: {
            rows: 10,
            cols: 6,
        },
        100: {
            rows: 10,
            cols: 10
        }
    };
    export default {
        name: "Board",
        components: {
            PlayerZone,
            Timer,
        },
        props:['configurationResult'],
        data() {
            return {
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
                  actualTime: null,
              },
              results: [],
            }
        },
        computed: {
            isLastRound(){
                return this.actualRoundIndex === (this.configurationResult.rounds.length - 1);
            },
            showPlayerZones(){
              return this.timer.running;
            }
        },
        created() {
            for(let i = 0; i < this.configurationResult.number_of_players; i ++){
                this.players.push({
                    id: i,
                    movedCoins: [],
                });
            }
            this.distribution = coinsDistribution[this.configurationResult.total_number_of_coins];
            this.coinConfig.width = this.configurationResult.number_of_players > 4 ? '25px': '30px';
            this.coinConfig.height = this.configurationResult.number_of_players > 4 ? '25px': '30px';
            for(let i = 0; i < this.configurationResult.rounds.length; i++){
              this.results.push([]);
            }
        },
        methods: {
            onPlayerMoveCoins(moveData){
                const playerIndex = moveData.playerIndex;
                const movedCoins = moveData.movedCoins;
                this.players[playerIndex].movedCoins = movedCoins;
                if(movedCoins.length === this.configurationResult.total_number_of_coins) {
                  /* Register time for the last movement of coins done by the user*/
                  this.results[this.actualRoundIndex][playerIndex].lastMovementDone = this.timer.actualTime;
                }
                if(playerIndex === this.players.length -1 && movedCoins.length === this.configurationResult.total_number_of_coins){
                    if(this.isLastRound){
                      this.$emit('endgame', {
                        results: this.results,
                      });
                      return;
                    }
                    for(const player of this.players){
                        player.movedCoins = [];
                    }
                    this.actualRoundIndex++;
                    this.timer.restart = true;
                    this.timer.running = false;
                }
            },
          onTimeChange(timeData){
              this.timer.actualTime = timeData;
          },
          onFirstSelectionDone(playerId){
              this.results[this.actualRoundIndex].push({
                round: this.actualRoundIndex,
                playerId,
                firstSelectionDone: this.timer.actualTime,
                lastMovementDone: null,
              });
          },
          stopPlayTimer(){
              this.timer.restart = false;
              this.timer.running = !this.timer.running;
          }
        }
    }
</script>

<style scoped>

</style>
