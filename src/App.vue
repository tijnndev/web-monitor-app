<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { requestAndRegisterFCMToken } from "./utils/registerFCMToken";

onMounted(async () => {
  await requestAndRegisterFCMToken();
});
</script>
