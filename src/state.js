import { createStore } from "vuex";
import router from "./router";

export default createStore({
  state() {
    return {
      token: localStorage.getItem('token') || '',
      user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
      loggedIn: !!localStorage.getItem('token'),
      preLoading: false,
      dataPreLoading: false,
      loginError: false,
      backendUrl: 'http://localhost:8080',
      // Наш реактивный массив карточек
      rating: localStorage.getItem('mock_ratings') ? JSON.parse(localStorage.getItem('mock_ratings')) : [
        { id: 1, name: 'Тимофей', description: 'Лучший установщик кондиционеров', gender: 'male', birthday: '2020-01-15' },
        { id: 2, name: 'Елизавета', description: 'Менеджер по работе с клиентами', gender: 'female', birthday: '2017-05-20' },
        { id: 3, name: 'Ваня', description: 'Старший бригадир', gender: 'male', birthday: '2025-05-10' },
        { id: 4, name: 'Артем', description: 'Мастер алмазного бурения', gender: 'male', birthday: '2026-06-07' }
      ],
      search: '', 
      ratingItem: { id: 0, name: '', description: '', gender: 'male', birthday: '' },
      pager: { currentPage: 1, pageCount: 1, perPage: 5, total: 4 }
    };
  },
  mutations: {
    setToken(state, token) { state.token = token; localStorage.setItem('token', token); },
    setUser(state, user) { state.user = user; localStorage.setItem('user', JSON.stringify(user)); },
    setPreLoading(state, is_load) { state.preLoading = is_load; },
    setDataPreLoading(state, is_load) { state.dataPreLoading = is_load; },
    setLoginError(state, isError) { state.loginError = isError; },
    setLoggedIn(state, isLoggedIn) { state.loggedIn = isLoggedIn; },
    setRating(state, rating) { state.rating = rating; localStorage.setItem('mock_ratings', JSON.stringify(rating)); state.pager.total = rating.length; },
    setPager(state, pager) { state.pager = pager; },
    setPage(state, page) { state.pager.currentPage = page; }
  },
  actions: {
    auth(context) {
      context.commit('setPreLoading', true);
      setTimeout(() => {
        context.commit('setToken', "mock-jwt-token-12345");
        context.commit('setLoggedIn', true);
        context.dispatch('getUser');
      }, 500);
    },
    getUser(context) {
      context.commit('setUser', { id: 777, username: 'administrator', group_name: 'Администратор' });
      context.commit('setPreLoading', false);
      router.push('/rating');
    },
    getRating(context) {
      context.commit('setDataPreLoading', true);
      setTimeout(() => { context.commit('setDataPreLoading', false); }, 200);
    },
    createRating({ commit, state, dispatch }, ratingData) {
      let currentRatings = [...state.rating];
      const newId = currentRatings.length ? Math.max(...currentRatings.map(r => r.id)) + 1 : 1;
      currentRatings.push({
        id: newId,
        name: ratingData.name,
        description: ratingData.description || '',
        gender: ratingData.gender,
        birthday: ratingData.birthday
      });
      commit('setRating', currentRatings);
      dispatch('getRating');
    },
    deleteRating({ commit, state, dispatch }, id) {
      const filteredRatings = state.rating.filter(r => r.id !== id);
      commit('setRating', filteredRatings);
      dispatch('getRating');
    }
  }
});
