<template>
  <div class="container py-5">
      <div class="row">
          <div class="col-7 mx-auto ">
              <div class="card">
                  <div class="card-header bg-success">
                      <h5 class="text-white">Edit Confirm Post</h5>
                  </div>
                  <div class="card-body">
                      <form @submit.prevent="update">
                          <div class="row align-items-center mb-4">
                            <div class="col-4 text-end">
                              <label for="text" class="form-label mb-0 me-3">
                                Title
                                <font-awesome-icon icon="fa-solid fa-asterisk" class="text-danger mb-2 fs-small" />
                              </label>
                            </div>
                            <div class="col-6">
                              <input type="text" class="form-control" id="text" v-model="form.title">
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
                            </div>
                          </div>
                          <div class="row align-items-center mb-4">
                            <div class="col-4 text-end">
                              <label for="status" class="form-label mb-0 me-3">Status</label>
                            </div>
                            <div class="col-6">
                              <div class="form-check form-switch">
                                <input class="form-check-input" v-model="form.check" type="checkbox" id="status">
                              </div>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-4"></div>
                            <div class="col-6">
                              <button class="btn btn-success me-3">Confirm</button>
                              <a @click="cancel" class="btn btn-secondary">Cancel</a>
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
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import Swal from "sweetalert2"

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const list = '/'
  const store = useStore()
  const router = useRouter()
  const user = store.state.user
  const post = store.state.post
  const postId = post.id

  const initialForm = {
    id: post.id,
    title: post.title,
    description: post.description,
    check: post.check,
    status: post.check == true ? '1' : '0', 
    flag: true,
    created_user_id: post.created_user_id,
    updated_user_id: user.id
  }

  const form = ref({ ...initialForm })

  const errors = ref({
    title: '',
    description: ''
  })

  const update = () => {
    api.put(`/posts/${postId}`, form.value)
    .then((response) => {
      Toast.fire({
        icon: "success",
        title: response.data.success,
      });
      store.dispatch('postClear')
      store.dispatch('errorsClear')
      router.push({name: 'posts'})
    })
    .catch((error) => {
      error.response.data.errors.title ? errors.value.title =  error.response.data.errors.title[0] : errors.value.title = ''
      error.response.data.errors.description ? errors.value.description =  error.response.data.errors.description[0] : errors.value.description = ''
      store.dispatch('errors', errors.value)
      store.dispatch('post', form.value)
      form.value.status = form.value.check
      router.push({name: 'postsEdit', params: { id: postId }})
    })
  }

  const cancel = () => {
    store.dispatch('post', form.value)
    router.push({name: 'postsEdit', params: { id: post.id }})
  }
</script>

