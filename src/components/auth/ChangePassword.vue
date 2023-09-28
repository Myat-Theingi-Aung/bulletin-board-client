<template>
  <div class="container py-5">
    <div class="row">
      <div class="col-7 mx-auto">
        <div class="card">
          <div class="card-header bg-success">
            <h5 class="text-white">Change Password</h5>
          </div>
          <div class="card-body py-4">
            <form @submit.prevent="changePasswrod">
              <div class="row mt-4 align-items-center">
                <div class="col-4 text-end">
                  <label for="passwrod" class="form-label mb-0 me-3">
                    Current password
                    <font-awesome-icon icon="fa-solid fa-asterisk" class="text-danger mb-2 fs-small" />
                  </label>
                </div>
                <div class="col-6">
                  <div class="input-group mb-3">
                    <input :type="showCurrentPassword ? 'text' : 'password'" v-model="form.current_password" class="form-control" aria-label="Recipient's username" aria-describedby="password_confirmation">
                    <a class="btn btn-outline-secondary" @click="togglePasswordVisibility('current')" id="password_confirmation">
                      <font-awesome-icon :icon="showCurrentPassword ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'" />
                    </a>
                  </div>
                  <span class="text-danger fw-bolder" v-if="errors.current_password">
                    <span v-text="errors.current_password" />
                  </span>
                </div>
              </div>
              <div class="row mt-4 align-items-center">
                <div class="col-4 text-end">
                  <label for="passwrod" class="form-label mb-0 me-3">
                    New Password
                    <font-awesome-icon icon="fa-solid fa-asterisk" class="text-danger mb-2 fs-small" />
                  </label>
                </div>
                <div class="col-6">
                  <div class="input-group mb-3">
                    <input :type="showPassword ? 'text' : 'password'" v-model="form.new_password" class="form-control" aria-label="Recipient's username" aria-describedby="password_confirmation">
                    <a class="btn btn-outline-secondary" @click="togglePasswordVisibility('password')" id="password_confirmation">
                      <font-awesome-icon :icon="showPassword ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'" />
                    </a>
                  </div>
                  <span class="text-danger fw-bolder" v-if="errors.new_password">
                    <span v-text="errors.new_password" />
                  </span>
                </div>
              </div>
              <div class="row mt-4 align-items-center">
                <div class="col-4 text-end">
                  <label for="passwrod_confirmation" class="form-label mb-0 me-3">
                    New Confirm Password
                    <font-awesome-icon icon="fa-solid fa-asterisk" class="text-danger mb-2 fs-small" />
                  </label>
                </div>
                <div class="col-6">
                  <div class="input-group mb-3">
                    <input :type="showConfirmPassword ? 'text' : 'password'" v-model="form.new_password_confirmation" class="form-control" aria-label="Recipient's username" aria-describedby="password_confirmation">
                    <a class="btn btn-outline-secondary" @click="togglePasswordVisibility('confirm')" id="password_confirmation">
                      <font-awesome-icon :icon="showConfirmPassword ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'" />
                    </a>
                  </div>
                  <span class="text-danger fw-bolder" v-if="errors.new_password_confirmation">
                    <span v-text="errors.new_password_confirmation" />
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
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import Toast from '../../utils/Toast'
import { usePasswordToggle } from '../../utils/CommonUtils'

  const forgotLink= 'forgot-password'
  const createLink= 'register'
  const store = useStore();
  const router = useRouter();
  const { showPassword, showConfirmPassword, showCurrentPassword, togglePasswordVisibility } = usePasswordToggle();
  const currentUser = store.state.user;

  const initialForm = {
    current_password: '',
    new_password: '',
    new_password_confirmation: ''
  }

  const form = ref({...initialForm})

  const errors = ref({...initialForm})

  const changePasswrod = () => {
    api.post('change-password', form.value)
    .then((response) => {
      Toast.fire({
        icon: "success",
        title: response.data.success,
      });
      router.push({name: 'users'})
    })
    .catch((error) => {
      error.response.data.errors.current_password ? errors.value.current_password =  error.response.data.errors.current_password[0] : errors.value.current_password = ''
      error.response.data.errors.new_password ? errors.value.new_password =  error.response.data.errors.new_password[0] : errors.value.new_password = ''
      error.response.data.errors.new_password_confirmation ? errors.value.new_password_confirmation =  error.response.data.errors.new_password_confirmation[0] : errors.value.new_password_confirmation = ''
    })
  }
</script>
