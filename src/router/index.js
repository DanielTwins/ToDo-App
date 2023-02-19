import { createRouter, createWebHistory } from "vue-router";

import About from "../views/About.vue";

const routes = [
  {
    path: "/about",
    name: "About",
    component: About,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
