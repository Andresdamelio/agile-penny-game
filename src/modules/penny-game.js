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
    ADD_ROOM: (state, room) => {
      state.rooms.push(room);
    },
    SET_ROOM: (state, room) => {
      state.room = room;
    },
    SET_MAGIG_LINK: (state, roomId) => {
      state.magigLink = new URL(
        `/room/${roomId}`,
        process.env.VUE_APP_URL
      ).href;
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
    socket_new_room: ({ rootState, commit }, { name, players }) => {
      rootState.io.emit("newRoom", players, (resp) => {
        if (resp.ok) {
          commit("SET_MAGIG_LINK", resp.room.id);
          rootState.io.emit(
            "joinRoom",
            { name, roomId: resp.room.id },
            (resp) => {
              if (resp.ok) {
                commit("ADD_ROOM", resp.room);
                commit("SET_ROOM", resp.room);
              }
            }
          );
        } else {
          console.error("Algo salió mal, no se pudo crear la sala");
        }
      });
    },
  },
};

export default pennyModule;
