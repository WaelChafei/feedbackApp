<!-- Layout.vue -->
<template>
    <div>
      <Sidebar v-if="showSidebar" />
      <div class="main-content">
        <router-view />
      </div>
    </div>
  </template>
  
  <script>
  import Sidebar from '@/components/Sidebar.vue';
  
  export default {
    components: {
      Sidebar,
    },
    data() {
      return {
        showSidebar: true, 
      };
    },  watch: {
    $route(to, from) {
      this.showSidebar = to.meta.layout !== 'no-sidebar';
    },
  },
  };
  </script>
  
  <style scoped>
  </style>
  