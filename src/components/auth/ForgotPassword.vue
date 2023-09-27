<template>
  <div class="container py-5">
    <div class="row">
      <div class="col-7 mx-auto">
        <div class="card">
          <div class="card-header bg-success">
            <h5 class="text-white">Forgot Password</h5>
          </div>
          <div class="card-body py-5">
            <form @submit.prevent="forgot">
              <div class="row align-items-center mb-4">
                <div class="col-4 text-end">
                  <label for="email" class="form-label mb-0 me-3">Email Address:</label>
                </div>
                <div class="col-6">
                  <input type="email" class="form-control" id="email" v-model="form.email">
                  <span class="text-danger fw-bolder" v-if="errors.email">
                    <span v-text="errors.email" />
                  </span>
                </div>
              </div>
              <div class="row">
                <div class="col-4"></div>
                <div class="col-6">
                  <button class="btn btn-success">Reset Password</button>
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
import { useStore } from 'vuex'
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

  const store = useStore()
  const router = useRouter()
  const initialForm = {
    email: ''
  }
  const form = ref({...initialForm})
  const errors = ref({...initialForm})

  const forgot = () => {
    api.post('forgot', form.value)
    .then((response) => {
      Toast.fire({
        icon: "success",
        title: response.data.success,
      });
      errors.value.email = ''
      store.dispatch('resetToken', response.data.passwordReset)
      router.push({name: 'login'})
    })
    .catch((error) => {
      error.response.data.errors.email ? errors.value.email =  error.response.data.errors.email[0] : errors.value.email = ''
    })
  }

</script>
