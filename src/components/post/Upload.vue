<template>
  <div class="container py-5">
    <div class="row">
      <div class="col-7 mx-auto">
        <div class="card">
          <div class="card-header bg-success d-flex justify-content-between align-items-center">
            <h5 class="text-white">Post Upload</h5>
            <a class="btn btn-light text-success" :href="list">Back</a>
          </div>
          <div class="alert alert-danger" role="alert" v-if="errors">
            <span v-text="errors" />
          </div>
          <div class="card-body py-5">
            <form @submit.prevent="upload">
              <div class="row mb-4 align-items-center">
                <div class="col-4 text-end">
                  <label for="file" class="form-label mb-0 me-3">CSV File</label>
                </div>
                <div class="col-6">
                  <input class="form-control" @change="onFileSelected" type="file" id="file">
                </div>
              </div>
              <div class="row">
                <div class="col-4"></div>
                <div class="col-6">
                  <button class="btn btn-success me-3">Upload</button>
                  <a class="btn btn-secondary" @click="resetForm">Clear</a>
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
import { ref, onMounted } from 'vue'
import api from '../../axios'
import { useRouter } from 'vue-router'
import Swal from "sweetalert2"

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const router = useRouter();
  const list = '/'
  const file = ref('')
  const errors = ref('')

  const onFileSelected = (e) => file.value = e.target.files[0];

  const upload = () => {
    const headers = { 'Content-Type': 'multipart/form-data' }

    const f = new FormData();
    f.append('file', file.value)

    api.post('posts-import', f, { headers })
    .then((response) => {
      Toast.fire({
        icon: "success",
        title: response.data.success,
      });
      router.push({ name: 'posts' });
    })
    .catch((error) => {
      error.response.data.error ? errors.value = error.response.data.error : errors.value = ''
      error.response.data.errors.file ? errors.value = error.response.data.errors.file[0] : errors.value = ''
    })
  }

  const resetForm = function() {
      const f = document.querySelector('form');
      f.reset();
      file.value = '';
      errors.value = '';
    }
</script>
