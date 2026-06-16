<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import store from "./state";
import router from "./router";

export default {
  computed: {
    user(){
      return this.$store.state.user;
    },
  },
  watch: {
    user(newUser){
      if(newUser && newUser.username){
        router.push('/')
      } else {
        router.push('/signin')
      }
    }
  },
  mounted() {
    const token = localStorage.getItem('token');
    if(token){
      store.commit('setToken', token);
      this.$store.dispatch('getUser');
    } else {
      router.push('/signin');
    }
  }
};
</script>
