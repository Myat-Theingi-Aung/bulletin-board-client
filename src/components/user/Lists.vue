<script setup>
</script>

<template>
  <div class="container py-5">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h5 class="mb-0 py-2">User List</h5>
          </div>
          <div class="card-body">
            <div class="row py-4">
              <div class="col-12">
                <form @submit.prevent="searchForm" class="d-flex justify-content-end">
                  <div class="d-flex align-items-center justify-content-center me-4">
                    <label for="name" class="form-label mb-0 me-3">Name:</label>
                    <input type="email" class="form-control" id="name" v-model="name">
                  </div>
                  <div class="d-flex align-items-center justify-content-center me-4">
                    <label for="email" class="form-label mb-0 me-3">Email:</label>
                    <input type="email" class="form-control" id="email" v-model="email">
                  </div>
                  <div class="d-flex align-items-center justify-content-center me-4">
                    <label for="startDate" class="form-label mb-0 me-3">From:</label>
                    <input type="date" class="form-control" id="startDate" v-model="startDate">
                  </div>
                  <div class="d-flex align-items-center justify-content-center me-4">
                    <label for="endDate" class="from-label mb-0 me-3">to:</label>
                    <input type="date" class="form-control" id="endDate" v-model="endDate">
                  </div>
                  <button class="btn btn-primary">Search</button>
                </form>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
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
                    <tr v-for="user in users" :key="user.id">
                      <td>{{ user.id }}</td>
                      <td class="text-success pointer" @click="detailsUser(user)" data-bs-toggle="modal" data-bs-target="#userDetails">{{ user.name }}</td>
                      <td>{{ user.email }}</td>
                      <td>{{ user.created_user_id }}</td>
                      <td>{{ user.type }}</td>
                      <td>{{ user.phone }}</td>
                      <td>{{ user.dob }}</td>
                      <td>{{ user.address }}</td>
                      <td>{{ user.created_at }}</td>
                      <td>{{ user.updated_at }}</td>
                      <td>
                        <button @click="deleteUser(user)" data-bs-toggle="modal" data-bs-target="#userDelete" class="btn btn-danger btn-sm">Delete</button>
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
    <!-- user delete modal -->
    <div class="modal fade" id="userDelete" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
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
              <div class="col-9">{{ user.id }}</div>
            </div>
            <div class="row mb-4">
              <div class="col-3 ps-4">Name</div>
              <div class="col-9">{{ user.name }}</div>
            </div>
            <div class="row mb-4">
              <div class="col-3 ps-4">Type</div>
              <div class="col-9">{{ user.type }}</div>
            </div>
            <div class="row mb-4">
              <div class="col-3 ps-4">Email</div>
              <div class="col-9">{{ user.email }}</div>
            </div>
            <div class="row mb-4">
              <div class="col-3 ps-4">Phone</div>
              <div class="col-9">{{ user.phone }}</div>
            </div>
            <div class="row mb-4">
              <div class="col-3 ps-4">Date of Birth</div>
              <div class="col-9">{{ user.dob }}</div>
            </div>
            <div class="row mb-4">
              <div class="col-3 ps-4">Address</div>
              <div class="col-9">{{ user.address }}</div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-danger">Delete</button>
          </div>
        </div>
      </div>
    </div>
    <!-- user show modal -->
    <div class="modal fade" id="userDetails" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="staticBackdropLabel">User Details</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-3 ps-4">
                <img src="../../assets/img/default.jpg" class="img-fluid rounded" alt="">
              </div>
              <!-- <div class="col-1"></div> -->
              <div class="col-9">
                <div class="row mb-3">
                  <div class="col-5">Name</div>
                  <div class="col-7">MTA</div>
                </div>
                <div class="row mb-3">
                  <div class="col-5">Type</div>
                  <div class="col-7">admin</div>
                </div>
                <div class="row mb-3">
                  <div class="col-5">Email</div>
                  <div class="col-7">aungaung@gmail.com</div>
                </div>
                <div class="row mb-3">
                  <div class="col-5">Phone</div>
                  <div class="col-7">0987654321</div>
                </div>
                <div class="row mb-3">
                  <div class="col-5">Date of Birth</div>
                  <div class="col-7">2021-04-01</div>
                </div>
                <div class="row mb-3">
                  <div class="col-5">Address</div>
                  <div class="col-7">Yangon</div>
                </div>
                <div class="row mb-3">
                  <div class="col-5">Created Date</div>
                  <div class="col-7">2021-04-01</div>
                </div>
                <div class="row mb-3">
                  <div class="col-5">Created Uer</div>
                  <div class="col-7">Admin</div>
                </div>
                <div class="row mb-3">
                  <div class="col-5">Updated Date</div>
                  <div class="col-7">2021-04-01</div>
                </div>
                <div class="row mb-3">
                  <div class="col-5">Updated User</div>
                  <div class="col-7">Mg Mg</div>
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

<script>
  import { ref } from 'vue'
  import api from '../../axios';

  export default {
    data() {
      return {
        name: ref(''),
        email: ref(''),
        startDate: ref(''),
        endDate: ref(''),
        user: [],
        users: [
          { id: 1, name: 'John Doe', email: 'john@example.com', created_user_id: 1, type: 1, phone: '09987654321', dob: '17-4-2000', address: 'pyay', created_at: 'something', updated_at: 'something..' },
          { id: 2, name: 'Aung Aung', email: 'aungaung@gmail.com', created_user_id: 2, type: 1, phone: '09987654321', dob: '17-4-2000', address: 'pyay', created_at: 'something', updated_at: 'something..' },
        ]
      }
    },
    methods: {
      deleteUser(user) {
        this.user = user;
      },
      detailsUser(user) {
        this.user = user
      }
    }
    // mounted() {
    //   api.get('/users')
    //   .then((response) => {
    //     this.users = response.data.users
    //   })
    // }
  }
</script>
