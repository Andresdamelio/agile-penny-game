const pennyModule = {
  state: {
    rooms: [],
    room: null,
    magigLink: null,
    isThereRoom: false,
    currentPlayer: null,
  },
  mutations: {
    ADD_ROOM: (state, room) => {
      state.rooms.push(room);
    },
    SET_ROOM: (state, room) => {
      state.room = room;
      state.isThereRoom = true;
    },
    SET_MAGIG_LINK: (state, roomId) => {
      state.magigLink = new URL(`/room/${roomId}`, window.location.origin).href;
    },
    SET_CURRENT_PLAYER: (state, id) => {
      state.currentPlayer = id;
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
        rounds: state.room?.rounds ? state.room.rounds : [],
        players: state.room?.size ? state.room.size : 2,
        coins: 20,
      };
    },
    isThereRoom: (state) => {
      return state.isThereRoom;
    },
    getCurrentPlayer: (state) => {
      return state.currentPlayer;
    }
  },
  actions: {
    socket_new_room: ({ rootState, commit, dispatch }, { name, players }) => {
      rootState.io.emit("newRoom", players, (resp) => {
        const { room } = resp;
        if (resp.ok) {
          commit("ADD_ROOM", room);
          commit("SET_MAGIG_LINK", room.id);
          dispatch("socket_join_room", { name, roomId: room.id });
        } else {
          console.error("Algo salió mal, no se pudo crear la sala");
        }
      });
    },

    socket_join_room: ({ rootState, commit }, { name, roomId }) => {
      rootState.io.emit("joinRoom", { name, roomId }, (resp) => {
        const { room } = resp;
        if (resp.ok) {
          commit("SET_ROOM", room);
          commit(
            "SET_CURRENT_PLAYER",
            room.players[room.players.length - 1].id
          );
        } else {
          console.log("Algo salió mal, recargue la página");
        }
      });
    },

    socket_init_round: ({ rootState, state }) => {
      rootState.io.emit("initRound", state.room.id);
    },

    get_room_by_id: ({ commit }, id) => {
      fetch(`${process.env.VUE_APP_URL}/room/${id}`)
        .then((resp) => resp.json())
        .then((resp) => {
          if (resp.ok) {
            commit("SET_ROOM", resp.room);
          } else {
            console.log("Algo salió mal, recargue la página");
          }
        });
    },
  },
};

export default pennyModule;
