<script setup>
import { RouterView } from 'vue-router';
import Header from './components/layout/Header.vue'
import Footer from './components/layout/Footer.vue'
</script>

<template>
  <div class="container-fluid">
    <Header style="height: 8vh" />
    <RouterView style="min-height: 84vh" /> 
    <Footer style="height: 8vh" /> 
  </div> 
</template>
