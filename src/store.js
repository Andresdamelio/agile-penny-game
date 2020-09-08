import Vue from "vue";
import Vuex from "vuex";
import VueSocketIo from "vue-socket.io";
import pennyModule from "./modules/penny-game.js";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    io: {},
    notify: {
      show: false,
    },
  },
  mutations: {
    SET_SOCKET: (state, socket) => {
      state.io = socket;
    },
    SOCKET_SHOW_NOTIFY: (state, {notify}) => {
      state.notify = notify;
      setTimeout(() => {
        state.notify = { show: false };
      }, 3000);
    },
  },
  actions: {
    setNotify: ({commit}, notify) => {
      commit('SHOW_NOTIFY', notify);
    }
  },
  getters: {
    getNotify: (state) => {
      return state.notify;
    }
  },
  modules: {
    pennyModule,
  },
});

// Socket server connection
Vue.use(
  new VueSocketIo({
    debug: false,
    connection: process.env.VUE_APP_URL,
    vuex: {
      store,
      actionPrefix: "socket_",
      mutationPrefix: "SOCKET_",
    },
  })
);

export default store;
