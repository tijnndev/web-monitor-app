import { PushNotifications } from '@capacitor/push-notifications';
import { Capacitor } from '@capacitor/core';
import { registerToken } from './api/backend';
import logger from './logger';
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

let messaging;

async function initializeFirebase() {
  logger.info('Initializing Firebase...');
  const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID,
    measurementId: import.meta.env.VITE_MEASUREMENT_ID,
  };

  const app = initializeApp(firebaseConfig);
  messaging = getMessaging(app);
}

export const requestNotificationPermission = async () => {
  try {
    const isWeb = Capacitor.getPlatform() === 'web';

    if (isWeb) {
      if (!messaging) await initializeFirebase();

      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        return false;
      }

      const token = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_VAPID_PUBLIC_KEY || ""
      });

      if (!token) return false;

      await registerToken(token);
      return true;
    }

    logger.info('Requesting push notification permissions...');
    const permission = await PushNotifications.requestPermissions();
    if (permission.receive !== 'granted') {
      logger.warn('Push notifications permission denied.');
      return false;
    }

    logger.info('Registering for push notifications...');
    await PushNotifications.register();

    const token = await new Promise((resolve, reject) => {
      const onRegister = (token) => {
        PushNotifications.removeAllListeners();
        resolve(token.value);
      };

      const onRegistrationError = (error) => {
        PushNotifications.removeAllListeners();
        reject(error);
      };

      PushNotifications.addListener('registration', onRegister);
      PushNotifications.addListener('registrationError', onRegistrationError);
    });

    logger.info(`FCM token obtained: ${token}`);
    await registerToken(token);
    return true;
  } catch (error) {
    logger.error(`Failed to initialize push notifications: ${error}`);
    return false;
  }
};

