<template>
  <div v-if="user">
    Привет, {{ user.username }}!
    <button @click="logout">Выйти</button>
  </div>
</template>

<script>
export default {
  name: "Homepage",
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  created() {
    if (!this.user || !this.user.username) {
      this.$router.push('/signin');
    }
  },
  methods: {
    logout(){
      this.$store.dispatch('logout');
      this.$router.push('/signin');
    }
  }
}
</script>
