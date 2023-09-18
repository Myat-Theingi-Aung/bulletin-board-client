<template>
  <div class="container py-5">
    <div class="row">
      <div class="col-7 mx-auto">
        <div class="card">
          <div class="card-header bg-success">
            <h5 class="text-white">Change Password</h5>
          </div>
          <div class="card-body py-4">
            <form @submit.prevent="reset">
              <div class="row mt-4 align-items-center">
                <div class="col-4 text-end">
                  <label for="passwrod" class="form-label mb-0 me-3">
                    Current password
                    <font-awesome-icon icon="fa-solid fa-asterisk" class="text-danger mb-2 fs-small" />
                  </label>
                </div>
                <div class="col-6">
                  <input type="password" class="form-control" id="password" v-model="form.password">
                  <span class="text-danger fw-bolder" v-if="this.errors.password">
                    <span v-text="this.errors.password" />
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
                  <input type="password" class="form-control" id="password" v-model="form.new_pass">
                  <span class="text-danger fw-bolder" v-if="this.errors.new_pass">
                    <span v-text="this.errors.new_pass" />
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
                  <input type="password" class="form-control" id="password_confirmation" v-model="form.new_confirm_pass">
                  <span class="text-danger fw-bolder" v-if="this.errors.new_confirm_pass">
                    <span v-text="this.errors.new_confirm_pass" />
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

<script>
import api from '../../axios';

  export default {
  data() {
    return {
      forgotLink: 'forgot-password',
      createLink: 'register',
      form: {
        password: '',
        new_pass: '',
        new_confirm_pass: ''
      },
      errors: {
        password: '',
        password_confirmation: ''
      },
    };
  },
};
</script>
