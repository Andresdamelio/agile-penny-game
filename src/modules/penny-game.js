const pennyModule = {
  state: {
    rooms: [],
    moveCoin: {},
    room: null,
    magigLink: null,
    currentPlayer: null,
    gameResults: null,
    gameFinish: false,
    isThereRoom: false,
    timerRunning: false,
    timerRestart: false,
    showModalRound: false,
    gameWithTheComputer: false,
    roundsGenerated: false,
    movingAutoPlayer: {player: null, status: false},
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
    SET_RESULTS: (state, resume) => {
      state.gameResults = resume;
    },
    ROUNDS_GENERATE: (state, status) => {
      state.roundsGenerated = status;
    },
    CLOSE_MODAL_ROUNDS: (state) => {
      state.showModalRound = false;
    },
    SOCKET_INIT_ROUND: (state, room) => {
      state.room = room;
    },
    SOCKET_NEW_PLAYER: (state, { room }) => {
      state.room = room;
    },
    SOCKET_MOVE_COIN: (state,  { player, coin }) => {
      const playerIndex = state.room.players.findIndex( mPlayer => mPlayer.id === player.id );
      Object.assign(state.room.players[playerIndex],player);
      state.moveCoin = coin;
    },
    SOCKET_UPDATE_PLAYER: (state, player) => {
      const playerIndex = state.room.players.findIndex( mPlayer => mPlayer.id === player.id );
      Object.assign(state.room.players[playerIndex], player);
    },
    SOCKET_START_COUNTER: (state) => {
      state.timerRestart = false;
      state.timerRunning = true;
    },
    SOCKET_STOP_COUNTER: (state) => {
      state.timerRunning = false;
      state.timerRestart = true;
      state.showModalRound = true;
    },
    SOCKET_GAME_FINISHED: ( state ) => {
      state.gameFinish = true;
    },
    SOCKET_WITH_COMPUTER: (state, status) => {
      state.gameWithTheComputer = status;
    },
    SOCKET_MOVING_AUTO_PLAYER: (state, status) => {
      state.movingAutoPlayer = status;
    }
  },
  getters: {
    getRoomId: (state) => {
      return state.room.id;
    },
    roundsGenerated: (state) => {
      return state.roundsGenerated;
    },
    getGame: (state) => {
      return {
        rounds: state.room?.rounds ? state.room.rounds : [],
        size: state.room?.size ? state.room.size : 2,
        players: state.room?.players ? state.room.players : [],
        coins: 20,
        actualRoundIndex: state.room?.actualRound ? state.room.actualRound : 0,
        isFinished: state.gameFinish,
        showModalRound: state.showModalRound,
      };
    },
    isThereRoom: (state) => {
      return state.isThereRoom;
    },
    getCurrentPlayer: (state) => {
      return state.currentPlayer;
    },
    getTimerRunning: ( state ) => {
      return state.timerRunning
    },
    getTimerRestart: ( state ) => {
      return state.timerRestart
    },
    gameWithComputer: (state) => {
      return state.gameWithTheComputer;
    }
  },
  actions: {
    socket_new_room: ({ rootState, commit, dispatch }, { name, players }) => {
      rootState.io.emit("newRoom", players, (resp) => {
        const { room } = resp;
        if (resp.ok) {
          commit("ADD_ROOM", room);
          commit("SET_MAGIG_LINK", room.id);
          commit("ROUNDS_GENERATE", true);
          dispatch("socket_join_room", { name, roomId: room.id });
        } else {
          console.error("Algo salió mal, no se pudo crear la sala");
        }
      });
    },

    socket_init_round: ({ rootState, getters }) => {
      rootState.io.emit("initRound", getters["getRoomId"]);
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

    socket_create_auto_players: ({ rootState, getters, commit }) => {
      rootState.io.emit("createAutoPlayers", { roomId: getters["getRoomId"] });
      commit("SOCKET_WITH_COMPUTER", true);
    },

    socket_start_counter: ({ rootState, getters }) => {
      rootState.io.emit("startCounter", getters["getRoomId"])
    },

    socket_move_coin: ({ rootState, getters }, { coordinateX, coordinateY, type }) => {
      rootState.io.emit("moveCoin", {
        coordinateX,
        coordinateY,
        type,
        roomId: getters["getRoomId"],
      });
    },

    socket_move_coins: ({ rootState, getters }) => {
      rootState.io.emit("moveCoins", { roomId: getters["getRoomId"] })
    },

    socket_save_result: ({ rootState, getters }, { time, type, id}) => {
      rootState.io.emit("saveResult", { roomId: getters["getRoomId"], time, type, id });
    },

    socket_end_game: ({ rootState, getters }) => {
      rootState.io.emit("endGame", { roomId: getters["getRoomId"] });
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

    get_results_by_room: ({ commit }, roomId) => {
      fetch(`${process.env.VUE_APP_URL}/results/${roomId}`)
        .then((resp) => resp.json())
        .then((resp) => {
          if (resp.ok) {
            commit("SET_RESULTS", resp.resume);
          } else {
            console.log("Algo salió mal, recargue la página");
          }
        });
    },
  },
};

export default pennyModule;
