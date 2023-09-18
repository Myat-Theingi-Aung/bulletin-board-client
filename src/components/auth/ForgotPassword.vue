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
                  <span class="text-danger fw-bolder" v-if="this.errors.email">
                    <span v-text="this.errors.email" />
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

<script>
export default {
  data() {
    return {
      form: {
        email: ''
      },
      errors: {
        email: ''
      }
    }
  }
}
</script>
