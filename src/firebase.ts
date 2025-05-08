import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import type { Messaging } from "firebase/messaging";

let messaging: Messaging | undefined;

function initializeFirebase() {
  const firebaseConfig = {
    apiKey: process.env.VUE_API_KEY || "",
    authDomain: process.env.VUE_AUTH_DOMAIN || "",
    projectId: process.env.VUE_PROJECT_ID || "",
    storageBucket: process.env.VUE_STORAGE_BUCKET || "",
    messagingSenderId: process.env.VUE_MESSAGING_SENDER_ID || "",
    appId: process.env.VUE_APP_ID || "",
    measurementId: process.env.VUE_MEASUREMENT_ID || ""
  };

  const app = initializeApp(firebaseConfig);
  messaging = getMessaging(app);
}


export { messaging, getToken, onMessage, initializeFirebase };
