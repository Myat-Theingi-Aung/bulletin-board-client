<template>
    <div class="container py-5">
        <div class="row">
            <div class="col-7 mx-auto ">
                <div class="card">
                    <div class="card-header bg-success d-flex justify-content-between align-items-center">
                        <h5 class="text-white">Create Post</h5>
                        <a class="btn btn-light text-success" :href="list">Back</a>
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
                            <div class="row">
                              <div class="col-4"></div>
                              <div class="col-6">
                                <button class="btn btn-success me-3">Create</button>
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
    list: '/posts',
    user: localStorage.getItem('user'),
    form: {
      title: '',
      description: '',
    },
    errors: {
      error: '',
      title: '',
      description: ''
    },
  };
},
created() {
  this.form.user_id = this.user.id
},
methods: {
  async create(){
    await api.post('/posts', this.form)
    .then((response) => {
      console.log('success')
    })
    .catch((error) => {
      error.response.data.error ? this.errors.error = error.response.data.error : this.errors.error = ''
      error.response.data.errors.title ? this.errors.title =  error.response.data.errors.title[0] : this.errors.title = ''
      error.response.data.errors.description ? this.errors.description =  error.response.data.errors.description[0] : this.errors.description = ''
    })
  }
}
};
</script>
