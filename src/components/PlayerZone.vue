<template>
    <div class="player-zone border border-dark p-5" :class="{
        'border-right-0': start,
    }">
        <div v-if="canPlay">
            <div v-for="rowsIndex in distribution.rows" :key="rowsIndex">
                <coin :class="{ 'ml-2': colsIndex !== 1}" v-for="colsIndex in distribution.cols"
                      :key="colsIndex" v-on:selection="onCoinSelection(rowsIndex, colsIndex)"
                      :received="receivedFromPreviousPlayer(rowsIndex, colsIndex)"
                      :moved="isMoved(rowsIndex, colsIndex)"
                      :height="coinConfig.width"
                      :width="coinConfig.height"
                v-on:deselection="onCoinDeselection(rowsIndex, colsIndex)" :can-be-pressed="canPressMoreCoins">
                </coin>
            </div>
        </div>
        <div v-else>
            <p>
                Esperando Monedas...
            </p>
        </div>
        <p class="text-center">
            Jugador {{id}}
        </p>
        <el-button type="primary" v-if="canPlay && !canPressMoreCoins" @click="moveCoins">
            Mover lote
        </el-button>
    </div>
</template>

<script>
    import Coin from "./Coin";
    export default {
        name: "PlayerZone",
        components: {
            Coin
        },
        props: ['id', 'start', 'end', 'distribution', 'player', 'previousPlayer', 'totalCoins', 'roundCoins', 'coinConfig'],
        data(){
            return {
                selectedCoins: [],
                movedCoins: [],
              firstSelectionDone: false
            }
        },
        computed: {
          canPressMoreCoins(){
                return this.selectedCoins.length < this.roundCoins;
          },
            canPlay(){
              const firstPlayerNotMovedAll = this.start && this.player.movedCoins.length < this.totalCoins;
              const notFirstPlayerNotMovedAll = this.previousPlayer !== null && this.previousPlayer.movedCoins.length && this.player.movedCoins.length < this.totalCoins;
              return firstPlayerNotMovedAll || notFirstPlayerNotMovedAll;
            }
        },
        methods: {
            onCoinSelection(rowsIndex, colsIndex){
              if(!this.selectedCoins.length && !this.firstSelectionDone){
                this.firstSelectionDone = true;
                this.$emit('firstSelectionDone', this.player.id);
              }
                const alreadySelected = this.selectedCoins.some(coin => coin.row === rowsIndex && coin.col === colsIndex);
                if(alreadySelected){
                    return;
                }
                this.selectedCoins.push({
                    col: colsIndex,
                    row: rowsIndex,
                });
            },
            onCoinDeselection(rowsIndex, colsIndex){
                const index = this.selectedCoins.findIndex(coin => coin.row === rowsIndex && coin.col === colsIndex);
                this.selectedCoins.splice(index, 1);
            },
            moveCoins(){
                this.movedCoins = this.movedCoins.concat(this.selectedCoins);
                this.$emit('playerMoveCoins', {
                    movedCoins: this.movedCoins,
                    playerIndex: this.id,
                });
                if(this.movedCoins.length === this.totalCoins){
                    this.movedCoins = [];
                    this.firstSelectionDone = false;
                }
                this.selectedCoins = [];
            },
            isMoved(rowsIndex, colsIndex){
                return this.movedCoins.some(coin => coin.row === rowsIndex && coin.col === colsIndex);
            },
            receivedFromPreviousPlayer(rowsIndex, colsIndex){
                if(this.previousPlayer === null){
                    return true;
                }
                return this.previousPlayer.movedCoins
                    .some(coin => coin.row === rowsIndex && coin.col === colsIndex);
            }
        }
    }
</script>

<style scoped lang="scss">
    .player-zone {
        width: 100%;
        height: 100%;
    }
</style>
