<template>
  <div class="container py-5">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header bg-success">
            <h5 class="mb-0 py-2 text-white">User List</h5>
          </div>
          <div class="card-body">
            <div class="row py-5">
              <div class="col-12">
                <form @submit.prevent="fetchUsers" class="d-flex justify-content-end">
                  <div class="d-flex align-items-center w-25 justify-content-center me-md-4">
                    <label for="name" class="form-label mb-0 me-md-3">Name:</label>
                    <input type="text" class="form-control" id="name" v-model="name">
                  </div>
                  <div class="d-flex align-items-center w-25 justify-content-center me-4">
                    <label for="email" class="form-label mb-0 me-3">Email:</label>
                    <input type="email" class="form-control" id="email" v-model="email">
                  </div>
                  <div class="d-flex align-items-center w-25 justify-content-center me-4">
                    <label for="from" class="form-label mb-0 me-3">From:</label>
                    <input type="date" class="form-control" id="from" v-model="from">
                  </div>
                  <div class="d-flex align-items-center w-25 justify-content-center me-4">
                    <label for="to" class="from-label mb-0 me-3">to:</label>
                    <input type="date" class="form-control" id="to" v-model="to">
                  </div>
                  <button class="btn btn-success">Search</button>
                </form>
              </div>
            </div>
            <div class="row">
              <div class="col-12 table-responsive">
                <table class="table table-striped">
                  <thead class="table-primary">
                    <tr>
                      <th scope="col">No</th>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Created User</th>
                      <th scope="col">Type</th>
                      <th scope="col">Phone</th>
                      <th scope="col">Date of Birth</th>
                      <th scope="col">Address</th>
                      <th scope="col">Created Date</th>
                      <th scope="col">Updated Date</th>
                      <th scope="col">Operation</th>
                    </tr>
                  </thead>
                  <tbody>
                    <template v-if="users.length === 0">
                      <tr>
                        <td colspan="11" class="text-center">There is no record</td>
                      </tr>
                    </template>
                    <template v-else>
                      <tr v-for="user in users" :key="user.id">
                        <td>{{ user.id }}</td>
                        <td class="text-success pointer text-capitalize" @click="detailsUser(user)" data-bs-toggle="modal" data-bs-target="#userDetails">{{ user.name }}</td>
                        <td>{{ user.email }}</td>
                        <td>{{ filterUsers(user.created_user_id)?.name }}</td>
                        <td>{{ user.type == '1' ? 'User' : 'Admin' }}</td>
                        <td>{{ user.phone }}</td>
                        <td>{{ $filters.dateFormat(user.dob) }}</td>
                        <td class="text-capitalize">{{ user.address }}</td>
                        <td>{{ $filters.dateFormat(user.created_at) }}</td>
                        <td>{{ $filters.dateFormat(user.updated_at) }}</td>
                        <td>
                          <button @click="deleteUser(user)" v-if="user.id !== currentUser.id" data-bs-toggle="modal" data-bs-target="#userDelete" class="btn btn-danger btn-sm">Delete</button>
                        </td>
                      </tr>
                    </template>
                  </tbody>
                </table>
                <div class="flex justify-content-end mt-4" v-if="total > 1">
                  <paginate
                    :page-count="total"
                    :page-range="2"
                    :margin-pages="2"
                    :click-handler="fetchUsers"
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
    <!-- user delete modal -->
    <div class="modal fade" id="userDelete" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="staticBackdropLabel">Delete Confirm?</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p class="fs-4 mb-5 text-danger">Are you sure you delete post?</p>
            <div class="row mb-4">
              <div class="col-4 ps-4">ID</div>
              <div class="col-8">{{ user.id }}</div>
            </div>
            <div class="row mb-4">
              <div class="col-4 ps-4">Name</div>
              <div class="col-8 text-capitalize">{{ user.name }}</div>
            </div>
            <div class="row mb-4">
              <div class="col-4 ps-4">Type</div>
              <div class="col-8">{{ user.type == '0' ? 'Admin' : 'User' }}</div>
            </div>
            <div class="row mb-4">
              <div class="col-4 ps-4">Email</div>
              <div class="col-8">{{ user.email }}</div>
            </div>
            <div class="row mb-4">
              <div class="col-4 ps-4">Phone</div>
              <div class="col-8">{{ user.phone }}</div>
            </div>
            <div class="row mb-4">
              <div class="col-4 ps-4">Date of Birth</div>
              <div class="col-8">{{ $filters.dateFormat(user.dob) }}</div>
            </div>
            <div class="row mb-4">
              <div class="col-4 ps-4">Address</div>
              <div class="col-8 text-capitalize">{{ user.address }}</div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button"  @click="destroy(user.id)" class="btn btn-danger">Delete</button>
          </div>
        </div>
      </div>
    </div>
    <!-- user show modal -->
    <div class="modal fade" id="userDetails" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="staticBackdropLabel">User Details</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-3 ps-4">
                <img :src="image" :alt="user.name" class="img-fluid rounded">
              </div>
              <div class="col-9">
                <div class="row mb-3">
                  <div class="col-5">Name</div>
                  <div class="col-7 text-capitalize">{{ user.name }}</div>
                </div>
                <div class="row mb-3">
                  <div class="col-5">Type</div>
                  <div class="col-7">{{ user.type == '1' ? 'User' : 'Admin' }}</div>
                </div>
                <div class="row mb-3">
                  <div class="col-5">Email</div>
                  <div class="col-7">{{ user.email }}</div>
                </div>
                <div class="row mb-3">
                  <div class="col-5">Phone</div>
                  <div class="col-7">{{ user.phone }}</div>
                </div>
                <div class="row mb-3">
                  <div class="col-5">Date of Birth</div>
                  <div class="col-7">{{ $filters.dateFormat(user.dob) }}</div>
                </div>
                <div class="row mb-3">
                  <div class="col-5">Address</div>
                  <div class="col-7 text-capitalize">{{ user.address }}</div>
                </div>
                <div class="row mb-3">
                  <div class="col-5">Created Date</div>
                  <div class="col-7">{{ $filters.dateFormat(user.created_at) }}</div>
                </div>
                <div class="row mb-3">
                  <div class="col-5">Created User</div>
                  <div class="col-7 text-capitalize">{{ filterUsers(user.created_user_id)?.name }}</div>
                </div>
                <div class="row mb-3">
                  <div class="col-5">Updated Date</div>
                  <div class="col-7">{{ $filters.dateFormat(user.updated_at) }}</div>
                </div>
                <div class="row mb-3">
                  <div class="col-5">Updated User</div>
                  <div class="col-7 text-capitalize">{{ filterUsers(user.updated_user_id)?.name }}</div>
                </div>
              </div>
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
  import { ref, onMounted } from 'vue'
  import api from '../../axios'
  import $ from 'jquery'
  import Paginate from 'vuejs-paginate-next'
  import { useStore } from 'vuex'
  import Toast from '../../utils/Toast'

  const store = useStore()
  const name = ref('');
  const email = ref('');
  const from = ref('');
  const to = ref('');
  const users = ref([]);
  const total = ref()
  const user = ref([]);
  const image = ref('')
  const allUsers = ref([])
  const currentUser = store.state.user

  const deleteUser = (selectedUser) => {
    user.value = selectedUser;
  };

  const detailsUser = (selectedUser) => {
    user.value = selectedUser;
    fetchImage(user.value.profile);
  };

  const fetchUsers = (page = 1) => {
    api.get(`/users?page=${page}&user=${currentUser.id}&name=${name.value}&email=${email.value}&from=${from.value}&to=${to.value}`)
      .then((response) => {
        total.value = response.data.pagination.last_page
        users.value = response.data.users;
        allUsers.value = response.data.all_users;
      });
  }

  const destroy = (id) => {
    api.delete(`/users/${id}`)
    .then(() => {
      $("#userDelete").hide();
      $(".modal-backdrop").remove();
      $("body").removeClass("modal-open");
      fetchUsers();
      Toast.fire({
        icon: "success",
        title: 'User Delete Successfully!',
      });
    })
  }

  const fetchImage = (filename) => {
    api.get(`/images/${filename}`, { responseType: 'blob' })
      .then((response) => {
        const blob = new Blob([response.data], { type: response.headers['content-type'] });
        const imageUrl = URL.createObjectURL(blob);
        image.value = imageUrl;
      })
      .catch(() => {
        image.value = '';
      })
  };

  const filterUsers = (id) =>{ 
    return allUsers.value.find(user => user.id === id)
  };

  onMounted(() => {
    fetchUsers();
  });
</script>
