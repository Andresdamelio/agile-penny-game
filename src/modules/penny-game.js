const pennyModule = {
  state: {
    rooms: [],
    room: null,
    magigLink: null,
  },
  mutations: {
    ADD_ROOM: (state, room) => {
      state.rooms.push(room);
    },
    SET_ROOM: (state, room) => {
      state.room = room;
    },
    SET_MAGIG_LINK: (state, roomId) => {
      state.magigLink = new URL(`/room/${roomId}`, window.location.origin).href;
    },
    SOCKET_INIT_ROUND: (state, actualRound) => {
      console.log("Ha iniciado una ronda", state, actualRound);
    },
  },
  getters: {
    getRoomId: (state) => {
      return state.room.id;
    },
    getGame: (state) => {
      return {
        rounds: state.room.rounds,
        players: state.room.size,
        coins: 20,
      };
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
    socket_init_round: ({ rootState, state }) => {
      rootState.io.emit("initRound", state.room.id);
    },

    get_room_by_id: ({ commit }, id) => {
      fetch(`${process.env.VUE_APP_URL}/room/${id}`)
        .then((resp) => {
          return resp.json();
        })
        .then((resp) => {
          if (resp.ok) {
            commit("SET_ROOM", resp.room);
          } else {
            console.log("Ha ocurrido un error");
          }
        });
    },
  },
};

export default pennyModule;
