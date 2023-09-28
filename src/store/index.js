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
    errors: state.errors,
    register: state.register,
    image: state.image,
    resetToken: state.resetToken,
    imageName: state.imageName,
  }),
});

const store = createStore({
  state: {
    post: {},
    user: {},
    token: null,
    remember: null,
    errors: {},
    register: {},
    image: null,
    imageName: null,
    resetToken: {},
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
    },
    setResetToken(state, resetToken) {
      state.resetToken = resetToken
    },
    clearResetToken(state) {
      state.resetToken = {}
    },
    setImageName(state, imageName) {
      state.imageName = imageName
    },
    clearImageName(state) {
      state.imageName = null
    },
  },
  actions: {
    login({ commit }, {user, token, remember}) {
      commit('setUser', user);
      commit('setToken', token);
      commit('setRemember', remember);
    },
    logout({ commit }) {
      commit('clearUser');
    },
    user({commit}, user) {
      commit('setUser', user);
    },
    post({ commit }, post) {
      commit('setPost', post);
    },
    postClear( {commit} ) {
      commit('clearPost');
    },
    errors({ commit }, errors) {
      commit('setErrors', errors);
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
    resetToken({commit}, resetToken){
      commit('setResetToken', resetToken);
    },
    resetTokenClear({commit}){
      commit('clearResetToken');
    },
    imageName({commit}, imageName) {
      commit('setImageName', imageName)
    },
    imageNameClear({commit}) {
      commit('clearImageName');
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
