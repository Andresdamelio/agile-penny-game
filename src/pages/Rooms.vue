<template>
  <div>
    <div v-if="rooms.length" class="container-fluid">
      <div class="flex justify-content-center">
        <h1 class="display-4 text-center">Salas</h1>
      </div>
      <div class="container mt-4">
        <ul class="list-group">
          <li
            v-for="(room, index) in rooms"
            :key="index"
            class="list-group-item d-flex justify-content-between align-items-center"
          >
            <div class="float-left">
              <a :href="`/room/${room.id}`" target="_blank">{{ room.id }}</a>

              <small class="ml-2"
                >Creada por
                {{
                  room.players[0] && room.players[0].name
                    ? room.players[0].name
                    : 'desconocido'
                }}
                hace {{ room.createdAt | timeSince }}</small
              >
            </div>
            <div class="float-right">
              <span class="badge badge-primary badge-pill ml-2"
                >{{ room.size }} jugadores</span
              >
              <span
                v-if="room.actualRound <= 0"
                class="badge badge-info badge-pill ml-2"
                >Por comenzar</span
              >
              <span
                v-if="room.actualRound >= 4"
                class="badge badge-danger badge-pill ml-2"
                >Finalizado</span
              >
              <span
                v-if="room.players.length < room.size && room.actualRound < 4"
                class="badge badge-success badge-pill ml-2"
                >Esperando jugadores</span
              >
              <span
                v-if="room.players.length >= room.size && room.actualRound < 4"
                class="badge badge-warning badge-pill ml-2"
                >Sala llena</span
              >
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div v-else class="container-fluid text-empty">
      <div class="jumbotron">
        <h1 class="empty-title">No hay salas</h1>
        <p class="lead">
          Por ahora no hay salas de juego creadas, si deseas jugar crea una
          nueva sala y compartela con amigos para que se unan a la partida, o
          bien juega con la computadora.
        </p>
        <hr class="my-4" />
        <p>Para crear una nueva sala, debes ir al inicio.</p>
        <p class="lead">
          <router-link to="/">
            <button class="btn btn-primary btn-lg">Crear nueva sala</button>
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      rooms: []
    };
  },
  beforeCreate() {
    fetch(`${process.env.VUE_APP_URL}/rooms`)
      .then((resp) => resp.json())
      .then((resp) => {
        if (resp.ok) {
          this.rooms = resp.rooms;
          console.log(resp.rooms);
        } else {
          console.log('Algo salió mal, recargue la página');
        }
      });
  }
};
</script>
<style lang="scss">
.jumbotron {
  background: transparent;
}
.btn-primary,
.btn-primary:hover,
.btn-primary:active,
.btn-primary:focus {
  background-color: #17598a !important;
  border-color: #17598a !important;
  box-shadow: none !important;
  font-family: 'Manrope', sans-serif;
  opacity: 1;
  cursor: pointer;
  color: #fff;
  font-weight: 600;
}

.text-empty {
  font-family: 'Manrope', sans-serif;
  color: #000;
}

.empty-title {
  font-weight: 600;
  font-size: 3rem;
  color: #17598a;
}
</style>
