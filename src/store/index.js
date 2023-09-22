import { createStore } from 'vuex';
import VuexPersist from 'vuex-persist';

const vuexPersist = new VuexPersist({
  key: 'bulletinBoard',
  storage: localStorage,
  reducer: (state) => ({
    post: state.post,
    user: state.user,
    token: state.token,
    remember: state.remember,
    message: state.message,
    errors: state.errors,
  }),
});

const store = createStore({
  state: {
    post: {},
    user: {},
    token: null,
    remember: null,
    message: null,
    errors: {},
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setToken(state, token) {
      state.token = token;
    },
    setRemember(state, remember) {
      state.remember = remember;
    },
    setPost(state, post) {
      state.post = post;
    },
    setMessage(state, message) {
      state.message = message;
    },
    setErrors(state, errors) {
      state.errors = errors;
    },
    clearPost(state) {
      state.post = {}
    },
    clearErrors(state) {
      state.errors = {}
    },
    clearUser(state) {
      state.user = {};
      state.token = null;
      state.remember = null;
    },
  },
  actions: {
    login({ commit }, {user, token, remember}) {
      commit('setUser', user);
      commit('setToken', token);
      commit('setRemember', remember);
    },
    post({ commit }, post) {
      commit('setPost', post);
    },
    message({ commit }, message) {
      commit('setMessage', message);
    },
    errors({ commit }, errors) {
      commit('setErrors', errors);
    },
    postClear( {commit} ) {
      commit('clearPost');
    },
    errorsClear( {commit} ) {
      commit('clearErrors');
    },
    logout({ commit }) {
      commit('clearUser');
    },
  },
  getters: {
    isLoggedIn(state) {
      return Object.keys(state.user).length > 0;
    },
  },
  plugins: [vuexPersist.plugin],
});

export default store;
