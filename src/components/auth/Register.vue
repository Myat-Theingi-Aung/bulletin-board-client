<template>
  <div class="container py-5">
    <div class="row">
      <div class="col-7 mx-auto">
        <div class="card">
          <div class="card-header bg-success">
            <h5 class="text-white">Register</h5>
          </div>
          <div class="card-body py-4">
            <form @submit.prevent="register" method="post" enctype="multipart/form-data">
              <input type="hidden" name="created_user_id" v-model="form.created_user_id">
              <input type="hidden" name="updated_user_id" v-model="form.updated_user_id">
              <div class="row align-items-center">
                <div class="col-4 text-end">
                  <label for="name" class="form-label mb-0 me-3">
                    Name
                    <font-awesome-icon icon="fa-solid fa-asterisk" class="text-danger mb-2 fs-small" />
                  </label>
                </div>
                <div class="col-6">
                  <input type="text" class="form-control" id="name" v-model="form.name">
                  <span class="text-danger" v-if="this.errors.name">
                    <span v-text="this.errors.name" />
                  </span>
                </div>
              </div>
              <div class="row mt-4 align-items-center">
                <div class="col-4 text-end">
                  <label for="email" class="form-label mb-0 me-3">
                    E-Mail Address
                    <font-awesome-icon icon="fa-solid fa-asterisk" class="text-danger mb-2 fs-small" />
                  </label>
                </div>
                <div class="col-6">
                  <input type="text" class="form-control" id="email" v-model="form.email">
                  <span class="text-danger" v-if="this.errors.email">
                    <span v-text="this.errors.email" />
                  </span>
                </div>
              </div>
              <div class="row mt-4 align-items-center">
                <div class="col-4 text-end">
                  <label for="passwrod" class="form-label mb-0 me-3">
                    Password
                    <font-awesome-icon icon="fa-solid fa-asterisk" class="text-danger mb-2 fs-small" />
                  </label>
                </div>
                <div class="col-6">
                  <input type="password" class="form-control" id="password" v-model="form.password">
                  <span class="text-danger" v-if="this.errors.password">
                    <span v-text="this.errors.password" />
                  </span>
                </div>
              </div>
              <div class="row mt-4 align-items-center">
                <div class="col-4 text-end">
                  <label for="passwrod_confirmation" class="form-label mb-0 me-3">
                    Password Confirmation
                    <font-awesome-icon icon="fa-solid fa-asterisk" class="text-danger mb-2 fs-small" />
                  </label>
                </div>
                <div class="col-6">
                  <input type="password" class="form-control" id="password_confirmation" v-model="form.password_confirmation">
                  <span class="text-danger" v-if="this.errors.password_confirmation">
                    <span v-text="this.errors.password_confirmation" />
                  </span>
                </div>
              </div>
              <div class="row mt-4 align-items-center">
                <div class="col-4 text-end">
                  <label for="type" class="form-label mb-0 me-3">Type</label>
                </div>
                <div class="col-6">
                  <select class="form-select" v-model="form.type">
                    <option value="0">Admin</option>
                    <option value="1">User</option>
                  </select>
                  <span class="text-danger" v-if="this.errors.type">
                    <span v-text="this.errors.type" />
                  </span>
                </div>
              </div>
              <div class="row mt-4 align-items-center">
                <div class="col-4 text-end">
                  <label for="phone" class="form-label mb-0 me-3">Phone</label>
                </div>
                <div class="col-6">
                  <input type="text" class="form-control" id="phone" v-model="form.phone">
                  <span class="text-danger" v-if="this.errors.phone">
                    <span v-text="this.errors.phone" />
                  </span>
                </div>
              </div>
              <div class="row mt-4 align-items-center">
                <div class="col-4 text-end">
                  <label for="dob" class="form-label mb-0 me-3">Date of Birth</label>
                </div>
                <div class="col-6">
                  <input type="date" class="form-control" id="dob" v-model="form.dob">
                  <span class="text-danger" v-if="this.errors.dob">
                    <span v-text="this.errors.dob" />
                  </span>
                </div>
              </div>
              <div class="row mt-4 align-items-center">
                <div class="col-4 text-end">
                  <label for="address" class="form-label mb-0 me-3">Address</label>
                </div>
                <div class="col-6">
                  <input type="text" class="form-control" id="address" v-model="form.address">
                  <span class="text-danger" v-if="this.errors.address">
                    <span v-text="this.errors.address" />
                  </span>
                </div>
              </div>
              <div class="row mt-4 align-items-center">
                <div class="col-4 text-end">
                  <label for="profile" class="form-label mb-0 me-3">Profile</label>
                </div>
                <div class="col-6">
                  <input type="file" ref="fileInput" @change="onFileSelected" class="form-control">
                  <span class="text-danger" v-if="this.errors.profile">
                    <span v-text="this.errors.profile" />
                  </span>
                </div>
              </div>
              <div class="row mt-4 align-items-center">
                <div class="col-4 text-end"></div>
                <div class="col-6">
                  <button class="btn btn-success me-3">Register</button>
                  <button class="btn btn-secondary" @click.prevent="resetForm">Clear</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../../axios';
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const user = ref(null);
    const fileInput = ref(null)

    const getUserFromLocalStorage = () => {
      const userData = localStorage.getItem('user');
      if (userData) { user.value = JSON.parse(userData); }
    };

    const initialForm = {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      phone: '',
      dob: '',
      address: '',
      profile: null,
      type: '1',
      created_user_id: '',
      updated_user_id: ''
    };

    const form = ref({ ...initialForm });

    const errors = ref(Object.fromEntries(
      Object.keys(initialForm).map(key => [key, ''])
    ));

    const initializeUserIds = () => {
      form.value.created_user_id = user.value.id;
      form.value.updated_user_id = user.value.id;
    };

    onMounted(() => {
      getUserFromLocalStorage();
      initializeUserIds();
    });

    const onFileSelected = (e) => form.value.profile = e.target.files[0]; 

    const register = () => {
      const f = new FormData();

      for (let [key, val] of Object.entries(form.value)) {
        console.log(key+ '-' + val)
        f.append(key, val);
      }

      const headers = { 'Content-Type': 'multipart/form-data' }

      api.post('/users', f, { headers })
        .then((response) => {
          console.log(response);
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
        });
    };
    
    const resetForm = function() {
      const f = document.querySelector('form');
      f.reset();
      form.value = { ...initialForm };
    }

    return {
      form,
      errors,
      user,
      register,
      onFileSelected,
      resetForm
    };
  },
};
</script>
