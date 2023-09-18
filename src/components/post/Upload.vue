<template>
  <div class="container py-5">
    <div class="row">
      <div class="col-7 mx-auto">
        <div class="card">
          <div class="card-header bg-success d-flex justify-content-between align-items-center">
            <h5 class="text-white">Post Upload</h5>
            <a class="btn btn-light text-success" :href="list">Back</a>
          </div>
          <div class="alert alert-danger" role="alert" v-if="this.errors.file">
            <span v-text="this.errors.file" />
          </div>
          <div class="card-body py-5">
            <form @submit.prevent="upload">
              <div class="row mb-4 align-items-center">
                <div class="col-4 text-end">
                  <label for="file" class="form-label mb-0 me-3">CSV File</label>
                </div>
                <div class="col-6">
                  <input class="form-control" type="file" id="file">
                </div>
              </div>
              <div class="row">
                <div class="col-4"></div>
                <div class="col-6">
                  <button class="btn btn-success me-3">Upload</button>
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
  data(){
    return {
      list: '/posts',
      file: '',
      errors: {
        file: ''
      }
    }
  }
}
</script>
