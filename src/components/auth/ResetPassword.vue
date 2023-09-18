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
                  <input type="password" class="form-control" id="password" v-model="form.password">
                  <span class="text-danger fw-bolder" v-if="this.errors.password">
                    <span v-text="this.errors.password" />
                  </span>
                </div>
              </div>
              <div class="row mt-4 align-items-center">
                <div class="col-4 text-end">
                  <label for="passwrod_confirmation" class="form-label mb-0 me-3">Password Confirmation:</label>
                </div>
                <div class="col-6">
                  <input type="password" class="form-control" id="password_confirmation" v-model="form.password_confirmation">
                  <span class="text-danger fw-bolder" v-if="this.errors.password_confirmation">
                    <span v-text="this.errors.password_confirmation" />
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
      form: {
        password: '',
        password_confirmation: ''
      },
      errors: {
        password: '',
        password_confirmation: ''
      },
    };
  },
};
</script>
