<template>
  <div class="home-container">
    <div v-if="$store.state.loggedIn" class="welcome-box">
      <h1>Добро пожаловать, {{ $store.state.user?.username }}!</h1>
      <p>Вы успешно вошли в систему. Теперь вам доступна вкладка "Рейтинг" в меню сверху.</p>
    </div>

    <div v-else class="login-box">
      <h2>Авторизация</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label>Логин:</label>
          <input v-model="login" type="text" required placeholder="Введите логин">
        </div>
        <div class="form-group">
          <label>Пароль:</label>
          <input v-model="password" type="password" required placeholder="Введите пароль">
        </div>
        <button type="submit" class="btn-submit">Войти</button>
      </form>

      <p v-if="$store.state.loginError" class="error-message">
        Неверный логин или пароль!
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomepageComponent", // Двухсловное имя для ESLint
  data() {
    return {
      login: "",
      password: ""
    };
  },
  methods: {
    handleLogin() {
      // Вызываем экшен авторизации из хранилища state.js
      this.$store.dispatch("auth", {
        login: this.login,
        password: this.password
      });
    }
  },
  mounted() {
    // Тот самый пункт 3.8: как только компонент загружается (юзер зашел на главную),
    // мы принудительно гасим флаг ошибки, чтобы старые уведомления исчезли.
    this.$store.commit("setLoginError", false);
  }
};
</script>

<style scoped>
.home-container {
  max-width: 400px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
}
.login-box, .welcome-box {
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 8px;
  background-color: #f9f9f9;
}
.form-group {
  margin-bottom: 15px;
}
.form-group label {
  display: block;
  margin-bottom: 5px;
}
.form-group input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}
.btn-submit {
  width: 100%;
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.btn-submit:hover {
  background-color: #45a049;
}
.error-message {
  color: red;
  margin-top: 15px;
  text-align: center;
  font-weight: bold;
}
</style>
