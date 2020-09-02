const pennyModule = {
  state: {
    rooms: [],
    room: null,
    magigLink: null,
    game: {
      rounds: 0,
      players: 0,
      coins: 0,
    },
  },
  mutations: {
    SET_ROOM: (state, room) => {
      state.room = room;
    },
    SET_MAGIG_LINK: (state, roomId) => {
      state.magigLink = new URL(
        `/room/${roomId}`,
        process.env.VUE_APP_URL
      ).href;
      console.log(state.magigLink);
    },
    SET_GAME: (state, { rounds, players, coins }) => {
      state.game = { rounds, players, coins };
    },
  },
  getters: {
    getRoomId: (state) => {
      return state.room.id;
    },
    getGame: (state) => {
      return state.game;
    },
  },
  actions: {
    socket_new_room: ({ rootState, commit }, numberOfPlayers) => {
      rootState.io.emit("newRoom", numberOfPlayers, (resp) => {
        if (resp.ok) {
          commit("SET_ROOM", resp.room);
          commit("SET_MAGIG_LINK", resp.room.id);
        } else {
          console.error("Algo salió mal, no se pudo crear la sala");
        }
      });
    },
  },
};

export default pennyModule;
