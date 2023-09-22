<template>
  <div class="container py-5">
    <div class="row">
      <div class="col-7 mx-auto">
        <div class="card">
          <div class="card-header bg-success">
            <h5 class="text-white">Profile</h5>
          </div>
          <div class="card-body my-3">
            <div class="row">
              <div class="col-1"></div>
              <div class="col-3">
                <img :src="image" class="img-fluid rounded" :alt="user.name">
              </div>
              <div class="col-1"></div>
              <div class="col-7">
                <div class="row mb-3">
                  <div class="col-4">Name</div>
                  <div class="col-8">{{ user.name }}</div>
                </div>
                <div class="row mb-3">
                  <div class="col-4">Type</div>
                  <div class="col-8">{{ user.type == '0' ? 'Admin' : 'User' }}</div>
                </div>
                <div class="row mb-3">
                  <div class="col-4">Email</div>
                  <div class="col-8">{{ user.email }}</div>
                </div>
                <div class="row mb-3">
                  <div class="col-4">Phone</div>
                  <div class="col-8">{{ user.phone }}</div>
                </div>
                <div class="row mb-3">
                  <div class="col-4">Date of Birth</div>
                  <div class="col-8">{{ user.dob }}</div>
                </div>
                <div class="row mb-3">
                  <div class="col-4">Address</div>
                  <div class="col-8">{{ user.address }}</div>
                </div>
                <div class="row">
                  <div class="col-5">
                    <a href="/users/edit" class="btn btn-success">Edit Profile</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import api from '../../axios'
import { useStore } from 'vuex'

  const store = useStore()
  const user = store.state.user
  const image = ref('')

  const fetchImage = (filename) => {
    api.get(`/images/${filename}`, { responseType: 'blob' })
      .then((response) => {
        const blob = new Blob([response.data], { type: response.headers['content-type'] });
        const imageUrl = URL.createObjectURL(blob);
        image.value = imageUrl;
      })
  };

  onMounted(() => {
    fetchImage(user.profile);
  });
</script>
