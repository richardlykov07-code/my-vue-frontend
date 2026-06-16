import { createStore } from "vuex";

export default createStore({
  state() {
    return {
      // --- ПЕРЕМЕННЫЕ ИЗ ЛАБОРАТОРНОЙ №2 (АВТОРИЗАЦИЯ) ---
      token: localStorage.getItem('token') || '',
      user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
      loggedIn: !!localStorage.getItem('token'),
      preLoading: false,
      loginError: false,
      backendUrl: 'http://localhost:8080', // Адрес твоего CodeIgniter бэкенда

      // --- НОВЫЕ ПЕРЕМЕННЫЕ ИЗ ЛАБОРАТОРНОЙ №3 (ПАГИНАЦИЯ И ПОИСК) ---
      rating: [], // Сюда прилетают отфильтрованные строки рейтинга
      search: '', // Переменная из пункта 3.9 для хранения строки поиска
      pager: {
        currentPage: 1, // Текущая активная страница
        pageCount: 1,   // Сколько всего страниц насчитал бэкенд
        perPage: 10     // Количество записей на одну страницу
      }
    };
  },
  mutations: {
    // --- МУТАЦИИ АВТОРИЗАЦИИ ---
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
    },
    setUser(state, user) {
      state.user = user;
      localStorage.setItem('user', JSON.stringify(user));
    },
    setPreLoading(state, is_load) {
      state.preLoading = is_load;
    },
    setLoginError(state, isError) {
      state.loginError = isError;
    },
    setLoggedIn(state, isLoggedIn) {
      state.loggedIn = isLoggedIn;
    },

    // --- МУТАЦИИ ПАГИНАЦИИ И ПОИСКА (Исправлен баг методички с context) ---
    setRating(state, rating) {
      state.rating = rating;
    },
    setPager(state, pager) {
      state.pager = pager;
    },
    setSearch(state, search) {
      // Добавили мутацию для безопасного изменения строки поиска из v-model
      state.search = search;
    }
  },
  actions: {
    // --- ДЕЙСТВИЕ АВТОРИЗАЦИИ (ИЗ ЛАБЫ №2) ---
    auth({ commit, state }, payload) {
      commit('setPreLoading', true);
      commit('setLoginError', false);

      const params = new URLSearchParams();
      params.append('login', payload.login);
      params.append('password', payload.password);

      window.axios.post(state.backendUrl + '/OAuthApi/auth', params)
        .then((response) => {
          commit('setToken', response.data.access_token);
          commit('setUser', response.data.user);
          commit('setLoggedIn', true);
        })
        .catch((error) => {
          console.error("Ошибка авторизации:", error);
          commit('setLoginError', true);
        })
        .finally(() => {
          commit('setPreLoading', false);
        });
    },

    // --- ДЕЙСТВИЕ ИЗ ПУНКТА 3.9 (ПОЛУЧЕНИЕ ДАННЫХ + ПОИСК) ---
    getRating({ commit, state }) {
      console.log('Вызов действия getRating с поиском:', state.search);
      
      const params = new URLSearchParams();
      // Отправляем бэкенду настройки пагинации
      params.append('per_page', state.pager.perPage);
      // СЮДА прикрепляем строку поиска, чтобы CodeIgniter отфильтровал SQL-запрос
      params.append('search', state.search);
      
      // Выполняем POST-запрос с query-параметром текущей страницы
      window.axios.post(state.backendUrl + '/RatingApi/rating?page_group1=' + state.pager.currentPage, params, {
        headers: {
          Authorization: 'Bearer ' + state.token
        }
      })
      .then((response) => {
        // Обновляем массив элементов таблицы и данные о страницах
        commit('setRating', response.data.ratings);
        commit('setPager', response.data.pager);
      })
      .catch((error) => {
        console.error("Ошибка при поиске/выборке рейтинга через Axios:", error);
      });
    }
  }
});
