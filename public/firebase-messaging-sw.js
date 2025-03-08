// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js");
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js");

// eslint-disable-next-line no-undef
firebase.initializeApp({
    apiKey: "AIzaSyAK_HUpx3rSwWlo7v95ctofX1n_cKJIcyA",
    authDomain: "web-monitor-7197c.firebaseapp.com",
    projectId: "web-monitor-7197c",
    storageBucket: "web-monitor-7197c.firebasestorage.app",
    messagingSenderId: "1054778910495",
    appId: "1:1054778910495:web:b6a9f6b50e48bc878cf22a",
});
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Received background message: ", payload);
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/icon.png",
  });
});
