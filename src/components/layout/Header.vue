<template>
  <div class="row bg-light sticky-top">
    <div class="col-12">
      <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
          <a class="navbar-brand text-success" href="/">Bulletin_Board</a>
          <div class="collapse navbar-collapse d-flex justify-content-between" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <RouterLink class="nav-link text-success" :class="{ 'active-nav': $route.path === '/users' }" aria-current="page" to="/users">
                  Users
                </RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink class="nav-link text-success" :class="{ 'active-nav': $route.path === '/' }" to="/">
                  Posts
                </RouterLink>
              </li>
            </ul>
            <ul class="navbar-nav" v-if="store.getters.isLoggedIn">
              <li class="nav-item">
                <RouterLink class="nav-link text-success" :class="{ 'active-nav': $route.path === '/register' }" to="/register">Create User</RouterLink>
              </li>
              <div class="dropdown">
                <button class="btn btn-transparent dropdown-toggle border-0 p-0 pt-2 ps-2" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <span class="d-inline-block text-success me-2 text-capitalize">{{ user?.name }}</span>
                  <font-awesome-icon class="icon text-success" icon="fa-solid fa-user-gear" />
                </button>
                <ul class="dropdown-menu dropdown-menu-end">
                  <li><RouterLink class="dropdown-item" :class="{ 'active': $route.path === '/users/profile' }" to="/users/profile">Profile</RouterLink></li>
                  <li><router-link class="dropdown-item" to="" @click="logout">Logout</router-link></li>
                </ul>
              </div>
            </ul>
            <ul class="navbar-nav" v-else>
              <li class="nav-item">
                <RouterLink class="nav-link text-success" :class="{ 'active-nav': $route.path === '/login' }" to="/login">Login</RouterLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </div>
  
</template>

<script setup>
import { RouterLink, useRouter } from 'vue-router'
import api from '../../axios'
import { useStore } from 'vuex'
import { ref, watch } from 'vue'

  const router = useRouter();
  const store = useStore();
  const user = ref(store.state.user);

  watch(
    () => store.state.user,
    (newUser) => {
      user.value.name = newUser.name
    }
  );

  function logout(){
    api.post('/logout')
    .then(() => {
      store.dispatch('logout')
      router.replace({ name: "posts"})
    })
  }
</script>
