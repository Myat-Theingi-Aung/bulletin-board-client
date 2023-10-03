<script setup>
</script>

<template>
  <div class="container py-5">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header bg-success">
            <h5 class="mb-0 py-2 text-white">Post List</h5>
          </div>
          <div class="card-body">
            <div class="row py-4">
              <div class="col-12 d-flex justify-content-end">
                <form @submit.prevent="fetchPosts" class="d-flex justify-content-end me-3">
                  <div class="d-flex align-items-center justify-content-center me-4">
                    <label for="keyword" class="form-label border-success mb-0 me-3">Keyword:</label>
                    <input type="text" class="form-control" id="keyword" v-model="keyword">
                  </div>
                  <button class="btn btn-success px-5">Search</button>
                </form>
                <span v-if="store.getters.isLoggedIn">
                  <a class="btn btn-success me-3 px-5" :href="create">Create</a>
                  <a class="btn btn-success me-3 px-5" :href="upload">Upload</a>
                  <button class="btn btn-success px-5" @click="downloadCSV">
                    <span>Download</span>
                    <span v-if="isLoading">
                      <font-awesome-icon icon="fa-solid fa-spinner" class="rotate d-inline-block ms-3" />
                    </span>
                  </button>
                </span>  
              </div>
            </div>
            <div class="row">
              <div class="col-12 table-responsive">
                <table class="table table-striped">
                  <thead class="table-primary">
                    <tr>
                      <th scope="col" class="ps-5">Post Title</th>
                      <th scope="col">Post Description</th>
                      <th scope="col">Posted User</th>
                      <th scope="col">Posted Date</th>
                      <th v-if="store.getters.isLoggedIn" scope="col">Operation</th>
                    </tr>
                  </thead>
                  <tbody>
                    <template v-if="posts.length === 0">
                      <tr>
                        <td colspan="5" class="text-center">There is no record</td>
                      </tr>
                    </template>
                    <template v-else>
                      <tr v-for="post in posts" :key="post.id">
                        <td class="ps-5 pointer text-success" @click="detailsPost(post)" data-bs-toggle="modal" data-bs-target="#postDetail">{{ post.title }}</td>
                        <td>{{ post.description }}</td>
                        <td>{{ filterUsers(post.created_user_id)?.name }}</td>
                        <td>{{ $filters.dateFormat(post.created_at) }}</td>
                        <td v-if="store.getters.isLoggedIn">
                          <a :href="'posts/'+ post.id" class="btn btn-primary btn-sm me-3">Edit</a>
                          <button @click="deletePost(post)" data-bs-toggle="modal" data-bs-target="#postDelete" class="btn btn-danger btn-sm">Delete</button>
                        </td>
                      </tr>
                    </template>
                  </tbody>
                </table>

                <div class="d-flex justify-content-end mt-4" v-if="total > 1">
                  <paginate
                    :page-count="total"
                    :page-range="2"
                    :margin-pages="2"
                    :click-handler="fetchPosts"
                    :prev-text="'Previous'"
                    :next-text="'Next'"
                    :container-class="'pagination'"
                    :page-class="'page-item'"
                  >
                  </paginate>
                </div>  
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- post delete modal -->
    <div class="modal fade" id="postDelete" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="staticBackdropLabel">Delete Confirm?</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p class="fs-4 mb-5 text-danger">Are you sure you delete post?</p>
            <div class="row mb-4">
              <div class="col-3 ps-4">ID</div>
              <div class="col-9 text-danger fst-italic">{{ post.id }}</div>
            </div>
            <div class="row mb-4">
              <div class="col-3 ps-4">Title</div>
              <div class="col-9 text-danger fst-italic">{{ post.title }}</div>
            </div>
            <div class="row mb-4">
              <div class="col-3 ps-4">Description</div>
              <div class="col-9 text-danger fst-italic">{{ post.description }}</div>
            </div>
            <div class="row mb-4">
              <div class="col-3 ps-4">Status</div>
              <div class="col-9 text-danger fst-italic">{{ post.status == '1' ? 'Active' : 'Inactive' }}</div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" @click="destroy(post.id)" class="btn btn-danger">Delete</button>
          </div>
        </div>
      </div>
    </div>
    <!-- post show modal -->
    <div class="modal fade" id="postDetail" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="staticBackdropLabel">Post Details</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row my-4">
              <div class="col-4 ps-4">Title</div>
              <div class="col-8 text-danger fst-italic">{{ post.title }}</div>
            </div>
            <div class="row mb-4">
              <div class="col-4 ps-4">Description</div>
              <div class="col-8 text-danger fst-italic">{{ post.description }}</div>
            </div>
            <div class="row mb-4">
              <div class="col-4 ps-4">Status</div>
              <div class="col-8 text-danger fst-italic">{{ post.status == '1' ? 'Active' : 'Inactive' }}</div>
            </div>
            <div class="row mb-4">
              <div class="col-4 ps-4">Created Date</div>
              <div class="col-8 text-danger fst-italic">{{ $filters.dateFormat(post.created_at) }}</div>
            </div>
            <div class="row mb-4">
              <div class="col-4 ps-4">Created User</div>
              <div class="col-8 text-danger fst-italic">{{ filterUsers(post.created_user_id)?.name }}</div>
            </div>
            <div class="row mb-4">
              <div class="col-4 ps-4">Updated Date</div>
              <div class="col-8 text-danger fst-italic">{{ $filters.dateFormat(post.updated_at) }}</div>
            </div>
            <div class="row mb-4">
              <div class="col-4 ps-4">Updated User</div>
              <div class="col-8 text-danger fst-italic">{{ filterUsers(post.updated_user_id)?.name }}</div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch  } from 'vue'
import api from '../../axios'
import $ from 'jquery'
import Paginate from 'vuejs-paginate-next'
import { useStore } from 'vuex'
import Toast from '../../utils/Toast'

  const store = useStore()
  const create = '/posts/create'
  const upload = '/posts/upload'
  const keyword = ref('')
  const post = ref([])
  const posts = ref([])
  const users = ref([])
  const total = ref()
  const isLoading = ref(false)
  const currentUser = store.state.user

  onMounted(() => {
    fetchPosts();
    fetchUsers();
    store.dispatch('postClear')
    store.dispatch('errorsClear')
  });

  const fetchPosts = (page = 1) => {
    api.get(`/posts?page=${page}&search=${keyword.value}&user=${currentUser?.id}`)
      .then((response) => {
        total.value = response.data.pagination.last_page
        posts.value = response.data.posts;
      })
  }

  const fetchUsers = () => {
    api.get(`/users?user=${currentUser?.id}`)
    .then((response) => users.value = response.data.all_users)
  }

  const deletePost = (selectedPost) => {
    post.value = selectedPost;
  };

  const detailsPost = (selectedPost) => {
    post.value = selectedPost;
  };

  const downloadCSV = () => {
    isLoading.value = true
    api.get('/posts-export')
    .then((response) => {
      const number = Math.floor(10000 + Math.random() * 90000);
      const blob = new Blob([response.data], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `posts${number}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      Toast.fire({
        icon: "success",
        title: "Post Download Successfully!",
      });
    })
    .finally(() => {
      isLoading.value = false
    })
  }

  const filterUsers = (id) => users.value.find(user => user.id === id);

  const destroy = (id) => {
    api.delete(`/posts/${id}`)
    .then(() => {
      $("#postDelete").hide();
      $(".modal-backdrop").remove();
      $("body").removeClass("modal-open");
      fetchPosts();
      Toast.fire({
        icon: "success",
        title: "Post Delete Successfully!",
      });
    })
  }

</script>
