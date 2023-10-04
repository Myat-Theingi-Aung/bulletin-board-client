<template>
    <div class="container py-5">
        <div class="row">
            <div class="col-7 mx-auto ">
                <div class="card">
                    <div class="card-header bg-success d-flex justify-content-between align-items-center">
                        <h5 class="text-white">Create Post</h5>
                        <a class="btn btn-light text-success" :href="list">Back</a>
                    </div>
                    <div class="card-body my-4">
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
                                <span class="text-danger fw-bolder" v-if="errors.title">
                                  <span v-text="errors.title" />
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
                                <span class="text-danger fw-bolder" v-if="errors.description">
                                  <span v-text="errors.description" />
                                </span>
                              </div>
                            </div>
                            <div class="row">
                              <div class="col-4"></div>
                              <div class="col-6">
                                <button class="btn btn-success me-3">Create</button>
                                <a class="btn btn-secondary" @click="resetForm">Clear</a>
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
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

  const store = useStore()
  const router = useRouter()
  const list = '/'
  const user = store.state.user
  const post = store.state.post
  const initialForm = {
    title: post.title,
    description: post.description,
    user_id: user.id,
    flag: false,
    created_user_id: user.id,
    updated_user_id: user.id
  }
  const form = ref({ ...initialForm })
  const errors = ref({
    title: store.state.errors.title,
    description: store.state.errors.description
  })

  const create = () => {
    api.post('/posts', form.value)
    .then(() => {
      store.dispatch('post', form.value)
      store.dispatch('errorsClear')
      router.push({ name: 'postsCreateConfirm' })
    })
    .catch((error) => {
      error.response.data.errors.title ? errors.value.title =  error.response.data.errors.title[0] : errors.value.title = ''
      error.response.data.errors.description ? errors.value.description =  error.response.data.errors.description[0] : errors.value.description = ''
    })
  }

  const resetForm = () => {
    store.dispatch('postClear')
    store.dispatch('errorsClear')
    form.value.title = ''
    form.value.description = ''
    errors.value.title = ''
    errors.value.description = ''
  }
</script>
