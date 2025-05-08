<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { requestAndRegisterFCMToken } from "./utils/registerFCMToken";
import { initializeFirebase } from "./firebase";

onMounted(async () => {
  initializeFirebase()
  await requestAndRegisterFCMToken();
});
</script>
