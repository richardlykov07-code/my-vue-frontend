<template>
  <div style="padding: 20px;">
    <h3>Введите логин и пароль:</h3>
    <div style="padding: 10px; background: red; color: white; margin-bottom: 10px;" v-if="errorPassword">
      Неправильный логин или пароль
    </div>
    <input style="display: block; margin-bottom: 5px;" placeholder="Login" v-model="login"/>
    <input style="display: block; margin-bottom: 10px;" placeholder="Password" type="password" v-model="password"/>
    <button @click="signIn">Войти</button>
  </div>
</template>

<script>
export default {
  name: "Signin",
  data(){
    return {
      login: 'administrator',
      password: 'password',
    }
  },
  computed: {
    errorPassword() {
      return this.$store.state.errorPassword;
    }
  },
  methods: {
    signIn(){
      this.$store.dispatch('auth', {login: this.login, password: this.password});
    }
  }
}
</script>
