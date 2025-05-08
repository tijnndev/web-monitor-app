import logger from '../logger';
import { Capacitor } from '@capacitor/core';

const FIREBASE_API_BASE = import.meta.env.VITE_FIREBASE_API_URL

export let token = localStorage.getItem('token') || null
let serviceId = Number(import.meta.env.VITE_SERVICE_ID);

export const setToken = (newToken) => {
  token = newToken
}

export const registerToken = async (token) => {
    
    logger.log('Trying to register token:2', token);
    try {
      const response = await fetch(`${FIREBASE_API_BASE}/tokens`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: token,
          serviceId: serviceId,
          type: Capacitor.getPlatform() === 'web' ? 'web' : 'android',
        }),
      });

      const data = await response.json();
      if (response.ok) {
        logger.log('Token registered successfully:', data);
      } else {
        logger.error('Error registering token:', data.error);
        logger.error(response.text)
        logger.error(data.error)
      }
    } catch (error) {
      logger.error('Error connecting to the backend:', error);
      logger.error(error)
    }
};