import { messaging, getToken } from "../firebase";
import axios from "axios";
import logger from "./logger";
import { PushNotifications } from "@capacitor/push-notifications";
import { Capacitor } from "@capacitor/core";
import { getConfig } from "./storage"

export const requestAndRegisterFCMToken = async () => {
  try {
    const config = await getConfig();


    const API_URL = config.API_URL || ""
    
    if (Capacitor.getPlatform() !== "web") {
      logger.info("Using native platform for FCM token registration.");
      const permission = await PushNotifications.requestPermissions();
      if (permission.receive !== "granted") {
        logger.warn("Push notifications permission denied on native platform.");
        return;
      }
    } else {
      logger.info("Using web platform for FCM token registration.");
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        logger.warn("Push notifications permission denied on web platform.");
        return;
      }
    }
    
    logger.info("Fetching token.");
    let token;
    if (Capacitor.getPlatform() === "web") {
      logger.info("Fetching token for web platform.");
      if (messaging) {
        token = await getToken(messaging, { vapidKey: config.VAPID_KEY || "" });
      } else {
        logger.warn("Messaging is undefined.");
      }
    } else {
      logger.info("Fetching token for native platform.");
      token = await new Promise<string>((resolve, reject) => {
        PushNotifications.register().then(async () => {
          await PushNotifications.addListener('registration', (token) => {
            resolve(token.value);
          });
        }).catch((error) => {
          // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
          reject(error);
        });
      });
    }
    
    logger.info(`FCM token: ${token}`);
    if (!token) {
      logger.warn("No FCM token received.");
      return;
    }
    logger.info("Fetched token.");
    
    logger.info("Posting token.");
    await axios.post(API_URL + "/register-token", { token });
    logger.info("FCM token registered successfully!");
  } catch (error) {
    console.error("Error registering FCM token:", error);
    logger.error("Error registering FCM token: " + (error as Error).toString());
  }
};
