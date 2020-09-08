import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

// Vuex Store
import store from "./store.js";

// Vue Router
import router from "./router";

new Vue({
  store,
  router,
  beforeCreate() {
    store.commit("SET_SOCKET", this.$socket);
  },
  render: (h) => h(App),
}).$mount("#app");
