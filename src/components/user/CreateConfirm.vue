<template>
  <div class="container py-5">
    <div class="row">
      <div class="col-7 mx-auto">
        <div class="card">
          <div class="card-header bg-success">
            <h5 class="text-white">Register Confirm</h5>
          </div>
          <div class="card-body py-4">
            <form @submit.prevent="confirm">
              <div class="row align-items-center">
                <div class="col-4 text-end">
                  <label for="name" class="form-label mb-0 me-3">Name:</label>
                </div>
                <div class="col-6">
                  <input type="text" class="form-control" id="name" v-model="form.name">
                </div>
              </div>
              <div class="row mt-4 align-items-center">
                <div class="col-4 text-end">
                  <label for="email" class="form-label mb-0 me-3">E-Mail Address:</label>
                </div>
                <div class="col-6">
                  <input type="email" class="form-control" id="email" v-model="form.email">
                </div>
              </div>
              <div class="row mt-4 align-items-center">
                <div class="col-4 text-end">
                  <label for="passwrod" class="form-label mb-0 me-3">Password:</label>
                </div>
                <div class="col-6">
                  <input type="password" class="form-control" id="password" v-model="form.password">
                </div>
              </div>
              <div class="row mt-4 align-items-center">
                <div class="col-4 text-end">
                  <label for="passwrod_confirmation" class="form-label mb-0 me-3">Password Confirmation:</label>
                </div>
                <div class="col-6">
                  <input type="password" class="form-control" id="password_confirmation" v-model="form.password_confirmation">
                </div>
              </div>
              <div class="row mt-4 align-items-center">
                <div class="col-4 text-end">
                  <label for="type" class="form-label mb-0 me-3">Type:</label>
                </div>
                <div class="col-6">
                  <select class="form-select" v-model="form.type">
                    <option value="0">Admin</option>
                    <option value="1">User</option>
                  </select>
                </div>
              </div>
              <div class="row mt-4 align-items-center">
                <div class="col-4 text-end">
                  <label for="phone" class="form-label mb-0 me-3">Phone:</label>
                </div>
                <div class="col-6">
                  <input type="text" class="form-control" id="phone" v-model="form.phone">
                </div>
              </div>
              <div class="row mt-4 align-items-center">
                <div class="col-4 text-end">
                  <label for="dob" class="form-label mb-0 me-3">Date of Birth:</label>
                </div>
                <div class="col-6">
                  <input type="date" class="form-control" id="dob" v-model="form.dob">
                </div>
              </div>
              <div class="row mt-4 align-items-center">
                <div class="col-4 text-end">
                  <label for="address" class="form-label mb-0 me-3">Address:</label>
                </div>
                <div class="col-6">
                  <input type="text" class="form-control" id="address" v-model="form.address">
                </div>
              </div>
              <div class="row mt-4 align-items-center">
                <div class="col-4 text-end">
                  <label for="profile" class="form-label mb-0 me-3">Profile:</label>
                </div>
                <div class="col-6">
                  <img :src="image" alt="" class="img-fluid" id="profile">
                </div>
              </div>
              <div class="row mt-4 align-items-center">
                <div class="col-4 text-end"></div>
                <div class="col-6">
                  <button class="btn btn-success me-3">Confirm</button>
                  <button class="btn btn-secondary">Cancel</button>
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
import api from '../../axios'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

  const store = useStore();
  const router = useRouter();
  const currentUser = store.state.user;
  const register = store.state.register;
  const image = store.state.image;
  let imageTest = store.state.image;
  const headers = { 'Content-Type': 'multipart/form-data' }

  const initialForm = {
    name: register.name,
    email: register.email,
    password: register.password,
    password_confirmation: register.password_confirmation,
    phone: register.phone,
    dob: register.dob,
    address: register.address,
    profile: '',
    type: register.type,
    flag: true,
    created_user_id: currentUser.id,
    updated_user_id: currentUser.id
  };
  const form = ref({ ...initialForm})

  const errors = ref(Object.fromEntries(
    Object.keys(initialForm).map(key => [key, ''])
  ));

  if (imageTest.startsWith('data:image/jpeg;base64,')) {
    imageTest = imageTest.slice('data:image/jpeg;base64,'.length);
  }
  const arrayBuffer = new Uint8Array(atob(imageTest).split('').map(char => char.charCodeAt(0)));
  const blob = new Blob([arrayBuffer], { type: 'image/jpeg' });
  const file = new File([blob], 'example.jpg', { type: 'image/jpeg' });
  form.value.profile = file;

  const confirm = () => {
    const f = new FormData();

    for (let [key, val] of Object.entries(form.value)) {
      f.append(key, val);
    }

    api.post('/users', f, { headers })
    .then((response) => {
      store.dispatch('message', response.data.success)
      store.dispatch('registerClear')
      store.dispatch('errorsClear')
      router.push({name: 'users'})
    })
    .catch((error) => {
      const errorData = error.response.data.errors || {};
      for (let key in errors.value) {
        if (errorData.hasOwnProperty(key) && Array.isArray(errorData[key]) && errorData[key].length > 0) {
          errors.value[key] = errorData[key][0];
        } else {
          errors.value[key] = '';
        }
      }
      store.dispatch('errors', errors.value)
      store.dispatch('register', form.value)
      router.push({name: 'register'})
    })
  };
</script>
