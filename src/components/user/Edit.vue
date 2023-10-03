<template>
  <div class="container py-5">
    <div class="row">
      <div class="col-7 mx-auto">
        <div class="card">
          <div class="card-header bg-success">
            <h5 class="text-white">Profile Edit</h5>
          </div>
          <div class="card-body py-4">
            <form @submit.prevent="update" method="post" enctype="multipart/form-data" class="pt-3">
              <div class="row align-items-center">
                <div class="col-4 text-end">Old Profile</div>
                <div class="col-6">
                  <img :src="image" :alt="user.name" class="img-fluid w-50 rounded">
                </div>
              </div>
              <div class="row mt-4 align-items-center">
                <div class="col-4 text-end">
                  <label for="name" class="form-label mb-0 me-3">
                    Name
                    <font-awesome-icon icon="fa-solid fa-asterisk" class="text-danger mb-2 fs-small" />
                  </label>
                </div>
                <div class="col-6">
                  <input type="text" class="form-control" id="name" v-model="form.name">
                  <span class="text-danger fw-bolder" v-if="errors.name">
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
                  <input type="email" class="form-control" id="email" v-model="form.email">
                  <span class="text-danger fw-bolder" v-if="errors.email">
                    <span v-text="errors.email" />
                  </span>
                </div>
              </div>
              <div class="row mt-4 align-items-center">
                <div class="col-4 text-end">
                  <label for="type" class="form-label mb-0 me-3">Type</label>
                </div>
                <div class="col-6">
                  <select class="form-select">
                    <option value="0">Admin</option>
                    <option value="1">User</option>
                  </select>
                </div>
              </div>
              <div class="row mt-4 align-items-center">
                <div class="col-4 text-end">
                  <label for="phone" class="form-label mb-0 me-3">Phone</label>
                </div>
                <div class="col-6">
                  <input type="text" class="form-control" id="phone" v-model="form.phone">
                  <span class="text-danger fw-bolder" v-if="errors.phone">
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
                  <span class="text-danger fw-bolder" v-if="errors.dob">
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
                  <span class="text-danger fw-bolder" v-if="errors.address">
                    <span v-text="errors.address" />
                  </span>
                </div>
              </div>
              <div class="row mt-4 align-items-center" v-if="showPreview">
                <div class="col-4"></div>
                <div class="col-6 position-relative">
                  <img :src="showPreview" alt="Image Preview" class="img-fluid rounded w-100" />
                  <font-awesome-icon :icon="['fas', 'circle-xmark']" class="icon-top-right" @click="removeImage" />
                </div>
              </div>
              <div class="row mt-4 align-items-center">
                <div class="col-4 text-end">
                  <label for="profile" class="form-label mb-0 me-3">New Profile</label>
                </div>
                <div class="col-6">
                  <input type="file" ref="fileInput" @change="onFileSelected" class="form-control">
                  <span class="text-danger fw-bolder" v-if="errors.profile">
                    <span v-text="errors.profile" />
                  </span>
                </div>
              </div>
              <div class="row mt-4 align-items-center">
                <div class="col-4 text-end"></div>
                <div class="col-6">
                  <button class="btn btn-success me-3">Update</button>
                  <a class="btn btn-secondary me-3" @click="resetForm">Clear</a>
                  <a class="text-decoration-none" href="/change/password">Change Password</a>
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
import { useStore } from 'vuex'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Toast from '../../utils/Toast'
import { imagePreview } from '../../utils/CommonUtils'

  const store = useStore()
  const router = useRouter()
  const user = store.state.user
  const image = ref('')
  const headers = { 'Content-Type': 'multipart/form-data' }
  const { showPreview, fileInput, removeImage } = imagePreview()
  const initialForm = {
    'name': user.name,
    'email': user.email,
    'type': user.type,
    'phone': user.phone,
    'address': user.address,
    'dob': user.dob,
    'profile': '',
    'created_user_id': user.id,
    'updated_user_id': user.id
  }
  const form = ref({...initialForm})

  const errors = ref(Object.fromEntries(
    Object.keys(initialForm).map(key => [key, ''])
  ));

  onMounted(() => {
    fetchImage(user.profile);
  })

  const onFileSelected = (e) => { 
    form.value.profile = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      showPreview.value = reader.result;
    }
    reader.readAsDataURL(form.value.profile);
  }

  const update = () => {
    const f = new FormData();
    for (let [key, val] of Object.entries(form.value)) {
      f.append(key, val);
    }
    f.append('_method', 'put');

    api.post(`/users/${user.id}`, f, { headers })
    .then((response) => {
      Toast.fire({
        icon: "success",
        title: response.data.success,
      });
      store.dispatch('user', response.data.user)
      router.push({name: 'users'})
    })
  }

  const resetForm = function() {
    const f = document.querySelector('form');
    f.reset();
    form.value = { ...initialForm };
  }

  const fetchImage = (filename) => {
    api.get(`/images/${filename}`, { responseType: 'blob' })
      .then((response) => {
        const blob = new Blob([response.data], { type: response.headers['content-type'] });
        const imageUrl = URL.createObjectURL(blob);
        image.value = imageUrl;
      })
  };
</script>
