<script setup>
import { RouterView } from 'vue-router'
import Header from './components/layout/Header.vue'
import Footer from './components/layout/Footer.vue'
import { isNotFound } from './utils/notFound'

</script>

<template>
  <div class="container-fluid">
    <Header v-if="!isNotFound" />
    <RouterView style="min-height: 84vh" /> 
    <Footer v-if="!isNotFound" /> 
  </div> 
</template>
