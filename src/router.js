import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/components/Configuration"),
  },
  {
    path: "/room/:id",
    name: "room",
    component: () => import("@/pages/Board"),
  },
  {
    path: "/game-result/:id",
    name: "result",
    component: () => import("@/pages/GameResult"),
  },
];

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;