import axios from 'axios';
import { BACKEND_URI } from './constants';

export const ping = async () => {
  try {
    const response = await axios.get(BACKEND_URI, {});
    console.log(response);
  } catch (error) {
    console.error('No response');
  }
};

export const newUser = async (user: unknown) => {
  try {
    const payload = { user };
    const response = await axios.post(`${BACKEND_URI}/user/new`, payload);
    console.log(response);
  } catch (error) {
    console.error('Fail');
  }
};

export const newRoom = async (userId: string, name: string) => {
  try {
    const payload = { userId, name };
    const response = await axios.post(`${BACKEND_URI}/room/new`, payload);
    console.log(response);
  } catch (error) {
    console.error('Fail');
  }
};
