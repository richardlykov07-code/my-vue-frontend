<template>
  <div class="menu-container">
    <router-link to="/">Главная</router-link> | 
    
    <router-link v-if="$store.state.loggedIn" to="/rating">Рейтинг</router-link>

    <span v-if="$store.state.loggedIn" class="user-info">
      | Вы вошли как: <b>{{ $store.state.user?.username }}</b>
      <button @click="logout" class="btn-logout">Выйти</button>
    </span>

    <hr />
  </div>
</template>

<script>
export default {
  name: "MenuComponent", // Двухсловное имя, чтобы не ругался ESLint
  methods: {
    logout() {
      console.log("Выход из аккаунта...");
      
      // Очищаем локальное хранилище браузера
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Сбрасываем состояния во Vuex через мутации
      this.$store.commit("setToken", "");
      this.$store.commit("setUser", null);
      this.$store.commit("setLoggedIn", false);

      // Перенаправляем пользователя на главную страницу (страницу входа)
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
.menu-container {
  padding: 10px;
  font-family: Arial, sans-serif;
}
.user-info {
  margin-left: 15px;
}
.btn-logout {
  margin-left: 10px;
  cursor: pointer;
  padding: 2px 8px;
}
</style>
