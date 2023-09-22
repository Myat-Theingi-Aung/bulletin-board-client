<template>
  <div class="container py-5">
    <div class="row">
      <div class="col-7 mx-auto">
        <div class="card">
          <div class="card-header bg-success">
            <h5 class="text-white">Log In</h5>
          </div>
          <div class="alert alert-danger" role="alert" v-if="errors.error">
            <span v-text="errors.error" />
          </div>
          <div class="card-body py-5">
            <form @submit.prevent="login">
              <div class="row align-items-center">
                <div class="col-4 text-end">
                  <label for="email" class="form-label mb-0 me-3">Email Address:</label>
                </div>
                <div class="col-6">
                  <input type="text" class="form-control" id="email" v-model="form.email">
                  <span class="text-danger fw-bolder" v-if="errors.email">
                    <span v-text="errors.email" />
                  </span>
                </div>
              </div>
              <div class="row mt-4 align-items-center">
                <div class="col-4 text-end">
                  <label for="passwrod" class="form-label mb-0 me-3">Password:</label>
                </div>
                <div class="col-6">
                  <input type="password" class="form-control" id="password" v-model="form.password">
                  <span class="text-danger fw-bolder" v-if="errors.password">
                    <span v-text="errors.password" />
                  </span>
                </div>
              </div>
              <div class="row mt-4 align-items-center">
                <div class="col-4 text-end"></div>
                <div class="col-6">
                  <div class="mb-3 d-flex justify-content-between align-items-center">
                    <div class="form-check">
                      <input class="form-check-input" v-model="form.remember" type="checkbox" id="remember" :key="form.remember">
                      <label class="form-check-label" for="remember">
                        Remember me
                      </label>
                    </div>
                    <a :href="forgotLink" class="text-primary text-decoration-none">forgotten Password?</a>
                  </div>
                  <button class="btn btn-success w-100 mb-4">Login</button>
                  <a :href="createLink" class="text-primary text-decoration-none">
                    Create account?
                    <font-awesome-icon icon="fa-solid fa-user-plus" />
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import api from '../../axios';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

  const forgotLink = 'forgot';
  const createLink = '#';
  const router = useRouter();
  const store = useStore();
  const initialForm = {
    email: '',
    error: '',
    password: '',
    remember: false
  };

  const form = ref({...initialForm});

  const errors = ref(Object.fromEntries(
    Object.keys(initialForm).map(key => [key, ''])
  ));

  const login = () => {
    api.post('/login', form.value)
      .then((response) => {
        const user = response.data.user;
        const token = response.data.token;
        const remember = response.data.remember || null;
        store.dispatch('login', { user, token, remember });
        router.push({ name: "posts" })
        setTimeout(() => {
          window.location.reload();
        }, 10);
      })
      .catch((error) => {
        console.log(error)
        error.response.data.error ? errors.value.error = error.response.data.error : errors.value.error = ''
        error.response.data.errors?.email ? errors.value.email =  error.response.data.errors.email[0] : errors.value.email = ''
        error.response.data.errors?.password ? errors.value.password =  error.response.data.errors.password[0] : errors.value.password = ''
      })
  }
</script>
