<script setup>
import { RouterLink } from 'vue-router'
import api from '../../axios'

  function logout(){
    api.post('/logout')
    .then(() => {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    })
  }
</script>

<template>
  <div class="row bg-light">
    <div class="col-12">
      <nav class="navbar navbar-expand-lg sticky-top">
        <div class="container-fluid">
          <a class="navbar-brand text-success" href="/">Bulletin_Board</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse d-flex justify-content-between" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <RouterLink class="nav-link text-success" aria-current="page" to="/users">Users</RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink class="nav-link text-success" to="/">Posts</RouterLink>
              </li>
            </ul>
            <ul class="navbar-nav">
              <li class="nav-item">
                <RouterLink class="nav-link text-success" to="/register">Create User</RouterLink>
              </li>
              <div class="dropdown">
                <button class="btn btn-transparent dropdown-toggle border-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <span class="d-inline-block text-success me-2">Myat Theingi Aung</span>
                  <font-awesome-icon class="icon text-success" icon="fa-solid fa-user-gear" />
                </button>
                <ul class="dropdown-menu dropdown-menu-end">
                  <li><RouterLink class="dropdown-item" to="/users/profile">Profile</RouterLink></li>
                  <li><router-link class="dropdown-item" to="" @click="logout">Logout</router-link></li>
                </ul>
              </div>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </div>
  
</template>
