import { messaging, getToken } from "../firebase";
import axios from "axios";

const API_URL = process.env.API_URL || "";  // Your API URL

export const requestAndRegisterFCMToken = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      console.warn("Push notifications permission denied.");
      return;
    }
    const registration = await navigator.serviceWorker.register("/firebase-messaging-sw.js");
    console.log("Service Worker registered:", registration);

    const token = await getToken(messaging, { vapidKey: process.env.VAPID_KEY || "" });
    if (!token) {
      console.warn("No FCM token received.");
      return;
    }

    await axios.post(API_URL, { token });
    console.log("FCM token registered successfully!");
  } catch (error) {
    console.error("Error registering FCM token:", error);
  }
};
