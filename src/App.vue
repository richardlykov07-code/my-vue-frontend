<template>
  <div id="app">
    <MenuComponent />

    <div v-if="$store.state.preLoading" class="loader">
      <h3>Загрузка...</h3>
    </div>

    <div v-else class="content-container">
      <router-view />
    </div>
  </div>
</template>

<script>
// Импортируем наш новый компонент меню
import MenuComponent from "./components/Menu.vue";

export default {
  name: "App",
  components: {
    // Регистрируем его в приложении
    MenuComponent
  },
  mounted() {
    // Наша старая проверка сессии при перезагрузке страницы
    if (this.$store.state.token) {
      this.$store.commit("setPreLoading", true);
      
      // Запрашиваем данные пользователя, если есть токен
      window.axios.post(this.$store.state.backendUrl + '/OAuthApi/user', {}, {
        headers: {
          Authorization: 'Bearer ' + this.$store.state.token
        }
      })
      .then((response) => {
        this.$store.commit("setUser", response.data);
        this.$store.commit("setLoggedIn", true);
      })
      .catch((error) => {
        console.error("Сессия устарела или бэкенд недоступен:", error);
        // Мягко сбрасываем авторизацию, чтобы не вешать приложение
        this.$store.commit("setToken", "");
        this.$store.commit("setUser", null);
        this.$store.commit("setLoggedIn", false);
      })
      .finally(() => {
        this.$store.commit("setPreLoading", false);
      });
    }
  }
};
</script>

<style>
/* Базовые стили для красоты отображения */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 20px;
}
.loader {
  text-align: center;
  margin-top: 50px;
}
.content-container {
  padding: 20px;
}
</style>
