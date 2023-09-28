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
              <div class="row align-items-center">
                <div class="col-4 text-end">
                  <label for="name" class="form-label mb-0 me-3">
                    Name
                    <font-awesome-icon icon="fa-solid fa-asterisk" class="text-danger mb-2 fs-small" />
                  </label>
                </div>
                <div class="col-6">
                  <input type="text" class="form-control" id="name" v-model="form.name">
                  <span class="text-danger" v-if="errors.name">
                    <span v-text="errors.name" />
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
                  <span class="text-danger" v-if="errors.email">
                    <span v-text="errors.email" />
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
                  <div class="input-group mb-3">
                    <input :type="showPassword ? 'text' : 'password'" v-model="form.password" class="form-control" aria-label="Recipient's username" aria-describedby="password_confirmation">
                    <a class="btn btn-outline-secondary" @click="togglePasswordVisibility('password')" id="password_confirmation">
                      <font-awesome-icon :icon="showPassword ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'" />
                    </a>
                  </div>
                  <span class="text-danger" v-if="errors.password">
                    <span v-text="errors.password" />
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
                  <div class="input-group mb-3">
                    <input :type="showConfirmPassword ? 'text' : 'password'" v-model="form.password_confirmation" class="form-control" aria-label="Recipient's username" aria-describedby="password_confirmation">
                    <a class="btn btn-outline-secondary" @click="togglePasswordVisibility('confirm')" id="password_confirmation">
                      <font-awesome-icon :icon="showConfirmPassword ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'" />
                    </a>
                  </div>
                  <span class="text-danger" v-if="errors.password_confirmation">
                    <span v-text="errors.password_confirmation" />
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
                  <span class="text-danger" v-if="errors.type">
                    <span v-text="errors.type" />
                  </span>
                </div>
              </div>
              <div class="row mt-4 align-items-center">
                <div class="col-4 text-end">
                  <label for="phone" class="form-label mb-0 me-3">Phone</label>
                </div>
                <div class="col-6">
                  <input type="text" class="form-control" id="phone" v-model="form.phone">
                  <span class="text-danger" v-if="errors.phone">
                    <span v-text="errors.phone" />
                  </span>
                </div>
              </div>
              <div class="row mt-4 align-items-center">
                <div class="col-4 text-end">
                  <label for="dob" class="form-label mb-0 me-3">Date of Birth</label>
                </div>
                <div class="col-6">
                  <input type="date" class="form-control" id="dob" v-model="form.dob">
                  <span class="text-danger" v-if="errors.dob">
                    <span v-text="errors.dob" />
                  </span>
                </div>
              </div>
              <div class="row mt-4 align-items-center">
                <div class="col-4 text-end">
                  <label for="address" class="form-label mb-0 me-3">Address</label>
                </div>
                <div class="col-6">
                  <input type="text" class="form-control" id="address" v-model="form.address">
                  <span class="text-danger" v-if="errors.address">
                    <span v-text="errors.address" />
                  </span>
                </div>
              </div>
              <di class="row mt-4 align-items-center" v-if="showPreview">
                <div class="col-4"></div>
                <div class="col-6 position-relative">
                  <img :src="showPreview" alt="Image Preview" class="img-fluid rounded w-100" />
                  <font-awesome-icon :icon="['fas', 'circle-xmark']" class="icon-top-right" @click="removeImage" />
                </div>
              </di>
              <div class="row mt-4 align-items-center">
                <div class="col-4 text-end">
                  <label for="profile" class="form-label mb-0 me-3">Profile</label>
                </div>
                <div class="col-6">
                  <input type="file" ref="fileInput" @change="onFileSelected" class="form-control">
                  <span class="text-danger" v-if="errors.profile">
                    <span v-text="errors.profile" />
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

<script setup>
import api from '../../axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { usePasswordToggle, imagePreview } from '../../utils/CommonUtils'

  const store = useStore();
  const router = useRouter();
  const currentUser = store.state.user;
  const user = store.state.register;
  const { showPassword, showConfirmPassword, togglePasswordVisibility } = usePasswordToggle();
  const { showPreview, fileInput, removeImage } = imagePreview();
  const headers = { 'Content-Type': 'multipart/form-data' }

  const initialForm = {
    name: user.name || '',
    email: user.email || '',
    password: user.password || '',
    password_confirmation: user.password_confirmation || '',
    phone: user.phone || '',
    dob: user.dob || '',
    address: user.address || '',
    profile: user.profile || '',
    type: user.type || '1',
    flag: false,
    created_user_id: currentUser.id,
    updated_user_id: currentUser.id
  };

  const form = ref({ ...initialForm });

  const errors = ref(Object.fromEntries(
    Object.keys(initialForm).map(key => [key, store.state.errors[key] || ''])
  ));
  
  const onFileSelected = (e) => {
    const selectedFile = e.target.files[0];
    
    form.value.profile = selectedFile;
    store.dispatch('imageName', selectedFile.name);

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataURL = event.target.result;
      showPreview
      store.dispatch('image', dataURL);
    };
    reader.readAsDataURL(form.value.profile);
  };

  const register = () => {
    const f = new FormData();

    for (let [key, val] of Object.entries(form.value)) {
      f.append(key, val);
    }

    api.post('/users', f, { headers })
      .then(() => {
        store.dispatch('register', form.value)
        router.push({ name: 'usersCreate' })
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
    form.value = { ...initialForm };
    fileInput.value.value = ''
    showPreview.value = false
    Object.keys(errors.value).forEach(key => errors.value[key] = '' );
  }
</script>
