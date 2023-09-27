<template>
  <div class="container py-5">
    <div class="row">
      <div class="col-7 mx-auto">
        <div class="card">
          <div class="card-header bg-success">
            <h5 class="text-white">Reset Password</h5>
          </div>
          <div class="card-body py-4">
            <form @submit.prevent="reset">
              <div class="row mt-4 align-items-center">
                <div class="col-4 text-end">
                  <label for="passwrod" class="form-label mb-0 me-3">Password:</label>
                </div>
                <div class="col-6">
                  <div class="input-group mb-3">
                    <input :type="showPassword ? 'text' : 'password'" v-model="form.password" class="form-control" aria-label="Recipient's username" aria-describedby="password_confirmation">
                    <a class="btn btn-outline-secondary" @click="togglePasswordVisibility('password')" id="password_confirmation">
                      <font-awesome-icon :icon="showPassword ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'" />
                    </a>
                  </div>
                  <span class="text-danger fw-bolder" v-if="errors.password">
                    <span v-text="errors.password" />
                  </span>
                </div>
              </div>
              <div class="row mt-4 align-items-center">
                <div class="col-4 text-end">
                  <label for="passwrod_confirmation" class="form-label mb-0 me-3">Password Confirmation:</label>
                </div>
                <div class="col-6">
                  <div class="input-group mb-3">
                    <input :type="showConfirmPassword ? 'text' : 'password'" v-model="form.password_confirmation" class="form-control" aria-label="Recipient's username" aria-describedby="password_confirmation">
                    <a class="btn btn-outline-secondary" @click="togglePasswordVisibility('confirm')" id="password_confirmation">
                      <font-awesome-icon :icon="showConfirmPassword ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'" />
                    </a>
                  </div>
                  <span class="text-danger fw-bolder" v-if="errors.password_confirmation">
                    <span v-text="errors.password_confirmation" />
                  </span>
                </div>
              </div>
              <div class="row mt-4 align-items-center">
                <div class="col-4 text-end"></div>
                <div class="col-6">
                  <button class="btn btn-success mb-4">Update Password</button>
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
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import Swal from "sweetalert2"
import { usePasswordToggle } from '../../utils/CommonUtils'

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

  const store = useStore()
  const router = useRouter()
  const route = useRoute()
  const data = store.state.resetToken
  const token = route.params.token
  const { showPassword, showConfirmPassword, togglePasswordVisibility } = usePasswordToggle();

  onMounted(() => {
    if(data.token != token) {
      router.push({ name: '404' });
    }
  })

  const initialForm = {
    token: token,
    password: '',
    password_confirmation: ''
  }

  const form = ref({...initialForm})
  const errors = ref({...initialForm})

  const reset = () => {
    api.post(`/reset/${token}`, form.value)
    .then((response) => {
      Toast.fire({
        icon: "success",
        title: response.data.success,
      });
      errors.value = { ...initialForm }
      store.dispatch('resetTokenClear')
      router.push({name: 'login'})
    })
    .catch((error) => {
      error.response.data.errors.password ? errors.value.password =  error.response.data.errors.password[0] : errors.value.password = ''
      error.response.data.errors.password_confirmation ? errors.value.password_confirmation =  error.response.data.errors.password_confirmation[0] : errors.value.password_confirmation = ''
    })
  }
</script>
