<template>
  <div class="container py-5">
      <div class="row">
          <div class="col-7 mx-auto ">
              <div class="card">
                  <div class="card-header bg-success">
                      <h5 class="text-white">Edit Confirm Post</h5>
                  </div>
                  <div class="card-body">
                      <form @submit.prevent="create">
                          <div class="row align-items-center mb-4">
                            <div class="col-4 text-end">
                              <label for="text" class="form-label mb-0 me-3">
                                Title
                                <font-awesome-icon icon="fa-solid fa-asterisk" class="text-danger mb-2 fs-small" />
                              </label>
                            </div>
                            <div class="col-6">
                              <input type="text" class="form-control" id="text" v-model="form.title">
                              <span class="text-danger fw-bolder" v-if="this.errors.title">
                                <span v-text="this.errors.title" />
                              </span>
                            </div>
                          </div>
                          <div class="row align-items-center mb-4">
                            <div class="col-4 text-end">
                              <label for="text" class="form-label mb-0 me-3">
                                Description
                                <font-awesome-icon icon="fa-solid fa-asterisk" class="text-danger mb-2 fs-small" />
                              </label>
                            </div>
                            <div class="col-6">
                              <textarea type="text" class="form-control" id="text" v-model="form.description"></textarea>
                              <span class="text-danger fw-bolder" v-if="this.errors.description">
                                <span v-text="this.errors.description" />
                              </span>
                            </div>
                          </div>
                          <div class="row align-items-center mb-4">
                            <div class="col-4 text-end">
                              <label for="status" class="form-label mb-0 me-3">Status</label>
                            </div>
                            <div class="col-6">
                              <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" id="status">
                              </div>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-4"></div>
                            <div class="col-6">
                              <button class="btn btn-success me-3">Confirm</button>
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
export default {
  data() {
    return {
      list: '/posts',
      form: {
        title: '',
        description: ''
      },
      errors: {
        title: '',
        description: '',
      }
    }
  },
}
</script>

