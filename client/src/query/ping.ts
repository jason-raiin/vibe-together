import axios from 'axios';
import { BACKEND_URI } from './constants';

export const ping = async () => {
  try {
    const response = await axios.get(BACKEND_URI, {});
    // console.log(response);
  } catch (error) {
    console.error('No response');
  }
};
