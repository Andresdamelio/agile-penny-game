import Vue from "vue";
import App from "./App.vue";
import lang from "element-ui/lib/locale/lang/es";
import locale from "element-ui/lib/locale";

Vue.config.productionTip = false;

// Vuex Store
import store from "./store.js";

// Vue Router
import router from "./router";

/* Configure Element Ui Language*/
locale.use(lang);

// Globally Registered Components
import "./globalComponents.js";

new Vue({
  store,
  router,
  beforeCreate() {
    store.commit("setSocket", this.$socket);
  },
  render: (h) => h(App),
}).$mount("#app");
