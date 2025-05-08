importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js');


const firebaseConfig = {
  apiKey: "AIzaSyCeTNDAPWl0mYoZQ6zOPjqcFktzLv3P91M",
  authDomain: "native-app-986da.firebaseapp.com",
  projectId: "native-app-986da",
  storageBucket: "native-app-986da.firebasestorage.app",
  messagingSenderId: "238680437595",
  appId: "1:238680437595:web:7b368861412401cf15e07e",
  measurementId: "G-VP3Q8GP3Y0"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

self.addEventListener('notificationclick', function(event) {
  const url = event.notification?.data?.url || 'https://mt.tijnn.dev';

  event.notification.close();

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
      for (let i = 0; i < clientList.length; i++) {
        const client = clientList[i];
        if (client.url === url && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});
