import { createRouter, createWebHistory } from "vue-router";
// Импортируем старый компонент авторизации
import Homepage from "./components/Homepage.vue";
// Импортируем наш новый компонент рейтинга из пункта 3.6
import RatingComponent from "./components/Rating.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Homepage
  },
  {
    path: "/rating",
    name: "Rating",
    component: RatingComponent // Связываем URL /rating с компонентом
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

// Экспортируем роутер, чтобы main.js мог его подключить
export default router;
