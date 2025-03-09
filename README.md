Here's the README for the `web-monitor-app` built with Quasar and Vue.js:

---

# Web Monitor App (Quasar + Vue.js)

This project is a web monitoring mobile app built using **Quasar** and **Vue.js**. The app connects to my [web-monitor](https://github.com/tijnndev/web-monitor), provides real-time website status updates, and displays alerts for any websites that go offline. The app is designed to complement the web monitoring bot by sending notifications and showing the status of monitored websites.

## Features
- View the status of monitored websites.
- Receive push notifications when a website goes offline.
- Displays real-time website status.
- Mobile-friendly design optimized for both Android and iOS platforms.

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/tijnndev/web-monitor-app
   ```

2. Install dependencies:
   ```bash
   cd web-monitor-app
   npm install
   ```

3. Configure the app:
   - Create a file named `.env` in the project folder.
   - Add the following configuration to connect with the backend monitoring system and Firebase for push notifications:
     ```
    API_URL="http://localhost:8007"
    API_KEY=""
    AUTH_DOMAIN=""
    PROJECT_ID=""
    STORAGE_BUCKET=""
    MESSAGING_SENDER_ID=""
    APP_ID=""
    MEASUREMENT_ID=""
    VAPID_KEY=""
     ```

4. Start the app:
   For development mode (Android emulator or web):
   ```bash
   npm run dev
   ```

   For production:
   ```bash
   npx quasar build -m capacitor -T android -d --info
   ```

---

## Usage

### Features in the App:
- **Website Status**: View the current status of all monitored websites. Websites will be marked as `ONLINE` or `OFFLINE`.
- **Push Notifications**: Receive push notifications on your mobile device when any of the monitored websites goes offline. Notifications are powered by Firebase Cloud Messaging (FCM).
- **Real-Time Updates**: The app fetches the latest website status from the backend API every minute to ensure up-to-date information.
- **Web Monitoring API Integration**: The app integrates with the API running on the backend to show the website status.

### Push Notifications
The app is configured to use **Firebase Cloud Messaging (FCM)** for push notifications. When a website goes offline, the backend sends a notification to all connected devices.

### WebSocket Integration
The app supports WebSocket integration to listen for real-time updates about website status. You will be notified whenever there is a change in the status of the monitored websites.

---

## Project Structure

- **src/App.vue**: Main Vue component that contains the layout of the app.
- **src/pages/IndexPage.vue**: Page that displays the status of the monitored websites.
- **src/components/WebsiteStatus.vue**: A component that shows individual website statuses (`ONLINE`/`OFFLINE`).
- **src/firebase.ts**: API calls to the Firebase Services for handling notifications.
- **src/utils/logger.ts**: Functions to log more easily and enable nice debugging.
- **src/utils/registerFCMToken.ts**: Functions to handle [web-monitor](https://github.com/tijnndev/web-monitor) FCM token registration.
- **src/quasar.conf.js**: Quasar configuration file where you can configure the app for production, such as Android build settings.

---

## Dependencies
- [Quasar Framework](https://quasar.dev/) - A powerful Vue.js framework to build responsive mobile-first applications.
- [Vue.js](https://vuejs.org/) - Progressive JavaScript framework for building user interfaces.
- [Axios](https://axios-http.com/) - For making HTTP requests to fetch website statuses.
- [Firebase](https://firebase.google.com/) - For push notifications via Firebase Cloud Messaging (FCM).
- [Vuex](https://vuex.vuejs.org/) - For state management (if applicable).

---

## Example Configuration

**.env**
```
API_URL="http://localhost:8007"
API_KEY=""
AUTH_DOMAIN=""
PROJECT_ID=""
STORAGE_BUCKET=""
MESSAGING_SENDER_ID=""
APP_ID=""
MEASUREMENT_ID=""
VAPID_KEY=""
```

---

## WebSocket & API Integration

The app integrates with the backend API to fetch website statuses.

- The API should be cloned from: https://github.com/tijnndev/web-monitor.
- The WebSocket server is on port `8007` and sends real-time alerts when website statuses change.

**API Response:**
```json
{
  "status": "Monitoring active",
  "websites": [
    {
      "name": "Example 1",
      "url": "https://example.com"
    },
    {
      "name": "Example 2",
      "url": "https://example2.com"
    }
  ]
}
```

**WebSocket Message Example:**
```json
{
  "url": "https://example2.com",
  "status": "OFFLINE"
}
```

---

## Contributing

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/YourFeature`.
3. Commit your changes: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/YourFeature`.
5. Open a pull request.

---

## License

This project is open-source and available under the [MIT License](LICENSE).
