import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { getConfig } from "./utils/storage";
import type { Messaging } from "firebase/messaging";

let messaging: Messaging | undefined;

async function initializeFirebase() {
  const config = await getConfig();

  if (!config?.API_KEY || !config?.AUTH_DOMAIN || !config?.PROJECT_ID || !config?.STORAGE_BUCKET || !config?.MESSAGING_SENDER_ID || !config?.APP_ID || !config?.MEASUREMENT_ID) {
    console.warn("Firebase config not found in storage. Skipping Firebase initialization.");
    return;
  }

  const firebaseConfig = {
    apiKey: config.API_KEY,
    authDomain: config.AUTH_DOMAIN,
    projectId: config.PROJECT_ID,
    storageBucket: config.STORAGE_BUCKET,
    messagingSenderId: config.MESSAGING_SENDER_ID,
    appId: config.APP_ID,
    measurementId: config.MEASUREMENT_ID
  };

  const app = initializeApp(firebaseConfig);
  messaging = getMessaging(app);
}


export { messaging, getToken, onMessage, initializeFirebase };
