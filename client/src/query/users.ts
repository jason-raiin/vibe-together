import axios from 'axios';
import { BACKEND_URI } from './constants';

export const addUpdateUser = async (user: unknown) => {
  try {
    const payload = { user };
    await axios.post(`${BACKEND_URI}/user/`, payload);
  } catch (error) {
    console.error('Failed to add/update new user:', error);
  }
};
