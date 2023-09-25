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
    register: state.register,
    image: state.image,
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
    register: {},
    image: null,
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
    clearUser(state) {
      state.user = {};
      state.token = null;
      state.remember = null;
    },
    setPost(state, post) {
      state.post = post;
    },
    clearPost(state) {
      state.post = {}
    },
    setErrors(state, errors) {
      state.errors = errors;
    },
    clearErrors(state) {
      state.errors = {}
    },
    setMessage(state, message) {
      state.message = message;
    },
    setRegister(state, register) {
      state.register = register;
    },
    clearRegister(state) {
      state.register = {}
    },
    setImage(state, image) {
      state.image = image;
    },
    clearImage(state) {
      state.image = null;
    }
  },
  actions: {
    login({ commit }, {user, token, remember}) {
      commit('setUser', user);
      commit('setToken', token);
      commit('setRemember', remember);
    },
    user({commit}, user) {
      commit('setUser', user);
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
    register( {commit}, register) {
      commit('setRegister', register);
    },
    registerClear( {commit} ) {
      commit('clearRegister');
    },
    image( {commit}, image) {
      commit('setImage', image);
    },
    imageClear( {commit} ) {
      commit('clearImage');
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
