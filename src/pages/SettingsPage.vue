<template>
    <q-page padding>
      <q-card>
        <q-card-section>
          <q-form @submit.prevent="saveSettings">
            <q-input v-model="config.API_URL" label="API URL" filled class="q-mb-md" />
            <q-input v-model="config.API_KEY" label="API Key" filled class="q-mb-md" />
            <q-input v-model="config.AUTH_DOMAIN" label="Auth Domain" filled class="q-mb-md" />
            <q-input v-model="config.PROJECT_ID" label="Project ID" filled class="q-mb-md" />
            <q-input v-model="config.STORAGE_BUCKET" label="Storage Bucket" filled class="q-mb-md" />
            <q-input v-model="config.MESSAGING_SENDER_ID" label="Messaging Sender ID" filled class="q-mb-md" />
            <q-input v-model="config.APP_ID" label="App ID" filled class="q-mb-md" />
            <q-input v-model="config.MEASUREMENT_ID" label="Measurement ID" filled class="q-mb-md" />
            <q-input v-model="config.VAPID_KEY" label="VAPID Key" filled class="q-mb-md" />
            <q-btn type="submit" color="primary" label="Save" class="q-mt-md" />
            <q-btn @click="clearConfig" color="negative" label="Clear Config" class="q-mt-md" />
          </q-form>
        </q-card-section>
      </q-card>
    </q-page>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { Storage } from '@capacitor/storage';
  import { encryptData, decryptData } from '../utils/storage';
  
  const key = "s92i20i298e2898e928e982duwjanasd980dj2"
  
  const config = ref({
    API_URL: '',
    API_KEY: '',
    AUTH_DOMAIN: '',
    PROJECT_ID: '',
    STORAGE_BUCKET: '',
    MESSAGING_SENDER_ID: '',
    APP_ID: '',
    MEASUREMENT_ID: '',
    VAPID_KEY: ''
  });
  
  const saveSettings = async () => {
    const encryptedConfig = {
      API_URL: await encryptData(config.value.API_URL, key),
      API_KEY: await encryptData(config.value.API_KEY, key),
      AUTH_DOMAIN: await encryptData(config.value.AUTH_DOMAIN, key),
      PROJECT_ID: await encryptData(config.value.PROJECT_ID, key),
      STORAGE_BUCKET: await encryptData(config.value.STORAGE_BUCKET, key),
      MESSAGING_SENDER_ID: await encryptData(config.value.MESSAGING_SENDER_ID, key),
      APP_ID: await encryptData(config.value.APP_ID, key),
      MEASUREMENT_ID: await encryptData(config.value.MEASUREMENT_ID, key),
      VAPID_KEY: await encryptData(config.value.VAPID_KEY, key)
    };
  
    await Storage.set({
      key: 'config',
      value: JSON.stringify(encryptedConfig)
    });
  };
  
  const clearConfig = async () => {
    config.value = {
      API_URL: '',
      API_KEY: '',
      AUTH_DOMAIN: '',
      PROJECT_ID: '',
      STORAGE_BUCKET: '',
      MESSAGING_SENDER_ID: '',
      APP_ID: '',
      MEASUREMENT_ID: '',
      VAPID_KEY: ''
    };
    await Storage.remove({ key: 'config' });
  };
  
  onMounted(async () => {
    const savedConfig = await Storage.get({ key: 'config' });
    if (savedConfig.value) {
      const parsedConfig = JSON.parse(savedConfig.value);
  
      // Decrypt the values when retrieving them
      config.value = {
        API_URL: await decryptData(parsedConfig.API_URL.encryptedData, parsedConfig.API_URL.iv, key),
        API_KEY: await decryptData(parsedConfig.API_KEY.encryptedData, parsedConfig.API_KEY.iv, key),
        AUTH_DOMAIN: await decryptData(parsedConfig.AUTH_DOMAIN.encryptedData, parsedConfig.AUTH_DOMAIN.iv, key),
        PROJECT_ID: await decryptData(parsedConfig.PROJECT_ID.encryptedData, parsedConfig.PROJECT_ID.iv, key),
        STORAGE_BUCKET: await decryptData(parsedConfig.STORAGE_BUCKET.encryptedData, parsedConfig.STORAGE_BUCKET.iv, key),
        MESSAGING_SENDER_ID: await decryptData(parsedConfig.MESSAGING_SENDER_ID.encryptedData, parsedConfig.MESSAGING_SENDER_ID.iv, key),
        APP_ID: await decryptData(parsedConfig.APP_ID.encryptedData, parsedConfig.APP_ID.iv, key),
        MEASUREMENT_ID: await decryptData(parsedConfig.MEASUREMENT_ID.encryptedData, parsedConfig.MEASUREMENT_ID.iv, key),
        VAPID_KEY: await decryptData(parsedConfig.VAPID_KEY.encryptedData, parsedConfig.VAPID_KEY.iv, key)
      };
    }
  });
  </script>
  