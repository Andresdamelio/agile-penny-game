const pennyModule = {
  state: {
    rooms: [],
    room: null,
  },
  mutations: {
    SOCKET_SET_ROOM: (state, room) => {
      state.room = room;
    },
  },
  getters: {},
  actions: {
    socket_new_room: ({ rootState }) => {
      rootState.io.emit("newRoom");
    },
  },
};

export default pennyModule;
