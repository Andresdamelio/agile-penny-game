<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
    <!-- <game-index></game-index> -->
    <Footer></Footer>
    <notify></notify>
  </div>
</template>

<script>
// import GameIndex from "./pages/GameIndex";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Notify from "./components/Notify";

export default {
  name: 'App',
  components: {
    Footer,
    Header,
    Notify
    // GameIndex,
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
