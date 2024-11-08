import { createRouter, createWebHistory } from "vue-router"
import type { RouteRecordRaw } from "vue-router"

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: () => import("../../presentation/views/HomeView.vue")
  },
  {
    path: "/stories",
    name: "stories",
    component: () => import("../../presentation/views/StoriesView.vue")
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: () => import("../../presentation/views/NotFoundView.vue")
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
