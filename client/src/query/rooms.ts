import axios from 'axios';
import { BACKEND_URI } from './constants';

export const newRoom = async (userId: string, name: string) => {
  try {
    const payload = { userId, name };
    const response = await axios.post(`${BACKEND_URI}/room/new`, payload);
    console.log(response);
  } catch (error) {
    console.error('Fail');
  }
};
