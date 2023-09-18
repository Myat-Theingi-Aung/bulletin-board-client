<template>
  <div class="container py-5">
    <div class="row">
      <div class="col-7 mx-auto">
        <div class="card">
          <div class="card-header bg-success">
            <h5 class="text-white">Log In</h5>
          </div>
          <div class="alert alert-danger" role="alert" v-if="this.errors.error">
            <span v-text="this.errors.error" />
          </div>
          <div class="card-body py-5">
            <form @submit.prevent="login">
              <div class="row align-items-center">
                <div class="col-4 text-end">
                  <label for="email" class="form-label mb-0 me-3">Email Address:</label>
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
                <div class="col-4 text-end"></div>
                <div class="col-6">
                  <div class="mb-3 d-flex justify-content-between align-items-center">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                      <label class="form-check-label" for="flexCheckDefault">
                        Remember me
                      </label>
                    </div>
                    <a :href="forgotLink" class="text-primary text-decoration-none">forgotten Password?</a>
                  </div>
                  <button class="btn btn-success w-100 mb-4">Login</button>
                  <a :href="createLink" class="text-primary text-decoration-none">
                    Create account?
                    <font-awesome-icon icon="fa-solid fa-user-plus" />
                  </a>
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
        email: '',
        password: ''
      },
      errors: {
        error: '',
        email: '',
        password: ''
      },
    };
  },
  methods: {
    async login(){
      await api.post('/login', this.form)
      .then((response) => {
        console.log('success')
      })
      .catch((error) => {
        error.response.data.error ? this.errors.error = error.response.data.error : this.errors.error = ''
        error.response.data.errors.email ? this.errors.email =  error.response.data.errors.email[0] : this.errors.email = ''
        error.response.data.errors.password ? this.errors.password =  error.response.data.errors.password[0] : this.errors.password = ''
      })
    }
  }
};
</script>
