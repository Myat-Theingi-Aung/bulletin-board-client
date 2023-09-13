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
                  <div class="me-4">
                    <label for="name" class="me-3">Name:</label>
                    <input type="text" class="border-primary border-1 s-input rounded outline-none py-1 px-2" id="name" v-model="name" />
                  </div>
                  <div class="me-4">
                    <label for="email" class="me-3">Email:</label>
                    <input type="email" id="email" class="s-input border-primary border-1 rounded outline-none py-1 px-2" v-model="email" />
                  </div>
                  <div class="me-4">
                    <label for="startDate" class="me-3">Start Date:</label>
                    <input type="date" id="startDate" class="s-input border-primary border-1 rounded outline-none py-1 px-2" v-model="startDate" />
                  </div>
                  <div class="me-4">
                    <label for="endDate" class="me-3">End Date:</label>
                    <input type="date" id="endDate" class="s-input border-primary border-1 rounded outline-none py-1 px-2" v-model="endDate" />
                  </div>
                  <button class="px-4 py-1 bg-primary text-white rounded outline-none border-primary" type="submit">Search</button>
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
                      <td>{{ user.name }}</td>
                      <td>{{ user.email }}</td>
                      <td>{{ user.created_user_id }}</td>
                      <td>{{ user.type }}</td>
                      <td>{{ user.phone }}</td>
                      <td>{{ user.dob }}</td>
                      <td>{{ user.address }}</td>
                      <td>{{ user.created_at }}</td>
                      <td>{{ user.updated_at }}</td>
                      <td>
                        <button @click="deleteUser(user.id)" class="btn btn-danger btn-sm">Delete</button>
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
  </div>
</template>

<script setup>
  import { ref } from 'vue'
 
  const name = ref('')
  const email = ref('')
  const startDate = ref('')
  const endDate = ref('')

  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', created_user_id: 1, type: 1, phone: '09987654321', dob: '17-4-2000', address: 'pyay', created_at: 'something', updated_at: 'something..' },
    { id: 2, name: 'Aung Aung', email: 'aungaung@gmail.com', created_user_id: 2, type: 1, phone: '09987654321', dob: '17-4-2000', address: 'pyay', created_at: 'something', updated_at: 'something..' },
  ]

 // export default {
  //   setup() {
  //     return {
  //       search: {
  //         name: '',
  //         email: '',
  //         startDate: '',
  //         endDate: ''
  //       },
  //     }
  //   }
  // }
</script>
