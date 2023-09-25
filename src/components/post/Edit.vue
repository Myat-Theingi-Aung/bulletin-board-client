<template>
  <div class="container py-5">
      <div class="row">
          <div class="col-7 mx-auto ">
              <div class="card">
                  <div class="card-header bg-success d-flex justify-content-between align-items-center">
                      <h5 class="text-white">Edit Post</h5>
                      <a class="btn btn-light text-success" :href="list">Back</a>
                  </div>
                  <div class="card-body">
                      <form @submit.prevent="edit">
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
                              <button class="btn btn-success me-3">Edit</button>
                              <a @click="resetForm" class="btn btn-secondary">Clear</a>
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
import { ref, watch, onMounted } from 'vue'
import api from '../../axios'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router';
import router from '../../router';

  const list = '/'
  const store = useStore()
  const route = useRoute()
  const user = store.state.user
  const postId = route.params.id
  const post = store.state.post
  const status = post.status == '1' ? true : false

  const initialForm = {
    id: post.id,
    title: post.title,
    description: post.description,
    check: status,
    status: post.check == true ? '1' : '0',
    flag: false,
    user_id: post.user_id,
    created_user_id: post.created_user_id,
    updated_user_id: user.id
  };

  const form = ref({ ...initialForm });

  const errors = ref({
    title: store.state.errors.title,
    description: store.state.errors.description
  });

  onMounted(() => {
    fetchPost();
  });

  watch(
    () => store.state.post,
    (newPost) => {
      const newStatus = newPost.status == '1' ? true : false;
      form.value = {
        id: newPost.id,
        title: newPost.title,
        description: newPost.description,
        check: newStatus,
        status: newPost.check == true ? '1' : '0',
        flag: false,
        user_id: newPost.user_id,
        created_user_id: newPost.created_user_id,
        updated_user_id: user.id,
      },
      { immediate: true }
    }
  );

  const fetchPost = () => {
    api.get(`posts/${postId}`)
    .then((response) => {
      const e = store.state.errors
      if(Object.keys(e).length == 0) {
        store.dispatch('post', response.data.post)
      }
    })
  }

  const edit = () => {
    api.put(`/posts/${postId}`, form.value)
    .then((response) => {
      store.dispatch('post', form.value)
      router.push({ name: 'postsEditConfirm'})
    })
    .catch((error) => {
      error.response.data.errors.title ? errors.value.title =  error.response.data.errors.title[0] : errors.value.title = ''
      error.response.data.errors.description ? errors.value.description =  error.response.data.errors.description[0] : errors.value.description = ''
    })
  }

  const resetForm = function() {
    form.value = store.state.post
    form.value.check = store.state.post.status == '1' ? true : false
    form.value.flag = false
    errors.value.title = ''
    errors.value.description = ''
  }
</script>

