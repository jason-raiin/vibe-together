import axios from 'axios';
import { BACKEND_URI } from './constants';

export const requestWhitelist = async (email: string, timestamp: Date) => {
  try {
    const payload = { email, timestamp };
    await axios.post(`${BACKEND_URI}/whitelist`, payload);
  } catch (error) {
    console.error('Failed to add to whitelist:', error);
  }
};
