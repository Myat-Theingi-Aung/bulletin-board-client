<script setup>
import { RouterView } from 'vue-router';
import Header from './components/layout/Header.vue'
import Footer from './components/layout/Footer.vue'
</script>

<template>
  <div class="container-fluid">
    <Header />
    <RouterView style="min-height: 84vh" /> 
    <Footer /> 
  </div> 
</template>
