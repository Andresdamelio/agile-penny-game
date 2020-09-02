import Vue from "vue";
import Vuex from "vuex";
import VueSocketIo from "vue-socket.io";
import pennyModule from "./modules/penny-game.js";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    io: {},
    game: {
      rounds: 0,
      players: 0,
      coins: 0,
    },
  },
  getters: {
    getGame: (state) => {
      return state.game;
    },
  },
  mutations: {
    SET_SOCKET: (state, socket) => {
      console.log("Socket iniciado", socket);
      state.io = socket;
    },
    SET_GAME: (state, { rounds, players, coins }) => {
      state.game = { rounds, players, coins };
    },
  },
  modules: {
    pennyModule,
  },
});

// Socket server connection
Vue.use(
  new VueSocketIo({
    debug: true,
    connection: process.env.VUE_APP_URL,
    vuex: {
      store,
      actionPrefix: "socket_",
      mutationPrefix: "SOCKET_",
    },
  })
);

export default store;
