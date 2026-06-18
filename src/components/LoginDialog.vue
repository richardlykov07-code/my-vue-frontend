<template>
  <Dialog :key="$route.fullPath" v-model:visible="visible" :modal="true" :closable="false">
    <template #header>
      <div>Вход в систему</div>
    </template>

    <h5>Логин</h5>
    <span class="p-input-icon-left">
      <i class="pi pi-user" style="position: relative; left: 25px; z-index: 1;" />
      <InputText v-model="login" placeholder="Логин" style="padding-left: 35px;" />
    </span>
    <br />
    <small v-if="this.$store.state.loginError" class="p-error">
      Проверьте правильность логина и пароля
    </small>

    <h5>Пароль</h5>
    <span class="p-input-icon-left">
      <i class="pi pi-lock" style="position: relative; left: 25px; z-index: 1;" />
      <InputText v-model="password" type="password" placeholder="Пароль" style="padding-left: 35px;" />
    </span>
    <br />
    <small v-if="this.$store.state.loginError" class="p-error">
      Проверьте правильность логина и пароля
    </small>

    <template #footer>
      <Button icon="pi pi-check" label="Войти" @click="signIn" :loading="$store.state.preLoading" />
    </template>
  </Dialog>
</template>

<script>
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';

export default {
  name: "LoginDialog",
  components: { Dialog, Button, InputText },
  data() {
    return {
      login: 'administrator',
      password: 'password',
      visible: true
    };
  },
  methods: {
    signIn() {
      console.log('Попытка авторизации под:', this.login);
      this.$store.dispatch('auth', { login: this.login, password: this.password });
    }
  }
};
</script>
