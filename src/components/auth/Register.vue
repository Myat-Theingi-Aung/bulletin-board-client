<template>
  <div class="container py-5">
    <div class="row">
      <div class="col-7 mx-auto">
        <div class="card">
          <div class="card-header bg-success">
            <h5 class="text-white">Register</h5>
          </div>
          <div class="card-body py-4">
            <form @submit.prevent="register">
              <div class="row align-items-center">
                <div class="col-4 text-end">
                  <label for="name" class="form-label mb-0 me-3">
                    Name
                    <font-awesome-icon icon="fa-solid fa-asterisk" class="text-danger mb-2 fs-small" />
                  </label>
                </div>
                <div class="col-6">
                  <input type="text" class="form-control" id="name" v-model="form.name">
                  <span class="text-danger fw-bolder" v-if="this.errors.name">
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
                  <input type="email" class="form-control" id="email" v-model="form.email">
                  <span class="text-danger fw-bolder" v-if="this.errors.email">
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
                  <span class="text-danger fw-bolder" v-if="this.errors.password">
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
                  <span class="text-danger fw-bolder" v-if="this.errors.password_confirmation">
                    <span v-text="this.errors.password_confirmation" />
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
                  <span class="text-danger fw-bolder" v-if="this.errors.phone">
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
                  <span class="text-danger fw-bolder" v-if="this.errors.dob">
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
                  <span class="text-danger fw-bolder" v-if="this.errors.address">
                    <span v-text="this.errors.address" />
                  </span>
                </div>
              </div>
              <div class="row mt-4 align-items-center">
                <div class="col-4 text-end">
                  <label for="profile" class="form-label mb-0 me-3">Profile</label>
                </div>
                <div class="col-6">
                  <input type="file" class="form-control" id="profile">
                  <span class="text-danger fw-bolder" v-if="this.errors.profile">
                    <span v-text="this.errors.profile" />
                  </span>
                </div>
              </div>
              <div class="row mt-4 align-items-center">
                <div class="col-4 text-end"></div>
                <div class="col-6">
                  <button class="btn btn-success me-3">Register</button>
                  <button class="btn btn-secondary">Clear</button>
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
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        phone: '',
        dob: '',
        address: '',
      },
      errors: {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        phone: '',
        dob: '',
        address: '',
        profile: ''
      },
    };
  },
};
</script>
