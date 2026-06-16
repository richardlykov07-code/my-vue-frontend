<template>
  <div class="rating-container">
    <h2>Постраничный вывод данных (Рейтинг)</h2>

    <div class="search-box">
      <label for="search-input">Поиск по имени: </label>
      <input 
        id="search-input"
        v-model="search" 
        type="text" 
        placeholder="Введите имя для фильтрации..." 
        class="search-input"
      />
    </div>

    <table border="1" width="100%" cellpadding="5" class="rating-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Имя / Название</th>
          <th>ID Пользователя</th>
          <th>Описание</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in ratings" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.user_id }}</td>
          <td>{{ item.description }}</td>
        </tr>
        <tr v-if="ratings.length === 0">
          <td colspan="4" style="text-align: center;">Нет данных по вашему запросу</td>
        </tr>
      </tbody>
    </table>

    <div class="pagination-controls">
      <button @click="prev" :disabled="page <= 1">Назад</button>
      
      <span class="page-info">
        Страница 
        <input v-model="page" type="number" min="1" :max="$store.state.pager.pageCount" class="page-input"> 
        из {{ $store.state.pager.pageCount }}
      </span>
      
      <button @click="next" :disabled="page >= $store.state.pager.pageCount">Вперед</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "RatingComponent",
  methods: {
    next() {
      if (this.page < this.$store.state.pager.pageCount) {
        this.$store.commit("setPager", { 
          ...this.$store.state.pager, 
          currentPage: this.page + 1 
        });
        this.$store.dispatch("getRating");
      }
    },
    prev() {
      if (this.page > 1) {
        this.$store.commit("setPager", { 
          ...this.$store.state.pager, 
          currentPage: this.page - 1 
        });
        this.$store.dispatch("getRating");
      }
    }
  },
  computed: {
    ratings() {
      return this.$store.state.rating;
    },
    page: {
      get() {
        return this.$store.state.pager.currentPage;
      },
      set(value) {
        const parsedValue = parseInt(value) || 1;
        this.$store.commit("setPager", { 
          ...this.$store.state.pager, 
          currentPage: parsedValue 
        });
        this.$store.dispatch("getRating");
      }
    },
    // ИСПРАВЛЕННЫЙ ВЫЧИСЛЯЕМЫЙ ПОИСК С СЕТТЕРОМ ДЛЯ V-MODEL
    search: {
      get() {
        return this.$store.state.search;
      },
      set(value) {
        // 1. Сохраняем строку поиска во Vuex
        this.$store.commit("setSearch", value);
        // 2. Сбрасываем страницу на первую, чтобы поиск начинался сначала
        this.$store.commit("setPager", { 
          ...this.$store.state.pager, 
          currentPage: 1 
        });
        // 3. Делаем запрос к CodeIgniter бэкенду с новым фильтром
        this.$store.dispatch("getRating");
      }
    }
  },
  mounted() {
    if (this.$store.state.loggedIn) {
      this.$store.dispatch("getRating");
      this.$store.commit("setLoginError", false);
    } else {
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
.rating-container {
  margin-top: 20px;
}
.search-box {
  margin-bottom: 20px;
  background: #f0f4f8;
  padding: 10px;
  border-radius: 4px;
}
.search-input {
  padding: 6px 10px;
  width: 250px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.rating-table {
  border-collapse: collapse;
  margin-bottom: 20px;
}
.pagination-controls {
  display: flex;
  align-items: center;
  gap: 10px;
}
.page-input {
  width: 50px;
  text-align: center;
}
button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
