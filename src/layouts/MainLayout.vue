<template>
  <q-layout view="lHh Lpr lFf">
    <!-- <q-drawer v-model="isSidebarOpen" side="left" elevated>
      <q-list>
        <q-item clickable v-close-popup to="/">
          <q-item-section>Services</q-item-section>
        </q-item>
        <q-item clickable v-close-popup to="/settings">
          <q-item-section>Settings</q-item-section>
        </q-item>
      </q-list>
    </q-drawer> -->

    <q-header elevated>
      <q-toolbar>
        <!-- <q-btn flat dense round icon="menu" @click="toggleSidebar" /> -->
        <q-toolbar-title>
          Web Monitor
        </q-toolbar-title>
        <div>Web Monitor v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
// import { ref } from 'vue';

// const isSidebarOpen = ref(false);
// const toggleSidebar = () => {
//   isSidebarOpen.value = !isSidebarOpen.value;
// };
</script>
