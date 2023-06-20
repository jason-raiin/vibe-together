import axios from 'axios';
import { BACKEND_URI } from './constants';

export const newUser = async (user: unknown) => {
  try {
    const payload = { user };
    const response = await axios.post(`${BACKEND_URI}/user/new`, payload);
    console.log(response);
  } catch (error) {
    console.error('Fail');
  }
};
