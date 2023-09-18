<script setup>
</script>

<template>
  <div class="container py-5">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h5 class="mb-0 py-2">Post List</h5>
          </div>
          <div class="card-body">
            <div class="row py-4">
              <div class="col-12 d-flex justify-content-end">
                <form @submit.prevent="searchForm" class="d-flex justify-content-end me-3">
                  <div class="d-flex align-items-center justify-content-center me-4">
                    <label for="keyword" class="form-label border-success mb-0 me-3">Keyword:</label>
                    <input type="text" class="form-control" id="keyword" v-model="keyword">
                  </div>
                  <button class="btn btn-success px-5">Search</button>
                </form>
                <a class="btn btn-success me-3 px-5" :href="create">Create</a>
                <button class="btn btn-success me-3 px-5">Upload</button>
                <button class="btn btn-success px-5">Download</button>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <table class="table table-striped">
                  <thead class="table-primary">
                    <tr>
                      <th scope="col" class="ps-5">Post Title</th>
                      <th scope="col">Post Description</th>
                      <th scope="col">Posted User</th>
                      <th scope="col">Posted Date</th>
                      <th scope="col">Operation</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="post in posts" :key="post.id">
                      <td class="ps-5 pointer text-success" @click="detailsPost(post)" data-bs-toggle="modal" data-bs-target="#postDetail">{{ post.title }}</td>
                      <td>{{ post.description }}</td>
                      <td>{{ post.created_user_id }}</td>
                      <td>{{ post.created_at }}</td>
                      <td>
                        <a :href="edit" class="btn btn-primary btn-sm me-3">Edit</a>
                        <button @click="deletePost(post)" data-bs-toggle="modal" data-bs-target="#postDelete" class="btn btn-danger btn-sm">Delete</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- post delete modal -->
    <div class="modal fade" id="postDelete" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
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
              <div class="col-9 text-danger fst-italic">{{ post.status }}</div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-danger">Delete</button>
          </div>
        </div>
      </div>
    </div>
    <!-- post show modal -->
    <div class="modal fade" id="postDetail" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
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
              <div class="col-8 text-danger fst-italic">{{ post.status }}</div>
            </div>
            <div class="row mb-4">
              <div class="col-4 ps-4">Created Date</div>
              <div class="col-8 text-danger fst-italic">{{ post.created_at }}</div>
            </div>
            <div class="row mb-4">
              <div class="col-4 ps-4">Created User</div>
              <div class="col-8 text-danger fst-italic">{{ post.created_user_id }}</div>
            </div>
            <div class="row mb-4">
              <div class="col-4 ps-4">Updated Date</div>
              <div class="col-8 text-danger fst-italic">{{ post.updated_at }}</div>
            </div>
            <div class="row mb-4">
              <div class="col-4 ps-4">Updated User</div>
              <div class="col-8 text-danger fst-italic">{{ post.updated_user_id }}</div>
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

<script>
  import { ref } from 'vue'
  import api from '../../axios';

  export default {
    data() {
      return {
        create: 'posts/create',
        edit: 'posts/edit',
        keyword: ref(''),
        post: [],
        posts: [
          { id: 1, title: 'Post one title', description: 'john@example.com', status: 'Active', created_user_id: 1, updated_user_id: 1, created_at: 'something', updated_at: 'something..' },
          { id: 2, title: 'Post two title', description: 'aungaung@gmail.com', status: 'Inactive', created_user_id: 2, updated_user_id: 1, created_at: 'something', updated_at: 'something..' },
        ]
        // posts: []
      }
    },
    methods: {
      deletePost(post) {
        this.post = post;
      },
      detailsPost(post) {
        this.post = post;
      }
    },
    // mounted() {
    //   api.get('/posts')
    //   .then((response) => {
    //     this.posts = response.data.posts
    //   })
    // }
  }
</script>
