<template>
    <div class="custom-body">
        <configuration @play="onPlay" v-if="!isAlreadyConfigured && !gameFinished">
        </configuration>
        <board v-if="isAlreadyConfigured && !gameFinished"
               :configuration-result="configurationResult" v-on:endgame="onEndgame">
        </board>
      <game-result v-if="gameFinished" :results="results">
      </game-result>
    </div>
</template>

<script>
    import Configuration from "../components/Configuration";
    import Board from "./Board";
    import GameResult from "@/pages/GameResult";

    export default {
        name: "GameIndex",
        components: {GameResult, Configuration, Board},
        computed: {
            isAlreadyConfigured(){
                return this.configurationResult !== null;
            },
          gameFinished(){
              return this.results !== null;
          }
        },
        data: () => {
            return {
                configurationResult: null,
              results: null
            }
        },
        methods: {
            onPlay(configurationResult){
                this.configurationResult = configurationResult;
            },
            onEndgame(resultsData){
              this.results = resultsData.results;
            }
        }
    }
</script>

<style scoped lang="scss">
    .custom-body {
        height: 100%;
        overflow: auto;
        padding-top: $header-height + $header1-height;
        padding-bottom: $footer-height;
    }
</style>
