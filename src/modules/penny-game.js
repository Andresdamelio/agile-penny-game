const pennyModule = {
  state: {
    rooms: [],
    room: null,
    magigLink: null,
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
  },
  getters: {
    getRoomId: (state) => {
      return state.room.id;
    }
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
