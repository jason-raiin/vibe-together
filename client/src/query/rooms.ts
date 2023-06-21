import axios from 'axios';
import { BACKEND_URI } from './constants';

export const newRoom = async (userId: string, name: string) => {
  try {
    const payload = { userId, name };
    const response = await axios.post(`${BACKEND_URI}/room/new`, payload);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error('Failed to create new room:', error);
    return '';
  }
};

export const joinRoom = async (userId: string, roomId: string) => {
  try {
    const payload = { userId, roomId };
    await axios.post(`${BACKEND_URI}/room/add`, payload);
  } catch (error) {
    console.error('Failed to add user to room:', error);
  }
};

export const getRoom = async (roomId: string) => {
  try {
    const payload = { roomId };
    await axios.post(`${BACKEND_URI}/room/get`, payload);
  } catch (error) {
    console.error('Failed to add user to room:', error);
  }
};
