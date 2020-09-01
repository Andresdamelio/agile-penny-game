<template>
  <div id="app">
    <Header></Header>
    <game-index></game-index>
    <Footer></Footer>
  </div>
</template>

<script>
import GameIndex from "./pages/GameIndex";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default {
  name: 'App',
  components: {
    Footer,
    Header,
    GameIndex,
  }
}
</script>

<style lang="scss">
  @import "~bootstrap/dist/css/bootstrap.css";
  @import "./assets/global_variables.scss";

  #app {
    height: 100%;
    overflow: auto;
  }
</style>
