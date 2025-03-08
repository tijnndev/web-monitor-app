import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAK_HUpx3rSwWlo7v95ctofX1n_cKJIcyA",
  authDomain: "web-monitor-7197c.firebaseapp.com",
  projectId: "web-monitor-7197c",
  storageBucket: "web-monitor-7197c.firebasestorage.app",
  messagingSenderId: "1054778910495",
  appId: "1:1054778910495:web:b6a9f6b50e48bc878cf22a",
  measurementId: "G-R5PNZ116DR"
};


const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export { messaging, getToken, onMessage };
