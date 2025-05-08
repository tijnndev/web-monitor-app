<template>
  <q-card class="q-pa-md box-shadow-none">
    <q-card-section>
      <div class="text-h6">Monitoring Services</div>
    </q-card-section>
    
    <q-card-section>
      <q-list bordered separator>
        <q-item v-for="service in services" :key="service.url" clickable @click="openUrl(service.url)">
          <q-item-section>
            <q-item-label>{{ service.name }}</q-item-label>
            <q-item-label caption class="text-primary">{{ service.url }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>

    <!-- Manually register token button -->
    <q-card-section>
      <q-btn label="Register FCM Token" color="primary" @click="registerToken" />
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { requestAndRegisterFCMToken } from '../utils/registerFCMToken';  // Ensure the function is imported
import type { Service } from '../utils/types';

const services = ref<Service[]>();

const fetchServices = async () => {
  try {
    const response = await axios.get(process.env.VUE_API_URL + '/services');
    services.value = response.data;
  } catch (error) {
    console.error('Error fetching services:', error);
  }
};

const openUrl = (url: string) => {
  window.open(url, '_blank');
};

// Function to manually trigger the FCM token registration
const registerToken = async () => {
  await requestAndRegisterFCMToken();
};

onMounted(async () => {
    await fetchServices();
});
</script>
