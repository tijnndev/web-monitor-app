import { Storage } from '@capacitor/storage';

export const encryptData = async (data: string, keyString: string) => {
    try {
      const encoder = new TextEncoder();
      const encodedData = encoder.encode(data);
  
      let keyBuffer = new TextEncoder().encode(keyString);
      if (keyBuffer.length !== 16 && keyBuffer.length !== 32) {
        const paddedKey = new Uint8Array(32);
        paddedKey.set(keyBuffer.slice(0, 32));
        keyBuffer = paddedKey;
      }
  
      const key = await crypto.subtle.importKey(
        "raw", 
        keyBuffer, 
        { name: "AES-GCM" }, 
        false, 
        ["encrypt"]
      );
  
      const iv = window.crypto.getRandomValues(new Uint8Array(12));
  
      const encryptedData = await crypto.subtle.encrypt(
        { name: "AES-GCM", iv },
        key,
        encodedData
      );
  
      // Convert encrypted data and IV to base64
      const encryptedBase64 = btoa(String.fromCharCode(...new Uint8Array(encryptedData)));
      const ivBase64 = btoa(String.fromCharCode(...iv));
  
      return { encryptedData: encryptedBase64, iv: ivBase64 };
    } catch (error) {
      console.error('Error during encryption:', error);
      throw error;
    }
  };

  export const decryptData = async (encryptedData: string, ivBase64: string, keyString: string): Promise<string> => {
    try {
      // Convert the base64 string back to a byte array
      const encryptedDataBuffer = new Uint8Array(atob(encryptedData).split("").map(c => c.charCodeAt(0)));
      const ivBuffer = new Uint8Array(atob(ivBase64).split("").map(c => c.charCodeAt(0)));
  
      let keyBuffer = new TextEncoder().encode(keyString);
      if (keyBuffer.length !== 16 && keyBuffer.length !== 32) {
        const paddedKey = new Uint8Array(32);
        paddedKey.set(keyBuffer.slice(0, 32));
        keyBuffer = paddedKey;
      }
  
      const key = await crypto.subtle.importKey(
        "raw", 
        keyBuffer, 
        { name: "AES-GCM" }, 
        false, 
        ["decrypt"]
      );
  
      const decryptedData = await crypto.subtle.decrypt(
        { name: "AES-GCM", iv: ivBuffer },
        key,
        encryptedDataBuffer
      );
  
      const decoder = new TextDecoder();
      return decoder.decode(decryptedData);
    } catch (error) {
      console.error('Error during decryption:', error);
      throw error;
    }
  };
  
  

  export async function getConfig() {
    const savedConfig = await Storage.get({ key: 'config' });
  
    if (savedConfig.value) {
      const parsedConfig = JSON.parse(savedConfig.value);
      const key = "s92i20i298e2898e928e982duwjanasd980dj2"

      return {
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
    return {
        API_URL: "",
        API_KEY: "",
        AUTH_DOMAIN: "",
        PROJECT_ID: "",
        STORAGE_BUCKET: "",
        MESSAGING_SENDER_ID: "",
        APP_ID: "",
        MEASUREMENT_ID: "",
        VAPID_KEY: ""
        };
  }
  

export default { decryptData, encryptData, getConfig };